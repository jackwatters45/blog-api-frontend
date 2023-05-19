import IUser from './user';

interface IPost {
  _id: string;
  title: string;
  content: string;
  author: Partial<IUser> | string;
  published: boolean;
  tags?: string[];
  likes?: Partial<IUser[]> | string[];
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export default IPost;
