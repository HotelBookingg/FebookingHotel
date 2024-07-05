import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  InputNumber,
  notification,
  Upload,
  Row,
  Col,
  Button,
  Checkbox,
  Rate,
  message,
} from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { PlusOutlined } from "@ant-design/icons";
import * as S from "./style";
import { ROUTES } from "constants/routes";
import { FaCamera } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { color } from "themes/color";
import { imageDb } from "../../../firebase/config";
import { v4 } from "uuid";

import {
  createHotelHappening,
  createHotelFinish,
} from "../../../redux/slicers/hotel.slicer";
import {
  updateRoomRequest,
  getRoomDetailRequest,
} from "../../../redux/slicers/room.slicer";

function UpdateRoom() {
  const { roomDetail } = useSelector((state) => state.room);

  const { utilities, hotelId, imageList, ...rest1 } = roomDetail.data;
  const params = useParams();
  const { id } = params;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [UpdateForm] = Form.useForm();

  useEffect(() => {
    if (id) {
      sessionStorage.setItem("preLoginPath", location.pathname);
      dispatch(getRoomDetailRequest({ id }));
    }
  }, [id]);

  useEffect(() => {
    const fileList = imageList?.map((url, index) => ({
      uid: `${index}`,
      name: `image${index}.png`,
      status: "done",
      url,
    }));
    const initialValues = {
      ...rest1,
      ...utilities,
    };
    UpdateForm.setFieldsValue(initialValues);
    UpdateForm.setFieldsValue({ imageList: fileList });
  }, [roomDetail, imageList]);

  const handleUpdateRoom = async (values) => {
    await dispatch(createHotelHappening({}));
    const {
      imageList,
      wifi,
      airConditioner,
      restaurant,
      receptionist,
      parkingLot,
      ...rest
    } = await values;
    let uploadedImageUrls = [];
    if (imageList && imageList.length > 0) {
      uploadedImageUrls = await handleUploadImages(imageList);
    }
    const utilities = await {
      wifi: wifi ? wifi : false,
      airConditioner: airConditioner ? airConditioner : false,
      restaurant: restaurant ? restaurant : false,
      receptionist: receptionist ? receptionist : false,
      parkingLot: parkingLot ? parkingLot : false,
    };
    await dispatch(
      updateRoomRequest({
        data: {
          id: id,
          hotelId: hotelId,
          ...rest,
          utilities,
          imageList: Array.isArray(imageList)
            ? [...roomDetail.data.imageList, ...uploadedImageUrls]
            : [...uploadedImageUrls],
        },
      })
    );
    await notification.success({ message: "Cập nhật thành công" });
    await dispatch(createHotelFinish({}));
  };
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
  return (
    <S.Wrapper>
      <S.TopWrapper>
        <S.Heading>
          {" "}
          QUẢN LÝ KHÁCH SẠN{" "}
          {roomDetail?.data?.hotel?.name &&
            roomDetail?.data?.hotel?.name.toUpperCase()}
        </S.Heading>
        <S.BTSubmit
          // loading={addProductData.loading}
          type="primary"
          onClick={() => UpdateForm.submit()}
        >
          Cập Nhật
        </S.BTSubmit>
      </S.TopWrapper>
      <S.UpdateForm
        form={UpdateForm}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        size="large"
        onFinish={handleUpdateRoom}
        initialValues={{
          rate: 0,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Phòng"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên Phòng!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Kích thước "
              name="sizeRoom"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập kích thước phòng!",
                  type: "number",
                },
                {
                  type: "number",
                  min: 3,
                  message: "vui lòng nhập từ 3 trở lên!",
                },
              ]}
            >
              <InputNumber
                formatter={(value) =>
                  value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số người tối đa"
              name="user"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số người tối đa!",
                  type: "number",
                },
                {
                  type: "number",
                  min: 1,
                  message: "vui lòng nhập từ 1 trở lên!",
                },
              ]}
            >
              <InputNumber
                formatter={(value) =>
                  value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Loại phòng"
              name="heading"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Loại phòng!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tầng"
              name="floor"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Tầng!",
                  type: "number",
                },
                {
                  type: "number",
                  min: 1,
                  message: "vui lòng nhập từ 1 trở lên!",
                },
              ]}
            >
              <InputNumber
                formatter={(value) =>
                  value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá phòng!",
                  type: "number",
                },
                {
                  type: "number",
                  min: 100000,
                  message: "vui lòng nhập từ 100000 trở lên!",
                },
              ]}
            >
              <InputNumber
                formatter={(value) =>
                  value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <h3>Tiện ích </h3>
          </Col>
          <Col span={6}>
            <Form.Item label="Vòi Tắm" name="shower" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="TV" name="TV" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Điện thoại" name="phone" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Nước uống miễn phí"
              name="water"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Thêm ảnh phòng"
              name="imageList"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                return e?.fileList;
              }}
              rules={[
                {
                  validator: (_, value) =>
                    value && value.length >= 6
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Vui lòng tải lên ít nhất 6 ảnh")
                        ),
                },
              ]}
            >
              <Upload
                listType="picture-card"
                beforeUpload={Upload.LIST_IGNORE}
                maxCount={10}
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
              >
                <div>
                  <FaCamera />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </S.UpdateForm>
    </S.Wrapper>
  );
}

export default UpdateRoom;
