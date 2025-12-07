// src/components/cases/ScrollHint.jsx
import styled from 'styled-components';

const ScrollHint = ({ showScrollHint }) => {
  return (
    <ScrollHintContainer $isVisible={showScrollHint}>
      <HintContent>
        <MouseIcon />
        <HintText>Drag to scroll • Use arrow keys</HintText>
      </HintContent>
    </ScrollHintContainer>
  );
};

export default ScrollHint;

const ScrollHintContainer = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%) translateY(${props => props.$isVisible ? '0' : '20px'});
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 10;
  
  @media (max-width: 768px) {
    display: none; 
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.5s ease;
  }
`;

const HintContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  
  @media (prefers-reduced-transparency: reduce) {
    background: white;
    backdrop-filter: none;
  }
`;

const MouseIcon = styled.div`
  width: 28px;
  height: 42px;
  border: 2px solid #1a1a1a;
  border-radius: 14px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 10px;
    background: #1a1a1a;
    border-radius: 2px;
    animation: scrollHint 2s infinite;
  }
  
  @keyframes scrollHint {
    0%, 20%, 100% { 
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    10% { 
      transform: translateX(-50%) translateY(12px);
      opacity: 0.7;
    }
  }
`;

const HintText = styled.span`
  font-size: 0.875rem;
  color: #1a1a1a;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-align: center;
  line-height: 1.4;
`;