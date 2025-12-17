import styled from "styled-components";
// In ProgressIndicator.jsx, update to accept focusedCardIndex prop:
const ProgressIndicator = ({ 
  scrollProgress, 
  handleProgressMouseDown, 
  scrollToCardCenter,
  scrollContainerRef,
  CARD_WIDTH,
  caseStudies,
  focusedCardIndex // Add this prop
}) => {
  return (
    <ScrollProgress 
      onMouseDown={handleProgressMouseDown}
      data-progress-bar
    >
      <ProgressBar style={{ width: `${scrollProgress}%` }} />
      
      {[0, 1, 2, 3, 4].map((cardIndex) => {
        const position = (cardIndex / 4) * 100;
        
        // Use focusedCardIndex directly instead of calculating isActive
        const isActive = cardIndex === focusedCardIndex;
        
        return (
          <ProgressDot 
            key={cardIndex} 
            style={{ left: `${position}%` }}
            $isActive={isActive}
            onClick={(e) => {
              e.stopPropagation();
              scrollToCardCenter(cardIndex);
            }}
          />
        );
      })}
    </ScrollProgress>
  );
};

export default ProgressIndicator;

const ScrollProgress = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;
  height: 4px;
  width: 66vw;
  margin: 0 auto;
  background: rgba(2, 60, 113, 0.4);
  overflow: visible;
  z-index: 5;
  cursor: pointer;
  transition: height 0.2s ease;
  user-select: none;
  
  &:active {
    cursor: grabbing;
  }
  
  @media (max-width: 768px) {
    height: 2px;
    
    &:hover {
      height: 4px;
    }
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, rgba(2, 60, 113, .4), #023C71);
  width: 0%;
  transition: width 0.15s ease-out;
  border-radius: 0 2px 2px 0;
  
  @media (prefers-reduced-motion: reduce) {
    transition: width 0.3s ease;
  }
`;

const ProgressDot = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$isActive ? '#BD3B3D' : 'rgba(2, 60, 113, 1)'};
  border: 2px solid white;
  transition: all 0.3s ease;
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;
  
  &:hover {
    width: 14px;
    height: 14px;
    background: ${props => props.$isActive ? '#BD3B3D' : 'rgba(2, 60, 113, 0.5)'};
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
    border-width: 1.5px;
  }
`;