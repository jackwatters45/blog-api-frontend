import { styled } from 'styled-components';
import { StyledHrHorizontal } from '../../../styles/styledComponents/StyledHr';
import {
  SidebarHeader,
  SidebarInfoFirstRow,
  SidebarItemTitle,
  SidebarList,
  SidebarItemUsername,
  SidebarTags,
} from '../../../styles/styledComponents/SidebarComponents';
import { useEffect, useState } from 'react';
import IPost from '../../../../types/post.d';
import { Link } from 'react-router-dom';
import {
  formatDate,
  getAuthorFullName,
  getAuthorId,
} from '../../../utils/formatPostData';
import IUser from '../../../../types/user.d';

const StyledH2 = styled(SidebarHeader)``;
const StyledPostList = styled(SidebarList)``;
const StyledPostInfo = styled(SidebarInfoFirstRow)``;
const StyledPostTitle = styled(SidebarItemTitle)``;
const StyledUsername = styled(SidebarItemUsername)``;
const StyledTags = styled(SidebarTags)``;
const StyledDate = styled(SidebarItemUsername)`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const PopularPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPopularPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/popular`);
      const data = await res.json();
      console.log(data);
      setPosts(data);
    };
    getPopularPosts();
  }, []);

  return (
    <div>
      <StyledH2>Popular Posts</StyledH2>
      <StyledHrHorizontal />
      <StyledPostList>
        {!!posts.length &&
          posts.map((post: Partial<IPost>, index: number) => {
            const { _id, title, author, tags, createdAt } = post;
            const authorId = getAuthorId(author as Partial<IUser>);
            return (
              <li key={index}>
                <StyledPostInfo>
                  <Link to={`/users/${authorId}`}>
                    <StyledUsername>
                      {getAuthorFullName(author as Partial<IUser>)}
                    </StyledUsername>
                  </Link>
                  <p>•</p>
                  <Link to={`/post/${_id}`}>
                    <StyledDate>{formatDate(createdAt as string)}</StyledDate>
                  </Link>
                </StyledPostInfo>
                <Link to={`/post/${_id}`}>
                  <StyledPostTitle>{title}</StyledPostTitle>
                  <StyledTags>
                    {!!tags?.length &&
                      tags?.map((tag: string, index: number) => (
                        <li key={index}>#{tag}</li>
                      ))}
                  </StyledTags>
                </Link>
              </li>
            );
          })}
      </StyledPostList>
    </div>
  );
};

export default PopularPosts;
