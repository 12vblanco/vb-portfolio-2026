// src/components/professional-experience/AccordionContent.jsx
import styled from "styled-components";
import ImageGrid from './ImageGrid';

const AccordionContent = () => {
  return (
    <Content>
      <ImageGrid />
    </Content>
  );
};

const Content = styled.div`
  padding: 0 0 2rem 0;
  animation: slideDown 0.3s ease;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default AccordionContent;