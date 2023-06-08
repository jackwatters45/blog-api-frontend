import EditPostCard from '../Posts/MyPosts/MyPostsCard';
import IPost from '../../../types/post';
import Filter from './Filter/Filter';
import { useState } from 'react';
import { getPostFilterOptions } from './Filter/filterOptions';
import {
  AdminContainer,
  CardContainer,
  FilterContainer,
  FilterError,
} from '../../styles/styledComponents/AdminCardComponents';
import { postFilterFunction } from './Filter/filterFunctions';
import { PaginateProps, Pagination } from '../../custom/usePagination';

interface Props {
  posts: IPost[];
  title: string;
  isAdminView?: boolean;
  paginationProps: PaginateProps;
}

const EditPostsView = ({ posts, title, isAdminView, paginationProps }: Props) => {
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts);

  return (
    <AdminContainer>
      <h1>{title}</h1>
      <FilterContainer>
        <Filter<IPost>
          data={posts}
          setFilteredData={setFilteredPosts}
          filterFunction={postFilterFunction}
          filterOptions={getPostFilterOptions(isAdminView ?? false)}
          placeHolder={'Filter Posts...'}
        />
      </FilterContainer>
      <CardContainer>
        {filteredPosts?.length ? (
          filteredPosts.map((post: IPost) => (
            <EditPostCard key={post._id} post={post} isAdminView={isAdminView} />
          ))
        ) : (
          <FilterError>{`No posts match your filter...`}</FilterError>
        )}
      </CardContainer>
      <Pagination {...paginationProps} />
    </AdminContainer>
  );
};

export default EditPostsView;
