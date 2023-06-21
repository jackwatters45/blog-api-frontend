import { useEffect, useState } from 'react';
import IComment from '../../../../../types/comment';
import { CommentsContext } from '../../../../context/CommentsContext';
import CommentsSection from './CommentsSection';
import { useParams } from 'react-router-dom';
import useSelect from '../../../../custom/useSelect';
import { usePagination } from '../../../../custom/usePagination';

interface Props {
  initialComments: IComment[] | undefined;
  scrollToComments?: boolean;
  scrollToComment?: string;
}

const CommentsContainer = ({ initialComments }: Props) => {
  const [comments, setComments] = useState<IComment[]>(initialComments ?? []);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [totalParentComments, setTotalParentComments] = useState<number>(0);

  const { id: postId } = useParams();

  const [sortBy, SortBySelect] = useSelect('newest');

  const itemsPerPage = '5';
  const { offset, ...paginationProps } = usePagination(itemsPerPage, totalParentComments);

  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    if (isFirstRender) return setIsFirstRender(false);
    const fetchComments = async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/posts/${postId}/comments?sortBy=${sortBy}&limit=${itemsPerPage}&offset=${offset}`,
      );
      const {
        comments,
        meta: { total, totalParent },
      } = await response.json();

      setComments(comments);
      setTotalComments(total);
      setTotalParentComments(totalParent);
    };
    fetchComments();
  }, [initialComments, sortBy, offset, isFirstRender, postId]);

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setComments,
        totalComments,
        setTotalComments,
        totalParentComments,
        setTotalParentComments,
        sortBy,
      }}
    >
      <CommentsSection SortBySelect={SortBySelect} paginationProps={paginationProps} />
    </CommentsContext.Provider>
  );
};

export default CommentsContainer;
