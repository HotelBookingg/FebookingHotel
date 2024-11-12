const jsonServer = require("json-server");
const auth = require("json-server-auth");
const dayjs = require("dayjs");
const crypto = require("crypto");
const axios = require("axios");
const { log } = require("console");

dayjs.locale("vi");

const server = jsonServer.create();
const router = jsonServer.router("./db/data.json");

const middlewares = jsonServer.defaults();
server.db = router.db;
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Đăng ký route thanh toán MoMo trong json-server
server.post("/payments", async (req, res) => {
  console.log(req.body);

  const { amount, orderInfo } = req.body;
  if (!amount || !orderInfo) {
    return res.status(400).json({ error: "Amount and orderInfo are required" });
  }

  const accessKey = "F8BBA842ECF85";
  const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const partnerCode = "MOMO";
  const redirectUrl =
    "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
  const ipnUrl = "http://localhost:4000/momo-ipn";
  const requestType = "payWithMethod";
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const extraData = "";
  const autoCapture = true;
  const lang = "vi";
  const expiryTime = Math.floor(Date.now() / 1000) + 5 * 60;

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    signature: signature,
    expiryTime: expiryTime,
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: { "Content-Type": "application/json" },
    data: requestBody,
  };

  try {
    const momoResponse = await axios(options);
    console.log("MoMo Payment Response:", momoResponse.data);
    res.json(momoResponse.data);
  } catch (error) {
    console.error(`Request error: ${error.message}`);
    res.status(500).send("Payment request failed");
  }
});

// Đăng ký route để xử lý thông báo từ MoMo
server.post("/momo-ipn", (req, res) => {
  const { orderId, status, message } = req.body;

  // Kiểm tra trạng thái thanh toán
  if (status === "SUCCESS") {
    console.log(`Thanh toán thành công cho đơn hàng ${orderId}: ${message}`);
    // Cập nhật trạng thái thanh toán trong database của bạn ở đây
  } else {
    console.log(
      `Thanh toán không thành công cho đơn hàng ${orderId}: ${message}`
    );
  }

  res.sendStatus(200); // Trả về HTTP 200 để xác nhận đã nhận thông báo
});

// Middleware để xử lý thời gian tạo và cập nhật
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = dayjs().valueOf();
    req.body.updatedAt = dayjs().valueOf();
    req.body.isDelete = false;
  }
  if (req.method === "PUT") {
    req.method = "PATCH";
  }
  if (req.method === "PATCH") {
    req.body.updatedAt = dayjs().valueOf();
  }
  next();
});

// Sử dụng middleware xác thực
server.use(auth);
server.use(router);

// Khởi động server
server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
