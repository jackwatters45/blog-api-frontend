import IUser from './user';
import IPost from './post';

interface IComment {
  _id: string;
  content: string;
  author: string | Partial<IUser>;
  createdAt: string;
  updatedAt: string;
  post: string | Partial<IPost>;
}

export default IComment;
