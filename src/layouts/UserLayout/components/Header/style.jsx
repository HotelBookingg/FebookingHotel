import { color } from "themes/color";
import styled, { css } from "styled-components";
import { Row, Col, Input } from "antd";
export const HeaderWrapper = styled.div`
  background-color: ${color.primary};
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 300;
  padding-bottom: 16px;
  box-shadow: 0 0 25px ${color.primary};
  @media screen and (min-width: 767px) and (max-width: 1024px) {
    height: auto;
  }
`;
export const header = styled(Row)`
  width: 95%;
  max-width: 1200px;
  margin: 0 auto 0 !important;
  align-items: center;
`;
export const ImageLogo = styled.img`
  width: 200px;
  height: 100px;
  max-width: 100%;
  @media screen and (max-width: 450px) {
    width: 135px;
    height: 18px;
  }
`;
export const SearchColumn = styled(Col)`
  position: relative;
`;
export const InputSearch = styled(Input)`
  padding: 4px 8px;
`;
export const LoginWrapper = styled(Col)`
  display: flex;
  align-items: center;
  gap: 2em;
  justify-content: right;
`;
export const Login = styled(Col)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const HeadingLogin = styled(Col)`
  font-size: 1rem;
  color: ${color.primary};
`;
export const HeaderLogo = styled(Col)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
