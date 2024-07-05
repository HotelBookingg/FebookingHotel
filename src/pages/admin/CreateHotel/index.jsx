import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import * as S from "./style";
import { FaCamera } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { color } from "themes/color";
import { imageDb } from "../../../firebase/config";
import { v4 } from "uuid";

import {
  createHotelRequest,
  createHotelHappening,
  createHotelFinish,
} from "../../../redux/slicers/hotel.slicer";

function CreateHotel() {
  const [nearTheArea, setNearTheArea] = useState("");
  const [numberMeters, setNumberMeters] = useState(null);
  const [nearTheAreaList, setNearTheAreaList] = useState([]);
  const { createHotel } = useSelector((state) => state.hotel);

  let { loading } = createHotel;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [createForm] = Form.useForm();

  useEffect(() => {
    sessionStorage.setItem("preLoginPath", location.pathname);
  }, []);

  const handleAddHotel = async (values) => {
    dispatch(createHotelHappening({}));
    const {
      imagePepresent,
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
    const image = await handleUploadImages(imagePepresent);
    const utilities = await {
      wifi: wifi ? wifi : false,
      airConditioner: airConditioner ? airConditioner : false,
      restaurant: restaurant ? restaurant : false,
      receptionist: receptionist ? receptionist : false,
      parkingLot: parkingLot ? parkingLot : false,
    };
    await dispatch(
      createHotelRequest({
        data: {
          ...rest,
          utilities,
          nearTheArea: nearTheAreaList,
          image: image[0],
          imageList: uploadedImageUrls,
        },
      })
    );
    await setNearTheAreaList([]);
    await createForm.resetFields();
    await dispatch(createHotelFinish({}));
  };
  const handleAddTourist = () => {
    if (
      nearTheArea === null ||
      nearTheArea.trim() === "" ||
      numberMeters === null
    ) {
      notification.error({ message: "Bạn chưa nhập đầy đủ thông tin!" });
    } else {
      const index = nearTheAreaList.findIndex(
        (item) => item.name === nearTheArea
      );
      if (index !== -1) {
        notification.error({ message: "Địa điểm du lịch này đã có rồi!" });
      } else {
        setNearTheAreaList([
          { name: nearTheArea, mileage: numberMeters },
          ...nearTheAreaList,
        ]);
        createForm.resetFields(["nearTheArea", "numberMeter"]);
        setNumberMeters(null);
        setNearTheArea("");
      }
    }
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

  const renderNearTheArea = useMemo(() => {
    return nearTheAreaList?.map((item, index) => {
      return (
        <Col span={12} key={index}>
          <S.AreaWrapper>
            <S.Area>
              <span>
                <FaLocationDot size={16} color={color.primary} />
              </span>
              <div>{item?.name}</div>
            </S.Area>
            <S.Mileage>{item?.mileage}m</S.Mileage>
          </S.AreaWrapper>
        </Col>
      );
    });
  }, [nearTheAreaList]);
  return (
    <S.Wrapper>
      <S.TopWrapper>
        <S.Heading>THÊM KHÁCH SẠN</S.Heading>
        <S.BTSubmit
          // loading={addProductData.loading}
          type="primary"
          onClick={() => createForm.submit()}
        >
          Thêm
        </S.BTSubmit>
      </S.TopWrapper>
      <S.CreateForm
        form={createForm}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        size="large"
        onFinish={handleAddHotel}
        initialValues={{
          rate: 0,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Tên KS"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên Khách sạn!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giá cũ"
              name="priceOld"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá cũ!",
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
          <Col span={12}>
            <Form.Item
              label="Giá phòng rẻ nhất"
              name="priceCurrent"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá!",
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
          <Col span={12}>
            <Form.Item
              label="Tỉnh/Thành Phố"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhậpTỉnh/Thành Phố!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Địa chỉ chi tiết"
              name="addressDetail"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ chi tiết!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giới thiệu"
              name="introduce"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền giới thiệu!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Row gutter={[16, 16]} style={{ width: "100%" }}>
            <Col span={10}>
              <Form.Item label="Gần điểm du lịch" name="nearTheArea">
                <Input
                  value={nearTheArea}
                  onChange={(e) => setNearTheArea(e.target.value)}
                  style={{ marginLeft: "9px" }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Số Mét"
                name="numberMeter"
                rules={[
                  {
                    type: "number",
                    min: 1,
                    message: "vui lòng nhập từ 1 trở lên!",
                  },
                ]}
              >
                <InputNumber
                  value={numberMeters}
                  onChange={(e) => setNumberMeters(e)}
                  style={{ width: "100%", marginLeft: "9px" }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button onClick={() => handleAddTourist()} block type="primary">
                Thêm địa điểm
              </Button>
            </Col>
            {nearTheAreaList[0] && (
              <Col span={24}>
                <h4>Danh sách địa điểm du lịch gần Khách sạn</h4>
              </Col>
            )}
            {renderNearTheArea}
          </Row>
          <Col span={24}>
            <h3>Tiện ích </h3>
          </Col>
          <Col span={8}>
            <Form.Item label="WIFI" name="wifi" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Máy điều hòa"
              name="airConditioner"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Nhà hàng"
              name="restaurant"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Nhân viên 24/7"
              name="receptionist"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Chỗ đậu xe"
              name="parkingLot"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Khách sạn"
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
          </Col>
          <Col span={24}>
            <Form.Item
              label="Ảnh đại diện"
              name="imagePepresent"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                return e?.fileList;
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng thêm Ảnh đại diện của khách sạn!",
                },
              ]}
            >
              <Upload
                listType="picture-card"
                beforeUpload={Upload.LIST_IGNORE}
                maxCount={1}
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
          <Col span={24}>
            <Form.Item
              label="Thêm ảnh KS"
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

export default CreateHotel;
