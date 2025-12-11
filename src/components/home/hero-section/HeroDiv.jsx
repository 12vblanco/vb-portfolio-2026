import styled from "styled-components";
import pic1 from '../../../assets/hero-portrait.jpg';
import heroBg from '../../../assets/images/hero-bg.png';


const HeroDiv = () => {
  return (
    <Container>
      <HomeTag id="home" />

      <Div>
        <DivContainer>
          
          <HeroText>
            <HeaderText style={{color: '#BD3B3D'}}>Data Informed </HeaderText>
            <HeaderText>Web Design & Development</HeaderText>
            <SubHeaderText>
              I specialize in designing and building custom websites and applications using React, Vue and modern CSS. 
              I provide expert Pendo services, from audit and setup to guide development and data analysis, transforming user data into actionable insights that increase conversion and drive growth. <Bold>All backed by data.</Bold> 
            </SubHeaderText>
            
           <CTAContainer>
        <PrimaryButton>button 1</PrimaryButton>
        <SecondaryButton>button 2</SecondaryButton>
      </CTAContainer>
          </HeroText>
          <HeroImg>
            <Img src={pic1} alt={""} />
          </HeroImg>
        </DivContainer>
        
      </Div>
      <QuoteText>
        "The difference between a great idea and a great product might be the developer you hire"
      </QuoteText>
     
    </Container>
  );
};

const Container = styled.div`
  /* background-image: url(${heroBg}); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* background-attachment: fixed; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-wrap: wrap;
  max-height: calc(100vh - 70px);
  justify-content: center;
  align-items: center;
  border: solid;
  border-width: 0 1px 1px 0;
  @media (max-width: 600px) {
    padding-top: 4%;
  }
`;

const Div = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;
  justify-content: center;
  align-items: center;
  /* margin-top: -2rem; */
`;

const DivContainer = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const HeroText = styled.div`
  display: flex;
  padding: 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-width: 284px;
  @media (max-width: 600px) {
    max-width: 80vw;
    min-width: 80vw;
    padding: 0 0 0 40px;
  }
  @media (max-width: 440px) {
    max-width: 100%;
    min-width: 100%;
  }
`;
const HeroImg = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  padding: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: transparent;

  @media (max-width: 870px) {
    max-width: 330px;
    max-height: 320px;
  }
  @media (max-width: 760px) {
    max-width: 220px;
    max-height: 220px;
  }
  @media (max-width: 600px) {
    max-width: 60vw;
    max-height: 60vw;
    min-width: 300px;
    min-height: 300px;
    margin-top: 12px;
  }
`;

const HeaderText = styled.h1`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  font-weight: 500;


  @media (max-width: 951px) {
    font-size: 42px;
    margin-left: -0.1rem;
  }
  @media (max-width: 440px) {
    font-size: 32px;
    margin-left: 0px;
  }
`;

const SubHeaderText = styled.p`
  display: inline-block;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  max-width: 87%;
  margin-top: 2rem;

  @media (max-width: 658px) {
    font-size: 32px;
  }
`;

const Bold = styled.strong`
display: inline-block;
  font-weight: 500;
`

const QuoteText = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  max-width: 82%;
  margin-top: 3rem;
  font-style: italic;
  font-weight: 500;
  font-size: 18px;
  font-family: var(--header-font);


  @media (max-width: 658px) {
    font-size: 32px;
  }
`;

const HomeTag = styled.div`
  position: relative;
  top: 0;
`;

const CTAContainer = styled.div`
display: flex;
margin-top: 3rem;
`
const PrimaryButton = styled.div`
display: flex;
margin-right: 2rem;
background: var(--blue);
border: 1px solid var(--blue);
color: #fff;
padding: 1rem 2.4rem;
border-radius: 4px;
font-size: 20px;
`
const SecondaryButton = styled.div`
display: flex;
background: var(--white);
border: 1px solid var(--blue);
padding: 1rem 2.4rem;
border-radius: 4px;
font-size: 20px;
`



export default HeroDiv;
