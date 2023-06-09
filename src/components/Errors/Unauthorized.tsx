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

function UnauthorizedPage() {
  return (
    <Container>
      <h1>You are not authorized to view this page.</h1>
      <p>
        If you are an admin, <StyledLink to="login">login to view this page.</StyledLink>
      </p>
      <p>
        Otherwise, <StyledLink to="/">return home</StyledLink>
      </p>
    </Container>
  );
}

export default UnauthorizedPage;
