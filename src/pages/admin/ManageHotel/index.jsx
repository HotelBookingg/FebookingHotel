import React, { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Table,
  Row,
  Col,
  Space,
  Popconfirm,
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
import { FaEdit } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
function HotelManager() {
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
      title: "Tên KS",
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
      title: "Tiện ích",
      dataIndex: "utilities",
      key: "utilities",
      render: (utilities) => (
        <div>
          {utilities.wifi && "Wifi"},
          {utilities.airConditioner && "Máy điều hòa"},
          {utilities.restaurant && "Nhà hàng"},
          {utilities.receptionist && "Nhân viên 24/7"},
          {utilities.parkingLot && "Chỗ đậu xe"}
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "addressDetail",
      key: "addressDetail",
      render: (addressDetail) => addressDetail,
    },
    {
      title: "Gần khu vực",
      dataIndex: "nearTheArea",
      key: "nearTheArea",
      render: (_, items) =>
        items?.nearTheArea?.map((item) => <div>{item?.name}</div>),
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
              navigate(generatePath(ROUTES.ADMIN.UPDATE_HOTEL, { id: item.id }))
            }
          >
            <S.Update>
              Cập nhật <FaEdit />
            </S.Update>
          </Button>
          <Popconfirm
            description="Bạn có chắn chắn muốn xóa khách sạn?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => dispatch(deleteHotelRequest({ id: item.id }))}
          >
            <Button
              style={{
                backgroundColor: `${color.outstanding}`,
                color: `${color.primaryText}`,
              }}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Thêm phòng",
      dataIndex: "create",
      key: "create",
      render: (_, item) => (
        <Space size={16}>
          <Button
            type="primary"
            onClick={() =>
              navigate(generatePath(ROUTES.ADMIN.CREATE_ROOM, { id: item.id }))
            }
          >
            <S.Update>
              Thêm phòng <FaCirclePlus />
            </S.Update>
          </Button>
        </Space>
      ),
    },
  ];
  const columnsRoom = [
    {
      title: "Phòng",
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
      title: "Tiện ích riêng",
      dataIndex: "utilities",
      key: "utilities",
      render: (utilities) => (
        <div>
          {utilities.shower && "shower"},{utilities.TV && "TV"},
          {utilities.phone && "Điện thoại"},{utilities.water && "Nước miễn phí"}
        </div>
      ),
    },
    {
      title: "Kích thước",
      dataIndex: "sizeRoom",
      key: "sizeRoom",
      render: (sizeRoom) => sizeRoom,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => price.toLocaleString(),
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
              navigate(generatePath(ROUTES.ADMIN.UPDATE_ROOM, { id: item.id }))
            }
          >
            <S.Update>
              Cập nhật <FaEdit />
            </S.Update>
          </Button>
          <Popconfirm
            description="Bạn có chắn chắn muốn xóa sản phẩm?"
            okText="Yes"
            cancelText="No"
            // onConfirm={() => handleDeleteProduct(item.id)}
          >
            <Button
              style={{
                backgroundColor: `${color.outstanding}`,
                color: `${color.primaryText}`,
              }}
            >
              Xóa
            </Button>
          </Popconfirm>
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
    <S.HotelManagerWrapper>
      <S.HotelManager gutter={[16, 16]} justify="space-between" align="middle">
        <Col md={20}>
          <Row gutter={[16, 16]}>
            <Col md={24}>
              <S.Heading>QUẢN LÝ KHÁCH SẠN</S.Heading>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Link to={ROUTES.ADMIN.CREATE_HOTEL}>
            <S.BTSubmit type="primary">Thêm khách sạn</S.BTSubmit>
          </Link>
        </Col>
        <Col md={24}>
          <S.FilterWrapper>
            <h2>Bộ lọc</h2>
            <Row gutter={[16, 16]} style={{ marginTop: 4 }}>
              <Col span={12}>
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
              <Col span={5}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Sắp xếp theo"
                  onChange={(value) => handleFilter("sortOrder", value)}
                  allowClear
                >
                  <Select.Option value="createdAt.desc">Mới nhất</Select.Option>
                  <Select.Option value="createdAt.asc">Cũ nhất</Select.Option>
                  <Select.Option value="updatedAt.desc">
                    Cập nhật mới nhất
                  </Select.Option>
                  <Select.Option value="updatedAt.asc">
                    Cập nhật cũ nhất
                  </Select.Option>
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
            expandable={{
              expandedRowRender: (record) => (
                <Table
                  dataSource={record?.rooms}
                  rowKey="id"
                  columns={columnsRoom}
                  pagination={false}
                ></Table>
              ),
            }}
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
      </S.HotelManager>
    </S.HotelManagerWrapper>
  );
}
export default HotelManager;
