import { Col } from "antd";
import { FaCircle } from "react-icons/fa6";
import * as S from "./style";
function Nav() {
  return (
    <S.NavList>
      <S.NavItem>
        Apartments
        <span>
          <FaCircle size={7} color="black" />
        </span>
      </S.NavItem>
      <S.NavItem>
        House
        <span>
          <FaCircle size={7} color="black" />
        </span>
      </S.NavItem>
      <S.NavItem>
        Villas
        <span>
          <FaCircle size={7} color="black" />
        </span>
      </S.NavItem>
      <S.NavItem>
        Homestays
        <span>
          <FaCircle size={7} color="black" />
        </span>
      </S.NavItem>
      <S.NavItem>More</S.NavItem>
    </S.NavList>
  );
}

export default Nav;
