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
  gap: 0.4rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 130px;
  padding-top: 8px;
  /* padding-left: 14%; */
`;

const Skill = styled.span`
  background: rgba(255, 197, 202, 0.3);
  color: #e63946;
  border: 1px solid #e63946;
  padding: 0.16rem 0.45rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 500;
  &:first-of-type {
    background: #e63946;
    color: #f3e4e6;
  }
`;

export default TagsList;