import IPost from '../post';
import IUser, { IAdminUser } from '../user';
import ITopic from '../topic';

export interface ISearchResults {
  posts: IPost[];
  users: IAdminUser[];
  topics: ITopic[];
}
