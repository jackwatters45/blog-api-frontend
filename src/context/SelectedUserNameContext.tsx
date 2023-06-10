import { FC, ReactNode, createContext } from 'react';

export const SelectedUserNameContext = createContext<string>('');

interface Props {
  children: ReactNode;
  value: string;
}
export const SelectedUserNameProvider: FC<Props> = ({ children, value }: Props) => {
  return (
    <SelectedUserNameContext.Provider value={value}>
      {children}
    </SelectedUserNameContext.Provider>
  );
};
