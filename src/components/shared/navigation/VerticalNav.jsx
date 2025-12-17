import styled from "styled-components";
import CONSTANTS from "../Constants";
import Burger from "./Burger";
import Social from "./Social";

const VerticalNav = ({ handleToggle, isOpen }) => {
  return (
    <>
      {isOpen ? (
        <NavBox onClick={handleToggle}>
          <Burger handleToggle={handleToggle} isOpen={isOpen} />
          <Social isOpen={isOpen} />
        </NavBox>
      ) : (
        <NavBox>
          <Burger handleToggle={handleToggle} isOpen={isOpen} />
          {isOpen ? "" : <Social />}
        </NavBox>
      )}
    </>
  );
};

const NavBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0px;
  height: 100vh;
  background: ${CONSTANTS.COLOUR.white};
  width: 70px;
  z-index: 22220;
  border-width: 0px 1px 1px 0px;
  border-style: solid;
  border-color: var(--blue);
  scroll-behavior: smooth;
  @media (max-width: 440px) {
    height: 60px;
  }
`;

export default VerticalNav;
