import { Button, Col, Row } from "antd";
import styled from "styled-components";
import { color } from "themes/color";

export const FilterWrapper = styled.div`
  margin: 16px 0;
  padding: 16px;
  border-radius: 4px;
  background-color: #ccc;
`;
export const HotelManager = styled(Row)`
  max-width: 1200px;
  margin: 25px auto !important;
`;
export const HotelManagerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const Heading = styled.h1`
  color: ${color.primary};
`;
export const BTSubmit = styled(Button)`
  background-color: ${color.primary};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;
export const Update = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
export const RoomListWrapper = styled(Row)`
  background-color: #f5f5f5;
  padding: 16px;
`;
export const Title = styled(Col)`
  text-align: center;
`;
export const RoomItem = styled(Row)`
  width: 100%;
  margin-top: 8px;
  border-top: 1px solid #ccc;
  padding-top: 15px;
`;
