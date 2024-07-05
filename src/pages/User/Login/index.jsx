import { Form, Input, Button, Col, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaFacebookSquare, FaLock } from "react-icons/fa";
import { v4 } from "uuid";
import firebase, { auth } from "../../../firebase/config";
import { ROUTES } from "../../../constants/routes";

import {
  loginRequest,
  registerRequest,
  searchUserRequest,
  registerAndLoginRequest,
} from "../../../redux/slicers/auth.slicer";
import * as S from "./style";
import { FaGoogle, FaTwitter } from "react-icons/fa6";
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

function Login() {
  const [loginForm] = Form.useForm();

  const { loginData, registerData } = useSelector((state) => state.auth);
  const { userList } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(searchUserRequest({}));
    document.title = "Login page";
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ]);
    }
  }, [loginData.error]);
  const handleSubmit = (values) => {
    dispatch(
      loginRequest({
        data: values,
      })
    );
  };
  const handleBySocialLogin = (provider) => {
    if (window.popupInProgress) {
      notification.error({
        message:
          "Một cửa sổ bật lên đăng nhập đã được mở. Vui lòng hoàn tất quá trình đăng nhập hiện tại!!",
      });
      return;
    }
    window.popupInProgress = true;

    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let email = "";
        for (let i = 0; i < 8; i++) {
          email += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        const newArr = [...userList.data];
        const index = newArr.findIndex((item) => item.idSocial === user.uid);

        if (index !== -1) {
          const accountSocial = newArr.splice(index, 1);
          const { password, ...rest } = accountSocial[0];
          dispatch(
            loginRequest({ data: { password: "Tri@0935068648", ...rest } })
          );
        } else {
          const newUserData = {
            idSocial: user.uid,
            email: email + "@gmail.com",
            fullName: user.displayName,
            password: "Tri@0935068648",
            phoneNumber: "",
            role: "user",
            avatar:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrZRHHcRuOyLqUlNqrvsA6jUy6j_KJwbJaOQrEoE-f&s",
          };
          dispatch(
            registerAndLoginRequest({
              data: newUserData,
            })
          );
        }
      })
      .catch((error) => {
        console.error("Error during sign-in with popup:", error);
      })
      .finally(() => {
        window.popupInProgress = false;
      });
  };

  window.popupInProgress = false;

  return (
    <S.LoginWrapper>
      <Col sm={24} xs={24} md={24} lg={24}>
        <S.Login gutter={[16, 16]} justify={"center"}>
          <S.Left xs={0} sm={0} md={12} lg={12}>
            <S.Square></S.Square>
            <S.Triangle></S.Triangle>
            <S.Rectangle></S.Rectangle>
            <S.Content>
              <S.HeadingLeft>Chào Mừng Bạn Trở Lại!</S.HeadingLeft>
              <S.SubHeadingLeft>
                Để duy trì kết nối với chúng tôi,vui lòng đăng nhập bằng thông
                tin cá nhân của bạn!
              </S.SubHeadingLeft>
            </S.Content>
          </S.Left>
          <S.Right xs={24} sm={24} md={12} lg={12}>
            <S.Content>
              <Form
                style={{ width: "80%" }}
                form={loginForm}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                size="large"
                onFinish={(values) => handleSubmit(values)}
              >
                <S.HeadingRight>Đăng Nhập</S.HeadingRight>
                <S.Social>
                  <S.Icon>
                    <FaFacebookSquare
                      onClick={() => handleBySocialLogin(fbProvider)}
                      size={20}
                      color="#9a9a9a"
                    />
                  </S.Icon>
                  <S.Icon>
                    <FaTwitter
                      onClick={() => {
                        handleBySocialLogin(twitterProvider);
                      }}
                      size={20}
                      color="#9a9a9a"
                    />
                  </S.Icon>
                  <S.Icon>
                    <FaGoogle
                      onClick={() => handleBySocialLogin(googleProvider)}
                      size={20}
                      color="#9a9a9a"
                    />
                  </S.Icon>
                </S.Social>
                <S.SubHeadingRight>
                  Hoặc bạn có thể dùng gmail để đăng ký!
                </S.SubHeadingRight>
                <Form.Item
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
                  <Input prefix={<FaEnvelope />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền mật khẩu",
                    },
                  ]}
                >
                  <Input.Password prefix={<FaLock />} placeholder="Password" />
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 16,
                    span: 8,
                  }}
                >
                  <a>Quên mật khẩu</a>
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <Button
                    loading={loginData.loading}
                    type="primary"
                    htmlType="submit"
                    block
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <Link to={ROUTES.REGISTER}>
                    <Button block>Đăng ký</Button>
                  </Link>
                </Form.Item>
              </Form>
            </S.Content>
          </S.Right>
        </S.Login>
      </Col>
    </S.LoginWrapper>
  );
}

export default Login;
