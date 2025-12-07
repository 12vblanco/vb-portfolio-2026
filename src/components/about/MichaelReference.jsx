import React from "react";
import styled from "styled-components";
import michael from "../../assets/michael_scot.jpg";
import SectionContainer from "../elements/SectionContainer";

const MichaelReference = () => {
  return (
    <Div>
      <SectionContainer>
        <ReferenceSection>
          <ReferenceImage src={michael} alt="Michael Scot Regional Manager" />
          <ReferenceText>
            "Let me tell you something that's gonna blow your socks off, even if
            they are those boring, sensible kind Toby wears. My friend here, so
            incredible. Believe me, I know talent when I see it. Think of it
            this way: if your website was a beet farm, he'd turn it into the
            envy of Schrute Farms. Resourceful as Dwight, with the charm of Jim
            and the artistic touch of Pam. His designing and developing skills
            deserve a Dundie this year.
            <br />
            <b>That's a Michael Scott guarantee! </b> <br />
            <br /> Now, where's the button to make confetti rain down? <br />
            This calls for a celebration!"
          </ReferenceText>
        </ReferenceSection>
      </SectionContainer>
    </Div>
  );
};

const Div = styled.div`
  /* border-top: 1px solid var(--blue); */
  width: 100%;
  margin-bottom: 2rem;
`;

const ReferenceSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  margin-bottom: -4rem;
  max-width: 800px;
  @media (max-width: 800px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ReferenceImage = styled.img`
  max-width: 200px;
  border-radius: 50%;
  height: auto;
  margin-right: 2rem;
  @media (max-width: 800px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const ReferenceText = styled.p`
  font-size: 0.8rem;
  max-width: 60%;
  font-style: italic;
  color: var(--dark);
`;

export default MichaelReference;
