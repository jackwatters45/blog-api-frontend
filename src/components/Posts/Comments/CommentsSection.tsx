import { styled } from 'styled-components';
import AddComment from './AddComment';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Comment from './Comment';
import { Pagination } from '../../../custom/usePagination';
import { SelectProps, getSortOptions } from '../../../custom/useSelect';
import { useCommentsContext } from '../../../context/CommentsContext';

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CommentsHeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  SortBySelect: FC<SelectProps>;
  paginationProps: {
    currentPage: number;
    pageCount: number;
    handlePageClick: (event: { selected: number }) => void;
  };
}

const CommentsSection = ({ SortBySelect, paginationProps }: Props) => {
  const { state } = useLocation();
  useEffect(() => {
    if (state && state.scrollToComments) {
      const element = document.getElementById('comments');
      if (element) window.scrollTo(0, element.offsetTop);
    } else if (state && state.scrollToComment) {
      const element = document.getElementById(state.scrollToComment);
      if (element) window.scrollTo(0, element.offsetTop);
    }
  }, [state]);

  const { totalComments, comments } = useCommentsContext();

  return (
    <Container id="comments">
      <CommentsHeaderSection>
        <h2>Comments ({totalComments ?? 0})</h2>
        <SortBySelect {...getSortOptions('')} />
      </CommentsHeaderSection>
      <AddComment />
      {comments?.map((comment) => {
        return <Comment key={comment._id} comment={comment} />;
      })}
      <Pagination {...paginationProps} />
    </Container>
  );
};

export default CommentsSection;
