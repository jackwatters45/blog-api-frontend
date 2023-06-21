export interface DeletedData {
  deletedAt: string;
  deletedBy: Partial<IUser> | null;
  username: string;
  email: string;
  followerCount: number;
}
export interface IPopularAuthors extends IUser {
  likesCount: number;
  likesCountInTimeRange: number;
}

export interface IAdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userType: string;
  updatedAt: string;
  followersCount: number;
  followingCount: number;
  isDeleted: boolean;
  deletedData?: DeletedData;
}

interface IUser {
  _id: string;
  userType: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  followers: Partial<IUser[]> | string[];
  following: Partial<IUser[]> | string[];
  isDeleted: boolean;
  savedPosts: string[];
  description: string;
  avatarUrl: string;
  deletedData?: DeletedData;
}

export default IUser;
