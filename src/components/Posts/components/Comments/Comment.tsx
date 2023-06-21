import IComment from '../../../../../types/comment';
import { useMemo, useState } from 'react';
import CommentForm from './Comment/CommentForm';
import CommentContent from './Comment/CommentContent';
import ShowMoreComments from './Comment/ShowMoreComments';
import { useCommentsContext } from '../../../../context/CommentsContext';
import { sortCommentReplies } from './utils/commentHelperFuncs';

interface Props {
  comment: IComment;
  level?: number;
}

const Comment = ({ comment, level = 0 }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const [commentsShown, setCommentsShown] = useState(0);

  const { sortBy } = useCommentsContext();
  const sortedReplies = useMemo(() => {
    return sortCommentReplies(sortBy, comment.replies);
  }, [comment.replies, sortBy]);

  return (
    <div style={{ paddingLeft: `${level}rem` }}>
      <CommentContent
        comment={comment}
        setIsEditing={setIsEditing}
        setIsReplying={setIsReplying}
      />

      {(isEditing || isReplying) && (
        <CommentForm
          commentId={comment._id}
          initialComment={isEditing ? comment.content : ''}
          setIsEditing={setIsEditing}
          setIsReplying={setIsReplying}
        />
      )}
      {commentsShown > 0 &&
        sortedReplies?.slice(0, commentsShown).map((reply) => {
          return <Comment key={reply._id} comment={reply} level={level + 1} />;
        })}
      {comment.replies?.length > commentsShown ? (
        <ShowMoreComments setCommentsShown={setCommentsShown} />
      ) : null}
    </div>
  );
};

export default Comment;
