import { useEffect, useState } from 'react';
import EditUsers from './EditUsers';
import { AdminUser } from '../../../../types/post';
import Loading from '../../shared/Loading';
import { usePagination } from '../../../custom/usePagination';

const EditUsersAdmin = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const itemsPerPage = '25';
  const { offset, ...paginationProps } = usePagination(itemsPerPage, userCount);

  const [users, setUsers] = useState<undefined | AdminUser[]>(undefined);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/preview?limit=
      ${itemsPerPage}&offset=${offset}`);
      const {
        users,
        meta: { total },
      } = await res.json();
      setUsers(users);
      setUserCount(total);
    };
    fetchUsers();
  }, [offset]);

  return users ? (
    <EditUsers users={users} paginationProps={paginationProps} />
  ) : (
    <Loading />
  );
};

export default EditUsersAdmin;
