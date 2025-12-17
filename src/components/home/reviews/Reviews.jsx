// Reviews.jsx
import { useEffect, useState } from 'react';
import styled from "styled-components";
import reviewBg from "../../../assets/images/review-bg.png";
import ReviewCard from "./ReviewCard";
import { reviewsData } from "./reviewsData";

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
    }, 2900);

    return () => clearInterval(interval);
  }, []);

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + reviewsData.length) % reviewsData.length;
      visible.push({
        ...reviewsData[index],
        position: i
      });
    }
    return visible;
  };

  return (
    <Container>
      <Header>
        <h2>Don't take <br/>my word for it</h2>
      </Header>
      
      <CardsContainer>
        {getVisibleReviews().map((review) => (
          <CardWrapper key={review.id} $position={review.position}>
            <ReviewCard review={review} isCenter={review.position === 0} />
          </CardWrapper>
        ))}
      </CardsContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--blue);
  position: relative;
  padding: 4rem 0 6rem 0;
  min-height: 600px;
  border-bottom: 1px black solid;
  margin-top: -70px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${reviewBg}) center/cover;
    opacity: 0.8;
    pointer-events: none;
  }
`;

const Header = styled.div`
  color: white;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
  
  h2 {
    font-size: 39px;
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 400px;
  z-index: 1;
`;

const CardWrapper = styled.div`
  position: absolute;
  transition: all 1s ease;
  transform: ${props => {
    if (props.$position === 0) return 'translateX(0) scale(1)';
    if (props.$position === -1) return 'translateX(-120%) scale(0.85)';
    return 'translateX(120%) scale(0.85)';
  }};
  opacity: ${props => props.$position === 0 ? 1 : 0.4};
  z-index: ${props => props.$position === 0 ? 10 : 1};
`;

export default Reviews;