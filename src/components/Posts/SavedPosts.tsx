import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import { useUserContext } from '../../context/UserContext';
import useErrorHandler from '../Errors/useErrorHandler';
import Posts from './Posts';
import Loading from '../shared/Loading';
import {
  AdminContainer,
  FilterContainer,
} from '../../styles/styledComponents/AdminCardComponents';
import Filter from '../shared/Filter/Filter';
import { Pagination, usePagination } from '../../custom/usePagination';
import { postFilterFunction } from '../shared/Filter/filterFunctions';
import { getPostFilterOptions } from '../shared/Filter/filterOptions';
const SavedPosts = () => {
  const handleError = useErrorHandler();

  const [isFetched, setIsFetched] = useState(false);

  const { user } = useUserContext();

  const [postCount, setPostCount] = useState<number>(0);
  const itemsPerPage = '25';
  const { offset, ...paginationProps } = usePagination(itemsPerPage, postCount);

  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userId = user?._id;
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}/saved-posts`,
          {
            credentials: 'include',
          },
        );

        if (!res.ok) {
          handleError(res);
          return;
        }

        const savedPosts = await res.json();
        setPostCount(savedPosts.length);
        setPosts(savedPosts);
        setIsFetched(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [user?._id, handleError]);

  const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts ?? []);

  return isFetched ? (
    <AdminContainer>
      <h1>Saved Posts</h1>
      <FilterContainer>
        <Filter<IPost>
          data={posts as IPost[]}
          setFilteredData={setFilteredPosts}
          filterOptions={getPostFilterOptions(true)}
          filterFunction={postFilterFunction}
          placeHolder={'Filter Posts...'}
        />
      </FilterContainer>
      <Posts posts={filteredPosts} />
      <Pagination {...paginationProps} />
    </AdminContainer>
  ) : (
    <Loading />
  );
};

export default SavedPosts;
