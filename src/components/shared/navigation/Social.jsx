import { FaGithub, FaRegEnvelope } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { SiDribbble, SiUpwork } from "react-icons/si";
import { HashLink as Link } from "react-router-hash-link";
import styled from "styled-components";

const Social = ({ flexDirection, isOpen }) => {
  return (
    <Div style={{ flexDirection }}>
      {isOpen ? (
        <></>
      ) : (
        <>
          <Icon>
            <a
              href="https://www.github.com/12vblanco/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Victor Blanco's GitHub Page"
            >
              <FaGithub />{" "}
            </a>
          </Icon>
          <Icon>
            <a
              href="https://www.linkedin.com/in/12vblanco/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Victor Blanco's Linkedin Page"
            >
              <SiUpwork />{" "}
            </a>
          </Icon>
          <Icon>
            <a
              href="https://www.instagram.com/victorblancoweb/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Victor Blanco's Instagram Page"
            >
              <SiDribbble />
            </a>
          </Icon>
           <Icon>
            <a
              href="https://www.linkedin.com/in/12vblanco/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Victor Blanco's Linkedin Page"
            >
              <GrLinkedin />{" "}
            </a>
          </Icon>
           <IconContact>
            <Link
              to="/home#form"
              rel="noreferrer"
              aria-label="Visit Victor Blanco's Contact form"
            >
              <FaRegEnvelope />
            </Link>
          </IconContact>
        </>
      )}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  @media (max-width: 440px) {
    display: none;
  }
`;

const Icon = styled.div`
  margin: 18px 0;
  font-size: 38px;
`;
const IconContact = styled.div`
  margin: 10px 0;
  font-size: 36px;
  @media (max-width: 600px) {
    display: none;
  }
`;

export default Social;
