// src/components/cases/SectionBody.jsx
import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { caseStudies } from '../../../data/CaseStudies';
import CaseStudyCard from './CaseStudyCard';

const SectionBody = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const lastVelocity = useRef(0);
  const lastTime = useRef(0);
  const lastPosition = useRef(0);

  // Card width calculation: 450px (card) + 192px (12rem margin = 6rem * 2 sides)
  const CARD_WIDTH = 450 + 192; // 642px total per card
  
  // Hide scroll hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

const updateScrollButtons = useCallback(() => {
  if (scrollContainerRef.current) {
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    // Use a smaller tolerance
    const tolerance = 1;
    const newCanScrollLeft = scrollLeft > tolerance;
    const newCanScrollRight = scrollLeft < maxScroll - tolerance;
    
    // Update regardless of previous state for initial setup
    setCanScrollLeft(newCanScrollLeft);
    setCanScrollRight(newCanScrollRight);
    
    console.log('Update buttons:', { 
      scrollLeft, 
      maxScroll, 
      canScrollLeft: newCanScrollLeft, 
      canScrollRight: newCanScrollRight 
    });
  }
}, []); // Remove dependencies to avoid stale state

  // Calculate velocity for momentum scrolling
  const calculateVelocity = useCallback((currentPosition) => {
    const now = Date.now();
    const timeDelta = now - lastTime.current;
    
    if (timeDelta > 0) {
      const positionDelta = currentPosition - lastPosition.current;
      lastVelocity.current = positionDelta / timeDelta;
    }
    
    lastTime.current = now;
    lastPosition.current = currentPosition;
  }, []);

  // Arrow button handlers
 const scrollToPrevCard = useCallback(() => {
  if (scrollContainerRef.current) {
    const container = scrollContainerRef.current;
    const currentScroll = container.scrollLeft;
    
    // Calculate new scroll position
    const newScroll = Math.max(0, currentScroll - CARD_WIDTH);
    
    container.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
    
    // Force update the button states
    setTimeout(() => {
      updateScrollButtons();
    }, 100);
  }
}, [CARD_WIDTH, updateScrollButtons]);

const scrollToNextCard = useCallback(() => {
  if (scrollContainerRef.current) {
    const container = scrollContainerRef.current;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    // Calculate new scroll position
    const newScroll = Math.min(maxScroll, currentScroll + CARD_WIDTH);
    
    container.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
    
    // Force update the button states
    setTimeout(() => {
      updateScrollButtons();
    }, 100);
  }
}, [CARD_WIDTH, updateScrollButtons]);

  // Mouse/touch event handlers
  const handleDragStart = useCallback((clientX) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    const startPos = clientX - scrollContainerRef.current.offsetLeft;
    setStartX(startPos);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    // Initialize velocity tracking
    lastTime.current = Date.now();
    lastPosition.current = startPos;
    lastVelocity.current = 0;
    
    // Add dragging class for cursor style
    scrollContainerRef.current.classList.add('dragging');
    
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  }, []);

  const handleDragMove = useCallback((clientX) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    const x = clientX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply for faster scrolling
    
    // Update scroll position
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    
    // Calculate velocity for momentum
    calculateVelocity(x);
  }, [isDragging, startX, scrollLeft, calculateVelocity]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove('dragging');
      
      // Apply momentum scrolling
      const velocity = lastVelocity.current;
      if (Math.abs(velocity) > 0.5) {
        const decay = 0.92; // Decay rate (higher = more momentum)
        let currentVelocity = velocity * 15; // Multiply for stronger effect
        
        const applyMomentum = () => {
          if (Math.abs(currentVelocity) < 0.1 || !scrollContainerRef.current) return;
          
          scrollContainerRef.current.scrollLeft += currentVelocity;
          currentVelocity *= decay;
          
          requestAnimationFrame(applyMomentum);
        };
        
        requestAnimationFrame(applyMomentum);
      }
    }
    
    // Restore cursor and selection
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  }, []);

  // Mouse event handlers
  const onMouseDown = (e) => {
    // Only start drag on left mouse button
    if (e.button !== 0) return;
    handleDragStart(e.pageX);
  };

  const onMouseMove = (e) => {
    handleDragMove(e.pageX);
  };

  const onMouseUpOrLeave = () => {
    handleDragEnd();
  };

  // Touch event handlers
  const onTouchStart = (e) => {
    handleDragStart(e.touches[0].pageX);
  };

  const onTouchMove = (e) => {
    handleDragMove(e.touches[0].pageX);
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  // Add scroll position tracking for progress bar
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const updateScrollProgress = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const scrollLeft = container.scrollLeft;
      
      if (scrollWidth > 0) {
        setScrollProgress((scrollLeft / scrollWidth) * 100);
      } else {
        setScrollProgress(0);
      }
    }
    updateScrollButtons();
  }, [updateScrollButtons]);

  // Progress bar dragging
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const progressClickTimeRef = useRef(0);

  const scrollToProgressPosition = useCallback((clientX, progressBarElement) => {
    if (!scrollContainerRef.current || !progressBarElement) return;
    
    const rect = progressBarElement.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const percentClicked = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    
    const container = scrollContainerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const targetScroll = (percentClicked / 100) * maxScroll;
    
    return targetScroll;
  }, []);

 
// Scroll to center a specific card - simpler version
const scrollToCardCenter = useCallback((cardIndex) => {
  if (!scrollContainerRef.current) return;
  
  const container = scrollContainerRef.current;
  
  // Calculate position to scroll to (card index * card width)
  const targetScroll = cardIndex * CARD_WIDTH;
  
  container.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  });
  
}, [CARD_WIDTH]);

  const handleProgressMouseDown = useCallback((e) => {
    progressClickTimeRef.current = Date.now();
    setIsDraggingProgress(true);
    
    // Check if clicking near a dot
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = (clickX / rect.width) * 100;
    
    // Find closest card dot
    const totalCards = caseStudies.length;
    let closestCardIndex = 0;
    let minDistance = Infinity;
    
    caseStudies.forEach((_, index) => {
      const dotPercent = (index / (totalCards - 1)) * 100;
      const distance = Math.abs(clickPercent - dotPercent);
      if (distance < minDistance) {
        minDistance = distance;
        closestCardIndex = index;
      }
    });
    
    // If clicked within 5% of a dot, snap to that card's center
    const closestDotPercent = (closestCardIndex / (totalCards - 1)) * 100;
    if (Math.abs(clickPercent - closestDotPercent) < 5) {
      scrollToCardCenter(closestCardIndex);
    } else {
      // Otherwise use the old free scrolling
      const targetScroll = scrollToProgressPosition(e.clientX, e.currentTarget);
      if (targetScroll !== undefined && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  }, [scrollToProgressPosition, scrollToCardCenter]);

  const handleProgressMouseMove = useCallback((e) => {
    if (!isDraggingProgress) return;
    
    const progressBar = document.querySelector('[data-progress-bar]');
    const targetScroll = scrollToProgressPosition(e.clientX, progressBar);
    
    if (targetScroll !== undefined && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'auto'
      });
    }
  }, [isDraggingProgress, scrollToProgressPosition]);

  const handleProgressMouseUp = useCallback(() => {
    setIsDraggingProgress(false);
  }, []);

  // Add and remove event listeners
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Mouse events
    container.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUpOrLeave);
    container.addEventListener('mouseleave', onMouseUpOrLeave);

    // Touch events
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    // Scroll event for progress tracking
    container.addEventListener('scroll', updateScrollProgress);

    // Progress bar drag events
    if (isDraggingProgress) {
      document.addEventListener('mousemove', handleProgressMouseMove);
      document.addEventListener('mouseup', handleProgressMouseUp);
    }

    // Prevent default drag behavior for images and links inside cards
    const preventDefaultDrag = (e) => e.preventDefault();
    
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('dragstart', preventDefaultDrag);
    });
    
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('dragstart', preventDefaultDrag);
    });

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (!container) return;
      
      const isActiveElementInput = document.activeElement.tagName === 'INPUT' || 
                                   document.activeElement.tagName === 'TEXTAREA';
      
      if (isActiveElementInput) return; // Don't interfere with form inputs
      
      switch(e.key) {
        case 'ArrowLeft':
          scrollToPrevCard();
          e.preventDefault();
          break;
        case 'ArrowRight':
          scrollToNextCard();
          e.preventDefault();
          break;
        case 'Home':
          container.scrollTo({ left: 0, behavior: 'smooth' });
          e.preventDefault();
          break;
        case 'End':
          container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
          e.preventDefault();
          break;
        default:
          return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial progress update
    updateScrollProgress();

    return () => {
      // Cleanup mouse events
      container.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUpOrLeave);
      container.removeEventListener('mouseleave', onMouseUpOrLeave);

      // Cleanup touch events
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);

      // Cleanup scroll event
      container.removeEventListener('scroll', updateScrollProgress);

      // Cleanup progress bar drag events
      if (isDraggingProgress) {
        document.removeEventListener('mousemove', handleProgressMouseMove);
        document.removeEventListener('mouseup', handleProgressMouseUp);
      }

      // Cleanup keyboard events
      window.removeEventListener('keydown', handleKeyDown);

      // Restore cursor and selection
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [onMouseDown, onMouseMove, onMouseUpOrLeave, onTouchStart, onTouchMove, onTouchEnd, updateScrollProgress, scrollToNextCard, scrollToPrevCard, isDraggingProgress, handleProgressMouseMove, handleProgressMouseUp]);

  // Scroll to card 2 on initial load
  useEffect(() => {
    const initialScroll = () => {
      if (scrollContainerRef.current) {
        // Small delay to ensure DOM is fully rendered
        setTimeout(() => {
          scrollToCardCenter(1); // index 1 is card 2
        }, 100);
      }
    };

    initialScroll();
  }, [scrollToCardCenter]);

  return (
    <SectionBodyContainer>
      <CaseStudiesContainer
        ref={scrollContainerRef}
        className={isDragging ? 'dragging' : ''}
        onDoubleClick={(e) => e.preventDefault()} // Prevent text selection on double click
        aria-label="Case studies carousel"
        role="region"
        tabIndex={0} // Make it focusable for keyboard navigation
      >
        <CaseStudiesGrid>
  {caseStudies.map((study, index) => (
    <CardWrapper 
      key={study.id}
      aria-label={`Case study ${index + 1}: ${study.title}`}
      role="article"
    >
      <CaseStudyCard study={study} />
    </CardWrapper>
  ))}
  {/* Add 2 invisible placeholder cards for white space */}
  <InvisiblePlaceholder />
</CaseStudiesGrid>
      </CaseStudiesContainer>

      {/* Navigation Arrows */}
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

      {/* Scroll hint - only shows briefly on first load */}
      <ScrollHint $isVisible={showScrollHint}>
        <HintContent>
          <MouseIcon />
          <HintText>Drag to scroll • Use arrow keys</HintText>
        </HintContent>
      </ScrollHint>


{/* Progress indicator */}
  {/* Progress indicator */}
<ScrollProgress 
  onMouseDown={handleProgressMouseDown}
  data-progress-bar
>
  <ProgressBar style={{ width: `${scrollProgress}%` }} />
  
  {/* 5 dots evenly spaced for all cards */}
  {[0, 1, 2, 3, 4].map((cardIndex) => {
    // Position 5 dots at 0%, 25%, 50%, 75%, 100%
    const position = (cardIndex / 4) * 100;
    
    const cardScrollPosition = (cardIndex * CARD_WIDTH);
    const containerWidth = scrollContainerRef.current?.clientWidth || 0;
    const currentScroll = scrollContainerRef.current?.scrollLeft || 0;
    const viewportPadding = window.innerWidth * 0.5;
    const cardCenterScroll = cardScrollPosition + viewportPadding - (containerWidth / 2) + (450 / 2);
    const isActive = Math.abs(currentScroll - cardCenterScroll) < CARD_WIDTH / 2;
    
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

    </SectionBodyContainer>
  );
};

export default SectionBody;

const handAnimation = keyframes`
  0%, 100% {
    transform: translateX(-8px);
  }
  50% {
    transform: translateX(8px);
  }
`;

const SectionBodyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  user-select: none; 
  
  &:focus {
    outline: none;
  }
`;

const CaseStudiesContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 0rem 4rem 1rem 4rem;
  cursor: grab;
  
  scroll-snap-type: x mandatory;
  
  &.dragging {
    cursor: grabbing;
    scroll-behavior: auto; 
    scroll-snap-type: none; 
  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (hover: none) and (pointer: coarse) {
    -webkit-overflow-scrolling: auto;
    scroll-snap-type: x proximity;
  }

  &:focus-visible {
    outline: 2px solid #1a1a1a;
    outline-offset: 4px;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const CaseStudiesGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(320px, 1fr);
  gap: 5rem !important;
  padding-right: 50vw;
  padding-left: 50vw;

  & > * {
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  @media (min-width: 768px) {
    grid-auto-columns: minmax(380px, 1fr);
    gap: 3rem;
  }

  @media (min-width: 1024px) {
    grid-auto-columns: minmax(420px, 1fr);
    gap: 3.5rem;
  }
`;

const CardWrapper = styled.div`
  pointer-events: auto;
  
  * {
    user-select: none;
  }
  
  &:hover * {
    user-select: text;
  }
`;

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

const ScrollHint = styled.div`
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

const ScrollProgress = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;
  height: 3px;
  width: 80vw;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.08);
  overflow: visible;
  z-index: 5;
  cursor: pointer;
  transition: height 0.2s ease;
  user-select: none;
  
  &:hover {
    height: 6px;
  }
  
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
  background: linear-gradient(90deg, #1a1a1a, #023C71);
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
  background: ${props => props.$isActive ? 'var(--blue)' : 'rgba(0, 0, 0, 0.3)'};
  border: 2px solid white;
  transition: all 0.3s ease;
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;
  
  &:hover {
    width: 14px;
    height: 14px;
    background: ${props => props.$isActive ? 'var(--blue)' : 'rgba(0, 0, 0, 0.5)'};
    transform: translate(-50%, -50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
    border-width: 1.5px;
  }
`;

const InvisiblePlaceholder = styled.div`
  width: 450px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  user-select: none;
`;