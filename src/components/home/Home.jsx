// src/pages/Home.jsx
import styled from 'styled-components';
import Footer from "../shared/Footer/Footer";
import { useVerticalScrollSnap } from '../shared/useVerticalScrollSnap';
import CasesSection from "./case-studies/CasesSection";
import HeroDiv from "./hero-section/HeroDiv";
import PendoAnalytics from "./pendo-analytics/PendoAnalytics";
import ProfessionalExperiences from "./professional-experience/ProfessionalExperiences";
import Reviews from "./reviews/Reviews";

const Home = (scrollToTop) => {
  const TOTAL_SECTIONS = 6; // HeroDiv, CasesSection, PendoAnalytics, ProfessionalExperiences, Reviews
  const { currentSection, scrollToSection, sectionHeight } = useVerticalScrollSnap(TOTAL_SECTIONS);

  return (
    <HomeContainer>
      <SectionWrapper $height={sectionHeight} className="hero-section">
        <HeroDiv id="homeTop" />
      </SectionWrapper>
      
      <SectionWrapper $height={sectionHeight}>
        <CasesSection />
      </SectionWrapper>
      
      <SectionWrapper $height={sectionHeight}>
        <PendoAnalytics />
      </SectionWrapper>
      
      <SectionWrapper $height={sectionHeight}>
        <ProfessionalExperiences />
      </SectionWrapper>
      
      <SectionWrapper $height={(sectionHeight / 1.6) - 35}>
        <Reviews />
      </SectionWrapper>
      
      <SectionWrapper $height={(sectionHeight / 1.6) - 35}>
        <Footer scrollToTop={scrollToTop} />
      </SectionWrapper>

      {/* Optional: Navigation dots */}
      <SectionDots>
        {Array.from({ length: TOTAL_SECTIONS }).map((_, index) => (
          <Dot 
            key={index}
            $isActive={currentSection === index}
            onClick={() => scrollToSection(index)}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </SectionDots>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
`;


const SectionWrapper = styled.div`
  width: 100%;
  height: ${props => props.$height}px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;

  &:first-child {
    /* scroll-margin-top: 70px; */
  }

  & > * {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;


const SectionDots = styled.div`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${props => props.$isActive ? 'var(--blue)' : 'rgba(0, 0, 0, 0.3)'};
  background: ${props => props.$isActive ? 'var(--blue)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    transform: scale(1.3);
    border-color: var(--blue);
  }
`;