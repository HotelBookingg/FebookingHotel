import { Col, Row } from "antd";
import styled from "styled-components";
import { color } from "../../../themes/color";

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

export const Login = styled(Row)`
  position: sticky;
  z-index: 200;
  margin: 0 auto !important;
  max-width: 1000px;
  width: 80%;
  min-height: 80vh;
  align-items: center;
  height: 100%;
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  flex-direction: column;
`;
export const HeadingRight = styled.h2`
  color: ${color.primary};
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 19px;
  }
`;
export const HeadingLeft = styled.h1`
  color: ${color.primaryText};
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
`;
export const SubHeadingLeft = styled.div`
  color: ${color.primaryText};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140.4%;
  max-width: 300px;
  margin: 30px auto 0;
`;
export const Social = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
  margin: 15px;
`;
export const Icon = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid #aca7a7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;
export const SubHeadingRight = styled.div`
  color: #9a9a9a;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 140.4%;
  margin-bottom: 15px;
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;
export const Left = styled(Col)`
  position: relative;
  background-color: ${color.primary};
  min-height: 80vh;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;
export const Square = styled.div`
  width: 49px;
  height: 49px;
  flex-shrink: 0;
  background: linear-gradient(42deg, #58a7ec 26.61%, #58a7ec 84.18%);
  position: absolute;
  top: 8vh;
  left: 60%;
  z-index: 300;
  transform: rotate(-45deg);
`;
export const Triangle = styled.div`
  flex-shrink: 0;
  background: linear-gradient(42deg, #87bff0 26.61%, #60a7e4 84.18%);
  position: absolute;
  top: 50vh;
  left: 70%;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 86.6px solid #58a7ec;
  transform: rotate(-25deg);
  @media screen and (max-width: 1024px) {
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 52.2px solid #87bff0;
  }
`;
export const Rectangle = styled.div`
  flex-shrink: 0;
  background: linear-gradient(42deg, #87bff0 26.61%, #60a7e4 84.18%);
  position: absolute;
  top: 55vh;
  left: 20%;
  width: 100px;
  height: 50px;
  transform: rotate(-25deg);
`;
export const Right = styled(Col)`
  background-color: #fff;
  min-height: 80vh;
  width: 100%;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 2px 0 2px #ccc;
`;
