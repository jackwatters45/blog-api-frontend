import { useEffect, useState } from 'react';
import IPost from '../../../types/post';
import { useUserContext } from '../../context/UserContext';
import useErrorHandler from '../../custom/useErrorHandler';
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
  const handleErrors = useErrorHandler();
  const { user } = useUserContext();
  const [isFetched, setIsFetched] = useState(false);

  const [posts, setPosts] = useState<undefined | IPost[]>(undefined);
  const [postCount, setPostCount] = useState<number>(0);

  const { offset, ...paginationProps } = usePagination('25', postCount);

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
          handleErrors(res);
          return;
        }

        const {
          savedPosts,
          meta: { total },
        } = await res.json();
        setPosts(savedPosts);
        setPostCount(total);
        setIsFetched(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [user?._id, handleErrors]);

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
