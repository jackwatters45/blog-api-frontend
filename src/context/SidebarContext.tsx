import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { PopularTopics } from '../../types/topic';
import { IPopularAuthors } from '../../types/user';
import IPost from '../../types/post';

export interface SidebarContext {
  posts: IPost[];
  authors: IPopularAuthors[];
  topics: PopularTopics[];
}

interface SidebarProviderProps {
  children?: ReactNode;
}

const SidebarContext = createContext<undefined | SidebarContext>(undefined);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const getPopularPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/popular?limit=5`);
      return await res.json();
    };

    const getPopularAuthors = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/popular?limit=5`);
      return await res.json();
    };

    const getPopularTopics = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/topics/popular?limit`);
      return await res.json();
    };

    const fetchAll = async () => {
      try {
        const [posts, authors, topics] = await Promise.all([
          getPopularPosts(),
          getPopularAuthors(),
          getPopularTopics(),
        ]);
        setPosts(posts);
        setAuthors(authors);
        setTopics(topics);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  return (
    <SidebarContext.Provider value={{ posts, authors, topics }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = (): SidebarContext => {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }

  return context;
};
