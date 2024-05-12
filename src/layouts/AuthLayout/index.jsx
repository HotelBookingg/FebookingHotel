import { ROUTES } from "../../constants/routes";
import { Outlet, useNavigate } from "react-router-dom";

import * as S from "./style";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AuthLayout() {
  const navigate = useNavigate();
  // const { userInfo } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (userInfo.data.id) {
  //     if (userInfo.data.role === "admin") {
  //       return navigate(ROUTES.ADMIN.DASHBOARD);
  //     }
  //     return navigate(ROUTES.USER.HOME);
  //   }
  // }, [userInfo.data.id]);
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
