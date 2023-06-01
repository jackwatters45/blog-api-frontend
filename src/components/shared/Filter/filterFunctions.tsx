import IPost, { AdminUser } from '../../../../types/post';
import ITopic from '../../../../types/topic';
import IUser from '../../../../types/user';

export const postFilterFunction = (
  filter: string,
  postsData: IPost[],
  filterType?: string,
) => {
  if (!filter) return postsData;
  switch (filterType) {
    case 'title':
      return postsData.filter((post: { title: string }) =>
        post.title.toLowerCase().includes(filter),
      );
      break;
    case 'author':
      return postsData.filter(
        (post: { author: Partial<IUser> }) =>
          (post?.author.firstName &&
            post.author.firstName.toLowerCase().includes(filter)) ||
          (post?.author.lastName && post.author.lastName.toLowerCase().includes(filter)),
      );
      break;
    case 'topic':
      return postsData.filter(
        (post: IPost) => post?.topic && post.topic.name.toLowerCase().includes(filter),
      );
      break;
    default:
      return postsData.filter(
        (post: IPost) =>
          post.title.toLowerCase().includes(filter) ||
          (post?.author?.firstName &&
            post.author.firstName.toLowerCase().includes(filter)) ||
          (post?.author?.lastName &&
            post.author.lastName.toLowerCase().includes(filter)) ||
          (post?.topic && post.topic.name.toLowerCase().includes(filter)),
      );
  }
};
export const userFilterFunction = (
  filter: string,
  usersData: AdminUser[],
  filterType?: string,
) => {
  if (!filter) return usersData;
  switch (filterType) {
    case 'name':
      return usersData.filter((user: { firstName: string; lastName: string }) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter),
      );
      break;
    case 'email':
      return usersData.filter((user: { email: string }) =>
        user.email.toLowerCase().includes(filter),
      );
      break;
    case 'username':
      return usersData.filter((user: { username: string }) =>
        user.username.toLowerCase().includes(filter),
      );
      break;
    default:
      return usersData.filter((user: AdminUser) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter),
      );
  }
};

export const topicFilterFunction = (filter: string, topicsData: ITopic[]) => {
  return topicsData.filter((topic: { name: string }) =>
    topic.name.toLowerCase().includes(filter),
  );
};
