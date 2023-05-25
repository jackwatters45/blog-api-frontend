export interface IPopularAuthors extends IUser {
  likesCount: number;
  likesCountInTimeRange: number;
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
  description?: string;
}

export default IUser;
