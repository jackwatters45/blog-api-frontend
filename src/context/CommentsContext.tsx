import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import IComment from '../../types/comment';

interface CommentsContext {
  comments: IComment[];
  setComments: Dispatch<SetStateAction<IComment[]>>;
  totalComments: number;
  setTotalComments: Dispatch<SetStateAction<number>>;
  totalParentComments: number;
  setTotalParentComments: Dispatch<SetStateAction<number>>;
  sortBy: string;
}

export const CommentsContext = createContext<undefined | CommentsContext>(undefined);

export const useCommentsContext = (): CommentsContext => {
  const context = useContext(CommentsContext);

  if (context === undefined) {
    throw new Error('useCommentsContext must be used within a CommentsProvider');
  }

  return context;
};
