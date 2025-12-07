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
  const lastVelocity = useRef(0);
  const lastTime = useRef(0);
  const lastPosition = useRef(0);

  
  // Hide scroll hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

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

  // REMOVED: handleWheel function - no more horizontal scrolling with mouse wheel

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
      
      const scrollAmount = 400;
      const isActiveElementInput = document.activeElement.tagName === 'INPUT' || 
                                   document.activeElement.tagName === 'TEXTAREA';
      
      if (isActiveElementInput) return; // Don't interfere with form inputs
      
      switch(e.key) {
        case 'ArrowLeft':
          container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
          e.preventDefault();
          break;
        case 'ArrowRight':
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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

      // Cleanup keyboard events
      window.removeEventListener('keydown', handleKeyDown);

      // Restore cursor and selection
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [onMouseDown, onMouseMove, onMouseUpOrLeave, onTouchStart, onTouchMove, onTouchEnd, updateScrollProgress]);

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
        </CaseStudiesGrid>
      </CaseStudiesContainer>

      {/* Scroll hint - only shows briefly on first load */}
      <ScrollHint $isVisible={showScrollHint}>
        <HintContent>
          <MouseIcon />
          <HintText>Drag to scroll • Use arrow keys</HintText>
        </HintContent>
      </ScrollHint>

      {/* Progress indicator */}
      <ScrollProgress>
        <ProgressBar style={{ width: `${scrollProgress}%` }} />
      </ScrollProgress>

      {/* Keyboard navigation hint */}
    <KeyboardHint>
      <Kbd>←</Kbd>
      <Kbd>→</Kbd>
        <HintTextSmall>Drag or Arrow keys to navigate</HintTextSmall>
    </KeyboardHint>
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
  padding: 3rem 4rem;
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
  padding-right: 8rem;

  & > * {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  @media (min-width: 768px) {
    grid-auto-columns: minmax(380px, 1fr);
    gap: 3rem;
  }

  @media (min-width: 1024px) {
    grid-auto-columns: minmax(420px, 1fr);
    gap: 3.5rem;
    padding-right: 12rem; 
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
  overflow: hidden;
  z-index: 5;
  
  @media (max-width: 768px) {
    height: 2px;
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

const KeyboardHint = styled.div`
  position: absolute;
  top: -1rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  
  &:hover {
    opacity: 1;
  }
  
  @media (max-width: 1024px) {
    display: none;
  }
  
  @media (prefers-reduced-transparency: reduce) {
    background: white;
    backdrop-filter: none;
  }
`;

const Kbd = styled.kbd`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', monospace;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--blue);;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HintTextSmall = styled.span`
  font-size: 0.8rem;
  color: var(--blue);
  font-weight: 500;
  margin-left: 0.5rem;
  letter-spacing: 0.2px;
  white-space: nowrap;
`;
