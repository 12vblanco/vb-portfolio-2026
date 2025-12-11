// src/components/professional-experience/TagsList.jsx
import styled from "styled-components";

const TagsList = ({ tags, skills }) => {
  return (
    <Container>
      {tags.map((tag, i) => (
        <Skill key={i}>{tag}</Skill>
      ))}
      {skills.map((skill, i) => (
        <Skill key={i}>{skill}</Skill>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 160px;
`;

const Skill = styled.span`
  background: #f3e4e6;
  color: #e63946;
  border: 2px solid #e63946;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
`;

export default TagsList;