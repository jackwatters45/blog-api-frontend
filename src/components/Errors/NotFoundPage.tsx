/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

const NotFoundPage = () => (
  <Container>
    <h1>404</h1>
    <h3>Oops! The page you're looking for does not exist.</h3>
    <StyledLink to="/">Go back home</StyledLink>
  </Container>
);

export default NotFoundPage;
