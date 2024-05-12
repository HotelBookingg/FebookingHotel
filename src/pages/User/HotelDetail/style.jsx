import styled, { css } from "styled-components";
import { Button, Rate, Row, Image } from "antd";
import { color } from "themes/color";

export const HotelDetailWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: ${color.primaryText};
  margin: 20px auto;

  && > :where(.css-dev-only-do-not-override-17nbbvg) .ant-image {
    display: block;
  }
`;
export const ImageHotel = styled(Image)`
  width: 100%;
  border-radius: 12px;
  height: 100%;
`;
export const ImageShowMore = styled.img`
  width: 100%;
  border-radius: 12px;
  height: 100%;
`;
export const AllImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
export const AllImageWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  border-radius: 12px;
`;
export const RateWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 20px;
`;
export const RateHotel = styled(Rate)`
  font-size: "14px";
`;
export const DESCAllImage = styled.p`
  margin-top: 65px;
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
export const Heading = styled.div`
  font-size: 20px;
  font-weight: 700;
  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 12px;
    width: 100px;
    height: 3px;
    background-color: ${color.primary};
  }
`;
export const RateCustomer = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-101%);
    width: 140px;
    height: 3px;
    background-color: ${color.primary};
  }
`;
export const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
export const AddressWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;
export const Address = styled.div`
  font-size: 16px;
`;
export const PriceAndChoose = styled.div`
  text-align: right;
`;
export const Price = styled.div`
  margin-top: 10px;
  color: #ff5e1f;
  font-size: 20px;
  font-weight: 700;
`;
export const ChooseHotel = styled(Button)`
  margin-top: 15px;
  background-color: #ff5e1f;
  color: ${color.primaryText};
  font-weight: 650;
  min-width: 175px;
`;
export const Introduce = styled.div`
  text-align: justify;
  font-size: 14px;
  width: 100%;
  max-width: 400px;
`;
export const AreaWrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;
export const Area = styled.div`
  width: 180px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  gap: 4px;

  && > div {
    font-weight: 600;
    color: rgba(3, 18, 26, 1);
  }
`;
export const Mileage = styled.div`
  margin-left: 50px;
`;
export const Utilities = styled.div`
  margin-top: 5px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  gap: 12px;

  && > div {
    font-weight: 600;
    color: rgba(3, 18, 26, 1);
  }
`;
