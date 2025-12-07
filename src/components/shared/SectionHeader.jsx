import styled from 'styled-components';

const SectionHeader = ({ children, className }) => {
  return <HeaderContainer className={className}>{children}</HeaderContainer>;
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  width: 100%;
  padding: 6rem 0 1rem 14vw;
  margin-bottom: 2rem;
`;

export default SectionHeader;

