import IUser from './user';
import IPost from './post';

interface IComment {
  _id: string;
  content: string;
  author: Partial<IUser>;
  createdAt: string;
  updatedAt: string;
  post: Partial<IPost>;
}

export default IComment;
