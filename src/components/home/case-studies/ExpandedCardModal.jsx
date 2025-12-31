// src/components/cases/ExpandedCardModal.jsx
import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const ExpandedCardModal = ({ study, onClose, cardPosition, isClosing }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Prevent scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    // Add closing class when closing
    if (isClosing && containerRef.current) {
      containerRef.current.classList.add('closing');
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, isClosing]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <ModalOverlay onClick={handleBackdropClick} $isClosing={isClosing}>
      <CardFlipContainer 
        ref={containerRef}
        $cardPosition={cardPosition}
        className={isClosing ? 'closing' : ''}
      >
        <FlipCard className={isClosing ? 'closing' : ''}>
          {/* Front of card */}
          <CardFront>
            <FrontContent>
              <ClientName>{study.client}</ClientName>
              <CardTitle>{study.title}</CardTitle>
            </FrontContent>
          </CardFront>
          
          {/* Back of card */}
          <CardBack>
            <CloseButton onClick={handleCloseClick} aria-label="Close modal">
              ✕
            </CloseButton>
            <BackContent>
              <BackTitle>{study.client}</BackTitle>
              <BackSubtitle>{study.title}</BackSubtitle>
              <BackDescription>{study.description}</BackDescription>
              <BackTags>
                {study.tags?.join(' | ') || 'React.js | Animations | Figma | GitHub'}
              </BackTags>
            </BackContent>
          </CardBack>
        </FlipCard>
      </CardFlipContainer>
    </ModalOverlay>
  );
};

export default ExpandedCardModal;

// Keyframe animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const jumpAndFlip = keyframes`
  0% {
    transform: translate(var(--start-x), var(--start-y)) scale(0.3);
    width: 450px;
    height: 520px;
  }
  20% {
    transform: translate(calc(var(--start-x) * 0.7), calc(var(--start-y) * 0.7)) scale(0.5);
    width: 55%;
    height: 55%;
  }
  40% {
    transform: translate(calc(var(--start-x) * 0.4), calc(var(--start-y) * 0.4)) scale(0.7);
    width: 65%;
    height: 65%;
  }
  60% {
    transform: translate(calc(var(--start-x) * 0.2), calc(var(--start-y) * 0.2)) scale(0.85);
    width: 75%;
    height: 75%;
  }
  100% {
    transform: translate(0, 0) scale(1);
    width: 80vw;
    height: 80vh;
  }
`;

const cardFlip = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(720deg);
  }
`;

const reverseJumpAndFlip = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    width: 80vw;
    height: 80vh;
  }
  40% {
    transform: translate(calc(var(--start-x) * 0.2), calc(var(--start-y) * 0.2)) scale(0.85);
    width: 75%;
    height: 75%;
  }
  60% {
    transform: translate(calc(var(--start-x) * 0.4), calc(var(--start-y) * 0.4)) scale(0.7);
    width: 65%;
    height: 65%;
  }
  80% {
    transform: translate(calc(var(--start-x) * 0.7), calc(var(--start-y) * 0.7)) scale(0.5);
    width: 55%;
    height: 55%;
  }
  100% {
    transform: translate(var(--start-x), var(--start-y)) scale(0.3);
    width: 450px;
    height: 520px;
  }
`;

const reverseCardFlip = keyframes`
  0% {
    transform: rotateY(720deg);
  }
  100% {
    transform: rotateY(0deg);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${props => props.$isClosing ? fadeOut : fadeIn} 0.3s ease-out;
  backdrop-filter: blur(4px);
`;

const CardFlipContainer = styled.div`
  perspective: 2000px;
  position: relative;
  --start-x: ${props => props.$cardPosition?.x || 0}px;
  --start-y: ${props => props.$cardPosition?.y || 0}px;
  
  animation: ${jumpAndFlip} 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  
  &.closing {
    animation: ${reverseJumpAndFlip} 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;

const FlipCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: ${cardFlip} 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  
  &.closing {
    animation: ${reverseCardFlip} 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const CardFront = styled(CardSide)`
  background: #FCFDFF;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateY(0deg);
`;

const CardBack = styled(CardSide)`
  background: white;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  position: relative;
`;

const FrontContent = styled.div`
  text-align: center;
  padding: 2rem;
`;

const BackContent = styled.div`
  max-width: 800px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #333;
  z-index: 10;
  font-weight: 300;
  line-height: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: scale(1.1) rotate(90deg);
  }

  &:active {
    transform: scale(0.95) rotate(90deg);
  }
`;

const ClientName = styled.h3`
  font-size: 48px;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
  color: #1a1a1a;
`;

const CardTitle = styled.h4`
  font-size: 32px;
  color: #333;
  line-height: 1.3;
`;

const BackTitle = styled.h2`
  font-size: 56px;
  margin-bottom: 1rem;
  color: #1a1a1a;
  font-weight: 700;
`;

const BackSubtitle = styled.h3`
  font-size: 36px;
  margin-bottom: 2rem;
  color: #555;
  font-weight: 400;
`;

const BackDescription = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
`;

const BackTags = styled.div`
  font-size: 16px;
  color: #999;
  font-family: monospace;
  letter-spacing: 1px;
`;