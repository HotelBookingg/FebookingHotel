import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { getUserInfoRequest } from "../redux/slicers/auth.slicer";
import { ROUTES } from "../constants/routes";
import * as S from "./style";

import { useEffect } from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import UserLayout from "layouts/UserLayout";
import AuthLayout from "../layouts/AuthLayout";
import NotFoundPage from "../layouts/NotFound";
import AdminLayout from "layouts/AdminLayout";

import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Home from "pages/User/Home";
import HotelDetail from "pages/User/HotelDetail";
import Checkout from "pages/User/Checkout";
import Bill from "pages/User/Bill";

import ManagerHotelReservations from "pages/admin/ManageHotelReversions";
import ManageHotel from "pages/admin/ManageHotel";
import ManageReview from "pages/admin/ManageReview";
import StatistiCalAndReview from "pages/admin/StatisticalAndReview";
import StatistiCal from "pages/admin/Statistical";
import CreateHotel from "pages/admin/CreateHotel";
import UpdateHotel from "pages/admin/UpdateHotel";
import CreateRoom from "pages/admin/CreateRoom";
import UpdateRoom from "pages/admin/UpdateRoom";

function App() {
  const dispatch = useDispatch();
  const [isShowLoading, setIsShowLoading] = useState(false);

  const { createHotel } = useSelector((state) => state.hotel);

  useEffect(() => {
    document.title = "Đặt phòng khách sạn giá rẻ - Giá tốt nhất tại Traveloka";
    setIsShowLoading(createHotel.loading);
  }, [createHotel.loading]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      dispatch(
        getUserInfoRequest({
          id: parseInt(tokenData.sub),
        })
      );
    }
  }, []);

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
          <Route path={ROUTES.USER.CHECKOUT} element={<Checkout />} />
        </Route>
        <Route path={ROUTES.USER.BILL} element={<Bill />} />
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.CREATE_HOTEL} element={<CreateHotel />} />
          <Route path={ROUTES.ADMIN.UPDATE_HOTEL} element={<UpdateHotel />} />
          <Route path={ROUTES.ADMIN.MANAGE_REVIEW} element={<ManageReview />} />
          <Route path={ROUTES.ADMIN.STATISTICAL} element={<StatistiCal />} />
          <Route path={ROUTES.ADMIN.CREATE_ROOM} element={<CreateRoom />} />
          <Route path={ROUTES.ADMIN.UPDATE_ROOM} element={<UpdateRoom />} />

          <Route
            path={ROUTES.ADMIN.MANAGE_HOTEL_RESERVATIONS}
            element={<ManagerHotelReservations />}
          />
          <Route
            path={ROUTES.ADMIN.STATISTICAL_REVIEW}
            element={<StatistiCalAndReview />}
          />
          <Route path={ROUTES.ADMIN.MANAGE_HOTEL} element={<ManageHotel />} />
        </Route>
        ;
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
