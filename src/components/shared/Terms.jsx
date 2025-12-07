import { Link } from "react-router-dom";
import styled from "styled-components";
import CONSTANTS from "./Constants";
import ContactBtn from "./ContactBtn.jsx";

const Terms = (scrollToTop) => {
  return (
    <Div>
      <H1 id="termsTop">Terms and Conditions</H1>
      <H4>
        Welcome to Victor Blanco Web. Before using our website, please read the
        following terms and conditions carefully. By using our website, you
        agree to be bound by these terms and conditions.
      </H4>
      <ol>
        <li>
          Use of Cookies:
          <P>
            We use cookies on our website to provide you with the best possible
            user experience. By using our website, you agree to the use of
            cookies. We do not collect any personal information through our
            cookies.
          </P>
        </li>
        <li>
          Use of Google Analytics:
          <P>
            We use Google Analytics on our website to collect information about
            how visitors use our website. This information is used to improve
            our website and to provide better services to our visitors. Google
            Analytics collects information anonymously and reports website
            trends without identifying individual visitors.
          </P>
        </li>
        <li>
          Contact Form:
          <P>
            We provide a contact form on our website to allow visitors to
            contact us. Any information you provide on the contact form is used
            solely to respond to your inquiry. We do not share your information
            with any third party.
          </P>
        </li>
        <li>
          Intellectual Property:
          <P>
            All content on our website is the property of Victor Blanco Web and
            is protected by international copyright laws. You may not use any
            content from our website without our prior written permission.
          </P>
        </li>
        <li>
          Links to Other Websites:
          <P>
            Our website may contain links to other websites. We are not
            responsible for the content or privacy policies of those websites.
            We encourage you to read the terms and conditions and privacy
            policies of those websites before using them.
          </P>
        </li>
        <li>
          Limitation of Liability:
          <P>
            Victor Blanco Web is not responsible for any damages, including but
            not limited to, direct or indirect damages, arising from the use of
            our website or the information provided on our website.
          </P>
        </li>
        <li>
          Applicable Law:
          <P>
            These terms and conditions shall be governed by and construed in
            accordance with the laws of the United Kingdom and the European
            Union.
          </P>
        </li>
        <li>
          Amendments:
          <P>
            We reserve the right to modify these terms and conditions at any
            time without prior notice. Your continued use of our website after
            any changes to these terms and conditions constitutes your
            acceptance of the new terms and conditions.
          </P>
        </li>
      </ol>
      <P>
        If you have any questions or comments regarding these terms and
        conditions, please contact us using the contact form on our website.
      </P>
      <Btn>
        <Link to="/home">
          <ContactBtn onClick={scrollToTop} tagName={"Go back"} />
        </Link>
      </Btn>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  text-align: left;
  @media (max-width: 868px) {
    padding: 0 22px 22px 42px;
  }
  @media (max-width: 440px) {
    max-width: 90%;
    padding: 18px;
  }
`;

const Btn = styled.h1`
  font-family: var(--header-font), sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 30px 0;
`;
const H1 = styled.h1`
  font-family: var(--header-font), sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: ${CONSTANTS.FONT_SIZE.giant};
  letter-spacing: -1.7px;
  font-weight: 500;
  text-align: left;
  margin: 30px 0;
  @media (max-width: 990px) {
    font-size: ${CONSTANTS.FONT_SIZE.super};
  }
  @media (max-width: 760px) {
    font-size: 30px;
  }
  @media (max-width: 600px) {
    font-size: ${CONSTANTS.FONT_SIZE.super};
    margin-left: 22px;
  }
  @media (max-width: 440px) {
    font-size: 32px;
    margin: 8px 0;
  }
`;
const H4 = styled.h4`
  margin-top: 20px;
  margin-bottom: 22px;
  font-weight: 500;
`;
const P = styled.p`
  margin-top: 18px;
  margin-bottom: 12px;
`;

export default Terms;
