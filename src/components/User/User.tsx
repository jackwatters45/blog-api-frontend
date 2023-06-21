import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import IUser from '../../../types/user.d';
import { styled } from 'styled-components';
import IPost from '../../../types/post.d';
import About from './AboutColumn/About';
import Activity from './ActivityColumn/Activity';
import IComment from '../../../types/comment.d';
import Loading from '../Shared/Loading';
import NotFoundPage from '../Errors/NotFoundPage';
import { useUserContext } from '../../context/UserContext';

const StyledUserContainer = styled.main`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;

  max-width: 1200px;
  width: 100%;
  padding: 3rem 75px;
  margin: 0 auto;
  gap: 75px;

  @media screen and (max-width: 768px) {
    padding: 1rem 50px;
    flex-direction: column;
  }
`;

interface UserDetails {
  user: IUser;
  comments: IComment[];
  posts: IPost[] | string[];
  isDeleted?: boolean;
  message?: string;
}

interface Props {
  userId?: string;
}

const User = ({ userId }: Props) => {
  const { id } = useParams();
  const { user: LoggedInUser } = useUserContext();
  const [user, setUser] = useState<UserDetails | null>(null);

  const isViewingOwnProfile = useMemo(() => {
    return id === LoggedInUser?._id || !id;
  }, [id, LoggedInUser?._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId ?? id}`);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [id, userId]);

  if (!user) return <Loading />;
  if (user.isDeleted) return <NotFoundPage message={user.message} />;

  const { user: userInfo, comments, posts } = user;
  const { firstName, lastName } = userInfo;
  return (
    <StyledUserContainer>
      <About user={userInfo} isViewingOwnProfile={isViewingOwnProfile} />
      <Activity comments={comments} posts={posts} name={`${firstName} ${lastName}`} />
    </StyledUserContainer>
  );
};

export default User;
