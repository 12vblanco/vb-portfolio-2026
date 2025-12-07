import styled from "styled-components";
import SectionHeader from "../../shared/SectionHeader";


const Reviews = (scrollToTop) => {
  return (
    <Div>
      <ReviewHeader>
        <h2>Don’t take <br/>my word for it</h2>
      </ReviewHeader>
    </Div>
  );
};


const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(70vh - 70px);
  border-bottom: 1px black solid;
    background: darkblue;

`;

const ReviewHeader = styled(SectionHeader)`
  color: var(--white);
  text-align: center;
  align-items: center;
  justify-content: center;
`


export default Reviews;
