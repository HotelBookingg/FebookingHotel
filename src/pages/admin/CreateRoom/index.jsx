import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  InputNumber,
  notification,
  Upload,
  Row,
  Col,
  Checkbox,
} from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

import * as S from "./style";
import { ROUTES } from "constants/routes";
import { FaCamera } from "react-icons/fa";
import { color } from "themes/color";
import { imageDb } from "../../../firebase/config";
import { v4 } from "uuid";

import { createRoomRequest } from "../../../redux/slicers/room.slicer";
import {
  createHotelHappening,
  createHotelFinish,
  getHotelDetailRequest,
} from "../../../redux/slicers/hotel.slicer";

function CreateRoom() {
  const { hotelDetail } = useSelector((state) => state.hotel);

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const [createForm] = Form.useForm();

  useEffect(() => {
    sessionStorage.setItem("preLoginPath", location.pathname);
    dispatch(getHotelDetailRequest({ id: params.id }));
  }, []);

  const handleAddRoom = async (values) => {
    dispatch(createHotelHappening({}));
    const { imageList, shower, TV, phone, water, ...rest } = await values;
    let uploadedImageUrls = [];
    if (imageList && imageList.length > 0) {
      uploadedImageUrls = await handleUploadImages(imageList);
    }
    const utilities = await {
      shower: shower ? shower : false,
      TV: TV ? TV : false,
      phone: phone ? phone : false,
      water: water ? water : false,
    };
    await dispatch(
      createRoomRequest({
        data: {
          hotelId: hotelDetail?.data?.id,
          ...rest,
          utilities,
          imageList: uploadedImageUrls,
          ListOfBookedRooms: [],
        },
      })
    );
    await createForm.resetFields();
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
          QUẢN LÝ KHÁCH SẠN{" "}
          {hotelDetail?.data?.name && hotelDetail?.data?.name.toUpperCase()}
        </S.Heading>
        <S.BTSubmit type="primary" onClick={() => createForm.submit()}>
          Thêm
        </S.BTSubmit>
      </S.TopWrapper>
      <S.CreateForm
        form={createForm}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        size="large"
        onFinish={handleAddRoom}
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
      </S.CreateForm>
    </S.Wrapper>
  );
}

export default CreateRoom;
