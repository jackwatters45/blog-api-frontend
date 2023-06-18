import { useEffect, useMemo, useState } from 'react';
import EditUsers from './EditUsers';
import { IAdminUser } from '../../../../types/user';
import Loading from '../../shared/Loading';
import { usePagination } from '../../../custom/usePagination';
import useErrorHandler from '../../Errors/useErrorHandler';

const EditUsersAdmin = () => {
  const handleErrors = useErrorHandler();

  const [users, setUsers] = useState<undefined | IAdminUser[]>(undefined);
  const userCount = useMemo(() => users?.length ?? 0, [users?.length]);

  const itemsPerPage = '25';
  const { offset, ...paginationProps } = usePagination(itemsPerPage, userCount);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/users/preview?limit=${itemsPerPage}&offset=${offset}`,
        {
          credentials: 'include',
        },
      );
      if (!res.ok) {
        handleErrors(res);
        return;
      }
      const data = await res.json();
      const { users } = data;
      setUsers(users);
    };
    fetchUsers();
  }, [offset, handleErrors]);

  return users ? (
    <EditUsers users={users} paginationProps={paginationProps} />
  ) : (
    <Loading />
  );
};

export default EditUsersAdmin;
