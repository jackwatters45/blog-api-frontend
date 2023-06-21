import { createContext, useState, ReactNode, useContext, useCallback } from 'react';
import IUser from '../../types/user.d';

export interface IUserContext {
  user: IUser | undefined;
  updateUser: (newUser: IUser | undefined) => void;
}

interface UserProviderProps {
  children?: ReactNode;
}

// Create the user context
export const UserContext = createContext<undefined | IUserContext>(undefined);

// Create the provider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<undefined | IUser>(undefined);

  // Function to update the user
  const updateUser = useCallback((newUser: IUser | undefined) => {
    return setUser(newUser);
  }, []);

  // Provide the user state and update function to consuming components
  return (
    <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);

  // TODO maybe navigate to login page if user is undefined
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};
