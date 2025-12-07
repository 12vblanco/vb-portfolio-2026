import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
// import About from "./components/about/About";
import Footer from "./components/shared/footer/Footer";
// import OrchardCase from "./components/home/CaseStudies/OrchardCase";
// import UXCase from "./components/home/CaseStudies/UXCase";
// import VarunaCase from "./components/home/CaseStudies/VarunaCase";
import Home from "./components/home/Home";
// import Success from "./components/home/postcard/Success";
import HorizontalNav from "./components/shared/navigation/HorizontalNav";
import VerticalNav from "./components/shared/navigation/VerticalNav";
import Terms from "./components/shared/Terms";

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    scrollToTop();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <CookieConsent
        containerClasses="cookie_container"
        style={{
          background: "rgba(2, 60, 113, 0.9)",
          fontWeight: "500",
          minHeight: "120px",
          alignItems: "center",
          fontSize: "18px",
        }}
        buttonStyle={{
          borderRadius: "60px",
          padding: "20px 32px",
          fontSize: "18px",
          fontWeight: "700",
          background: "white",
          color: "rgb(2, 60, 113)",
        }}
        contentStyle={{ textAlign: "left", marginBottom: "12px" }}
      >
        This website uses cookies and third party software to monitor traffic
        anonymously and improve user experience. For more info read my{" "}
        <Span>
          <a href="/terms" aria-label="Visit Victor Blanco's Terms Page">
            terms & conditions
          </a>
        </Span>
      </CookieConsent>
      <HorizontalNav handleToggle={handleToggle} isOpen={isOpen} />
      <VerticalNav handleToggle={handleToggle} isOpen={isOpen} />{" "}
      <Routes>
        <Route path="/" element={<Home scrollToTop={scrollToTop} />} />
        <Route path="/home" element={<Home scrollToTop={scrollToTop} />} />
        <Route path="/terms" element={<Terms scrollToTop={scrollToTop} />} />
        {/* <Route path="/UXCase" element={<UXCase scrollToTop={scrollToTop} />} /> */}
        {/* <Route
          path="/VarunaCase"
          element={<VarunaCase scrollToTop={scrollToTop} />}
        />
        <Route
          path="/OrchardCase"
          element={<OrchardCase scrollToTop={scrollToTop} />}
        /> */}
        {/* <Route path="/About" element={<About scrollToTop={scrollToTop} />} /> */}
        {/* <Route
          path="/Success"
          element={<Success scrollToTop={scrollToTop} />}
        /> */}
      </Routes>
      <Footer scrollToTop={scrollToTop} />
    </>
  );
}

const Span = styled.span`
  a {
    color: white;
    text-decoration: underline;
  }
`;

export default App;
