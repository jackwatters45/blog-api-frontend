import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const StyledButton = styled.button`
  text-decoration: underline;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;

const NotFoundPage = ({ message }: { message?: string }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-2);

  return (
    <Container>
      <h1>404</h1>
      {message && <h2>{message}</h2>}
      <h3>{"Oops! The page you're looking for does not exist."}</h3>
      <LinksContainer>
        <StyledButton onClick={goBack}>Go back</StyledButton>
        <StyledLink to="/">Go home</StyledLink>
      </LinksContainer>
    </Container>
  );
};

export default NotFoundPage;
