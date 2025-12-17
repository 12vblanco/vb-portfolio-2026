// src/components/cases/CardBack.jsx
import styled from 'styled-components';

const CardBack = ({ study, onClose }) => {
  return (
    <BackContainer>
      <CloseButton onClick={onClose} aria-label="Close case study">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </CloseButton>
      
      <BackContent>
        <BackTitle>{study.title}</BackTitle>
        <BackClient>{study.client}</BackClient>
        
        <Divider />
        
        {study.description && (
          <Description>
            <h4>Overview</h4>
            <p>{study.description}</p>
          </Description>
        )}
        
        {study.challenges && study.challenges.length > 0 && (
          <Challenges>
            <h4>Key Challenges</h4>
            <ul>
              {study.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </Challenges>
        )}
        
        {study.solutions && study.solutions.length > 0 && (
          <Solutions>
            <h4>Solutions</h4>
            <ul>
              {study.solutions.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </Solutions>
        )}
        
        {study.results && study.results.length > 0 && (
          <Results>
            <h4>Results</h4>
            <ul>
              {study.results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </Results>
        )}
      </BackContent>
    </BackContainer>
  );
};

export default CardBack;

const BackContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  backface-visibility: hidden;
  border-radius: 6px;
  padding: 2.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: rotate(90deg);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const BackContent = styled.div`
  flex: 1;
  padding-right: 2rem;
`;

const BackTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #023C71;
  line-height: 1.2;
`;

const BackClient = styled.h3`
  font-size: 1.2rem;
  color: #666;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
  margin: 2rem 0;
`;

const Description = styled.div`
  margin-bottom: 2rem;
  
  h4 {
    font-size: 1.1rem;
    color: #023C71;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    line-height: 1.6;
    color: #444;
  }
`;

const Challenges = styled.div`
  margin-bottom: 2rem;
  
  h4 {
    font-size: 1.1rem;
    color: #023C71;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  ul {
    list-style: none;
    padding-left: 0;
  }
  
  li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.5;
    color: #444;
    
    &:before {
      content: "•";
      color: #BD3B3D;
      font-size: 1.5rem;
      position: absolute;
      left: 0;
      top: 0.25rem;
    }
  }
`;

const Solutions = styled(Challenges)`
  li:before {
    color: #4CAF50;
  }
`;

const Results = styled(Challenges)`
  li:before {
    color: #FF9800;
  }
`;