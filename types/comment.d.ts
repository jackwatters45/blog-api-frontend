import IUser from './user';
import IPost from './post';

interface IComment {
  _id: string;
  content: string;
  author: string | Partial<IUser>;
  createdAt: Date;
  updatedAt: Date;
  post: string | Partial<IPost>;
}

export default IComment;
