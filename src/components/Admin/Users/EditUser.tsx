import { useParams } from 'react-router-dom';
import UserForm from '../../shared/UserForms/UserForm';
import {
  StyledFormContainer,
  StyledH1Centered,
} from '../../../styles/styledComponents/FormHelpers';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import IUser from '../../../../types/user';
import { UserInputs } from '../../../../types/utils/formInputs';
import Loading from '../../shared/Loading';
import ChangePasswordForm from '../../shared/UserForms/ChangePasswordForm';
import DeleteUserSection from '../../shared/UserForms/DeleteUser';

const EditUser = () => {
  const { id } = useParams();

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
  const [confirmText, setConfirmText] = useState<string>('');

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        return key === 'avatar' && value[0]
          ? formData.append(key, value[0])
          : formData.append(key, value);
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { Accept: 'multipart/form-data' },
        body: formData,
      });

      if (!response.ok) {
        return setSignupError('Error saving changes. Please try again.');
      }

      const { message } = await response.json();
      setConfirmText(message);
    } catch (err) {
      console.log(err);
    }
  };

  return user ? (
    <StyledFormContainer>
      <StyledH1Centered>Edit User</StyledH1Centered>
      <UserForm
        userData={user}
        submitText={'Confirm Changes'}
        onSubmit={onSubmit}
        confirmText={confirmText}
        signupError={signupError}
        isAdminView={true}
        showPassword={false}
        showAvatar={true}
        showDescription={true}
        showDelete={true}
      />
      <ChangePasswordForm isOwnProfile={false} />
      <DeleteUserSection userId={user._id} />
    </StyledFormContainer>
  ) : (
    <Loading />
  );
};

export default EditUser;
