import { useEffect, useMemo, useState } from "react";
import { getHotelListRequest } from "../../../redux/slicers/hotel.slicer";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import * as S from "./style";
import { Button, Col, Row, Skeleton, Space } from "antd";
import { Link, generatePath, useLocation } from "react-router-dom";
import { ROUTES } from "constants/routes";
function Home() {
  const [filterParams, setFilterParams] = useState({});

  const { hotelList } = useSelector((state) => state.hotel);
  const dispatch = useDispatch();

  const { data, loading } = hotelList;

  const { search } = useLocation();

  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("preLoginPath", location.pathname);
  }, []);
  useEffect(() => {
    const searchParams = qs.parse(search, {
      ignoreQueryPrefix: true,
    });
    const newFilterParams = {
      searchKey: searchParams.searchKey || "",
    };
    setFilterParams(newFilterParams);
    dispatch(
      getHotelListRequest({
        page: 1,
        limit: 8,
        ...newFilterParams,
      })
    );
  }, [search]);

  const handleShowMore = () => {
    dispatch(
      getHotelListRequest({
        page: hotelList.meta.page + 1,
        limit: 8,
        more: true,
      })
    );
  };

  const renderHotelList = useMemo(() => {
    if (loading) {
      return [...Array(8)].map((_, index) => {
        return (
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            <S.HotelItem style={{ padding: 8 }}>
              <Skeleton.Image style={{ width: "120px" }} active />
              <br />
              <br />
              <Skeleton.Button active />
              <br />
              <br />
              <Skeleton.Input block active />
              <br />
              <Skeleton.Input block active />
              <br />
              <Space>
                <Skeleton.Button active />
                <Skeleton.Button active />
              </Space>
            </S.HotelItem>
          </Col>
        );
      });
    } else {
      return data.map((item, index) => {
        return (
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            <Link to={generatePath(ROUTES.USER.HOTEL_DETAIL, { id: item?.id })}>
              <S.HotelItem>
                <S.FullBox>
                  <p>{item.city}</p>
                </S.FullBox>
                <S.ImageWrapper>
                  <S.Image src={item?.image} alt={item?.name}></S.Image>
                </S.ImageWrapper>
                <S.Information>
                  <S.Name>{item?.name}</S.Name>
                  <S.AddressAndRate gutter={(10, 10)}>
                    <Col span={14}>{item.address}</Col>
                    <Col span={10}>
                      <S.PriceRate disabled value={item.rate}></S.PriceRate>
                    </Col>
                  </S.AddressAndRate>
                  <Row gutter={[16, 16]} align="middle">
                    <Col span={12}>
                      <S.Price>
                        <S.OldPrice discount={item?.discount}>
                          {item?.priceOld.toLocaleString()}
                          <S.Unit>₫</S.Unit>
                        </S.OldPrice>
                        <S.CurrentPrice discount={item?.discount}>
                          {item?.priceCurrent.toLocaleString()}
                          <S.Unit>₫</S.Unit>
                        </S.CurrentPrice>
                      </S.Price>
                    </Col>
                    <Col span={12}>
                      <S.ChooseHotel>Chọn Phòng</S.ChooseHotel>
                    </Col>
                  </Row>
                </S.Information>
              </S.HotelItem>
            </Link>
          </Col>
        );
      });
    }
  }, [data, loading]);
  return (
    <S.HotelListWrapper>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Row gutter={[16, 16]} style={{ marginTop: 16, width: "100%" }}>
          {renderHotelList}
        </Row>
        {data.length !== hotelList.meta.total && (
          <S.ShowMore>
            <Button type="primary" onClick={() => handleShowMore()}>
              Show More
            </Button>
          </S.ShowMore>
        )}
      </Row>
    </S.HotelListWrapper>
  );
}
export default Home;
