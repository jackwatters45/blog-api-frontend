import { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import UserForm from '../shared/UserForm/UserForm';
import { UserInputs } from '../../../types/utils/formInputs';
import { Navigate } from 'react-router-dom';
import {
  StyledFormContainer,
  StyledH1Centered,
} from '../../styles/styledComponents/FormHelpers';

const EditProfile = () => {
  const { user } = useUserContext();

  const [changeError, setChangeError] = useState<string>('');

  const onSubmit = async (data: UserInputs) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user?._id}`, {
      method: 'Patch',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    return resData.error ? setChangeError(resData.error) : setChangeError('');
  };

  if (!user) return <Navigate to={'/login'} />;
  return (
    <StyledFormContainer>
      <StyledH1Centered>Edit Profile</StyledH1Centered>
      <UserForm
        userData={user}
        signupError={changeError}
        onSubmit={onSubmit}
        submitText="Save Changes"
        isAdminView={user.userType === 'admin'}
      />
    </StyledFormContainer>
  );
};

export default EditProfile;
