import { Link } from 'react-router-dom';
import {
  ButtonOptions,
  AdminCard,
  StyledUpdated,
  StyledUserInfo,
  StyledFollowInfo,
  StyledDeleteDate,
} from '../../../styles/styledComponents/AdminCardComponents';
import DeleteButton from '../../Shared/ConfirmDelete/DeleteButton';
import Icon from '@mdi/react';
import { mdiDelete, mdiOpenInNew, mdiPencil } from '@mdi/js';
import { formatDate } from '../../Shared/formattingHelpers';
import { IAdminUser } from '../../../../types/user';

interface Props {
  user: IAdminUser;
  isViewOnly?: boolean;
}

const EditUserCard = ({ user, isViewOnly = false }: Props) => {
  const {
    _id,
    firstName,
    lastName,
    email,
    username,
    userType,
    updatedAt: lastActivity,
    followersCount,
    followingCount,
    isDeleted,
    deletedData,
  } = user;

  return (
    <AdminCard>
      <h2>{`${firstName} ${lastName}`}</h2>
      {user && !isDeleted ? (
        <>
          <StyledUserInfo>
            <p>{`${email} | @${username} | ${userType}`}</p>
          </StyledUserInfo>
          <StyledUpdated>Last Activity: {formatDate(lastActivity)}</StyledUpdated>
          <StyledFollowInfo>
            <p>{`Followers ${followersCount}`}</p>
            <p>{`Following ${followingCount}`}</p>
          </StyledFollowInfo>
        </>
      ) : (
        <>
          <StyledUserInfo>
            <p>{`${deletedData?.email} | @${deletedData?.username} | ${userType}`}</p>
          </StyledUserInfo>
          <StyledDeleteDate>
            Deleted: {formatDate(deletedData?.deletedAt as string)}
          </StyledDeleteDate>
        </>
      )}
      <ButtonOptions>
        {!isDeleted && !isViewOnly ? (
          <>
            <DeleteButton
              StyledButton={Icon}
              id={_id}
              objType={'user'}
              extraButtonProps={{ path: mdiDelete, size: 1 }}
            />
            <Link to={`/admin/users/${_id}/edit`}>
              <Icon path={mdiPencil} size={1} />
            </Link>
            <Link to={`/user/${_id}`}>
              <Icon path={mdiOpenInNew} size={1} />
            </Link>
          </>
        ) : (
          <Link to={`/admin/users/${_id}/deleted`}>
            <Icon path={mdiOpenInNew} size={1} />
          </Link>
        )}
      </ButtonOptions>
    </AdminCard>
  );
};

export default EditUserCard;
