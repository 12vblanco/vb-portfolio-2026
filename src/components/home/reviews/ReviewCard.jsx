// ReviewCard.jsx
import styled from "styled-components";

const ReviewCard = ({ review, isCenter }) => {
  return (
    <Card $isCenter={isCenter}>
      <Row>
        <Stars>
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i}>★</Star>
        ))}
      </Stars>
      <Logo/>
      </Row>
      <Title>{review.title}</Title>
      <Subtitle>{review.subtitle}</Subtitle>
      <Divider />
      <Footer>
        <Name>{review.name}</Name>
        <Company>{review.company}</Company>
      </Footer>
    </Card>
  );
};

const Card = styled.div`
  background: ${props => props.$isCenter ? 'white' : 'rgba(255, 255, 255, 0.1)'};
  border: ${props => props.$isCenter ? 'none' : '2px solid rgba(255, 255, 255, 0.3)'};
  border-radius: 6px;
  padding: 1.2rem 1.8rem;
  width: 390px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  box-shadow: ${props => props.$isCenter 
    ? '0 10px 30px rgba(0, 0, 0, 0.2)' 
    : '0 5px 15px rgba(0, 0, 0, 0.1)'};
`;

const Row = styled.div`
display: flex;
align-items: flex-start;
justify-content: space-between;
margin-bottom: 12px;
`

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: .8rem;
`;

const Star = styled.span`
  color: #ef4444;
  font-size: 1.4rem;
`;

const Logo = styled.image`
width: 90px;
height: 50px;
background: beige;
`

const Title = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: inherit;
    text-align: left;

`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  color: inherit;
  text-align: left;
  margin: 0 0 .5rem 0;
  flex-grow: 1;
  line-height: 1.4;
  font-weight: 500;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid var(--blue);
  opacity: 0.9;
  width: 94%;
    margin: 0 auto;
    margin-bottom: 1.6rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: inherit;
`;

const Company = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: inherit;
`;

export default ReviewCard;