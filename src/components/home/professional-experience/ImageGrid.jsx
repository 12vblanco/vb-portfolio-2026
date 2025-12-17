// src/components/professional-experience/ImageGrid.jsx
import styled from "styled-components";
import img from "../../../assets/images/prof-oms1.png";

const ImageGrid = () => {
  return (
    <Container>
      <DescriptionColumn> 
        <DescriptionCell>
        {[1, 2].map((i) => (
          <ImageCard key={i}>
          </ImageCard>
        ))}</DescriptionCell>
          <DescriptionCell>
            <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </Paragraph>
        <Paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Paragraph>
        </DescriptionCell>

        
      </DescriptionColumn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding-top: .8rem;
  width: 100%;
  align-items: center;
  
`;

const DescriptionColumn = styled.div`
display: flex;
  align-items: flex-start;
  justify-content: space-around;  
  flex-wrap: wrap;
  gap: 2rem;
  flex: 1;
`;
const DescriptionCell = styled.div`
display: flex;
  align-items: flex-start;
  justify-content: space-around;  
  flex-wrap: nowrap;
  gap: 2rem;
  flex: 1;
`;


const ImageCard = styled.div`
  width: 250px;
  height: 250px;
    background: url(${img}) center/cover;  
  border-radius: 8px;
  overflow: hidden;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  letter-spacing: -.1px;
    max-width: 290px;
  margin: 0;
`;

export default ImageGrid;