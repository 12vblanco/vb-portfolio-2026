import { HashLink as Link } from "react-router-hash-link";
import styled from "styled-components";
import CONSTANTS from "../Constants";
import Logo from "./Logo";
import NavContact from "./NavContact";

const HorizontalNav = ({ handleToggle, isOpen }) => {
  return (
    <>
      {isOpen ? (
        <NavBox onClick={handleToggle}>
          <Link to="/#home">
            <Logo />
          </Link>
          <NavContact
            handleToggle={handleToggle}
            isOpen={isOpen}
            tagName={"Get in touch"}
          />
        </NavBox>
      ) : (
        <NavBox>
          <Link to="/#home">
            <Logo />
          </Link>
          <NavContact
            handleToggle={handleToggle}
            isOpen={isOpen}
            tagName={"Get in touch"}
          />
        </NavBox>
      )}
    </>
  );
};

const NavBox = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 70px;
  background: ${CONSTANTS.COLOUR.white};
  width: calc(100% - 70px);
  height: 70px;
  z-index: 22221;
  border-width: 0px 1px 1px 0px;
  border-style: solid;
  border-color: var(--blue);
  scroll-behavior: smooth;
  @media (max-width: 600px) {
    width: calc(100% - 70px);
  }
`;

export default HorizontalNav;
