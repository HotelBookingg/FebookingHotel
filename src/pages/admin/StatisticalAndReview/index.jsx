import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Table,
  Row,
  Col,
  Space,
  Tooltip,
  Input,
  Select,
  Pagination,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath, useLocation, useNavigate } from "react-router-dom";

import * as S from "./style";
import {
  getHotelListRequest,
  deleteHotelRequest,
} from "../../../redux/slicers/hotel.slicer";
import { getCityListRequest } from "../../../redux/slicers/location.slicer";
import { HOTEL_LIMIT } from "constants/paging";
import { ROUTES } from "constants/routes";
import { useMemo } from "react";
import { color } from "themes/color";
import { FaChartBar, FaRegStar } from "react-icons/fa";
function StatistiCalAndReview() {
  const [filterParams, setFilterParams] = useState({
    addressId: undefined,
    sortOrder: undefined,
    discountOrder: undefined,
    gender: undefined,
  });

  const { cityList } = useSelector((state) => state.location);
  const navigate = useNavigate();
  const location = useLocation();

  const { hotelList } = useSelector((state) => state.hotel);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Hotel Manager";
    sessionStorage.setItem("preLoginPath", location.pathname);
    dispatch(
      getHotelListRequest({
        page: 1,
        limit: HOTEL_LIMIT,
        rooms: true,
      })
    );
    dispatch(getCityListRequest({}));
  }, []);
  const handleFilter = (key, values) => {
    const newFilterParams = {
      ...filterParams,
      [key]: values,
    };
    setFilterParams(newFilterParams);
    navigate({
      pathname: ROUTES.ADMIN.MANAGE_HOTEL,
    });
    dispatch(
      getHotelListRequest({
        page: 1,
        limit: HOTEL_LIMIT,
        ...newFilterParams,
        rooms: true,
      })
    );
  };
  const handleChangePage = (page) => {
    dispatch(
      getHotelListRequest({
        ...filterParams,
        rooms: true,
        page: page,
        limit: HOTEL_LIMIT,
      })
    );
  };
  const columns = [
    {
      title: "Tên Khách Sạn ",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Tooltip title={text}>
          <div
            style={{
              width: "100px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "addressDetail",
      key: "addressDetail",
      render: (addressDetail) => addressDetail,
    },
    {
      title: "Chỉnh sửa",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Space size={16}>
          <Button
            type="primary"
            onClick={() =>
              navigate(
                generatePath(ROUTES.ADMIN.MANAGE_REVIEW, { id: item.id })
              )
            }
          >
            <S.Update>
              Xem Đánh Giá <FaRegStar />
            </S.Update>
          </Button>
          <Button
            onClick={() =>
              navigate(
                generatePath(ROUTES.ADMIN.STATISTICAL, {
                  id: item.id,
                })
              )
            }
          >
            <S.Update>
              Thống Kê <FaChartBar />
            </S.Update>
          </Button>
        </Space>
      ),
    },
  ];
  const renderAddressOptions = useMemo(() => {
    return cityList?.data?.map((item) => {
      return (
        <Select.Option key={item.id} value={item.name}>
          {item?.name}
        </Select.Option>
      );
    });
  }, [cityList?.data]);
  return (
    <S.StatisticalAndReviewWrapper>
      <S.StatisticalAndReview
        gutter={[16, 16]}
        justify="space-between"
        align="middle"
      >
        <Col md={20}>
          <Row gutter={[16, 16]}>
            <Col md={24}>
              <S.Heading>QUẢN LÝ ĐÁNH GIÁ VÀ THỐNG KÊ</S.Heading>
            </Col>
          </Row>
        </Col>
        <Col md={24}>
          <S.FilterWrapper>
            <h2>Bộ lọc</h2>
            <Row gutter={[16, 16]} style={{ marginTop: 4 }}>
              <Col span={17}>
                <Input
                  onChange={(e) => handleFilter("searchKey", e.target.value)}
                  placeholder="Tên khách sạn"
                />
              </Col>
              <Col span={7}>
                <Select
                  mode="undefined"
                  allowClear
                  onChange={(values) => handleFilter("addressId", values)}
                  placeholder="Địa chỉ"
                  style={{ width: "100%" }}
                >
                  {renderAddressOptions}
                </Select>
              </Col>
            </Row>
          </S.FilterWrapper>
          <Table
            scroll={{ x: 500 }}
            dataSource={hotelList?.data}
            columns={columns}
            pagination={false}
            rowKey="name"
          />
          <Row>
            <Pagination
              current={hotelList.meta.page}
              pageSize={HOTEL_LIMIT}
              total={hotelList.meta.total}
              onChange={(page) => handleChangePage(page)}
              style={{ margin: "16px auto 0" }}
            />
          </Row>
        </Col>
      </S.StatisticalAndReview>
    </S.StatisticalAndReviewWrapper>
  );
}
export default StatistiCalAndReview;
