// src/components/professional-experience/AccordionItem.jsx
import styled from "styled-components";
import AccordionContent from './AccordionContent';
import AccordionHeader from './AccordionHeader';


const AccordionItem = ({ experience, isOpen, onToggle }) => {
  return (
    <ItemContainer>
      <AccordionHeader 
        experience={experience}
        onClick={onToggle}
      />
      {isOpen && experience.hasImages && (
        <AccordionContent />
      )}
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  border-bottom: 1px solid var(--blue);
  transition: all 0.3s ease;
    white-space: pre-line;
  
  &:last-child {
    border-bottom: 1px solid var(--blue);
  }
`;

export default AccordionItem;