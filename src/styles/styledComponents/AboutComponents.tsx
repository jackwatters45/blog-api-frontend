import { styled } from 'styled-components';

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: 300px;
  min-width: 200px;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
    padding-top: 3rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    max-width: 100%;

    .description {
      grid-row: 2 / 3;
      grid-column: 1 / 3;
    }
  }
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledNameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledName = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const StyledUsername = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-left: 0.25rem;
`;

export const StyledDate = styled.p`
  font-size: 0.95rem;
`;

export const FollowersContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const StyledFollowerCount = styled.p`
  font-size: 0.9rem;
`;

export const StyledDescription = styled.p`
  font-size: 0.8rem;
`;
