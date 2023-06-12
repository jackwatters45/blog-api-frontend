import { useParams } from 'react-router-dom';
import IPost from '../../../../types/post.d';
import IComment from '../../../../types/comment.d';
import ActivityPosts from './ActivityContentTypes/ActivityPosts';
import ActivityComments from './ActivityContentTypes/ActivityComments';
import ActivityAll from './ActivityContentTypes/ActivityAll';
import ActivityFollowing from './ActivityFollowing';

interface Props {
  posts: IPost[] | string[];
  comments: IComment[];
}

const ActivityContent = ({ posts, comments }: Props) => {
  const { type } = useParams();

  switch (type) {
    case 'posts':
      return <ActivityPosts posts={posts} />;
    case 'comments':
      return <ActivityComments comments={comments} />;
    case 'following':
      return <ActivityFollowing />;
    default:
      return <ActivityAll posts={posts} comments={comments} />;
  }
};

export default ActivityContent;
