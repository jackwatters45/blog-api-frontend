import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: grid;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 4px;
  padding: 1rem 0.25rem 0.75rem 1rem;
  width: 350px;
  min-height: 200px;
  ${({ theme }) => theme.shadow};

  @media screen and (max-width: 400px) {
    width: 90vw;
  }
`;

export const StyledTitleTopic = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  h2 {
    margin-right: 0.75rem;
  }

  a {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 600;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export const StyledUpdated = styled(Link)`
  font-size: 0.9rem;
`;

export const StyledAuthor = styled.div`
  font-size: 0.9rem;
  display: flex;
  gap: 0.25rem;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const ButtonOptions = styled(Buttons)`
  display: flex;
  flex: 1 0 auto;
  gap: .5rem;
  margin-top: 1rem;
  margin-right: 0.75rem;
  justify-content: flex-end;
  align-items: flex-end;

  div, a {
  padding: 0.25rem;
  }
  svg {
    cursor: pointer;
  }
  a {
    line-height: 0;
  }
  div:hover, a:hover {
    border-radius: 4px;
    background: ${({ theme }) => theme.hoverBackground};
`;

export const FilterError = styled.h2``;
