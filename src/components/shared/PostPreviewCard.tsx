import IPost, { ILike } from '../../../types/post';
import { formatDate } from './formattingHelpers';
import Likes from './Likes';
import useLikes from '../../custom/useLikes';
import CommentsButton from './CommentsButton';
import { Link } from 'react-router-dom';
import DeleteButton from './ConfirmDelete/DeleteButton';
import Icon from '@mdi/react';
import { mdiDelete, mdiOpenInNew, mdiPencil } from '@mdi/js';
import { useUserContext } from '../../context/UserContext';
import {
  ButtonOptions,
  Buttons,
  AdminCard,
  StyledAuthor,
  StyledTitleTopic,
  StyledUpdated,
  StyledDeletedAuthor,
} from '../../styles/styledComponents/AdminCardComponents';

interface Props {
  post: IPost;
  isAdminView?: boolean;
}

const PostPreviewCard = ({ post, isAdminView }: Props) => {
  const { user } = useUserContext();
  const { title, likes, topic, updatedAt, comments, author, _id } = post;
  const likesProps = useLikes(likes as ILike[], user?._id as string);
  const isDeleted = author?.isDeleted;
  return (
    <AdminCard>
      <StyledTitleTopic>
        <h2>{title}</h2>
        {topic && <Link to={`/topic/${topic._id}`}>in {topic.name}</Link>}
      </StyledTitleTopic>
      <StyledUpdated>Last Updated: {formatDate(updatedAt)}</StyledUpdated>
      <StyledAuthor>
        <p>Written by</p>
        {author && !isDeleted ? (
          <p>
            {author?.firstName} {author?.lastName}
          </p>
        ) : (
          <StyledDeletedAuthor>Deleted</StyledDeletedAuthor>
        )}
      </StyledAuthor>
      <Buttons>
        <Likes _id={_id} {...likesProps} />
        <CommentsButton postId={_id} commentsCount={comments?.length ?? 0} />
      </Buttons>
      <ButtonOptions>
        {isAdminView && (
          <>
            <DeleteButton
              StyledButton={Icon}
              objType={'post'}
              id={_id}
              extraButtonProps={{ path: mdiDelete, size: 1 }}
            />
            <Link to={isAdminView ? `/admin/posts/${_id}/edit` : `/post/${_id}/edit`}>
              <Icon path={mdiPencil} size={1} />
            </Link>
          </>
        )}
        <Link to={`/post/${_id}`}>
          <Icon path={mdiOpenInNew} size={1} />
        </Link>
      </ButtonOptions>
    </AdminCard>
  );
};

export default PostPreviewCard;
