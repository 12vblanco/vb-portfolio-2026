// import styled from "styled-components";
// import SectionHeader from "../../shared/SectionHeader";


// const ProfessionalExperiences = (scrollToTop) => {
//   return (
//     <Div>
//       <SectionHeader>
//         <h2>My Professional <br/>Experiences</h2>
//       </SectionHeader>
//     </Div>
//   );
// };


// const Div = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   height: calc(100vh - 70px);
//   border-bottom: 1px black solid;
//     max-height: calc(100vh - 70px);
// `;
// export default ProfessionalExperiences;

// src/components/professional-experience/ProfessionalExperiences.jsx
import { useState } from 'react';
import styled from "styled-components";
import AccordionItem from "./AccordionItem.jsx";

const ProfessionalExperiences = (scrollToTop) => {
  const [openIndex, setOpenIndex] = useState(1);

  const experiences = [
    {
      company: "N-able Inc. Edinburgh, UK",
      period: "April 2024 - October 2025",
      role: "(Pendo) Web Developer (JavaScript).  \n18 Months.",
      tags: ["Pendo", "HTML"],
      skills: ["CSS", "JavaScript"],
            hasImages: true,

    },
    {
      company: "Orders Made Simple, Edinburgh, UK",
      period: "April 2022 - October 2024",
      role: "Software Developer (MERN stack). \n2.5 years part time.",
      tags: ["Pendo", "HTML"],
      skills: ["CSS", "JavaScript"],
      hasImages: true,
    },
    {
      company: "Edinburgh College, Edinburgh, UK",
      period: "April 2024 - October 2025",
      role: "Website Administrator (WordPress). \n2 years part time.",
      tags: ["Pendo", "HTML"],
      skills: ["CSS", "JavaScript"],
            hasImages: true,

    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Div>
      <SectionTop>
         <h2>My Professional <br/>Experiences</h2>
        <IntroText>
          As well as freelancing and completing university<br />
          I have from part of different professional teams<br />
          during the last 5 years.
        </IntroText>
      </SectionTop>

      <AccordionContainer>
        {experiences.map((exp, index) => (
          <AccordionItem
            key={index}
            experience={exp}
            isOpen={openIndex === index}
            onToggle={() => toggleAccordion(index)}
          />
        ))}
      </AccordionContainer>
    </Div>
  );
};

const SectionTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  text-align: left;
  width: 100%;
  padding: 4rem 0 1rem 2.4vw;
  margin-bottom: 1.8rem;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  border-bottom: 1px var(--blue) solid;
  max-height: calc(100vh - 70px);
  padding: 0 4rem 2rem 4rem;
  overflow-y: auto;
`;

const IntroText = styled.p`
  line-height: 1.2;
  font-size: 18px;
  font-weight: 300;
  margin: 0;
  text-align: left;
  letter-spacing: -.1px;
  padding-top: 8px;
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
`;

export default ProfessionalExperiences;









