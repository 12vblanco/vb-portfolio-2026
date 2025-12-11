import styled from "styled-components";
import SectionHeader from "../../shared/SectionHeader";
import PendoCertificates from "./PendoCertificates";
import PendoServices from "./PendoServices";

const PendoAnalytics = (scrollToTop) => {
  return (
    <Div>
      <SectionHeader>
        <h2>Pendo Analytics, <br/>Reporting & Development</h2>
      </SectionHeader>
      
      <Container>
        {/* First Row: 2 columns, 70% height, 50% width each */}
        <FirstRow>
          <FirstCol1><PendoServices/></FirstCol1>
          <FirstCol2>Column 2</FirstCol2>
        </FirstRow>
        
        {/* Second Row: 2 rows - first fit-content, second fills remaining space */}
        <SecondRow>
          <SecondRowTop>
            <PendoCert>
              <h2 >Pendo Certifications</h2>
            </PendoCert>
            </SecondRowTop>
          <SecondRowBottom>
            <PendoCertificates/>
          </SecondRowBottom>
        </SecondRow>
      </Container>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px);
  height: fit-content;
  border-bottom: 1px black solid;
  padding-bottom: 2rem;
    max-height: calc(100vh - 70px);

`;

const Container = styled.div`
   display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
`;

const FirstRow = styled.div`
  display: flex;
  width: calc(100vw - 35px);
  height: auto;
  height: 60vh; 
`;

const FirstCol1 = styled.div`
  flex: 1;
  width: calc(60vw - 35px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-right: 10px solid white;
`;

const FirstCol2 = styled.div`
  flex: 1;
  width: calc(40vw - 35px);
  background-color: #4ECDC4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const SecondRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 30%;
`;

const SecondRowTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  padding: 20px;
  border-bottom: 10px solid white;
`;

const PendoCert = styled(SectionHeader)`
  margin: 0;
  padding: 0 0 0 10vw;
  color: #BD3B3D;
  padding-top: 3rem;
`

const SecondRowBottom = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export default PendoAnalytics;