import { Link, useLocation, useNavigate } from "react-router-dom";
import * as S from "./style";
import { ROUTES } from "constants/routes";
import {
  FaBed,
  FaSearchengin,
  FaSignOutAlt,
  FaUserAlt,
  FaUserEdit,
} from "react-icons/fa";

import qs from "qs";

import { color } from "themes/color";
import { Button, Col, Dropdown, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { logoutRequest } from "../../../../redux/slicers/auth.slicer";
import { useMemo } from "react";

function Header() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const adminMenu = {
    items: [
      {
        key: "1",
        label: (
          <Link to={ROUTES.ADMIN.MANAGE_HOTEL_RESERVATIONS}>
            Quản lý đặt phòng
          </Link>
        ),
        icon: <FaBed />,
      },
      {
        key: "2",
        label: "Trang chủ User",
        onClick: () => {
          navigate(ROUTES.USER.HOME);
        },
        icon: <FaSignOutAlt />,
      },
      {
        key: "3",
        label: "Đăng xuất",
        onClick: () => {
          dispatch(logoutRequest());
          navigate(ROUTES.USER.HOME);
        },
        icon: <FaSignOutAlt />,
      },
    ],
  };
  const menu = [
    {
      name: "Quản lý khách sạn",
      link: ROUTES.ADMIN.MANAGE_HOTEL,
    },
    {
      name: "Quản lý Đặt Phòng",
      link: ROUTES.ADMIN.MANAGE_HOTEL_RESERVATIONS,
    },
    {
      name: "Quản lý Đánh giá và Thống Kê",
      link: ROUTES.ADMIN.STATISTICAL_REVIEW,
    },
  ];
  const renderMenu = useMemo(() => {
    return menu.map((item) => {
      return (
        <Col span={8} onClick={() => navigate(item.link)}>
          {item.name}
        </Col>
      );
    });
  });

  return (
    <S.HeaderWrapper>
      <S.header>
        <S.HeaderLogo xl={6}>
          <div onClick={() => navigate(ROUTES.USER.HOME)}>
            <S.ImageLogo src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"></S.ImageLogo>
          </div>
        </S.HeaderLogo>
        <S.Menu xl={12}>
          <Row>{renderMenu}</Row>
        </S.Menu>
        <S.LoginWrapper xl={6}>
          {userInfo?.data.email ? (
            <Dropdown menu={adminMenu}>
              <S.Login>
                <FaUserEdit color={color.primaryText} size={30} />
                <S.HeadingLogin>{userInfo.data.fullName}</S.HeadingLogin>
              </S.Login>
            </Dropdown>
          ) : (
            <Button onClick={() => navigate(ROUTES.LOGIN)}>Login</Button>
          )}
        </S.LoginWrapper>
      </S.header>
    </S.HeaderWrapper>
  );
}

export default Header;
