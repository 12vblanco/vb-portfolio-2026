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
  border-bottom: 1px black solid;
    background: darkblue;
  margin-top: -70px;
`;

const ReviewHeader = styled(SectionHeader)`
  color: var(--white);
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 4rem 0 1rem 0;
    /* max-height: calc(100vh - 70px); */
`


export default Reviews;
