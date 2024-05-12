import styled, { css } from "styled-components";
import { Button, Rate, Row } from "antd";
import { color } from "themes/color";
import Column from "antd/es/table/Column";

export const HotelListWrapper = styled.div`
  margin: 0 auto 0;
  width: 100%;
  max-width: 1200px;
  background-color: ${color.primaryText};
  margin: 0 auto 20px;
`;
export const AddressAndRate = styled(Row)`
  margin-top: 15px;
`;
export const Address = styled(Column)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PriceDESC = styled.span`
  background-color: #f5f5f5;
  padding: 8px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      color: ${color.primaryText};
      background-color: rgb(238, 77, 45);
    `}
  @media screen and (max-width:550px) {
    min-height: 62.8px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;
export const PriceASC = styled.span`
  background-color: #f5f5f5;
  cursor: pointer;
  padding: 8px;
  ${({ active }) =>
    active &&
    css`
      color: ${color.primaryText};
      background-color: rgb(238, 77, 45);
    `}
  @media screen and (max-width:550px) {
    min-height: 62.8px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-align: center;
  }
`;
export const HotelItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 4px 10px #b4c8ed;
`;
export const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }
`;
export const ChooseHotel = styled(Button)`
  background-color: #ff5e1f;
  color: ${color.primaryText};
  font-weight: 650;
`;
export const FullBox = styled.div`
  font-size: 0.7rem;
  border-radius: 3px;
  z-index: 100;
  top: 0px;
  left: 0px;
  position: absolute;
  width: 130px;
  padding: 5px 2px;
  background-color: ${color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  & > p {
    color: ${color.primaryText};
    font-weight: 700;
    font-size: 13px;
  }
`;
export const Information = styled.div`
  color: ${color.primary};
  padding: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (max-width: 1140px) and (min-width: 768px) {
  }
  @media screen and (max-width: 768px) {
    min-height: 120px;
  }
`;
export const Name = styled.div`
  color: #000;
  background-color: #ffdc00;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  width: 50%;
  min-width: 150px;
  border-radius: 16px;
`;
export const Price = styled.div`
  margin-top: 1em;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5em;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    flex-direction: row;
    gap: 1em;
  }
`;
export const OldPrice = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  text-decoration: ${(props) =>
    props.discount !== 0 ? "line-through" : "none"};
  color: ${(props) =>
    props.discount !== 0 ? "#a19a9a" : `${color.outstanding}`};
  @media screen and (min-width: 1200px) {
    width: 100%;
  }
`;
export const PriceRate = styled(Rate)`
  width: 100%;
  color: #ffdc00;
  font-size: 0.8rem;
`;
export const CurrentPrice = styled.div`
  font-size: 1.1rem;
  display: ${(props) => (props.discount === 0 ? "none" : "flex")};
  color: ${color.outstanding};
  font-weight: 600;
`;
export const Unit = styled.span`
  font-size: 0.75rem;
`;
export const ShowMore = styled(Row)`
  width: 100%;
  margin-top: 16px;
  justify-content: center;
`;
