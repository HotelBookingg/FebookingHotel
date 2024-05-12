import { useParams } from "react-router-dom";
import { getHotelDetailRequest } from "../../../redux/slicers/hotel.slicer";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col } from "antd";
import {
  FaClockRotateLeft,
  FaLocationDot,
  FaRegSnowflake,
  FaSquareParking,
  FaUtensils,
  FaWifi,
} from "react-icons/fa6";
import * as S from "./style";
import { color } from "themes/color";

function HotelDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { hotelDetail } = useSelector((state) => state.hotel);
  let imageHotelList, data;
  if (hotelDetail?.data.image) {
    imageHotelList = hotelDetail?.data?.images[0].imageList;
    data = hotelDetail?.data;
  }
  //   const imageHotelList = hotelDetail?.data?.images.imageList;
  useEffect(() => {
    dispatch(getHotelDetailRequest({ id }));
  }, [id]);

  const renderImageHotelList = useMemo(() => {
    return imageHotelList?.slice(1, 7)?.map((item, index) => {
      return (
        <Col span={12} key={index}>
          {index == 5 ? (
            <S.AllImage>
              <S.ImageShowMore
                src={item}
                style={{ height: "158px" }}
              ></S.ImageShowMore>
              <S.AllImageWrapper>
                <S.DESCAllImage>Xem tất cả hình ảnh</S.DESCAllImage>
              </S.AllImageWrapper>
            </S.AllImage>
          ) : (
            <S.ImageHotel src={item} style={{ height: "158px" }}></S.ImageHotel>
          )}
        </Col>
      );
    });
  }, [imageHotelList]);
  const renderNearTheArea = useMemo(() => {
    return data?.nearTheArea?.map((item, index) => {
      return (
        <S.AreaWrapper key={index}>
          <S.Area>
            <span>
              <FaLocationDot size={16} color={color.primary} />
            </span>
            <div>{item?.name}</div>
          </S.Area>
          <S.Mileage>{item?.mileage}m</S.Mileage>
        </S.AreaWrapper>
      );
    });
  }, [data?.nearTheArea]);
  return (
    <S.HotelDetailWrapper>
      <Row gutter={[16, 16]} justify={"space-between"}>
        <Col span={15}>
          <S.ImageHotel src="https://cdn3.ivivu.com/2014/01/SUPER-DELUXE2.jpg"></S.ImageHotel>
        </Col>
        <Col span={9}>
          <Row gutter={[4, 4]}>{renderImageHotelList}</Row>
        </Col>
        <Col span={12}>
          <S.Name>{data?.name.toUpperCase()}</S.Name>
          <S.RateWrapper>
            <p>Khách sạn:</p>
            <S.RateHotel
              value={parseFloat(data?.rate)}
              disabled
              allowHalf
            ></S.RateHotel>
          </S.RateWrapper>
          <S.AddressWrapper>
            <FaLocationDot size={25} color={color.primary} />
            <S.Address>{data?.addressDetail}</S.Address>
          </S.AddressWrapper>
        </Col>
        <Col span={12}>
          <S.PriceAndChoose>
            <p style={{ fontWeight: "650" }}>Giá/Phòng/Đêm từ</p>
            <S.Price>{data?.priceCurrent}.000 VNĐ</S.Price>
            <S.ChooseHotel>Chọn Phòng</S.ChooseHotel>
          </S.PriceAndChoose>
        </Col>
        <Col span={10}>
          <S.Heading>Giới thiệu cơ sở cư trú</S.Heading>
        </Col>
        <Col span={8}>
          <S.Heading>Trong khu vực</S.Heading>
        </Col>
        <Col span={6}>
          <S.Heading>Tiện ích chính</S.Heading>
        </Col>
        <Col span={10}>
          <S.Introduce>{data?.introduce}</S.Introduce>
        </Col>
        <Col span={8}>{renderNearTheArea}</Col>
        <Col span={6}>
          {data?.utilities?.wifi && (
            <S.Utilities>
              <span>
                <FaWifi size={16} color={color.primary} />
              </span>
              <div>WiFi</div>
            </S.Utilities>
          )}
          {data?.utilities?.airConditioner && (
            <S.Utilities>
              <span>
                <FaRegSnowflake size={16} color={color.primary} />
              </span>
              <div>Máy Lạnh</div>
            </S.Utilities>
          )}
          {data?.utilities?.restaurant && (
            <S.Utilities>
              <span>
                <FaUtensils size={16} color={color.primary} />
              </span>
              <div>Nhà Hàng</div>
            </S.Utilities>
          )}
          {data?.utilities?.restaurant && (
            <S.Utilities>
              <span>
                <FaClockRotateLeft size={16} color={color.primary} />
              </span>
              <div>Lễ tân 24h</div>
            </S.Utilities>
          )}
          {data?.utilities?.restaurant && (
            <S.Utilities>
              <span>
                <FaSquareParking size={16} color={color.primary} />
              </span>
              <div>Chỗ đậu xe</div>
            </S.Utilities>
          )}
        </Col>
        <Col span={24}>
          <S.RateCustomer>Khách nói gì về kỳ nghỉ của họ</S.RateCustomer>
        </Col>
      </Row>
    </S.HotelDetailWrapper>
  );
}

export default HotelDetail;
