import styled from "styled-components";
export const TopRight = styled.div`
  right: 0;
  position: fixed;
  background-color: #e35e6a;
  width: 20.4530263158%;
  height: 53.2304109589vh;
  transform: rotate(42.541deg);
  z-index: 100;
`;
export const BottomLeft = styled.div`
  left: -8%;
  bottom: -30vh;
  position: fixed;
  width: 500px;
  height: 500px;
  flex-shrink: 0;
  border-radius: 500px;
  z-index: 300;
  background: linear-gradient(
    42deg,
    #fb0 26.61%,
    rgba(255, 213, 97, 0.57) 84.18%
  );
  @media screen and (max-width: 768px) {
    width: 250px;
    height: 250px;
    border-radius: 250px;
    bottom: -5vh;
    z-index: 100;
  }
  @media screen and (max-width: 1024px) {
    width: 250px;
    height: 250px;
    border-radius: 250px;
    bottom: -5vh;
  }
  @media screen and (min-width: 1025px) and (max-width: 1350px) {
    width: 350px;
    height: 350px;
    border-radius: 350px;
    bottom: -20vh;
  }
`;
