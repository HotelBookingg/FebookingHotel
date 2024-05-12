import { Outlet } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Navbar";

import * as S from "./style";
import { useDispatch } from "react-redux";
function UserLayout() {
  const [isHiddenMenu, setIsHiddenMenu] = useState(true);
  const dispatch = useDispatch();
  return (
    <S.LayoutWrapper>
      <Header isHiddenMenu={isHiddenMenu} setIsHiddenMenu={setIsHiddenMenu} />
      <Nav />
      <S.MainWrapper>
        <S.MainContainer>
          <Outlet />
        </S.MainContainer>
      </S.MainWrapper>
      <Footer />
    </S.LayoutWrapper>
  );
}

export default UserLayout;
