import styled from "styled-components";
import SectionHeader from "../../shared/SectionHeader";


const PendoAnalytics = (scrollToTop) => {
  return (
    <Div>
      <SectionHeader>
        <h2>Pendo Analytics, <br/>Reporting & Development</h2>
      </SectionHeader>
    </Div>
  );
};


const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  border-bottom: 1px black solid;
`;
export default PendoAnalytics;
