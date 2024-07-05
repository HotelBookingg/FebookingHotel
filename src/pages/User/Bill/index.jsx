import * as S from "./style";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, notification } from "antd";
import dayjs from "dayjs";
import { ROUTES } from "constants/routes";

import { getBillRequest } from "../../../redux/slicers/bill.slicer";

function Bill() {
  const location = useLocation();
  useEffect(() => {
    notification.success({
      message: "Đặt phòng thành công!",
    });
    window.scrollTo({
      top: 0,
    });
    document.title = "Hóa đơn chi tiết";
    sessionStorage.setItem("preLoginPath", location.pathname);
  }, []);

  const { bill } = useSelector((state) => state.bill);

  const { data } = bill;
  const dateCurrent = dayjs();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id } = params;
  useEffect(() => {
    dispatch(getBillRequest({ billId: id }));
  }, []);
  return (
    <S.BillWrapper>
      <S.BillPay>
        <Col span={18}>
          <S.Title>HÓA ĐƠN</S.Title>
        </Col>
        <Col span={6}>
          <S.ImageLogo src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"></S.ImageLogo>
        </Col>
        <Col span={24}>
          <S.NameHotel>KHÁCH SẠN {data?.hotel?.name}</S.NameHotel>
        </Col>
        <S.InfoWrapper>
          <Col span={16}>
            <S.Info>Tên KH: {data?.fullName}</S.Info>
            <S.Info>Hộ chiếu/CMND/CCCD: {data?.CCCD}</S.Info>
            <S.Info>Địa chỉ: {data?.hotel?.addressDetail}</S.Info>
          </Col>
          <Col span={8}>
            <S.CodeBill>
              <S.BookingInfo>
                <p>Hóa đơn </p>
                <span>{id.toUpperCase()}</span>
              </S.BookingInfo>
              <S.BookingInfo>
                <p> Ngày đặt phòng</p>
                <span>{dateCurrent.format("DD/MM/YYYY")}</span>
              </S.BookingInfo>
              <S.BookingInfo>
                <p> Ngày nhận phòng</p>
                <span>{dayjs(data?.checkInDate).format("DD/MM/YYYY")}</span>
              </S.BookingInfo>
              <S.BookingInfo>
                <p>Ngày trả phòng</p>
                <span>{dayjs(data?.checkOutDate).format("DD/MM/YYYY")}</span>
              </S.BookingInfo>
            </S.CodeBill>
          </Col>
        </S.InfoWrapper>
        <S.Dot>
          ....................................................................................................................................................
        </S.Dot>
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col span={18}>
            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              <S.TitleInfo span={8}>Phòng</S.TitleInfo>
              <S.TitleInfo span={8}>Số ngày</S.TitleInfo>
              <S.TitleInfo span={8}>Đơn giá</S.TitleInfo>
              <S.HotelInfo span={8}>{data?.name}</S.HotelInfo>
              <S.HotelInfo span={8}>
                {dayjs(data?.checkOutDate).diff(
                  dayjs(data.checkInDate),
                  "day",
                  true
                )}
              </S.HotelInfo>
              <S.HotelInfo span={8}>
                {data?.price?.toLocaleString()}
              </S.HotelInfo>
            </Row>
          </Col>
          <Col span={6}>
            <Card size="small" title="Tổng tiền">
              <S.TotalPrice>
                {dayjs(data?.checkOutDate).diff(
                  dayjs(data.checkInDate),
                  "day",
                  true
                ) > 0
                  ? (
                      Math.ceil(
                        dayjs(data?.checkOutDate).diff(
                          dayjs(data.checkInDate),
                          "day",
                          true
                        )
                      ) * data?.price
                    )?.toLocaleString()
                  : data?.price?.toLocaleString()}
                <S.Unit>₫</S.Unit>
              </S.TotalPrice>
            </Card>
          </Col>
        </Row>
        <S.Dot>
          ....................................................................................................................................................
        </S.Dot>
        <Col span={18}>
          <div>
            <S.Heading>Thông tin thanh toán</S.Heading>
            <div>Ngân hàng:VietComBank</div>
            <div>Tên TK:NGO VAN TRI</div>
            <div>Stk:9377460815</div>
            <div>
              Hạn thanh toán:
              {Math.ceil(
                dayjs(data?.checkInDate).diff(dayjs(dateCurrent), "day", true)
              ) > 2
                ? dayjs(data?.checkInDate)
                    .subtract(2, "day")
                    .format("DD/MM/YYYY")
                : "Vui lòng thanh toán ngay"}
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div>
            <S.Heading>Thông tin liên hệ</S.Heading>
            <div>ngovantri2912@gmail.com</div>
            <div>SDT:0377460815</div>
          </div>
        </Col>
        <Col span={24}>
          <Row justify={"center"}>
            <S.Revert onClick={() => navigate(ROUTES.USER.HOME)}>
              QUAY LẠI TRANG CHỦ
            </S.Revert>
          </Row>
        </Col>
      </S.BillPay>
    </S.BillWrapper>
  );
}

export default Bill;
