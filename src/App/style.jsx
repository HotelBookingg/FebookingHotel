import styled, { keyframes } from "styled-components";
const loading = keyframes`
to {
  transform: scale(0);
}
`;
export const Loading = styled.div`
  width: 5rem;
  height: 5rem;
  position: relative;
`;
export const LoadingWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  display: ${(props) => (props.isShowLoading ? " flex" : "none")};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
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
