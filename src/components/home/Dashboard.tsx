import Posts from '../Posts/Posts';
import Sidebar from './Sidebar/Sidebar';
import { StyledMain } from '../../styles/styledComponents/HelperComponents';
import { styled } from 'styled-components';
import { Pagination, usePagination } from '../../custom/usePagination';
import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import Loading from '../shared/Loading';
import MenuOptions from '../shared/MenuOptions';
import { useUserContext } from '../../context/UserContext';

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`;

const Dashboard = () => {
  const { user } = useUserContext();

  const [postCount, setPostCount] = useState<number>(0);
  const postsPerPage = '25';
  const { offset, ...paginationProps } = usePagination(postsPerPage, postCount);

  const defaultState = 'new';
  const [selectedOption, setSelectedOption] = useState(defaultState);

  const [posts, setPosts] = useState<IPost[] | undefined>(undefined);
  useEffect(() => {
    const fetchPostsFollowing = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/posts/following?limit=${postsPerPage}&offset=${offset}`,
        {
          credentials: 'include',
        },
      );
      const {
        posts,
        meta: { total },
      } = await res.json();
      setPosts(posts);
      setPostCount(total);
    };

    const fetchPostsNew = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts?limit=${postsPerPage}&offset=${offset}`,
      );
      const {
        posts,
        meta: { total },
      } = await res.json();
      setPosts(posts);
      setPostCount(total);
    };

    switch (selectedOption) {
      case 'following':
        fetchPostsFollowing();
        break;
      default:
        fetchPostsNew();
        break;
    }
  }, [offset, selectedOption]);

  const options = ['new', 'following'];
  return posts ? (
    <StyledMain>
      <PostsContainer>
        {user && (
          <MenuOptions
            options={options}
            defaultOption={defaultState}
            selectType="state"
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        )}
        <Posts posts={posts} />
        <Pagination {...paginationProps} />
      </PostsContainer>
      <Sidebar />
    </StyledMain>
  ) : (
    <Loading />
  );
};

export default Dashboard;
