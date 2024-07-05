import { Button, Col, Image, Row } from "antd";
import styled from "styled-components";
import { color } from "themes/color";

export const CheckoutWrapper = styled.div`
  margin: 0 auto;
  padding: 24px;
  background-color: ${color.primaryText};
`;
export const Heading = styled.h1`
  display: block;
  margin-top: 16px;
  color: ${color.outstanding};
  font-weight: 550;
`;
export const TotalPrice = styled(Col)`
  display: flex;
  color: ${color.outstanding};
  font-weight: 600;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
`;
export const SubHeading = styled.h3`
  display: block;
  margin-top: 16px;
  color: ${color.primary};
  font-weight: 650;
`;
export const Address = styled(Row)`
  margin: 10px 0;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;
export const ChangeDefaultAddress = styled(Button)`
  margin: 10px 0;
  padding: 8px;
  display: flex;
  align-items: center;
`;
export const Unit = styled.span`
  font-size: 0.75rem;
`;
// Information room
export const InfoRoomWrapper = styled(Row)`
  background-color: #f5f5f5;
  padding: 16px;
`;
export const CartItem = styled(Row)`
  width: 100%;
  margin-top: 8px;
  border-top: 1px solid #ccc;
  padding-top: 15px;
`;

export const ImageCartWrapper = styled(Col)`
  text-align: center;
`;
export const Title = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${color.primary};
  font-weight: 600;
  font-size: 1.1rem;
`;
export const InfoRoom = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 1rem;
`;
export const ChooseRoom = styled(Button)`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;
export const ImageRoom = styled(Image)`
  width: 100% !important;
  height: 100%;
`;
