import { Link } from 'react-router-dom';
import IUser from '../../../../types/user';
import {
  ButtonOptions,
  Buttons,
  Container,
  StyledAuthor,
  StyledTitleTopic,
  StyledUpdated,
} from '../../../styles/styledComponents/AdminCard';
import Likes from '../../shared/Likes';
import CommentsButton from '../../shared/CommentsButton';
import DeleteButton from '../../Posts/MyPosts/ConfirmDelete/DeleteButton';
import Icon from '@mdi/react';
import { mdiDelete, mdiOpenInNew, mdiPencil } from '@mdi/js';

type Props = {
  user: IUser;
};

const EditUserCard = ({ user }: Props) => {
  const { _id, firstName, lastName, email, updatedAt } = user;
  return (
    <Container>
      <StyledTitleTopic>
        {/* <h2>{title}</h2> */}
        {/* {topic && <Link to={`/topic/${topic._id}`}>in {topic.name}</Link>} */}
      </StyledTitleTopic>
      <StyledUpdated to={`/post/${_id}`}>
        {/* Last Updated: {formatDate(updatedAt)} */}
      </StyledUpdated>
      <StyledAuthor>
        {firstName && lastName ? `${firstName} ${lastName}` : 'Unknown'}
      </StyledAuthor>
      <Buttons>
        {/* <Likes _id={_id} {...likesProps} />
        <CommentsButton commentsCount={comments?.length ?? 0} /> */}
      </Buttons>
      <ButtonOptions>
        <DeleteButton
          StyledButton={Icon}
          postId={_id}
          extraButtonProps={{ path: mdiDelete, size: 1 }}
        />
        <Link to={`/admin/users/${_id}/edit`}>
          <Icon path={mdiPencil} size={1} />
        </Link>
        <Link to={`/user/${_id}`}>
          <Icon path={mdiOpenInNew} size={1} />
        </Link>
      </ButtonOptions>
    </Container>
  );
};

export default EditUserCard;
