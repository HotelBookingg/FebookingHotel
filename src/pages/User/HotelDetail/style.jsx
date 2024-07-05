import styled, { css } from "styled-components";
import { Button, Rate, Row, Image, Col, Input, Upload } from "antd";
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
  border-radius: 12px;
  width: 100%;
`;
export const ImageShowMore = styled.img`
  width: 100%;
  border-radius: 12px;
  height: 100%;
  object-fit: cover;
`;
export const ImageItem = styled(Col)`
  & .css-dev-only-do-not-override-17bun7n {
    width: 100% !important;
  }
`;
export const Photo = styled(Col)`
  & .css-dev-only-do-not-override-17bun7n {
    width: 100% !important;
    height: 320px;
  }
`;
export const AllImage = styled.div`
  width: 100%;
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
export const HeadingRoom = styled.div`
  font-size: 26px;
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
export const InfoRoomWrapper = styled(Row)`
  box-shadow: rgba(3, 18, 26, 0.2) 0px 1px 2px 0px;
  width: 100%;
  background-color: rgb(247 249 250);
  border-radius: 6px;
  padding-bottom: 12px;
  margin: 0 !important;
`;
export const TitleRoom = styled(Col)`
  padding: 8px;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid #e1e6e6;
  text-align: center;
`;
export const TitleHeadRoom = styled(Col)`
  padding: 8px;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid #e1e6e6;
  border-top-left-radius: 6px;
  text-align: center;
`;
export const RoomInfo = styled(Col)`
  padding: 16px;
  font-weight: 600;
  border: 1px solid #e1e6e6;
  text-align: center;
`;
export const Note = styled(Col)`
  padding: 16px;
  font-weight: 600;
  text-align: center;
  color: #f22e2e;
  font-size: 1rem;
`;
export const RoomWrapper = styled(Col)`
  padding-bottom: 16px;
  box-shadow: rgba(3, 18, 26, 0.2) 0px 1px 2px 0px;
  border-radius: 12px;
  margin-top: 20px;
`;
export const TitleLastRoom = styled(Col)`
  padding: 8px;
  font-size: 1rem;
  font-weight: 600;
  border: 0.5px solid #e1e6e6;
  border-top-right-radius: 6px;
  text-align: center;
`;
export const ImageRoom = styled(Image)`
  border-radius: 16px;
  width: 100%;
  height: 100% !important;
  object-fit: cover;
`;
export const Require = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
  font-size: 1rem;
`;
export const UtilitiesRoom = styled.div`
  margin-top: 5px;
  display: flex;
  gap: 10px;
  font-size: 0.9rem;

  &:nth-of-type(1) {
    margin-top: 20px;
  }
`;
export const Trapezoid = styled.img`
  width: 467px;
  aspect-ratio: auto 467 / 420;
  height: 420px;
  top: 0;
  left: 0;
  position: absolute;
`;
export const ImageWrapper = styled.div`
  & .ant-image {
    width: 100%;
    height: 200px;
  }
`;
export const Camera = styled(Upload)`
  & .ant-upload-list-item-container,
  & .ant-upload {
    width: 70px !important;
    height: 70px !important;
  }
  & .ant-upload-list-item {
  }
  margin-left: 15px;
  margin-top: 10px;
  font-size: 1.2rem;
`;
export const ReviewWrapper = styled.div`
  width: 100%;
  color: ${color.primary};
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
`;
export const ReviewHead = styled.div`
  position: relative;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: ${color.primary};

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 80px;
    height: 3px;
    background-color: ${color.primary};
  }
`;
export const Stars = styled.div`
  display: flex;
  align-items: center;
`;
export const RatingOverviewScore = styled.div`
  display: flex;
  align-items: center;
  color: ${color.outstanding};
`;
export const RatingOverview = styled.span`
  font-size: 3rem;
  margin-right: 4px;
`;
export const RatingPeak = styled.span`
  font-size: 1.3rem;
`;
export const SearchOfOverview = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
`;
export const QuantityComment = styled.div``;
export const InputWrapper = styled.div`
  background-color: #fff;
  min-height: 130px;
  border-radius: 8px;
  border: 1px solid #ccc;

  & .ant-form-item {
    margin-bottom: 5px !important;
  }
`;
export const InputReview = styled(Input)`
  background-color: #fff;
  border: none !important;
  &:active,
  &:focus {
    border-color: initial !important;
    box-shadow: none !important;
  }
`;
export const ImageAndVideo = styled.div``;

export const ReviewFormWrapper = styled.div`
  margin-top: 15px;
  padding: 12px;
  border-radius: 4px;
  background-color: #fbfdff;
  color: ${color.primary};
`;

export const ReviewItemWrapper = styled(Col)`
  width: 100%;
  padding: 12px 25px !important;
  & .css-dev-only-do-not-override-17bun7n {
    width: 100%;
  }
  margin-top: 0 !important;
`;
export const Title = styled.label`
  font-size: 1rem;
`;
export const Text = styled.label`
  font-size: 0.8rem;
`;
export const Comment = styled.label`
  display: inline-block;
  margin-top: 4px;
`;
export const Avatar = styled.label`
  display: block;
  width: 60px;
  height: 60px;
  @media screen and (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
  & > img {
    border-radius: 50%;
    height: 100%;
  }
`;
export const ImageReviewWrapper = styled(Row)`
  margin: 0 !important;
  width: 100%;
`;
export const ImageHotelList = styled(Row)`
  margin: 0 !important;
  width: 100%;
`;
export const Review = styled(Row)`
  margin: 0 !important;
  width: 100%;
`;
export const HotelDetail = styled(Row)`
  margin: 0 !important;
  width: 100%;
`;
export const RoomItem = styled(Row)`
  margin: 0 !important;
  width: 100%;
`;
export const ReviewUser = styled(Row)`
  box-shadow: #c0dbf6 0px 1px 2px 0px;
  margin: 0 !important;
  width: 100%;
  background-color: #f0f7fe;
  border-radius: 16px;
`;
export const ImageReview = styled(Image)`
  border-radius: 12px;
  height: 100% !important;
  width: 100%;
  object-fit: fill;
`;
export const ImageReviewItem = styled(Col)`
  margin-top: 10px;
  width: 100%;
  & .ant-image .css-dev-only-do-not-override-17bun7n {
    height: 120px !important;
  }
`;
