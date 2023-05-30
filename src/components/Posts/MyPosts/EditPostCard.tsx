import { styled } from 'styled-components';
import IPost, { ILike } from '../../../../types/post';
import { formatDate } from '../../shared/formattingHelpers';
import Likes from '../../shared/Likes';
import useLikes from '../../../custom/useLikes';
import CommentsButton from '../../shared/CommentsButton';
import { Link } from 'react-router-dom';
import DeleteButton from './ConfirmDelete/DeleteButton';

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto) 1fr;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 4px;
  padding: 1rem .25rem 1rem 1rem;
  width: 350px;
  min-height: 200px;

  ${({ theme }) => theme.shadow};

  @media screen and (max-width: 400px) {
  width: 90vw;
`;

const StyledTitleTopic = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  h2 {
    margin-right: 0.75rem;
  }

  a {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 600;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const StyledUpdated = styled(Link)`
  font-size: 0.9rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const ButtonOptions = styled(Buttons)`
  margin-top: 1rem;
  margin-right: 0.75rem;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ButtonOption = styled.button`
  text-decoration: underline;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 1rem;
`;

type Props = {
  post: IPost;
};

// connect to backend
const EditPostCard = ({ post }: Props) => {
  console.log(post);
  const { title, likes, topic, updatedAt, comments, author, _id } = post;
  const likesProps = useLikes(likes as ILike[], author as string);

  return (
    <Container>
      <StyledTitleTopic>
        <h2>{title}</h2>
        {topic && <Link to={`/topic/${topic._id}`}>in {topic.name}</Link>}
      </StyledTitleTopic>
      <StyledUpdated to={`/post/${_id}`}>
        Last Updated: {formatDate(updatedAt)}
      </StyledUpdated>
      <Buttons>
        <Likes _id={_id} {...likesProps} />
        <CommentsButton commentsCount={comments?.length ?? 0} />
      </Buttons>
      <ButtonOptions>
        <DeleteButton StyledButton={ButtonOption} buttonContent={'Delete'} postId={_id} />
        <Link to={`/post/${_id}/edit`}>
          <ButtonOption>Edit</ButtonOption>
        </Link>
        <Link to={`/post/${_id}`}>
          <ButtonOption>View</ButtonOption>
        </Link>
      </ButtonOptions>
    </Container>
  );
};

export default EditPostCard;
