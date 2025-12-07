import { HashLink as Link } from "react-router-hash-link";
import styled from "styled-components";
import ContactBtn from "../ContactBtn.jsx";

const Buttons = ({ handleToggle, isOpen }) => {
  const handleContactClick = () => {
    handleToggle();
    window.location.href = "/home#form";
  };

  return (
    <Div>
      <Link to="/home#form">
        {isOpen ? (
          <ContactBtn onClick={handleContactClick} tagName={"Get in touch"} />
        ) : (
          <ContactBtn tagName={"Get in touch"} />
        )}
      </Link>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export default Buttons;
