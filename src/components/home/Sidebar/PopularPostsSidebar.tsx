import { styled } from 'styled-components';
import { StyledHrHorizontal } from '../../../styles/styledComponents/theme';
import {
  SidebarHeader,
  SidebarInfoFirstRow,
  SidebarItemTitle,
  SidebarList,
  SidebarItemUsername,
  SidebarTags,
  SeeAllLink,
  SidebarContainer,
} from '../../../styles/styledComponents/SidebarComponents';
import IPost from '../../../../types/post';
import { Link } from 'react-router-dom';
import { formatDate } from '../../shared/formattingHelpers';
import { useSidebarContext } from '../../../context/SidebarContext';

const StyledDate = styled(SidebarItemUsername)`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const PopularPostsSidebar = () => {
  const { posts } = useSidebarContext();

  return (
    <SidebarContainer>
      <SidebarHeader>Popular Posts</SidebarHeader>
      <StyledHrHorizontal />
      <SidebarList>
        {!!posts.length &&
          posts.slice(0, 5).map((post: Partial<IPost>, index: number) => {
            const { _id, title, author, topic, createdAt } = post;

            const authorId = author?._id;
            const firstName = author?.firstName;
            const lastName = author?.lastName;

            return (
              <li key={index}>
                <SidebarInfoFirstRow>
                  {authorId ? (
                    <Link to={`/user/${authorId}`}>
                      <SidebarItemUsername>
                        {firstName} {lastName}
                      </SidebarItemUsername>
                    </Link>
                  ) : (
                    <SidebarItemUsername>Unknown</SidebarItemUsername>
                  )}
                  <p>•</p>
                  <Link to={`/post/${_id}`}>
                    <StyledDate>{formatDate(createdAt as string)}</StyledDate>
                  </Link>
                </SidebarInfoFirstRow>
                <Link to={`/post/${_id}`}>
                  <SidebarItemTitle>{title}</SidebarItemTitle>
                  <SidebarTags>
                    <li key={index}>in {topic?.name}</li>
                  </SidebarTags>
                </Link>
              </li>
            );
          })}
      </SidebarList>
      <SeeAllLink to={`/explore-posts`}>See the full list</SeeAllLink>
    </SidebarContainer>
  );
};

export default PopularPostsSidebar;
