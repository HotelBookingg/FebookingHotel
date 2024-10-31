import { ROUTES } from "constants/routes";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import * as S from "./style";
import { useEffect } from "react";

function AdminLayout() {
  const { userInfo } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.data.id) {
      navigate(ROUTES.LOGIN);
    }
  }, [userInfo.data.id]);
  if (accessToken && userInfo.loading) {
    return (
      <S.LoadingWrapper>
        <S.Loading className="loading">
          <S.Dot style={{ "--value": 1 }}></S.Dot>
          <S.Dot style={{ "--value": 2 }}></S.Dot>
          <S.Dot style={{ "--value": 3 }}></S.Dot>
          <S.Dot style={{ "--value": 4 }}></S.Dot>
          <S.Dot style={{ "--value": 5 }}></S.Dot>
          <S.Dot style={{ "--value": 6 }}></S.Dot>
          <S.Dot style={{ "--value": 7 }}></S.Dot>
          <S.Dot style={{ "--value": 8 }}></S.Dot>
        </S.Loading>
      </S.LoadingWrapper>
    );
  } else {
    if (userInfo.data.role === "user") {
      return <Navigate to={ROUTES.USER.HOME} />;
    } else
      return (
        <S.LayoutAdminWrapper>
          <Header />
          <S.MainWrapper>
            <S.MainContainer>
              <Outlet />
            </S.MainContainer>
          </S.MainWrapper>
        </S.LayoutAdminWrapper>
      );
  }
}
export default AdminLayout;
