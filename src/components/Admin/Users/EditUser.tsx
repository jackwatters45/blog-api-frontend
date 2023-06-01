import { useNavigate, useParams } from 'react-router-dom';
import UserForm, { Inputs } from '../../shared/UserForm/UserForm';
import {
  StyledFormContainer,
  StyledH1Centered,
} from '../../../styles/styledComponents/FormHelpers';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import IUser from '../../../../types/user';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | undefined>(undefined);
  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`);
      const { user } = await res.json();
      setUser(user);
    };
    fetchUser();
  }, [id]);

  const [signupError, setSignupError] = useState<string>('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(id);
      const response = id
        ? await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
          })
        : await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
          });

      if (!response.ok) {
        return setSignupError(
          id
            ? 'Error saving changes. Please try again.'
            : 'Error creating user. Please try again.',
        );
      }

      navigate('/admin/users');
    } catch (err) {
      console.log(err);
    }
  };

  // TODO loading
  return user ? (
    <StyledFormContainer>
      <StyledH1Centered>Edit User</StyledH1Centered>
      <UserForm
        userData={user}
        submitText={'Confirm Changes'}
        onSubmit={onSubmit}
        isAdminView={true}
        signupError={signupError}
      />
    </StyledFormContainer>
  ) : null;
};

export default EditUser;
