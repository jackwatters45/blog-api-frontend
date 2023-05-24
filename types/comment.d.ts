import IUser from './user';
import IPost from './post';

interface IComment {
  _id: string;
  content: string;
  author: Partial<IUser>; // string |
  createdAt: string;
  updatedAt: string;
  post: string | Partial<IPost>;
}

export default IComment;
