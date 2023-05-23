import IPost from '../../../../../types/post';
import PostPreview from '../../../Previews/PostPreviews';

type Props = {
  posts: IPost[] | string[];
};

const ActivityPosts = ({ posts }: Props) => {
  if (!posts.length) return <p>No posts yet...</p>;
  return (
    <div>
      {posts.map((post) => {
        if (typeof post === 'string') return null;
        return <PostPreview post={post} key={post._id} />;
      })}
    </div>
  );
};

export default ActivityPosts;
