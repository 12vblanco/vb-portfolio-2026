import React from "react";
import styled from "styled-components";

const SectionDiv = (props) => {
  return <Div>{props.children}</Div>;
};

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 1240px;
  width: 100%;
`;

export default SectionDiv;
