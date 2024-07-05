import styled from "styled-components";
import { color } from "themes/color";
export const DashboardWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;
export const Dashboard = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  & > canvas {
    width: 100% !important;
    max-width: 1100px;
    height: 70vh !important;
  }
`;
export const Heading = styled.h1`
  width: 100%;
  text-align: center;
  color: ${color.outstanding};
`;
