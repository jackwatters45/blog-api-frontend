import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

export const SidebarContainer = styled.div``;

export const SidebarHeader = styled.h2`
  padding-left: 0.5rem;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.border};
`;

export const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
`;

export const SidebarInfoFirstRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SidebarItemTitle = styled.p`
  font-weight: 600;
`;

const SidebarUsername = css`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SidebarItemUsername = styled.p`
  ${SidebarUsername}
`;

export const SidebarItemUsernameDeleted = styled.i`
  ${SidebarUsername}
`;

export const SidebarAdditionalInfo = styled.p`
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

export const SidebarTopics = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SeeAllLink = styled(Link)`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: underline;
`;
