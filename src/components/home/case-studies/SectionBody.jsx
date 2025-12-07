// src/components/cases/SectionBody.jsx
import { useEffect } from 'react';
import styled from 'styled-components';
import { caseStudies } from '../../../data/CaseStudies';
import CarouselControls from './CarouselControls';
import CaseStudyCard from './CaseStudyCard';
import ProgressIndicator from './ProgressIndicator';
import ScrollHint from './ScrollHint';
import { useCarouselControls } from './useCarouselControls';

const SectionBody = () => {
  const {
  scrollContainerRef,
  isDragging,
  showScrollHint,
  setShowScrollHint,
  canScrollLeft,
  canScrollRight,
  scrollProgress,
  isDraggingProgress,
  CARD_WIDTH,
  focusedCardIndex, // Add this
  updateScrollButtons,
  scrollToPrevCard,
  scrollToNextCard,
  scrollToCardCenter,
  handleDragStart,
  handleDragMove,
  handleDragEnd,
  updateScrollProgress,
  handleProgressMouseDown,
  handleProgressMouseMove,
  handleProgressMouseUp,
} = useCarouselControls(caseStudies);

  // Hide scroll hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [setShowScrollHint]);

  // Scroll to card 2 on initial load
  useEffect(() => {
    const initialScroll = () => {
      if (scrollContainerRef.current) {
        setTimeout(() => {
          scrollToCardCenter(1); // index 1 is card 2
        }, 100);
      }
    };
    initialScroll();
  }, [scrollToCardCenter, scrollContainerRef]);

  // Mouse event handlers
  const onMouseDown = (e) => {
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

  // Add and remove event listeners
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUpOrLeave);
    container.addEventListener('mouseleave', onMouseUpOrLeave);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    container.addEventListener('scroll', updateScrollProgress);

    if (isDraggingProgress) {
      document.addEventListener('mousemove', handleProgressMouseMove);
      document.addEventListener('mouseup', handleProgressMouseUp);
    }

    // Prevent default drag behavior
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
      
      if (isActiveElementInput) return;
      
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

    updateScrollProgress();

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUpOrLeave);
      container.removeEventListener('mouseleave', onMouseUpOrLeave);

      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);

      container.removeEventListener('scroll', updateScrollProgress);

      if (isDraggingProgress) {
        document.removeEventListener('mousemove', handleProgressMouseMove);
        document.removeEventListener('mouseup', handleProgressMouseUp);
      }

      window.removeEventListener('keydown', handleKeyDown);

      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [
    scrollContainerRef, onMouseDown, onMouseMove, onMouseUpOrLeave, onTouchStart, 
    onTouchMove, onTouchEnd, updateScrollProgress, scrollToNextCard, scrollToPrevCard, 
    isDraggingProgress, handleProgressMouseMove, handleProgressMouseUp
  ]);

  return (
    <SectionBodyContainer>
      <CaseStudiesContainer
        ref={scrollContainerRef}
        className={isDragging ? 'dragging' : ''}
        onDoubleClick={(e) => e.preventDefault()}
        aria-label="Case studies carousel"
        role="region"
        tabIndex={0}
      >
        <CaseStudiesGrid>
          {caseStudies.map((study, index) => (
           <CardWrapper 
            key={study.id}
            aria-label={`Case study ${index + 1}: ${study.title}`}
            role="article"
          >
              <CaseStudyCard 
                study={study} 
                showClickMessage={index === focusedCardIndex} 
              />
          </CardWrapper>
          ))}
          <InvisiblePlaceholder />
        </CaseStudiesGrid>
      </CaseStudiesContainer>

      <CarouselControls 
        scrollToPrevCard={scrollToPrevCard}
        scrollToNextCard={scrollToNextCard}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
      />

      <ScrollHint showScrollHint={showScrollHint} />

      <ProgressIndicator 
        scrollProgress={scrollProgress}
        handleProgressMouseDown={handleProgressMouseDown}
        scrollToCardCenter={scrollToCardCenter}
        scrollContainerRef={scrollContainerRef}
        CARD_WIDTH={CARD_WIDTH}
        caseStudies={caseStudies}
        focusedCardIndex={focusedCardIndex} // Add this
      />
    </SectionBodyContainer>
  );
};

export default SectionBody;

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

const InvisiblePlaceholder = styled.div`
  width: 450px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  user-select: none;
`;