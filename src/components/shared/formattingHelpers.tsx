// import IUser from '../../types/user.d';

// const checkIfUserPopulatedAndValid = (user: Partial<IUser> | string | null) => {
//   if (typeof user === 'string')
//     throw new Error('Author as a string is not allowed for this function.');
//   return user && user._id && user.firstName && user.lastName;
// };

// export const getUserFullName = (user:  Partial<IUser>) => {
// // export const getUserFullName = (user: null | string | Partial<IUser>) => {
//   // const isUserValid = checkIfUserPopulatedAndValid(user);
//   // if (!isUserValid) return 'Unknown';
//   const { firstName, lastName } = user as IUser;
//   return `${firstName} ${lastName}`;
// };

// export const getUserId = (user: Partial<IUser> | string | null) => {
//   const isUserValid = checkIfUserPopulatedAndValid(user);
//   if (!isUserValid) return false;

//   const { _id } = user as IUser;
//   return _id;
// };

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

export const getTitleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
