import { useEffect, useState } from 'react';
import ITopic from '../../../../types/topic';
import EditTopics from './EditTopics';

const EditTopicsAdmin = () => {
  const [topics, setTopics] = useState<undefined | ITopic[]>(undefined);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/topics`);
      const data = await res.json();
      setTopics(data);
    };
    fetchUsers();
  }, []);

  return topics ? <EditTopics topics={topics} /> : null;
};

export default EditTopicsAdmin;
