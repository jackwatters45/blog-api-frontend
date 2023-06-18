import EditPostCard from './PostPreviewCard';
import IPost from '../../../types/post';
import {
  AdminContainer,
  CardContainer,
  FilterContainer,
  FilterError,
} from '../../styles/styledComponents/AdminCardComponents';
import { PaginateProps, Pagination } from '../../custom/usePagination';
import { useSearchSingleCategory } from '../../custom/useSearchSingle';
import { styled } from 'styled-components';
import { useMemo } from 'react';

const StyledInput = styled.input`
  width: calc(100% - 59.25px);
`;

interface Props {
  posts: IPost[];
  title: string;
  isAdminView?: boolean;
  paginationProps: PaginateProps;
}

const EditPostsView = ({ posts, title, isAdminView, paginationProps }: Props) => {
  const searchRoute = useMemo(() => {
    return isAdminView ? 'admin/posts' : 'my-posts';
  }, [isAdminView]);

  const [filteredPosts, searchInput, setSearchInput, onSubmit, isFilter] =
    useSearchSingleCategory<IPost>(posts, searchRoute);

  return (
    <AdminContainer>
      <h1>{title}</h1>
      <FilterContainer>
        <form onSubmit={onSubmit}>
          <StyledInput
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Users..."
          />
          <input type="submit" value="Search" />
        </form>
      </FilterContainer>
      <CardContainer>
        {filteredPosts?.length ? (
          filteredPosts.map((post: IPost) => (
            <EditPostCard key={post._id} post={post} isAdminView={isAdminView} />
          ))
        ) : (
          <FilterError>
            {isFilter ? `No posts match your filter...` : `No Posts`}
          </FilterError>
        )}
      </CardContainer>
      <Pagination {...paginationProps} />
    </AdminContainer>
  );
};

export default EditPostsView;
