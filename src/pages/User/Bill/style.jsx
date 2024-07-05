import { Button, Col, Row } from "antd";
import styled from "styled-components";
import { color } from "themes/color";

export const BillWrapper = styled(Row)`
  align-items: center;
  height: 100vh;
  justify-content: center;
  background: ${color.primary};
`;
export const BillPay = styled(Row)`
  /* align-items: center; */
  max-height: 600px;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  padding: 16px;
  background-color: ${color.primaryText};
  box-shadow: 2px 4px 12px #b4c8ed;
  border-radius: 4px;
  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
    width: 90%;
  }
`;
export const InfoWrapper = styled(Row)`
  width: 100%;
  margin-top: 5px;
`;
export const Title = styled.div`
  font-size: 2.3rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
    width: 90%;
  }
`;
export const Info = styled.div`
  font-size: 1rem;
  margin-top: 3px;
`;
export const HotelInfo = styled(Col)`
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`;
export const TitleInfo = styled(Col)`
  font-size: 1.1rem;
  margin-top: 7px;
  font-weight: 600;
  text-align: center;
`;
export const Dot = styled.div`
  font-size: 1.5rem;
  opacity: 0.2;
`;
export const BookingInfo = styled.div`
  margin-top: 3px;

  && > p {
    display: inline-block;
    width: 150px;
  }
`;
export const CodeBill = styled.div`
  font-size: 1rem;
`;
export const Heading = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${color.primary};
`;
export const NameHotel = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${color.primary};
  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
    width: 90%;
  }
`;
export const TotalPrice = styled.div`
  display: flex;
  color: ${color.outstanding};
  font-weight: 600;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
`;
export const Unit = styled.span`
  font-size: 0.75rem;
`;
export const ImageLogo = styled.img`
  width: 200px;
  max-width: 100%;
`;
export const Revert = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-top: 10px;
  color: ${color.primaryText};
  font-weight: 700;
  background-color: ${color.primary};
`;
