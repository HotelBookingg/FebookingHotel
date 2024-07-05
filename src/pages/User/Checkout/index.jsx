import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Form,
  Button,
  Input,
  Row,
  Col,
  Space,
  Breadcrumb,
  Card,
  notification,
} from "antd";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { v4 } from "uuid";

import { ROUTES } from "constants/routes";
import * as S from "./style";
import { GUEST_ID } from "constants/guest";

import {
  getRoomDetailRequest,
  updateRoomRequest,
} from "../../../redux/slicers/room.slicer";
import { billHotelRequest } from "../../../redux/slicers/bill.slicer";

dayjs.extend(customParseFormat);

function Checkout() {
  const [billForm] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { roomDetail } = useSelector((state) => state.room);

  const { id } = useParams();

  const { data } = roomDetail;
  const location = useLocation();

  useEffect(() => {
    dispatch(getRoomDetailRequest({ id: id }));
    sessionStorage.setItem("preLoginPath", location.pathname);
    window.scrollTo({
      top: 0,
    });
    document.title = "Hóa Đơn";
  }, [id]);

  const handleSubmitBillForm = (values) => {
    const billId = v4();
    const updatedListOfBookedRooms = [...data.ListOfBookedRooms];
    const index = updatedListOfBookedRooms.findIndex(
      (item) =>
        (dayjs(values.checkInDate).isAfter(
          dayjs(item.checkInDate).subtract(1, "day")
        ) &&
          dayjs(values.checkInDate).isBefore(
            dayjs(item.checkOutDate).add(1, "day")
          )) ||
        (dayjs(values.checkOutDate).isAfter(
          dayjs(item.checkInDate).subtract(1, "day")
        ) &&
          dayjs(values.checkOutDate).isBefore(
            dayjs(item.checkOutDate).add(1, "day")
          ))
    );
    if (index !== -1) {
      notification.error({
        message:
          "Trong số ngày này phòng đã được đặt, Vui lòng chọn phòng khác!",
      });
    } else {
      updatedListOfBookedRooms.unshift({
        userId: userInfo?.data?.id,
        checkInDate: values.checkInDate,
        checkOutDate: values.checkOutDate,
      });
      const { hotel, ...rest } = data;
      dispatch(
        updateRoomRequest({
          data: {
            ...rest,
            ListOfBookedRooms: updatedListOfBookedRooms,
          },
        })
      );
      dispatch(
        billHotelRequest({
          billHotelData: {
            note: values.note,
            userId: userInfo.data.id || GUEST_ID,
            pay: "no",
            billId: billId,
            roomId: id,
            hotelId: data?.hotel?.id,
            name: data?.name,
            price: data?.price,
            ...values,
          },
          callback: () =>
            navigate(generatePath(ROUTES.USER.BILL, { id: billId })),
        })
      );
    }
  };

  return (
    <S.CheckoutWrapper>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROUTES.USER.HOME}>
                <Space>
                  <FaHome />
                  <span>Trang chủ</span>
                </Space>
              </Link>
            ),
          },
          {
            title: (
              <Link to={ROUTES.USER.CART}>
                <Space>
                  <FaShoppingCart />
                  <span>Phòng</span>
                </Space>
              </Link>
            ),
          },

          {
            title: "Hóa Đơn",
          },
        ]}
      />
      <S.Heading>THÔNG TIN HÓA ĐƠN</S.Heading>
      <Row gutter={[16, 16]}>
        <Col md={24} xl={24} xs={24}>
          <S.SubHeading>I.CHI TIẾT PHÒNG</S.SubHeading>
          <S.InfoRoomWrapper gutter={[16, 16]}>
            <S.Title span={5}>TÊN KHÁCH SẠN</S.Title>
            <S.Title span={5}>PHÒNG</S.Title>
            <S.Title span={9}>ĐỊA CHỈ</S.Title>
            <S.Title span={5}>NGÀY ĐẶT PHÒNG</S.Title>
            <Col span={5}>
              <S.InfoRoom>{data?.hotel?.name}</S.InfoRoom>
            </Col>
            <Col span={5}>
              <S.InfoRoom>
                {data?.name}(Tầng {data?.floor})
              </S.InfoRoom>
            </Col>
            <Col span={9}>
              <S.InfoRoom>{data?.hotel?.addressDetail}</S.InfoRoom>
            </Col>
            <Col span={5}>
              <S.InfoRoom>{dayjs().format("DD/MM/YYYY")}</S.InfoRoom>
            </Col>
          </S.InfoRoomWrapper>
        </Col>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form
            name="billForm"
            form={billForm}
            layout="vertical"
            action="/pay"
            onFinish={(values) => handleSubmitBillForm(values)}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={14} xl={14}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <S.SubHeading>II.THÔNG TIN KHÁCH HÀNG</S.SubHeading>

                    <Form.Item
                      label="Họ và tên"
                      name="fullName"
                      rules={[{ required: true, message: "Bắt buộc!" }]}
                    >
                      <Input placeholder="Nhập họ và tên" />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      label="Hộ chiếu/CMND/CCCD"
                      name="CCCD"
                      rules={[
                        { required: true, message: "Bắt buộc!" },
                        {
                          pattern: /^\d{12}$/,
                          message: "Căn cước công dân phải 12 số!",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập căn cước công dân của bạn" />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      label="Số điện thoại"
                      name="phoneNumber"
                      rules={[
                        { required: true, message: "Bắt buộc!" },
                        {
                          pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                          message: "Vui lòng nhập đúng định dạng",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      label="Ngày nhận phòng"
                      name="checkInDate"
                      rules={[
                        { required: true, message: "Bắt buộc!" },
                        {
                          validator: (_, value) =>
                            value && dayjs(value).isBefore(dayjs(), "day")
                              ? Promise.reject(
                                  "Ngày đặt phòng phải lớn hơn ngày hiện tại!"
                                )
                              : Promise.resolve(),
                        },
                      ]}
                    >
                      <Input type="date" />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      label="Ngày trả phòng"
                      name="checkOutDate"
                      rules={[
                        { required: true, message: "Bắt buộc!" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            return value &&
                              dayjs(value).isBefore(
                                getFieldValue("checkInDate"),
                                "day"
                              )
                              ? Promise.reject(
                                  "Ngày trả phòng phải lớn hơn hoặc bằng ngày đặt phòng!"
                                )
                              : Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input type="date" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={24} md={10} xl={10}>
                <Row>
                  <Row gutter={[16, 16]} style={{ width: "100%" }}>
                    <Col lg={24} md={24} sm={24} xs={24}>
                      <S.SubHeading>III.GHI CHÚ</S.SubHeading>
                      <Form.Item name="note">
                        <Input.TextArea
                          rows={5}
                          placeholder="Nhập yêu cầu của bạn khi nhận phòng(Nếu có)"
                        />
                      </Form.Item>
                      <Card
                        size="small"
                        style={{ marginTop: "2em" }}
                        title="Giá phòng/ngày"
                      >
                        <S.TotalPrice>
                          {data?.price?.toLocaleString()}
                          <S.Unit>₫</S.Unit>
                        </S.TotalPrice>
                      </Card>
                    </Col>
                  </Row>
                </Row>
              </Col>
            </Row>
            <Row
              gutter={[16, 16]}
              justify="space-between"
              style={{ marginTop: "15px" }}
            >
              <Button onClick={() => navigate(ROUTES.USER.CART)}>
                Trở lại
              </Button>
              <S.ChooseRoom type="primary" htmlType="submit">
                Đặt Phòng
              </S.ChooseRoom>
            </Row>
          </Form>
        </Col>
      </Row>
    </S.CheckoutWrapper>
  );
}

export default Checkout;
