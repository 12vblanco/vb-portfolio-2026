// src/components/cases/CarouselControls.jsx
import styled from 'styled-components';

const CarouselControls = ({ 
  scrollToPrevCard, 
  scrollToNextCard, 
  canScrollLeft, 
  canScrollRight 
}) => {
  return (
    <>
      <ArrowButton 
        $position="left" 
        onClick={scrollToPrevCard}
        disabled={!canScrollLeft}
        aria-label="Previous case study"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </ArrowButton>

      <ArrowButton 
        $position="right" 
        onClick={scrollToNextCard}
        disabled={!canScrollRight}
        aria-label="Next case study"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </ArrowButton>
    </>
  );
};

export default CarouselControls;

const ArrowButton = styled.button`
  position: absolute;
  top: 84%;
  ${props => props.$position}: 8rem;
  min-width: 32px;
  height: 32px;
  padding: 3px 12px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', monospace;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--blue);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  opacity: 0.5;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);

  &:hover:not(:disabled) {
    opacity: 1;
    transform: translateY(-10%) scale(1.1);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(-10%) scale(0.95);
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    ${props => props.$position}: 0.5rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;