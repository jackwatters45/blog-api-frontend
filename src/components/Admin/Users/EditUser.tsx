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
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [id]);

  const [signupError, setSignupError] = useState<string>('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return setSignupError('Invalid credentials. Please try again.');
      }

      await response.json();
      navigate('/admin/users');
    } catch (err) {
      console.log(err);
    }
  };

  // TODO loading
  return user ? (
    <StyledFormContainer>
      <StyledH1Centered>Create User</StyledH1Centered>
      <UserForm
        userData={user}
        submitText={'Edit User'}
        onSubmit={onSubmit}
        isAdminView={true}
        signupError={signupError}
      />
      ;
    </StyledFormContainer>
  ) : null;
};

export default EditUser;
