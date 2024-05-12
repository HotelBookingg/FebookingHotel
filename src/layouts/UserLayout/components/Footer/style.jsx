import { color } from "../../../../themes/color";
import styled, { css } from "styled-components";
import { Row, Col } from "antd";
export const FooterWrapper = styled.div`
  background-color: ${color.primary};
`;
export const Footer = styled(Row)`
  width: 95%;
  color: #c7bbbb;
  margin: 0 auto !important;
  padding: 24px 0;
  max-width: 1200px;
`;
export const Information = styled(Col)`
  /* text-align: center; */
`;
export const Heading = styled.h3`
  font-size: 1.2rem;
  color: #000;
  /* text-align: center; */
`;
export const DESC = styled.div`
  color: #000;
  margin-top: 15px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
export const Title = styled.h1`
  color: #5a5858;
  font-size: 70px;
`;
export const SubTitle = styled.p`
  margin: 10px 0 20px;
  color: ${color.primaryText};
  font-size: 13px;
  opacity: 0.9;
`;
export const AppSore = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${color.primaryText};
  color: #000;
  font-weight: 550;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px #b4c8ed;
`;
export const IconAppStore = styled.span`
  margin-right: 10px;
`;
export const IconContact = styled.span`
  margin-right: 10px;
`;
