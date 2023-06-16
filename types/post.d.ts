import IUser from './user';
import IComment from './comment';
import ITopic from './topic';
export interface ILike {
  userId: string;
  date: string;
}

interface IPost {
  _id: string;
  title: string;
  content: string;
  author: Partial<IUser>;
  published: boolean;
  topic?: ITopic;
  likes: ILike[];
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
}

export default IPost;
