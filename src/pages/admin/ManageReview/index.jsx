import { useEffect } from "react";
import { Button, Col, Input, Pagination, Popconfirm, Row, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import * as S from "./style";

import {} from "../../../redux/slicers/room.slicer";
import { REVIEW_LIMIT } from "constants/paging";
import {
  deleteReviewRequest,
  getReviewListRequest,
} from "../../../redux/slicers/review.slicer";
import { useLocation, useParams } from "react-router-dom";
import { getHotelDetailRequest } from "../../../redux/slicers/hotel.slicer";
import { color } from "themes/color";

function ManageReview() {
  const { reviewList } = useSelector((state) => state.review);
  const { hotelDetail } = useSelector((state) => state.hotel);

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    document.title = "Quản lý đặt phòng";
    sessionStorage.setItem("preLoginPath", location.pathname);
    dispatch(
      getReviewListRequest({
        page: 1,
        limit: REVIEW_LIMIT,
        hotelId: params.id,
      })
    );
    dispatch(getHotelDetailRequest({ id: params.id }));
  }, []);

  const tableColumns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      render: (_, item) => `${item.userId}`,
    },
    {
      title: "Tên KH",
      dataIndex: "userName",
      key: "userName",
      render: (_, item) => `${item.user.fullName}`,
    },
    {
      title: "Bình Luận",
      dataIndex: "comment",
      key: "comment",
      render: (_, item) => `${item.comment}`,
    },
    {
      title: "Đánh Giá",
      dataIndex: "rate",
      key: "rate",
      render: (_, item) => `${item.rate}`,
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageReviewList",
      key: "imageReviewList",
      render: (_, item) => {
        return (
          <Row style={{ width: "100%" }} justify={"center"} gutter={[8, 8]}>
            {item?.imageReview?.map((image, index) => (
              <S.ImageItem span={8} key={index}>
                <S.ImageHotel src={image} style={{ height: "120px" }} />
              </S.ImageItem>
            ))}
          </Row>
        );
      },
    },
    {
      title: "Chỉnh sửa",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Popconfirm
          description="Bạn chắc chắn muốn xóa?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => dispatch(deleteReviewRequest({ id: item.id }))}
        >
          <Button style={{ backgroundColor: color.outstanding, color: "#fff" }}>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const handleChangePage = (page) => {
    dispatch(getReviewListRequest({ page: page, limit: REVIEW_LIMIT }));
  };
  return (
    <S.HotelManager>
      <Col md={24}>
        <S.Heading>
          QUẢN LÝ ĐÁNH GIÁ KHÁCH SẠN {hotelDetail?.data?.name}
        </S.Heading>
      </Col>
      <S.FilterWrapper>
        <Row gutter={[16, 16]} style={{ marginTop: 4 }}>
          <Col span={24}>
            <Input
              onChange={(e) =>
                dispatch(
                  getReviewListRequest({
                    searchKey: e.target.value,
                    limit: REVIEW_LIMIT,
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
        dataSource={reviewList?.data}
        rowKey="id"
        pagination={false}
        style={{ width: "100%" }}
      />
      <Pagination
        current={reviewList?.meta?.page}
        pageSize={REVIEW_LIMIT}
        total={reviewList?.meta?.total}
        onChange={(page) => handleChangePage(page)}
        style={{ margin: "16px auto 0" }}
      />
    </S.HotelManager>
  );
}
export default ManageReview;
