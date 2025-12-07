import { useEffect } from "react";
import styled from "styled-components";
import ContactBtn from "../../../components/elements/ContactBtn.jsx";

function Success() {
  useEffect(() => {
    console.log("Success component mounted, scrolling to top");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleBackHome = () => {
    window.location.href = "/home";
  };

  return (
    <Div>
      <h2>Thank you for submitting the form!</h2>
      <Text>We will get back to you soon.</Text>
      <ContactBtn onClick={handleBackHome} tagName={"Go Back!"} />
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  border-right: solid 1px #000;
  margin-bottom: -10%;

  /* @media (max-width: 860px) {
    height: fit-content;
  }
  @media (max-width: 816px) {
    flex-direction: column;
  } */
`;

const Text = styled.p`
  margin-bottom: 44px;
  font-weight: 500;
`;

export default Success;
