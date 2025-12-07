import styled from "styled-components";
import SectionContainer from "../../elements/SectionContainer";
import SectionDiv from "../../elements/SectionDiv";
import Title from "../../elements/Title";
import ContactForm from "./Form";

const PostFrom = () => {
  return (
    <Div>
      <SectionContainer style={{ background: "black" }}>
        <FormTag id="form" />
        <FlexDiv>
          <Title>Contact</Title>
          {/* <H3> I'll Get in touch</H3> */}
        </FlexDiv>
        <SectionDiv>
          <ContactForm />
        </SectionDiv>
      </SectionContainer>
    </Div>
  );
};

const Div = styled.div`
  border-bottom: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
  width: 100%;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const H3 = styled.h3`
  font-family: var(--header-font), sans-serif;
  letter-spacing: -1.2px;
  font-weight: 500;
  text-align: left;
  width: 482px;
  margin-top: 12px;
  margin-bottom: 30px;
  @media (max-width: 600px) {
    margin-left: 24px;
  }
`;

const FormTag = styled.div`
  position: relative;
  top: -140px;
  @media (max-width: 440px) {
    top: -120px;
  }
`;

export default PostFrom;
