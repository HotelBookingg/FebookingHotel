import { Col, Row, Table } from "antd";
import styled from "styled-components";
import { color } from "themes/color";
export const TableManage = styled(Table)`
  box-shadow: 2px 4px 12px #b4c8ed;
  & .ant-table-cell {
    text-align: center;
  }
  & .ant-table-thead {
    & .ant-table-cell {
      text-align: center;
    }
  }
`;
export const Unit = styled.span`
  font-size: 0.75rem;
`;
export const HotelManager = styled(Row)`
  width: 90%;
  max-width: 1400px;
  margin: 25px auto !important;
`;
export const Title = styled(Col)`
  text-align: center;
`;
export const Price = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f34040;
  font-weight: 600;
`;
export const FilterWrapper = styled.div`
  margin: 16px 0;
  padding: 16px;
  border-radius: 4px;
  background-color: #ccc;
  width: 100%;
`;
export const Heading = styled.h1`
  color: ${color.primary};
  text-align: center;
`;
export const IntoMoney = styled(Col)`
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${color.outstanding};
    font-weight: 600;
    width: 100%;
    height: 100%;
  }
`;
export const TotalPrice = styled(Col)`
  display: flex;
  color: ${color.outstanding};
  font-weight: 600;
  width: 100%;
  height: 100%;
`;
