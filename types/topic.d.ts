export interface PopularTopics extends ITopic {
  [key: string]: any;
  totalPosts: number;
  totalLikes: number;
}

interface ITopic {
  _id: string;
  name: string;
}

export default ITopic;
