import { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import UserForm from '../shared/UserForms/UserForm';
import { UserInputs } from '../../../types/utils/formInputs';
import { Navigate } from 'react-router-dom';
import {
  StyledFormContainer,
  StyledH1Centered,
} from '../../styles/styledComponents/FormHelpers';
import ChangePasswordForm from '../shared/UserForms/ChangePasswordForm';
import DeleteUserSection from '../shared/UserForms/DeleteUser';

const EditProfile = () => {
  const { user } = useUserContext();

  const [changeError, setChangeError] = useState<string>('');
  const [confirmText, setConfirmText] = useState<string>('');

  const onSubmit = async (data: UserInputs) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user?._id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (resData.error) return setChangeError(resData.error);
    setConfirmText(resData.message);
  };

  return user ? (
    <StyledFormContainer>
      <StyledH1Centered>Edit Profile</StyledH1Centered>
      <UserForm
        userData={user}
        confirmText={confirmText}
        signupError={changeError}
        onSubmit={onSubmit}
        submitText="Save Changes"
        isAdminView={user.userType === 'admin'}
        showDelete={true}
        showAvatar={true}
        showDescription={true}
      />
      <ChangePasswordForm isOwnProfile={true} />
      <DeleteUserSection userId={user._id} isOwnProfile={true} />
    </StyledFormContainer>
  ) : (
    <Navigate to={'/login'} />
  );
};

export default EditProfile;
