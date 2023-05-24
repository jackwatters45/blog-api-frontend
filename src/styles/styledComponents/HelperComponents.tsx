import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const TagSidebar = styled(Link)`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const TagsSidebar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

export const StyledTags = styled(TagsSidebar)`
  gap: 1rem;
  margin: 1rem auto;
  justify-content: center;
  padding: 0 50px;
`;

export const StyledTag = styled(TagSidebar)`
  font-size: 1.1rem;
`;

export const StyledMain = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  margin: 0 auto;
  max-width: 1000px;
  gap: 50px;
`;

export const StyledContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 800px;
  gap: 2rem;
`;

export const StyledH1 = styled.h1`
  font-size: 2.5rem;
  margin: 0 auto;
`;
