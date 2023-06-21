import IUser from './user';
import IPost from './post';

interface IComment {
  _id: string;
  content: string;
  author: Partial<IUser>;
  createdAt: string;
  updatedAt: string;
  post: Partial<IPost>;
  likes: string[];
  dislikes: string[];
  isDeleted: boolean;
  replies: IComment[];
  parentComment: string | null;
}

export default IComment;
