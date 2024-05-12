import { Row, Col } from "antd";
import styled from "styled-components";
import { color } from "themes/color";

export const NavList = styled(Row)`
  max-width: 1200px;
  width: 95%;
  margin: 20px auto 0;
  gap: 25px;
  & div:first-child::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: ${color.primary};
  }
`;
export const NavItem = styled(Col)`
  font-size: 15px;

  &&:hover {
    cursor: pointer;
    animation: 0.3 all;
  }

  & > span {
    margin-left: 15px;
  }
`;
