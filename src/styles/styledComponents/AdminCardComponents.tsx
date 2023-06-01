import { css, styled } from 'styled-components';
import { StyledMain } from './HelperComponents';
import { Link } from 'react-router-dom';

export const AdminContainer = styled(StyledMain)`
  max-width: 1250px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledCreateLink = styled(Link)`
  padding: 0.5rem 1rem 0 0;
  text-decoration: underline;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FilterContainer = styled.div`
  padding-right: 1rem;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

// Card
export const AdminCard = styled.div`
  display: grid;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 4px;
  padding: 1rem 0.25rem 0.75rem 1rem;
  width: 350px;
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

export const StyledUpdated = styled.p`
  font-size: 0.9rem;
`;

const StyledInfo = css`
  font-size: 0.85rem;
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

export const StyledUserInfo = styled.div`
  ${StyledInfo}
  color: ${({ theme }) => theme.colors.textSecondary};

  margin: 2px 0;
`;

export const StyledFollowInfo = styled.div`
  ${StyledInfo}
  margin: 2px 0;
`;
export const StyledAuthor = styled.div`
  ${StyledInfo}
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

export const TopicAdminCard = styled(AdminCard)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledButtonsOptions = styled(ButtonOptions)`
  margin-top: 0;
`;

export const FilterError = styled.h2``;
