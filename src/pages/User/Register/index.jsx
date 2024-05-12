import { Form, Input, Button, Col, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import * as S from "./style";
// import { registerRequest } from "redux/slicers/auth.slice";
import { ROUTES } from "../../../constants/routes";
function Register() {
  //   const [registerForm] = Form.useForm();
  //   const { registerData } = useSelector((state) => state.auth);
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register Page";
  }, []);

  //   useEffect(() => {
  //     if (registerData?.error) {
  //       registerForm.setFields([
  //         {
  //           name: "email",
  //           errors: [registerData.error],
  //         },
  //       ]);
  //     }
  //   }, [registerData?.error]);

  //   const handleSubmit = (values) => {
  //     const { confirm, ...rest } = values;
  //     dispatch(
  //       registerRequest({
  //         data: {
  //           addressDefaultId: undefined,
  //           ...rest,
  //           role: "user",
  //           avatar:
  //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrZRHHcRuOyLqUlNqrvsA6jUy6j_KJwbJaOQrEoE-f&s",
  //         },
  //         callback: () => navigate(ROUTES.LOGIN),
  //       })
  //     );
  //   };
  return (
    <S.RegisterWrapper>
      <Col md={24}>
        <S.FormRegister gutter={[16, 16]} justify={"center"}>
          <Col xs={20} md={14} lg={9}>
            <Form
              //   form={registerForm}
              name="basic"
              initialValues={{
                remember: true,
              }}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{
                maxWidth: 600,
              }}
              size="large"
              //   onFinish={(values) => handleSubmit(values)}
            >
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên đăng nhập!",
                  },
                  {
                    max: 20,
                    min: 6,
                    message: "Điền từ 6 -> 20 kí tự",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Gmail"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền gmail",
                  },
                  {
                    type: "email",
                    message: "Vui lòng điền đúng định dạng email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mật Khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền mật khẩu",
                  },
                  {
                    pattern:
                      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g,
                    message: "Mật khẩu yếu",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập lại mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu không trùng khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="agree"
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng đồng ý điều khoản!",
                  },
                ]}
              >
                <Checkbox>
                  Tôi đồng ý với shop về <a>Điều khoản dịch vụ</a> &
                  <a>Chính sách bảo mật</a>
                </Checkbox>
              </Form.Item>
              <Form.Item
                name="login"
                valuePropName="checked"
                wrapperCol={{
                  span: 24,
                }}
              >
                <Button
                  //   loading={registerData?.loading}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Đăng ký
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
              >
                <Link to={ROUTES.LOGIN}>
                  <Button block>Đăng nhập</Button>
                </Link>
              </Form.Item>
            </Form>
          </Col>
        </S.FormRegister>
        ;
      </Col>
    </S.RegisterWrapper>
  );
}

export default Register;
