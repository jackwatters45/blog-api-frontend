import Nav from '../Nav/Nav';
import { StyledMain } from '../../styles/styledComponents/HelperComponents';
import EditPostCard from '../Posts/MyPosts/MyPostsCard';
import { styled } from 'styled-components';
import IPost from '../../../types/post';
import Filter from './Filter';
import { useState } from 'react';

const MyPostsMain = styled(StyledMain)`
  max-width: 1250px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const FilterContainer = styled.div`
  padding-right: 1rem;
`;

const StyledPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

type Props = {
  posts: IPost[];
  title: string;
  isAdminView?: boolean;
};

const EditPostsView = ({ posts, title, isAdminView }: Props) => {
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts);

  return (
    <>
      <Nav />
      <MyPostsMain>
        <Container>
          <h1>{title}</h1>
          <FilterContainer>
            <Filter
              postsData={posts}
              setFilteredPosts={setFilteredPosts}
              isAdminView={isAdminView}
            />
          </FilterContainer>
          <StyledPosts>
            {filteredPosts?.length ? (
              filteredPosts.map((post: IPost) => {
                return (
                  <EditPostCard key={post._id} post={post} isAdminView={isAdminView} />
                );
              })
            ) : (
              <div>{`No posts here yet..`}</div>
            )}
          </StyledPosts>
        </Container>
      </MyPostsMain>
    </>
  );
};

export default EditPostsView;
