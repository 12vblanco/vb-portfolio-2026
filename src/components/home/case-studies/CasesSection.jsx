// src/components/cases/CasesSection.jsx
import styled from "styled-components";
import SectionHeader from "../../shared/SectionHeader";
import SectionBody from "./SectionBody";

const CasesSection = ({ scrollToTop }) => {
  return (
    <SectionContainer>
        <SectionHeader>
          <h2>Case Studies</h2>
        </SectionHeader>
      <SectionBody />
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
 width: 100%;
  display: flex;
  position: relative;
  overflow-x: auto;
  left: 0;
  flex-direction: column;
  height: calc(100vh - 70px);
  border-bottom: 1px black solid;
`;


export default CasesSection;