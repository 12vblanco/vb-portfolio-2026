import styled from "styled-components";

const ContactBtn = (props) => {
  const { tagName, ...rest } = props;
  return <Div {...rest}>{tagName}</Div>;
};

const Div = styled.button`
  display: flex;
  background: var(--blue);
  border: 1px solid var(--blue);
  border-radius: 4px;
  font-size: 20px;
  color: var(--white);
  height: 70px;
  padding: 1rem 2.2rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s linear;

  &:hover {
    background: rgba(40, 98, 150, 1) 100%;
  }
`;

export default ContactBtn;
