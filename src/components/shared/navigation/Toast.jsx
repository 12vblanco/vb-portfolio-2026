import React from "react";
import styled from "styled-components";

const Div = styled.div`
  position: absolute;
  top: 70%;
  left: 35%;
  transform: translate(-50%, -50%);
  background-color: rgba(14, 60, 100, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
`;

const Toast = ({ message }) => <Div>{message}</Div>;

export default Toast;
