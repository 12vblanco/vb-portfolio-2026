import React from "react";
import styled from "styled-components";

const SectionContainer = (props) => {
  return <Div>{props.children}</Div>;
};

const Div = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  height: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1240px;
  height: auto;
  margin: 0 auto;

  @media (max-width: 900px) {
    padding: 24px 0;
  }
`;

export default SectionContainer;
