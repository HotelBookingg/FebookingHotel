import { Link, useLocation, useNavigate } from "react-router-dom";
import * as S from "./style";
import { ROUTES } from "constants/routes";
import {
  FaSearchengin,
  FaSignOutAlt,
  FaUserAlt,
  FaUserEdit,
} from "react-icons/fa";

import qs from "qs";

import { color } from "themes/color";
import { Button, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { logoutRequest } from "../../../../redux/slicers/auth.slicer";
import { hiddenSearchSuggestion } from "../../../../redux/slicers/searchSuggestion.slice";

import { useEffect, useMemo, useState } from "react";

import {
  getSearchSuggestionRequest,
  createSearchHistoryRequest,
  getSearchHistoryRequest,
} from "../../../../redux/slicers/hotel.slicer";

function Header() {
  const [isHiddenAngleUp, setIsHiddenAngleUp] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { isSHowSearchSuggestions } = useSelector((state) => state.search);

  const { searchSuggestions, searchHistories } = useSelector(
    (state) => state.hotel
  );
  const navigate = useNavigate();

  const { search } = useLocation();
  useEffect(() => {
    const searchParams = qs.parse(search, {
      ignoreQueryPrefix: true,
    });
    setSearchKey(searchParams.searchKey);
  }, [search]);
  const handleSearchKeyWord = (e) => {
    if (e.key === "Enter") {
      const newFilterParams = {
        searchKey: searchKey,
      };
      // if (searchKey !== "" && userInfo.data.id) {
      //   const indexEmpty = searchHistories.data.findIndex(
      //     (item) => item.searchKey === searchKey
      //   );
      //   if (indexEmpty === -1) {
      //     dispatch(
      //       createSearchHistoryRequest({
      //         data: {
      //           userId: userInfo.data.id,
      //           searchKey: searchKey,
      //         },
      //       })
      //     );
      //   }
      // }
      // dispatch(hiddenSearchSuggestion());
      navigate({
        pathname: ROUTES.USER.HOME,
        search: qs.stringify(newFilterParams),
      });
    }
  };
  // const handleGetSearchSuggestions = (e) => {
  //   if (
  //     (e.which >= 65 && e.which <= 90) ||
  //     (e.which >= 97 && e.which <= 122) ||
  //     (e.which >= 48 && e.which <= 57) ||
  //     e.which === 8
  //   ) {
  //     indexSearchSuggestion.current = -1;
  //     const searchParams = qs.parse(search, {
  //       ignoreQueryPrefix: true,
  //     });
  //     dispatch(
  //       getSearchSuggestionRequest({
  //         page: 1,
  //         limit: 8,
  //         searchKey: e.target.value,
  //         gender: searchParams.gender,
  //         categoryId: searchParams.categoryId
  //           ? searchParams.categoryId.map((id) => parseInt(id))
  //           : [],
  //       })
  //     );
  //   }
  //   if (
  //     e.which === 40 &&
  //     (indexSearchSuggestion.current < searchSuggestions.data.length - 1 ||
  //       indexSearchSuggestion.current < searchHistories.data.length - 1)
  //   ) {
  //     indexSearchSuggestion.current = indexSearchSuggestion.current + 1;
  //     if (searchSuggestions.data[0]?.name) {
  //       setSearchKey(
  //         searchSuggestions.data[indexSearchSuggestion.current]?.name
  //       );
  //     } else {
  //       setSearchKey(
  //         searchHistories.data[indexSearchSuggestion.current]?.searchKey
  //       );
  //     }
  //   }
  //   if (e.which === 38 && indexSearchSuggestion.current > 0) {
  //     indexSearchSuggestion.current = indexSearchSuggestion.current - 1;
  //     if (searchSuggestions.data[0]?.name) {
  //       setSearchKey(
  //         searchSuggestions.data[indexSearchSuggestion.current].name
  //       );
  //     } else {
  //       setSearchKey(
  //         searchHistories.data[indexSearchSuggestion.current]?.searchKey
  //       );
  //     }
  //   }
  // };

  // const renderSearchSuggestions = useMemo(() => {
  //   if (searchKey !== "") {
  //     return searchSuggestions?.data.map((item) => {
  //       return (
  //         <S.TextSuggestions
  //           key={item.id}
  //           onClick={() => {
  //             dispatch(hiddenSearchSuggestion());
  //             navigate({
  //               pathname: ROUTES.USER.PRODUCT_LIST,
  //               search: qs.stringify({
  //                 searchKey: item.name,
  //               }),
  //             });
  //           }}
  //         >
  //           {item.name}
  //         </S.TextSuggestions>
  //       );
  //     });
  //   } else {
  //     return searchHistories?.data.map((item) => {
  //       return (
  //         <S.TextSuggestions
  //           onClick={() => {
  //             dispatch(hiddenSearchSuggestion());
  //             navigate({
  //               pathname: ROUTES.USER.PRODUCT_LIST,
  //               search: qs.stringify({
  //                 searchKey: item.searchKey,
  //               }),
  //             });
  //           }}
  //           key={item.id}
  //         >
  //           <FaHistory size={10} /> {item.searchKey}
  //         </S.TextSuggestions>
  //       );
  //     });
  //   }
  // }, [searchSuggestions?.data, searchHistories?.data]);
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
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
              // if (!isSHowSearchSuggestions) {
              //   dispatch(showSearchSuggestion());
              // }
            }}
            onKeyDown={(e) => handleSearchKeyWord(e)}
            placeholder="Bạn muốn tìm gì? "
            suffix={<FaSearchengin size={25} />}
          ></S.InputSearch>
        </S.SearchColumn>
        <S.LoginWrapper sm={11} xs={12} md={7} xl={6}>
          {userInfo?.data.email ? (
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
                <FaUserEdit color={color.primaryText} size={30} />
                <S.HeadingLogin>{userInfo.data.fullName}</S.HeadingLogin>
              </S.Login>
            </Dropdown>
          ) : (
            <Button onClick={() => navigate(ROUTES.LOGIN)}>Login</Button>
          )}
        </S.LoginWrapper>
        <S.SearchColumn sm={24} xs={24} md={0} xl={0}>
          <S.InputSearch
            prefix={<FaSearchengin size={25} color={color.primary} />}
            placeholder="Bạn muốn tìm gì?"
          ></S.InputSearch>
        </S.SearchColumn>
      </S.header>
    </S.HeaderWrapper>
  );
}

export default Header;
