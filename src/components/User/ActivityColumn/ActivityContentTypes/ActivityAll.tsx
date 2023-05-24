import IPost from '../../../../../types/post';
import IComment from '../../../../../types/comment';
import PostPreview from '../../../Posts/PostPreviews';
import CommentPreview from '../../../Posts/components/Comments/CommentPreview';

type Props = {
  posts: IPost[] | string[];
  comments: IComment[];
};

const isPost = (obj: IPost | IComment): obj is IPost =>
  (obj as IPost).title !== undefined;

const ActivityAll = ({ posts, comments }: Props) => {
  const sorted = [...posts, ...comments].sort((a, b) => {
    if (typeof a === 'string' || typeof b === 'string') return 0;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  if (!sorted.length) return <p>No activity yet...</p>;
  return (
    <div>
      {sorted.map((item) => {
        if (typeof item === 'string') return null;
        return isPost(item) ? (
          <PostPreview post={item} key={item._id} />
        ) : (
          <CommentPreview comment={item} key={item._id} />
        );
      })}
    </div>
  );
};

export default ActivityAll;
