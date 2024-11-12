import { ROUTES } from "../../constants/routes";
import { Outlet, useNavigate } from "react-router-dom";

import * as S from "./style";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AuthLayout() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo.data.id) {
      const preLoginPath = sessionStorage.getItem("preLoginPath");
      if (userInfo.data.role === "admin") {
        return preLoginPath
          ? navigate(preLoginPath)
          : navigate(ROUTES.ADMIN.MANAGE_HOTEL_RESERVATIONS);
      }
      return preLoginPath ? navigate(preLoginPath) : navigate(ROUTES.USER.HOME);
    }
  }, [userInfo.data.id]);
  return (
    <>
      <div>
        <S.TopRight></S.TopRight>
      </div>
      <div id="auth">
        <Outlet />
      </div>
      <S.BottomLeft></S.BottomLeft>
    </>
  );
}

export default AuthLayout;
