// src/hooks/useVerticalScrollSnap.js
import { useCallback, useEffect, useRef, useState } from 'react';

const NAVBAR_HEIGHT = 70;
const SCROLL_THRESHOLD = 0.30; // 30% scroll triggers section change
const ANIMATION_DURATION = 700; // ms
const SCROLL_COOLDOWN = 1000; // ms between scroll triggers

export const useVerticalScrollSnap = (totalSections) => {
  const [currentSection, setCurrentSection] = useState(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const accumulatedDeltaRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  // Get section height
  const getSectionHeight = useCallback(() => {
    return window.innerHeight;
  }, []);

// Scroll to specific section
  // const scrollToSection = useCallback((sectionIndex) => {
  //   if (sectionIndex < 0 || sectionIndex >= totalSections) return;
    
  //   isScrollingRef.current = true;
  //   setCurrentSection(sectionIndex);
    
  //   const targetPosition = sectionIndex * window.innerHeight;
    
  //   window.scrollTo({
  //     top: targetPosition,
  //     behavior: 'smooth'
  //   });

  //   // Reset scrolling flag after animation
  //   if (scrollTimeoutRef.current) {
  //     clearTimeout(scrollTimeoutRef.current);
  //   }
    
  //   scrollTimeoutRef.current = setTimeout(() => {
  //     isScrollingRef.current = false;
  //     accumulatedDeltaRef.current = 0;
  //   }, ANIMATION_DURATION);
  // }, [totalSections]);
  // Scroll to specific section
// Scroll to specific section
  const scrollToSection = useCallback((sectionIndex) => {
    if (sectionIndex < 0 || sectionIndex >= totalSections) return;
    
    isScrollingRef.current = true;
    setCurrentSection(sectionIndex);
    
    let targetPosition = sectionIndex * window.innerHeight;
    
    // For section 4 (Reviews - 5th section), center it on screen
    // Section is 50vh tall, so we scroll to position it in the middle
    if (sectionIndex === 4) {
      targetPosition = (sectionIndex * window.innerHeight) - (window.innerHeight / 5.4);
    }
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Reset scrolling flag after animation
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      accumulatedDeltaRef.current = 0;
    }, ANIMATION_DURATION);
  }, [totalSections]);

  // Handle wheel scroll
  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleWheel = (e) => {
      // Prevent default during cooldown
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;

      // Reset accumulated delta if too much time passed
      if (timeSinceLastScroll > 200) {
        accumulatedDeltaRef.current = 0;
      }

      lastScrollTimeRef.current = now;
      accumulatedDeltaRef.current += e.deltaY;

      const sectionHeight = getSectionHeight();
      const scrollThreshold = sectionHeight * SCROLL_THRESHOLD;

      // Check if accumulated scroll exceeds threshold
      if (Math.abs(accumulatedDeltaRef.current) > scrollThreshold) {
        if (accumulatedDeltaRef.current > 0) {
          // Scrolling down
          if (currentSection < totalSections - 1) {
            e.preventDefault();
            scrollToSection(currentSection + 1);
          }
        } else {
          // Scrolling up
          if (currentSection > 0) {
            e.preventDefault();
            scrollToSection(currentSection - 1);
          }
        }
        accumulatedDeltaRef.current = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, totalSections, scrollToSection, getSectionHeight]);

  // Handle keyboard navigation
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleKeyDown = (e) => {
      if (isScrollingRef.current) return;

      // Don't interfere with inputs
      const isActiveElementInput = 
        document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA';
      
      if (isActiveElementInput) return;

      let shouldPrevent = false;

      switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Space bar
          if (currentSection < totalSections - 1) {
            scrollToSection(currentSection + 1);
            shouldPrevent = true;
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
            shouldPrevent = true;
          }
          break;
        case 'Home':
          scrollToSection(0);
          shouldPrevent = true;
          break;
        case 'End':
          scrollToSection(totalSections - 1);
          shouldPrevent = true;
          break;
        default:
          break;
      }

      if (shouldPrevent) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, totalSections, scrollToSection]);

  // Detect manual scroll and update current section
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY - NAVBAR_HEIGHT;
      const sectionHeight = getSectionHeight();
      const newSection = Math.round(scrollPosition / sectionHeight);
      
      if (newSection !== currentSection && newSection >= 0 && newSection < totalSections) {
        setCurrentSection(newSection);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection, totalSections, getSectionHeight]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentSection,
    scrollToSection,
    sectionHeight: getSectionHeight()
  };
};