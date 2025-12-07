import styled from "styled-components";
import SectionHeader from "../SectionHeader";


const Footer = (scrollToTop) => {
  return (
    <Div>
      <SectionHeader>
        <h2>Let's Connect</h2>
      </SectionHeader>
        <Copy>All Rights reserved - Victor  Blanco 2019 - {new Date().getFullYear()} &copy;</Copy>
    </Div>
  );
};


const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 80vh;
  border-bottom: 1px black solid;
`;

const Copy = styled.div`
  font-family: var(--text-font);
  font-weight: 100;
  font-size: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  padding-bottom: 1.2rem;
`

export default Footer;
