import Posts from '../Posts/Posts';
import Sidebar from './Sidebar/Sidebar';
import { StyledMain } from '../../styles/styledComponents/HelperComponents';
import { styled } from 'styled-components';
import { Pagination, usePagination } from '../../custom/usePagination';
import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import Loading from '../Shared/Loading';
import MenuOptions from '../Shared/MenuOptions';
import { useUserContext } from '../../context/UserContext';
import useErrorHandler from '../../custom/useErrorHandler';

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  width: 100%;
`;

const Dashboard = () => {
  const handleErrors = useErrorHandler();
  const { user } = useUserContext();

  const [posts, setPosts] = useState<IPost[] | undefined>(undefined);
  const [postCount, setPostCount] = useState<number>(0);

  const postsPerPage = '25';
  const { offset, ...paginationProps } = usePagination(postsPerPage, postCount);

  const defaultState = 'new';
  const [selectedOption, setSelectedOption] = useState(defaultState);

  useEffect(() => {
    const fetchPosts = async () => {
      const endUrl = selectedOption === 'following' ? '/following' : '';
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/posts${endUrl}?limit=${postsPerPage}&offset=${offset}`,
        {
          credentials: 'include',
        },
      );

      if (!res.ok) {
        handleErrors(res);
        return;
      }

      const {
        posts,
        meta: { total },
      } = await res.json();
      setPosts(posts);
      setPostCount(total);
    };
    fetchPosts();
  }, [offset, selectedOption, handleErrors]);

  return posts ? (
    <StyledMain>
      <PostsContainer>
        {user && (
          <MenuOptions
            options={['new', 'following']}
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
