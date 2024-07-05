import { useEffect } from "react";
import { Button, Col, Input, Pagination, Popconfirm, Row, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import * as S from "./style";

import {} from "../../../redux/slicers/room.slicer";
import { color } from "themes/color";
import { BILL_LIMIT } from "constants/paging";
import {
  cancelBillRequest,
  getBillListRequest,
  updateBillRequest,
} from "../../../redux/slicers/bill.slicer";
import { useLocation } from "react-router-dom";

function ManageHotelReversions() {
  const { billList } = useSelector((state) => state.bill);

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    document.title = "Quản lý đặt phòng";
    sessionStorage.setItem("preLoginPath", location.pathname);
    dispatch(getBillListRequest({ page: 1, limit: BILL_LIMIT }));
  }, []);

  const tableColumns = [
    {
      title: "Hóa đơn",
      dataIndex: "billId",
      key: "billId",
      render: (_, item) => `${item.billId.toUpperCase()}`,
    },
    {
      title: "Tên KH",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, item) => `${item.fullName}`,
    },
    {
      title: "SDT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, item) => `${item.phoneNumber}`,
    },
    {
      title: "CCCD/CMND",
      dataIndex: "CCCD",
      key: "CCCD",
      render: (_, item) => `${item.CCCD}`,
    },
    {
      title: "Tên KS",
      dataIndex: "nameHotel",
      key: "nameHotel",
      render: (_, item) => `${item?.hotel?.name}`,
    },
    {
      title: "Phòng",
      dataIndex: "nameRoom",
      key: "nameRoom",
      render: (_, item) => `${item?.name}`,
    },
    {
      title: "Ngày nhận phòng",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (checkInDate, item) =>
        `${dayjs(checkInDate).format("DD/MM/YYYY")}`,
    },
    {
      title: "Ngày trả phòng",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (checkOutDate, item) =>
        `${dayjs(checkOutDate).format("DD/MM/YYYY")}`,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (_, item) => `${item.price}`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (_, item) => (
        <S.Price>
          {dayjs(item?.checkOutDate).diff(
            dayjs(item.checkInDate),
            "day",
            true
          ) > 0
            ? (
                Math.ceil(
                  dayjs(item?.checkOutDate).diff(
                    dayjs(item.checkInDate),
                    "day",
                    true
                  )
                ) * item?.price
              ).toLocaleString()
            : item?.price.toLocaleString()}
          <S.Unit>₫</S.Unit>
        </S.Price>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "pay",
      key: "pay",
      render: (_, item) => (
        <Space size={16}>
          {item.pay === "no" ? (
            <S.Price>Chưa thanh toán</S.Price>
          ) : (
            <S.Price>Đã Thanh toán</S.Price>
          )}
        </Space>
      ),
    },
    {
      title: "Chỉnh sửa",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Space size={16}>
          {item.pay === "no" ? (
            <Space>
              <Popconfirm
                description="Bạn muốn Xác nhận thanh toán?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => dispatch(updateBillRequest({ id: item.id }))}
              >
                <Button type="primary">Xác nhận TT</Button>
              </Popconfirm>
              <Popconfirm
                description="Bạn chắc chắn muốn hủy?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => dispatch(cancelBillRequest({ id: item.id }))}
              >
                <Button
                  style={{
                    backgroundColor: `${color.outstanding}`,
                    color: `${color.primaryText}`,
                  }}
                >
                  Hủy
                </Button>
              </Popconfirm>
            </Space>
          ) : (
            <Button
            // onClick={() => dispatch(completeOrderRequest({ id: item.id }))}
            >
              Xác nhận trả phòng
            </Button>
          )}
        </Space>
      ),
    },
  ];
  const handleChangePage = (page) => {
    dispatch(getBillListRequest({ page: page, limit: BILL_LIMIT }));
  };
  return (
    <S.HotelManager>
      <Col md={24}>
        <S.Heading>QUẢN LÝ ĐẶT PHÒNG</S.Heading>
      </Col>
      <S.FilterWrapper>
        <Row gutter={[16, 16]} style={{ marginTop: 4 }}>
          <Col span={24}>
            <Input
              onChange={(e) =>
                dispatch(
                  getBillListRequest({
                    searchKey: e.target.value,
                    limit: BILL_LIMIT,
                    page: 1,
                  })
                )
              }
              placeholder="Tìm kiếm hóa đơn"
            />
          </Col>
        </Row>
      </S.FilterWrapper>
      <S.TableManage
        scroll={{ x: 1000 }}
        columns={tableColumns}
        dataSource={billList?.data}
        rowKey="id"
        pagination={false}
        style={{ width: "100%" }}
      />
      <Pagination
        current={billList?.meta?.page}
        pageSize={BILL_LIMIT}
        total={billList?.meta?.total}
        onChange={(page) => handleChangePage(page)}
        style={{ margin: "16px auto 0" }}
      />
    </S.HotelManager>
  );
}
export default ManageHotelReversions;
