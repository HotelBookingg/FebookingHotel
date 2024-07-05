// import * as fs from "fs";
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const dayjs = require("dayjs");
require("dayjs/locale/vi");
const server = jsonServer.create();
const router = jsonServer.router("./db/data.json");

const middlewares = jsonServer.defaults();

// router.get("/vnpay_ipn", function (req, res, next) {
//   var vnp_Params = req.query;
//   var secureHash = vnp_Params["vnp_SecureHash"];

//   delete vnp_Params["vnp_SecureHash"];
//   delete vnp_Params["vnp_SecureHashType"];

//   vnp_Params = sortObject(vnp_Params);
//   var config = require("config");
//   var secretKey = config.get("vnp_HashSecret");
//   var querystring = require("qs");
//   var signData = querystring.stringify(vnp_Params, { encode: false });
//   var crypto = require("crypto");
//   var hmac = crypto.createHmac("sha512", secretKey);
//   var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

//   if (secureHash === signed) {
//     var orderId = vnp_Params["vnp_TxnRef"];
//     var rspCode = vnp_Params["vnp_ResponseCode"];
//     //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
//     res.status(200).json({ RspCode: "00", Message: "success" });
//   } else {
//     res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
//   }
// });

server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);

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

server.use(auth);
server.use(router);
server.listen(4000);
