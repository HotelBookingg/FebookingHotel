import * as S from "./style";
import { Link } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { Col, Row } from "antd";

import {
  FaAppStoreIos,
  FaPlay,
  FaSquareTwitter,
  FaFacebook,
  FaInstagram,
  FaInvision,
} from "react-icons/fa6";

function Footer() {
  return (
    <S.FooterWrapper>
      <S.Footer justify={"space-between"} gutter={[64, 32]}>
        <Col span={10}>
          <S.Title>HOTEL</S.Title>
          <S.SubTitle>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </S.SubTitle>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <S.AppSore>
                <S.IconAppStore>
                  <FaPlay size={25} color="#5a5858" />
                </S.IconAppStore>
                PlayStore
              </S.AppSore>
            </Col>
            <Col span={12}>
              <S.AppSore>
                <S.IconAppStore>
                  <FaAppStoreIos size={25} color="#5a5858" />
                </S.IconAppStore>
                AppleStore
              </S.AppSore>
            </Col>
          </Row>
        </Col>
        <Col span={14} style={{ marginTop: "15px" }}>
          <Row gutter={[16, 16]}>
            <S.Information xs={24} xl={8}>
              <S.Heading>COMPANY</S.Heading>
              <S.DESC>About Us</S.DESC>
              <S.DESC>Legal Information</S.DESC>
              <S.DESC>Contact Us</S.DESC>
              <S.DESC>Blogs</S.DESC>
            </S.Information>
            <S.Information xs={24} xl={8}>
              <S.Heading>HELP CENTER</S.Heading>
              <S.DESC>Find a Property</S.DESC>
              <S.DESC>How To Host?</S.DESC>
              <S.DESC>Why Us?</S.DESC>
              <S.DESC>FAQs</S.DESC>
              <S.DESC>Rental Guides</S.DESC>
            </S.Information>
            <S.Information xs={24} xl={8}>
              <S.Heading>CONTACT INFO</S.Heading>
              <S.DESC>Phone: 1234567890</S.DESC>
              <S.DESC>Email: company@email.com</S.DESC>
              <S.DESC>Location: 100 Smart Street, LA, USA</S.DESC>
              <S.DESC>
                <S.IconContact>
                  <FaFacebook size={25} />
                </S.IconContact>
                <S.IconContact>
                  <FaInstagram size={25} />
                </S.IconContact>
                <S.IconContact>
                  <FaSquareTwitter size={25} />
                </S.IconContact>
                <S.IconContact>
                  <FaInvision size={25} />
                </S.IconContact>
              </S.DESC>
            </S.Information>
          </Row>
        </Col>
      </S.Footer>
    </S.FooterWrapper>
  );
}

export default Footer;
