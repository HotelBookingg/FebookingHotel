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
  @media screen and (min-width: 400px) and (max-width: 1024px) {
    height: auto;
  }
`;
export const header = styled(Row)`
  width: 97%;
  margin: 0 auto 0 !important;
  align-items: center;
  @media screen and (min-width: 400px) and (max-width: 1024px) {
    margin-top: 15px !important;
  }
`;
export const ImageLogo = styled.img`
  width: 200px;
  height: 100px;
  max-width: 100%;
`;
export const Menu = styled(Col)`
  & .ant-col {
    font-size: 1rem;
    color: ${color.primaryText};
    font-weight: 600;

    &:hover {
      cursor: pointer;
      animation: 0.3 all;
      opacity: 0.8;
    }
  }
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
  gap: 7px;
`;
export const HeadingLogin = styled(Col)`
  font-size: 1.2rem;
  color: ${color.primaryText};
`;
export const HeaderLogo = styled(Col)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
