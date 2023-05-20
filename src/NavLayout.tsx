import { ReactNode } from 'react';
import Nav from './components/Nav/Nav';

interface LayoutProps {
  children: ReactNode;
}

const NavLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default NavLayout;
