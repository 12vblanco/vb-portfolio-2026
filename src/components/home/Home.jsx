import CasesSection from "./case-studies/CasesSection";
import HeroDiv from "./hero-section/HeroDiv";
import PendoAnalytics from "./pendo-analytics/PendoAnalytics";
import ProfessionalExperiences from "./professional-experience/ProfessionalExperiences";
import Reviews from "./reviews/Reviews";

const Home = (scrollToTop) => {
  return (
    <>
      <HeroDiv id="homeTop" />
       <CasesSection />
       <PendoAnalytics />
       <ProfessionalExperiences />
       <Reviews />
      {/*<PostCardFrom scrollToTop={scrollToTop} />
      <References /> */}
    </>
  );
};

export default Home;
