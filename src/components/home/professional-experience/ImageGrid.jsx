// src/components/professional-experience/ImageGrid.jsx
import styled from "styled-components";

const ImageGrid = () => {
  const placeholderText = "Software Developer working with the MERN stack. 2.5 years (part time)";
  
  return (
    <Grid>
      {[1, 2].map((i) => (
        <ImageCard key={i}>
          <Placeholder>
            <PlaceholderText>{placeholderText}</PlaceholderText>
          </Placeholder>
        </ImageCard>
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  /* max-width: 1000px; */
    margin-left: 6vw;

`;

const ImageCard = styled.div`
  aspect-ratio: 1/1;
  max-width: 260px;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
`;

const PlaceholderText = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`;

export default ImageGrid;