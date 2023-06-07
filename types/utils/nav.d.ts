import { ReactNode } from 'react';

export interface NavItemProps {
  type: 'dropdown' | 'button' | 'link';
  title?: string;
  path?: string;
  onClick?: () => void;
  buttonChildren?: ReactNode;
  navItems?: NavItemProps[];
}

export interface DropdownProps extends Omit<NavItemProps, 'type'> {
  type: 'dropdown';
  buttonChildren: ReactNode;
  navItems: NavItemProps[];
}

export interface ButtonProps extends Omit<NavItemProps, 'type'> {
  type: 'button';
  title: string;
  onClick: () => void;
}

export interface LinkProps extends Omit<NavItemProps, 'type'> {
  type: 'link';
  title: string;
  path: string;
}

export type SpecificNavItemProps = DropdownProps | ButtonProps | LinkProps;
