import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ITopic from '../../../../types/topic';
import { SubmitHandler } from 'react-hook-form';
import {
  StyledFormContainer,
  StyledH1Centered,
} from '../../../styles/styledComponents/FormHelpers';
import TopicForm from './TopicForm';
import { TopicInputs } from '../../../../types/utils/formInputs';
import Loading from '../../shared/Loading';

const EditTopic = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState<ITopic | undefined>(undefined);
  useEffect(() => {
    if (!id) return;
    const fetchTopic = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/topics/${id}`);
      const data = await res.json();

      setTopic(data);
    };
    fetchTopic();
  }, [id]);

  const [changeError, setChangeError] = useState<string>('');

  const onSubmit: SubmitHandler<TopicInputs> = async (data) => {
    try {
      const response = id
        ? await fetch(`${import.meta.env.VITE_API_URL}/topics/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
          })
        : await fetch(`${import.meta.env.VITE_API_URL}/topics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
          });

      if (!response.ok) {
        return setChangeError(
          id
            ? 'Error saving changes. Please try again.'
            : 'Error creating topic. Please try again.',
        );
      }

      navigate('/admin/topics');
    } catch (err) {
      console.log(err);
    }
  };

  return !(!topic && id) ? (
    <StyledFormContainer>
      <StyledH1Centered>{id ? 'Edit Topic' : 'Create Topic'}</StyledH1Centered>
      <TopicForm
        topicName={topic?.name}
        submitText={'Confirm Changes'}
        onSubmit={onSubmit}
        changeError={changeError}
      />
    </StyledFormContainer>
  ) : (
    <Loading />
  );
};

export default EditTopic;
