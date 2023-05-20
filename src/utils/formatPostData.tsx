import IUser from '../../types/user.d';

const checkIfUserPopulatedAndValid = (author: Partial<IUser> | string | null) => {
  if (typeof author === 'string')
    throw new Error('Author as a string is not allowed for this function.');
  return author && author._id && author.firstName && author.lastName;
};

export const getAuthorFullName = (author: null | string | Partial<IUser>) => {
  const authorIsValid = checkIfUserPopulatedAndValid(author);
  if (!authorIsValid) return 'Unknown';
  const { firstName, lastName } = author as IUser;
  return `${firstName} ${lastName}`;
};

export const getAuthorId = (author: Partial<IUser> | string | null) => {
  const authorIsValid = checkIfUserPopulatedAndValid(author);
  if (!authorIsValid) return false;

  const { _id } = author as IUser;
  return _id;
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const day = dateObj.getDate();

  if (new Date().getFullYear() === dateObj.getFullYear())
    return `${month} ${day}, ${dateObj.getFullYear()}`;

  return `${month} ${day}`;
};

export const formatContent = (content: string) => {
  if (content.length > 200) return `${content.slice(0, 200)}...`;
  return content;
};
