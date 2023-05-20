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
}

export default IUser;
