import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../constants/routes";
import { useEffect } from "react";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import * as S from "./style";
import { useState } from "react";

import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "layouts/UserLayout";
import { useDispatch } from "react-redux";
import NotFoundPage from "../layouts/NotFound";

import Home from "pages/User/Home";
import HotelDetail from "pages/User/HotelDetail";
function App() {
  const dispatch = useDispatch();
  const [isShowLoading, setIsShowLoading] = useState(false);

  return (
    <>
      <S.LoadingWrapper isShowLoading={isShowLoading}>
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
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Navigate to={ROUTES.USER.HOME} />}></Route>
          <Route path={ROUTES.USER.HOME} element={<Home />} />
          <Route path={ROUTES.USER.HOTEL_DETAIL} element={<HotelDetail />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
