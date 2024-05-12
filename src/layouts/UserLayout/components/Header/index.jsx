import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { ROUTES } from "constants/routes";
import { FaSearchengin } from "react-icons/fa";
import { color } from "themes/color";
import { Button } from "antd";
function Header() {
  const navigate = useNavigate();
  return (
    <S.HeaderWrapper>
      <S.header>
        <S.HeaderLogo sm={11} xs={10} md={10} xl={6}>
          <div onClick={() => navigate(ROUTES.USER.HOME)}>
            <S.ImageLogo src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"></S.ImageLogo>
          </div>
        </S.HeaderLogo>
        <S.SearchColumn sm={0} xs={0} md={7} xl={12}>
          <S.InputSearch
            placeholder="Bạn muốn tìm gì? "
            suffix={<FaSearchengin size={25} />}
          ></S.InputSearch>
        </S.SearchColumn>
        <S.LoginWrapper sm={11} xs={12} md={7} xl={6}>
          {/* {userInfo.data.fullName ? (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <Link to={ROUTES.USER.USERINFO}>Thông tin cá nhân</Link>
                  ),
                  icon: <FaUserAlt />,
                },
                {
                  key: "2",
                  label: "Đăng xuất",
                  onClick: () => {
                    dispatch(logoutRequest());
                    navigate(ROUTES.USER.HOME);
                  },
                  icon: <FaSignOutAlt />,
                },
              ],
            }}
          >
            <S.Login>
              <FaUserEdit color={color.primary} size={30} />
              <S.HeadingLogin>{userInfo.data.fullName}</S.HeadingLogin>
            </S.Login>
          </Dropdown>
        ) : ( */}
          <Button onClick={() => navigate(ROUTES.LOGIN)}>Login</Button>
          {/* )} */}
        </S.LoginWrapper>
        <S.SearchColumn sm={24} xs={24} md={0} xl={0}>
          <S.InputSearch
            prefix={<FaSearchengin size={25} color={color.primary} />}
            placeholder="Tìm kiếm sản phẩm hoặc thương hiệu!"
          ></S.InputSearch>
        </S.SearchColumn>
      </S.header>
    </S.HeaderWrapper>
  );
}

export default Header;
