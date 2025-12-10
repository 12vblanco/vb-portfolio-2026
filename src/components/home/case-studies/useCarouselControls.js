// src/components/cases/hooks/useCarouselControls.js
import { useCallback, useRef, useState } from 'react';

export const useCarouselControls = (caseStudies) => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [focusedCardIndex, setFocusedCardIndex] = useState(1); // Start with card 2
  
  const lastVelocity = useRef(0);
  const lastTime = useRef(0);
  const lastPosition = useRef(0);
  const progressClickTimeRef = useRef(0);

  const CARD_WIDTH = 450 + 192; // 642px total per card

  const updateScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      const tolerance = 1;
      const newCanScrollLeft = scrollLeft > tolerance;
      const newCanScrollRight = scrollLeft < maxScroll - tolerance;
      
      setCanScrollLeft(newCanScrollLeft);
      setCanScrollRight(newCanScrollRight);
    }
  }, []);

  // Function to update focused card based on scroll position
// In useCarouselControls.js, update the updateFocusedCard function:
const updateFocusedCard = useCallback(() => {
  if (!scrollContainerRef.current) return;
  
  const container = scrollContainerRef.current;
  const currentScroll = container.scrollLeft;
  
  // Simple calculation: which card are we closest to based on scroll position?
  // Each card takes CARD_WIDTH pixels, so card index = round(scrollPosition / CARD_WIDTH)
  const calculatedIndex = Math.round(currentScroll / CARD_WIDTH);
  
  // Clamp the index between 0 and totalCards - 1
  const totalCards = caseStudies.length;
  const clampedIndex = Math.max(0, Math.min(totalCards - 1, calculatedIndex));
  
  // Update focused card if it changed
  if (clampedIndex !== focusedCardIndex) {
    console.log(`Focused card updated: ${focusedCardIndex} -> ${clampedIndex}, scroll: ${currentScroll}, cardWidth: ${CARD_WIDTH}`);
    setFocusedCardIndex(clampedIndex);
  }
}, [CARD_WIDTH, focusedCardIndex, caseStudies.length]);

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

  const scrollToPrevCard = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;
      
      const newScroll = Math.max(0, currentScroll - CARD_WIDTH);
      
      container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      
      // Update focused card after scroll
      setTimeout(() => {
        updateScrollButtons();
        updateFocusedCard();
        
        // Also manually calculate which card we scrolled to
        const targetCardIndex = Math.round(newScroll / CARD_WIDTH);
        setFocusedCardIndex(targetCardIndex);
      }, 300);
    }
  }, [CARD_WIDTH, updateScrollButtons, updateFocusedCard]);

  const scrollToNextCard = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      const newScroll = Math.min(maxScroll, currentScroll + CARD_WIDTH);
      
      container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      
      // Update focused card after scroll
      setTimeout(() => {
        updateScrollButtons();
        updateFocusedCard();
        
        // Also manually calculate which card we scrolled to
        const targetCardIndex = Math.round(newScroll / CARD_WIDTH);
        setFocusedCardIndex(targetCardIndex);
      }, 300);
    }
  }, [CARD_WIDTH, updateScrollButtons, updateFocusedCard]);

  const scrollToCardCenter = useCallback((cardIndex) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const targetScroll = cardIndex * CARD_WIDTH;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    // Update focused card
    setTimeout(() => {
      setFocusedCardIndex(cardIndex);
      updateScrollButtons();
    }, 300);
  }, [CARD_WIDTH, updateScrollButtons]);

  const handleDragStart = useCallback((clientX) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    const startPos = clientX - scrollContainerRef.current.offsetLeft;
    setStartX(startPos);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    lastTime.current = Date.now();
    lastPosition.current = startPos;
    lastVelocity.current = 0;
    
    scrollContainerRef.current.classList.add('dragging');
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  }, []);

  const handleDragMove = useCallback((clientX) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    const x = clientX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    calculateVelocity(x);
  }, [isDragging, startX, scrollLeft, calculateVelocity]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove('dragging');
      
      const velocity = lastVelocity.current;
      if (Math.abs(velocity) > 0.5) {
        const decay = 0.92;
        let currentVelocity = velocity * 15;
        
        const applyMomentum = () => {
          if (Math.abs(currentVelocity) < 0.1 || !scrollContainerRef.current) return;
          
          scrollContainerRef.current.scrollLeft += currentVelocity;
          currentVelocity *= decay;
          
          requestAnimationFrame(applyMomentum);
        };
        
        requestAnimationFrame(applyMomentum);
      }
    }
    
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    
    // Update focused card after drag ends
    setTimeout(() => {
      updateFocusedCard();
    }, 100);
  }, [updateFocusedCard]);

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
    updateFocusedCard(); // Also update focused card on scroll
  }, [updateScrollButtons, updateFocusedCard]);

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

  const handleProgressMouseDown = useCallback((e) => {
    progressClickTimeRef.current = Date.now();
    setIsDraggingProgress(true);
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = (clickX / rect.width) * 100;
    
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
    
    const closestDotPercent = (closestCardIndex / (totalCards - 1)) * 100;
    if (Math.abs(clickPercent - closestDotPercent) < 5) {
      scrollToCardCenter(closestCardIndex);
    } else {
      const targetScroll = scrollToProgressPosition(e.clientX, e.currentTarget);
      if (targetScroll !== undefined && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  }, [caseStudies, scrollToProgressPosition, scrollToCardCenter]);

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

  return {
    scrollContainerRef,
    isDragging,
    showScrollHint,
    setShowScrollHint,
    canScrollLeft,
    canScrollRight,
    scrollProgress,
    isDraggingProgress,
    CARD_WIDTH,
    focusedCardIndex,
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
  };
};