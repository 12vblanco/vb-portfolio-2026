import styled from "styled-components";
const Logo = () => {
  return (
    <>
      <DivContainer>
        <Div>
        {/* <LogoImg>VB</LogoImg> */}
        <LogoText>Victor Blanco</LogoText>
        </Div>
              <LogoUnderText>Web Consultancy & Development</LogoUnderText>

      </DivContainer>
    </>
  );
};

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  justify-content: center;
  align-items: center;
  margin-left: 7.2vw;
  margin-top: -.5rem;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled.div`
  font-family: var(--header-font), sans-serif;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 39px;
  letter-spacing: -3%;
  font-weight: 500;

  @media (max-width: 322px) {
    min-width: 100px;
    font-size: 14px;
  }
`;
const LogoUnderText = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  margin-top: -2px;
  font-weight: 500;
    letter-spacing: -2%;

  @media (max-width: 322px) {
    min-width: 100px;
    font-size: 14px;
  }
`;

export default Logo;
