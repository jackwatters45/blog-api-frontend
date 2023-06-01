import IUser from './user';
import IComment from './comment';
import ITopic from './topic';
export interface ILike {
  userId: string;
  date: string;
}

export interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userType: string;
  updatedAt: string;
  followersCount: number;
  followingCount: number;
}
interface IPost {
  _id: string;
  title: string;
  content: string;
  author: Partial<IUser>;
  published: boolean;
  topic?: ITopic;
  likes?: ILike[];
  comments?: IComment[];
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export default IPost;
