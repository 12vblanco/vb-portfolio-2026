// src/components/professional-experience/AccordionHeader.jsx
import styled from "styled-components";
import TagsList from './TagsList';


const AccordionHeader = ({ experience, onClick }) => {
  return (
    <Header onClick={onClick}>
      <CompanyInfo>
        <CompanyName>{experience.company}</CompanyName>
        <Period>• {experience.period}</Period>
      </CompanyInfo>
      <RoleInfo>
        <Role>{experience.role}</Role>
      </RoleInfo>
        <TagsList tags={experience.tags} skills={experience.skills} />
    </Header>
  );
};

const Header = styled.div`
  padding: 1.5rem 2vw 1.5rem 1.8rem;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  text-align: left;
  gap: 2rem;
  
  &:hover {
    background: rgba(248, 249, 250, 0.5);
  }
`;

const CompanyInfo = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 33%;
`;

const CompanyName = styled.h3`
  font-size: 1.5rem;
  color: var(--blue);
  margin: 0 0 0.5rem 0;
  font-weight: 700;
`;

const Period = styled.p`
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
`;

const RoleInfo = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-start;
  max-width: 300px;
  text-align: left;
`;

const Role = styled.p`
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
  text-align: right;
`;

export default AccordionHeader;