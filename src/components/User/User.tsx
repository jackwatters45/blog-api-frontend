import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IUser from '../../../types/user.d';
import { styled } from 'styled-components';
import { getUserFullName } from '../../utils/formattingHelpers';
import IPost from '../../../types/post.d';
import About from './AboutColumn/About';
import Activity from './ActivityColumn/Activity';
import IComment from '../../../types/comment.d';
import Nav from '../Nav/Nav';

const StyledUserContainer = styled.main`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  max-width: 1200px;
  padding: 3rem 100px;
  margin: 0 auto;
  gap: 50px;

  @media screen and (max-width: 768px) {
    padding: 1rem 50px;
    flex-direction: column;
  }
`;

interface UserDetails {
  user: IUser;
  comments: IComment[];
  posts: IPost[] | string[];
}

// TODO responsive
const User = () => {
  const { id } = useParams();

  const [user, setUser] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [id]);

  if (!user) return null;

  const { user: userInfo, comments, posts } = user;

  const name = getUserFullName(userInfo);
  return (
    <>
      <Nav />
      <StyledUserContainer>
        <About user={userInfo} />
        <Activity comments={comments} posts={posts} name={name} />
      </StyledUserContainer>
    </>
  );
};

export default User;
