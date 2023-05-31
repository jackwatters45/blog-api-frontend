import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import IPost from '../../../types/post';
import IUser from '../../../types/user';

const StyledForm = styled.form`
  display: flex;
`;

const SelectWrapper = styled.div`
  border-radius: 0.25rem 0 0 0.25rem;
  width: 100px;
  overflow: hidden;
`;

const StyledSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border-right: 0.5rem solid transparent;
  height: 100%;
  width: 100%;
`;

const StyledInput = styled.input`
  border-radius: 0;
  width: 100%;
  border-radius: 0 0.25rem 0.25rem 0;
`;

type Props = {
  postsData: IPost[];
  setFilteredPosts: Dispatch<SetStateAction<IPost[]>>;
  isAdminView?: boolean;
};

const Filter = ({ postsData, setFilteredPosts, isAdminView }: Props) => {
  const [filter, setFilter] = useState<string>('');
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
  };

  const [filterType, setFilterType] = useState<string>('any');
  const handleFilterTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  useEffect(() => {
    if (filter === '') return setFilteredPosts(postsData);

    switch (filterType) {
      case 'title':
        setFilteredPosts(
          postsData.filter((post: { title: string }) =>
            post.title.toLowerCase().includes(filter),
          ),
        );
        break;
      case 'author':
        setFilteredPosts(
          postsData.filter(
            (post: { author: Partial<IUser> }) =>
              (post?.author.firstName &&
                post.author.firstName.toLowerCase().includes(filter)) ||
              (post?.author.lastName &&
                post.author.lastName.toLowerCase().includes(filter)),
          ),
        );
        break;

      case 'topic':
        setFilteredPosts(
          postsData.filter(
            (post: IPost) =>
              post?.topic && post.topic.name.toLowerCase().includes(filter),
          ),
        );
        break;
      default:
        setFilteredPosts(
          postsData.filter(
            (post: IPost) =>
              post.title.toLowerCase().includes(filter) ||
              (post?.author?.firstName &&
                post.author.firstName.toLowerCase().includes(filter)) ||
              (post?.author?.lastName &&
                post.author.lastName.toLowerCase().includes(filter)) ||
              (post?.topic && post.topic.name.toLowerCase().includes(filter)),
          ),
        );
    }
  }, [filter, postsData, filterType, setFilteredPosts]);

  return (
    <>
      <StyledForm>
        <SelectWrapper>
          <StyledSelect
            name="filterType"
            value={filterType}
            onChange={handleFilterTypeChange}
          >
            <option value="">Any</option>
            <option value="title">Title</option>
            {isAdminView && <option value="author">Author</option>}
            <option value="topic">Topic</option>
          </StyledSelect>
        </SelectWrapper>
        <StyledInput
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter posts..."
        />
      </StyledForm>
    </>
  );
};

export default Filter;
