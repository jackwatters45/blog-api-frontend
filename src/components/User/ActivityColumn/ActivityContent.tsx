import { useParams } from 'react-router-dom';
import IPost from '../../../../types/post.d';
import IComment from '../../../../types/comment.d';
import ActivityPosts from './ActivityContentTypes/ActivityPosts';
import ActivityComments from './ActivityContentTypes/ActivityComments';
import ActivityAll from './ActivityContentTypes/ActivityAll';

type Props = {
  posts: IPost[] | string[];
  comments: IComment[];
};

const ActivityContent = ({ posts, comments }: Props) => {
  const { type } = useParams();

  switch (type) {
    case 'posts':
      return <ActivityPosts posts={posts} />;
    case 'comments':
      return <ActivityComments comments={comments} />;
    default:
      return <ActivityAll posts={posts} comments={comments} />;
  }
};

export default ActivityContent;
