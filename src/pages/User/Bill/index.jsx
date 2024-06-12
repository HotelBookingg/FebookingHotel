import * as S from "./style";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "antd";
import dayjs from "dayjs";
import { ROUTES } from "constants/routes";

import { getBillRequest } from "../../../redux/slicers/bill.slicer";

function Bill() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    document.title = "Hóa đơn chi tiết";
  }, []);

  const { userInfo } = useSelector((state) => state.auth);
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
          <S.NameHotel>KHÁCH SẠN TRE XANH</S.NameHotel>
        </Col>
        <S.InfoWrapper>
          <Col span={16}>
            <S.Info>Tên KH:Ngô Văn Trị</S.Info>
            <S.Info>SDT:0377460815</S.Info>
            <S.Info>Địa chỉ khách sạn</S.Info>
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
                <span>{dayjs(data?.checkoutDate).format("DD/MM/YYYY")}</span>
              </S.BookingInfo>
            </S.CodeBill>
          </Col>
        </S.InfoWrapper>
        <S.Dot>
          ....................................................................................................................................................
        </S.Dot>
        <S.TitleInfo span={4}>Tên khách sạn</S.TitleInfo>
        <S.TitleInfo span={8}>Số ngày</S.TitleInfo>
        <S.TitleInfo span={12}>Đơn giá</S.TitleInfo>
        <S.HotelInfo span={4}>{data?.hotel?.name}</S.HotelInfo>
        <S.HotelInfo span={8}>
          {dayjs(data?.checkoutDate).diff(dayjs(data.checkInDate), "day", true)}
        </S.HotelInfo>
        <S.HotelInfo span={12}>{data?.hotel?.priceCurrent}.000VND</S.HotelInfo>
        <S.HotelInfo span={8}></S.HotelInfo>
        <S.HotelInfo span={8}></S.HotelInfo>
        <Col span={8}>
          <Card size="small" style={{ marginTop: "2em" }} title="Tổng tiền">
            <S.TotalPrice>
              {dayjs(data?.checkoutDate).diff(
                dayjs(data.checkInDate),
                "day",
                true
              ) > 0
                ? Math.ceil(
                    dayjs(data?.checkoutDate).diff(
                      dayjs(data.checkInDate),
                      "day",
                      true
                    )
                  ) * data?.hotel?.priceCurrent
                : data?.hotel?.priceCurrent}
              .000
              <S.Unit>₫</S.Unit>
            </S.TotalPrice>
          </Card>
        </Col>
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
