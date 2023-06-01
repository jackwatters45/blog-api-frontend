import {
  StyledButtonsOptions,
  TopicAdminCard,
} from '../../../styles/styledComponents/AdminCardComponents';
import ITopic from '../../../../types/topic';
import Icon from '@mdi/react';
import { mdiDelete, mdiPencil } from '@mdi/js';
import { Link } from 'react-router-dom';
import DeleteButton from '../../Posts/MyPosts/ConfirmDelete/DeleteButton';

type Props = {
  topic: ITopic;
};

const EditTopicCard = ({ topic: { _id, name } }: Props) => {
  return (
    <TopicAdminCard>
      <h2>{`${name}`}</h2>
      <StyledButtonsOptions>
        <DeleteButton
          StyledButton={Icon}
          id={_id}
          objType={'topic'}
          extraButtonProps={{ path: mdiDelete, size: 1 }}
        />
        <Link to={`/admin/topics/${_id}/edit`}>
          <Icon path={mdiPencil} size={1} />
        </Link>
      </StyledButtonsOptions>
    </TopicAdminCard>
  );
};

export default EditTopicCard;
