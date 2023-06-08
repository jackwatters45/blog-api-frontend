import { styled } from 'styled-components';
import {
  SidebarHeader,
  SidebarInfoFirstRow,
  SidebarItemTitle,
  SidebarList,
  SidebarItemUsername,
  SidebarTopics,
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
      <SidebarList>
        {!!posts.length &&
          posts
            .slice(0, 5)
            .map(({ _id, title, author, topic, createdAt }: Partial<IPost>) => {
              return (
                <li key={_id}>
                  <SidebarInfoFirstRow>
                    {author?._id ? (
                      <Link to={`/user/${author._id}`}>
                        <SidebarItemUsername>
                          {author.firstName} {author.lastName}
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
                    <SidebarTopics>
                      <li key={topic?._id}>in {topic?.name}</li>
                    </SidebarTopics>
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
