import { createContext, useState, ReactNode, useContext } from 'react';
import IUser from '../../types/user.d';

export interface IUserContext {
  user: IUser | null;
  updateUser: (newUser: IUser | null) => void;
}

interface UserProviderProps {
  children?: ReactNode;
}

// TODO remove
const exUser = {
  _id: '6462f0c1ba9c0d9fcab5270f',
  firstName: 'John',
  lastName: 'Watters',
  email: 'jack.watters@me.com',
  username: 'jackwatters45',
  password: '$2a$10$/QsF2t8PMokHKyLQLP7FwuIfW/Ys7Lys0vOptAU7n2lyx2dYiADEq',
  userType: 'admin',
  createdAt: '2023-05-16T02:56:01.546Z',
  updatedAt: '2023-05-24T23:17:51.538Z',
  __v: 0,
  followers: [],
  following: ['6463155a4c3c1b241a9d9030', '645f10f10b9d61e8528c6c6e'],
  posts: [],
  description:
    'Software Developer specializing in front-end development. Experienced with all stages of the development cycle for dynamic web projects. Well-versed in numerous programming languages including JavaScript, SQL, and Python.',
};

// Create the user context
export const UserContext = createContext<undefined | IUserContext>(undefined);

// Create the provider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<null | IUser>(exUser);

  // Function to update the user
  const updateUser = (newUser: IUser | null) => {
    setUser(newUser);
  };

  // Provide the user state and update function to consuming components
  return (
    <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);

  // TODO maybe navigate to login page if user is null
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};
