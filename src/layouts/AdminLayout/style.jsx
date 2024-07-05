import styled, { keyframes } from "styled-components";
const loading = keyframes`
to {
  transform: scale(0);
}
`;
export const MainWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
`;
export const LayoutAdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
export const MainContainer = styled.div`
  margin-left: ${(props) => (props.isShowSidebar ? "250px" : "0px")};
  width: ${(props) => (props.isShowSidebar ? "calc(100% - 250px)" : "100%")};
  transition: all 0.3s;
`;
export const Loading = styled.div`
  width: 5rem;
  height: 5rem;
  position: relative;
`;
export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #f9f6f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Dot = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transform: rotate(calc(var(--value) * 45deg));
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border: 4px solid #4765b7;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    filter: hue-rotate(calc(var(--value) * 45deg));
    animation: 1s ${loading} infinite;
    animation-delay: calc(var(--value) * 0.125s);
    animation-timing-function: linear;
  }
`;
