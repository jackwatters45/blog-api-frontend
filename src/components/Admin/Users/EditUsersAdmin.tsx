import { useEffect, useState } from 'react';
import EditUsers from './EditUsers';
import { AdminUser } from '../../../../types/post';

const EditUsersAdmin = () => {
  const [users, setUsers] = useState<undefined | AdminUser[]>(undefined);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/preview`);
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return users ? <EditUsers users={users} /> : null;
};

export default EditUsersAdmin;
