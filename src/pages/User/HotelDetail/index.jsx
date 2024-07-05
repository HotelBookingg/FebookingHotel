import { Link, generatePath, useLocation, useParams } from "react-router-dom";
import {
  getHotelDetailRequest,
  createHotelHappening,
  createHotelFinish,
} from "../../../redux/slicers/hotel.slicer";
import "dayjs/locale/vi";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  Carousel,
  Rate,
  Form,
  Upload,
  notification,
  Space,
} from "antd";
import {
  FaBanSmoking,
  FaBottleWater,
  FaClockRotateLeft,
  FaLocationDot,
  FaMobile,
  FaRegSnowflake,
  FaRegUser,
  FaRulerCombined,
  FaShower,
  FaSquareParking,
  FaTv,
  FaUtensils,
  FaWifi,
} from "react-icons/fa6";
import * as S from "./style";
import { color } from "themes/color";
import { ROUTES } from "constants/routes";
import dayjs from "dayjs";
import { FaCamera } from "react-icons/fa";
import {
  createReviewRequest,
  getReviewListRequest,
} from "../../../redux/slicers/review.slicer";
import { imageDb } from "../../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function HotelDetail() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  dayjs.locale("vi");

  const { userInfo } = useSelector((state) => state.auth);
  const { reviewList } = useSelector((state) => state.review);

  const [reviewForm] = Form.useForm();
  const [arrow, setArrow] = useState(false);
  const [dots, setDots] = useState(false);
  const [booked, setBooked] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { hotelDetail } = useSelector((state) => state.hotel);
  const location = useLocation();

  let imageHotelList, data;
  if (hotelDetail?.data.imageList) {
    imageHotelList = hotelDetail?.data?.imageList;
    data = hotelDetail?.data;
  }
  useEffect(() => {
    sessionStorage.setItem("preLoginPath", location.pathname);
  }, []);
  useEffect(() => {
    dispatch(getHotelDetailRequest({ id, rooms: true }));
    dispatch(getReviewListRequest({ hotelId: id }));
  }, [id]);
  useEffect(() => {
    if (hotelDetail?.data?.rooms && userInfo?.data?.id) {
      let index = -1;
      for (let i = 0; i < hotelDetail?.data?.rooms.length; i++) {
        if (index !== -1) break;
        index = hotelDetail?.data?.rooms[i]?.ListOfBookedRooms.findIndex(
          (item) => item?.userId === userInfo?.data?.id
        );
      }
      if (index !== -1) setBooked(true);
    }
  }, [hotelDetail?.data?.rooms, userInfo?.data?.id]);

  const handleUploadImages = async (imageList) => {
    if (imageList && imageList.length > 0) {
      try {
        const urls = await Promise.all(
          imageList.map(async (image) => {
            if (image.originFileObj) {
              const imgRef = ref(imageDb, `files/${v4()}`);
              const uploadResult = await uploadBytes(
                imgRef,
                image.originFileObj
              );
              return await getDownloadURL(uploadResult.ref);
            }
            return null;
          })
        );
        const validUrls = urls.filter((url) => url);
        return validUrls;
      } catch (error) {
        notification.error({
          message: "Lỗi khi tải ảnh lên hoặc cập nhật ảnh",
        });
        console.error("Error uploading image: ", error);
        return [];
      }
    } else {
      notification.error({ message: "Vui lòng chọn ảnh!" });
      return [];
    }
  };

  const handleReviewHotel = async (values) => {
    await dispatch(createHotelHappening({}));
    const { imageList, ...rest } = await values;
    const imageReview = await handleUploadImages(imageList);
    dispatch(
      createReviewRequest({
        data: {
          ...rest,
          userId: userInfo.data.id,
          hotelId: id,
          imageReview: imageReview,
        },
        callback: () => reviewForm.resetFields(),
      })
    );
    await dispatch(createHotelFinish({}));
  };

  const renderImageHotelList = useMemo(() => {
    return imageHotelList?.slice(0, 6)?.map((item, index) => {
      return (
        <S.ImageItem span={8} key={index}>
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
        </S.ImageItem>
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
  const renderRoomList = useMemo(() => {
    return data?.rooms?.map((room) => {
      return (
        <S.RoomWrapper key={room.id} span={24}>
          <S.RoomItem gutter={[16, 16]}>
            <Col span={24} style={{ position: "relative" }}>
              <S.Trapezoid src="https://ik.imagekit.io/tvlk/image/imageResource/2023/12/22/1703230740804-7c3d1c3e64557331e6f5f66d7a28e262.svg?tr=h-420,q-75,w-467"></S.Trapezoid>
            </Col>
            <Col span={24}>
              <S.HeadingRoom>{room?.heading}</S.HeadingRoom>
            </Col>
            <Col span={7}>
              <div>
                <S.ImageWrapper
                  onMouseEnter={() => {
                    setArrow(true);
                    setDots(true);
                  }}
                  onMouseLeave={() => {
                    setArrow(false);
                    setDots(false);
                  }}
                >
                  <Carousel
                    style={{ width: "100% " }}
                    dotPosition={"bottom"}
                    arrows={arrow}
                    dots={dots}
                  >
                    {room?.imageList.map((image, index) => {
                      return <S.ImageRoom key={index} src={image} />;
                    })}
                  </Carousel>
                </S.ImageWrapper>
                <div>
                  <S.Require>
                    <FaRulerCombined size={22} color={color.primary} />
                    <span>{room.sizeRoom} m²</span>
                  </S.Require>
                  <S.Require>
                    <FaBanSmoking size={22} color={color.primary} />
                    <span>Không hút thuốc</span>
                  </S.Require>
                  <Row gutter={[16, 16]}>
                    <Col span={10}>
                      {room?.utilities?.shower && (
                        <S.UtilitiesRoom>
                          <FaShower size={20} color="#acaaaa" />
                          <span>Vòi tắm đứng</span>
                        </S.UtilitiesRoom>
                      )}
                    </Col>
                    <Col span={14}>
                      {room?.utilities?.TV && (
                        <S.UtilitiesRoom>
                          <FaTv size={20} color="#acaaaa" />
                          <span>Tivi</span>
                        </S.UtilitiesRoom>
                      )}
                    </Col>
                    <Col span={10}>
                      {room?.utilities?.phone && (
                        <S.UtilitiesRoom>
                          <FaMobile size={20} color="#acaaaa" />
                          <span>Điện thoại</span>
                        </S.UtilitiesRoom>
                      )}
                    </Col>
                    <Col span={14}>
                      {room?.utilities?.water && (
                        <S.UtilitiesRoom>
                          <FaBottleWater size={20} color="#acaaaa" />
                          <span>Nước uống miễn phí</span>
                        </S.UtilitiesRoom>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span={17}>
              <S.InfoRoomWrapper gutter={[16, 0]}>
                <S.TitleHeadRoom span={6}>Phòng</S.TitleHeadRoom>
                <S.TitleRoom span={6}>Khách</S.TitleRoom>
                <S.TitleRoom span={6}>Giá/Phòng/Đêm</S.TitleRoom>
                <S.TitleLastRoom span={6}></S.TitleLastRoom>
                <S.RoomInfo span={6}>
                  {room?.name}(Tầng {room?.floor})
                </S.RoomInfo>
                <S.RoomInfo span={6}>
                  {room.user == 2 ? (
                    <div>
                      <FaRegUser size={20} />
                      <FaRegUser size={20} />
                    </div>
                  ) : (
                    <div>
                      <FaRegUser size={20} />
                    </div>
                  )}
                </S.RoomInfo>
                <S.RoomInfo span={6}>
                  {room?.price.toLocaleString()} VNĐ
                </S.RoomInfo>
                <S.RoomInfo span={6}>
                  <Link
                    to={generatePath(ROUTES.USER.CHECKOUT, { id: room?.id })}
                  >
                    <Button type="primary">Chọn</Button>
                  </Link>
                </S.RoomInfo>
                <S.Note span={24}>Lưu ý:Thanh toán trước khi nhận phòng</S.Note>
              </S.InfoRoomWrapper>
            </Col>
          </S.RoomItem>
        </S.RoomWrapper>
      );
    });
  }, [data?.rooms, arrow, dots]);
  const renderReviewList = useMemo(() => {
    return reviewList.data.map((item) => (
      <S.ReviewItemWrapper span={24} key={item.id}>
        <S.Avatar>
          <img src={item.user.avatar} alt="avatarUser" />
        </S.Avatar>
        <div style={{ width: "100%" }}>
          <Space>
            <S.Title>{item.user.fullName}</S.Title>
            <S.Text>{dayjs(item.createdAt).fromNow()}</S.Text>
          </Space>
          <Rate
            value={item.rate}
            disabled
            style={{ display: "block", fontSize: 14, marginTop: 4 }}
          />
        </div>
        <div>
          <S.Comment>{item.comment}</S.Comment>
          <S.ImageReviewWrapper gutter={16}>
            {item.imageReview &&
              item.imageReview.map((image) => (
                <S.ImageReviewItem span={4} key={image}>
                  <S.ImageReview src={image} />
                </S.ImageReviewItem>
              ))}
          </S.ImageReviewWrapper>
        </div>
      </S.ReviewItemWrapper>
    ));
  }, [reviewList.data]);
  const renderFormReview = useMemo(() => {
    if (!userInfo?.data?.id) {
      return <p>Đăng nhập để được đánh giá</p>;
    } else if (!booked)
      return <p>Đánh giá chỉ giành cho người đã đặt phòng này!</p>;
    return (
      <S.ReviewFormWrapper>
        <Form
          form={reviewForm}
          name="reviewForm"
          layout="vertical"
          initialValues={{
            rate: 0,
            comment: "",
          }}
          onFinish={(values) => handleReviewHotel(values)}
        >
          <Form.Item
            name="rate"
            rules={[
              { required: true },
              {
                min: 1,
                type: "number",
                message: "Đánh giá sao là bắt buộc",
              },
            ]}
          >
            <Rate />
          </Form.Item>
          <S.InputWrapper>
            <Form.Item
              name="comment"
              rules={[{ required: true, message: "Nhận xét là bắt buộc" }]}
            >
              <S.InputReview placeholder="Nhận xét của bạn về khách sạn này" />
            </Form.Item>
            <Form.Item
              label=""
              name="imageList"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                return e?.fileList;
              }}
              rules={[
                {
                  validator: (_, value) =>
                    value && value.length <= 2
                      ? Promise.resolve()
                      : Promise.reject(new Error("Tối đa 2 ảnh")),
                },
              ]}
            >
              <S.Camera
                listType="picture-card"
                beforeUpload={Upload.LIST_IGNORE}
                maxCount={3}
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
              >
                <div>
                  <FaCamera />
                </div>
              </S.Camera>
            </Form.Item>
          </S.InputWrapper>

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "15px" }}
            block
          >
            Gửi
          </Button>
        </Form>
      </S.ReviewFormWrapper>
    );
  }, [reviewList.data, userInfo?.data?.id, booked]);

  return (
    <S.HotelDetailWrapper>
      <S.HotelDetail gutter={[16, 16]} justify={"space-between"}>
        <S.Photo span={10}>
          <S.ImageHotel src={data?.image}></S.ImageHotel>
        </S.Photo>
        <Col span={14}>
          <S.ImageHotelList gutter={[4, 4]}>
            {renderImageHotelList}
          </S.ImageHotelList>
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
            <S.Price>{data?.priceCurrent.toLocaleString()} VNĐ</S.Price>
            <a href="#roomList">
              <S.ChooseHotel>Chọn Phòng</S.ChooseHotel>
            </a>
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
        <div style={{ width: "100%" }} id="roomList">
          {renderRoomList}
        </div>
        <S.Review gutter={[8, 8]}>
          <Col span={24}>
            <S.RateCustomer>Khách nói gì về kỳ nghỉ của họ</S.RateCustomer>
          </Col>
          <Col span={24}>
            <S.ReviewUser>{renderReviewList}</S.ReviewUser>
          </Col>
          <Col span={24}>{renderFormReview}</Col>
        </S.Review>
      </S.HotelDetail>
    </S.HotelDetailWrapper>
  );
}

export default HotelDetail;
