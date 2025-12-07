import { useState } from "react";
import Confetti from "react-confetti";
import styled from "styled-components";
import pic1 from "../../../public/me_bike.jpg";
import pic2 from "../../assets/napier.jpg";
import ContactBtn from "../elements/ContactBtn.jsx";
import SectionContainer from "../elements/SectionContainer";
import SectionDiv from "../elements/SectionDiv";
import MichaelReference from "./MichaelReference";

const About = () => {
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [numberOfPieces, setNumberOfPieces] = useState(800);
  const [opacity, setOpacity] = useState(1);

  const startConfetti = () => {
    setConfettiTrigger(true);
    setNumberOfPieces(1800);
    setOpacity(1);

    setTimeout(() => {
      setOpacity(0);
    }, 6500);

    const intervalId = setInterval(() => {
      setNumberOfPieces((prevNumber) => {
        const newNumber = prevNumber - 16;
        if (newNumber <= 0) {
          clearInterval(intervalId);
          setConfettiTrigger(false);
          return 0;
        }
        return newNumber;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(intervalId);
      setConfettiTrigger(false);
      setNumberOfPieces(0);
    }, 7600);
  };

  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <Div>
      <SectionContainer>
        <SectionDiv>
          <Column>
            {" "}
            <H1 id="AboutMe">About Me</H1>
            <Tech>Developer/Designer/Printmaker</Tech>
          </Column>
          <Row>
            <HeroImg>
              <Img src={pic1} alt={"Image of Victor Blanco"} />
            </HeroImg>
            <P>
              My name is Victor, and I have been in Scotland for 20 years. I
              have always had an interest in learning new things and making, and
              for that reason, I have far more hobbies than I can actually
              pursue. However, a few things remain constant in my life. Web
              development occupies most of my time these days, and I try to get
              on my bike as much as possible. I love swimming and free-diving;
              it's underwater where my mind is truly at peace. I've had many
              'Eureka!' moments in the swimming pool. I also love cooking and
              baking and generally love food as a form of cultural expression.
              <br />
              Can anyone live without pizza?
              <br />
              One of my hobbies is making prints, by hand, out of tree rings and
              although my shop is currently closed, you are welcome to look at
              my designs{" "}
              <a
                href="https://victorblanco.co.uk"
                style={{ fontWeight: "900" }}
                target="_blank"
              >
                HERE
              </a>
            </P>
          </Row>
          <Row2>
            <P>
              I graduated from Napier University with a First Honours Degree in
              Web Design and Development. I thoroughly enjoyed my time there,
              growing significantly both as a person and as a developer. My
              honour's project was titled 'Performance Comparison of an Art
              Portfolio Using Vue, React, and Angular'. In it I built a
              portfolio website, using Vue, Angular, and React, and then employ
              browser-based tools to evaluate system performance in all three.
              <br />
              Web development is what I want to do for the rest of my life, and
              I am genuinely excited about the new possibilities that emerging
              technologies will bring.
            </P>
            <HeroImg>
              <Img src={pic2} alt={"Image of Victor Blanco"} />
            </HeroImg>
          </Row2>
          <P2>
            Thanks for taking the time to look at my portfolio and please do get
            in touch if you have any questions or you just want to randomly
            chat.
            <br /> I am always happy to chat. <br />
            <br />
          </P2>
        </SectionDiv>
      </SectionContainer>
      <MichaelReference />
      <DivBtn>
        <Btn onClick={startConfetti} tagName={"Click Here"}></Btn>
      </DivBtn>
      {confettiTrigger && (
        <ConfettiContainer>
          <Confetti
            width={width}
            height={height}
            numberOfPieces={1200}
            gravity={0.15}
          />
        </ConfettiContainer>
      )}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1240px;
  text-align: left;
  margin-bottom: 3rem;
`;

const H1 = styled.h1`
  margin-left: -0.2rem;
  text-align: left;
  z-index: 2;
  letter-spacing: -1px;
  margin-bottom: 0.2rem;

  @media (max-width: 503px) {
    font-size: 41px;
  }
  @media (max-width: 686px) {
    width: 420px;
  }
  @media (max-width: 531px) {
    width: 230px;
    font-size: 36px;
    margin-left: -0.2rem;
  }
`;

const P = styled.p`
  width: 100%;
  padding-left: 0.2rem;
  padding-right: 3rem;
  padding-bottom: 0.21rem;
  padding-top: 1rem;
  max-width: 700px;
  @media (max-width: 920px) {
    padding-right: 0.2rem;
    font-size: 15px;
  }
  @media (max-width: 830px) {
    padding: 1rem 2rem;
  }
  @media (max-width: 540px) {
    padding: 0.4rem;
  }
`;
const P2 = styled.p`
  width: 50%;
  padding-left: 0.2rem;
  padding-right: 3rem;
  padding-bottom: 1rem;
  max-width: 700px;
  text-align: center;
  @media (max-width: 920px) {
    padding-right: 0.2rem;
    font-size: 15px;
  }
  @media (max-width: 830px) {
    padding: 1rem 2rem;
  }
  @media (max-width: 540px) {
    padding: 0.4rem;
    width: 98%;
  }
`;

const Tech = styled.h3`
  margin-top: -0.4rem;
  @media (max-width: 551px) {
    font-size: 18px;
  }
  @media (max-width: 451px) {
    font-size: 16px;
  }
  @media (max-width: 361px) {
    font-size: 13px;
  }
`;
const HeroImg = styled.div`
  margin-top: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 30vw;
  max-width: 260px;
  height: 30vw;
  max-height: 260px;
  margin: 0 40px 40px 40px;
  border-radius: 24px;
  object-fit: cover;

  @media (max-width: 920px) {
    border-radius: 8px;
    width: 90vw;
    height: 90vw;
  }
  @media (max-width: 520px) {
    border-radius: 8px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 2rem 2rem;
  @media (max-width: 920px) {
    padding: 1rem;
  }
  @media (max-width: 830px) {
    flex-direction: column;
  }
`;
const Row2 = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 1rem 2rem;
  @media (max-width: 920px) {
    padding: 1rem;
  }
  @media (max-width: 830px) {
    flex-direction: column-reverse;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 3rem;
`;

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  opacity: ${(props) => props.opacity};
  transition: opacity 3s ease-out;
`;

const DivBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 2rem;
`;

const Btn = styled(ContactBtn)`
  border-radius: 16px;
  color: white;
  margin-bottom: -4rem;
`;

export default About;
