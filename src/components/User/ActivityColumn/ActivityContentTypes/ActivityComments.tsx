import IComment from '../../../../../types/comment';
import CommentPreview from '../../../Posts/components/Comments/CommentPreview';

interface Props {
  comments: IComment[] | string[];
}

const ActivityComments = ({ comments }: Props) => {
  if (!comments.length) return <p>No comments yet...</p>;
  return (
    <div>
      {comments.map((comment: IComment | string) => {
        if (typeof comment === 'string') return null;
        return <CommentPreview key={comment._id} comment={comment} />;
      })}
    </div>
  );
};

export default ActivityComments;
