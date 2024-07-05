import { Button, Form } from "antd";
import styled from "styled-components";
import { color } from "themes/color";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  & .ant-form-item-label {
    min-width: 130px;
    text-align: left;
  }
`;
export const CreateForm = styled(Form)`
  max-width: 1000px;
  margin: 0 auto;
`;
export const Heading = styled.h2`
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
export const TopWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #ccc;
  z-index: 97;
  padding: 20px 100px;
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
