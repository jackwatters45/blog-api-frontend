import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { formatDate } from '../../Shared/formattingHelpers';
import { TopicButton } from '../../../styles/styledComponents/HelperComponents';
import Likes from '../../Shared/Likes';
import CommentsButton from '../../Shared/CommentsButton';
import IPost, { ILike } from '../../../../types/post';
import useLikes from '../../../custom/useLikes';
import { useUserContext } from '../../../context/UserContext';
import SavePost from '../../Shared/SavePost/SavePost';

const StyledPostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StyledH1 = styled.h1`
  font-size: 2.5rem;
`;

const StyledAuthor = styled(Link)`
  font-size: 0.8rem;
  color: grey;
`;

const StyledAuthorDeleted = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const BottomRowInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0 0.75rem;
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-size: 0.8rem;
`;

interface Props {
  post: IPost;
}

const PostInfo = ({
  post: { title, author, createdAt, _id, likes, comments, topic },
}: Props) => {
  const { user } = useUserContext();

  const useLikesProps = useLikes(likes as ILike[], user?._id as string);

  return (
    <StyledPostInfoContainer>
      <StyledH1>{title}</StyledH1>
      {author && !author?.isDeleted ? (
        <StyledAuthor to={`/user/${author._id}`}>
          {`${author.firstName} ${author.lastName} • ${formatDate(createdAt)}`}
        </StyledAuthor>
      ) : (
        <StyledAuthorDeleted>
          <p>
            <i>Deleted</i>
            {` • ${formatDate(createdAt)}`}
          </p>
        </StyledAuthorDeleted>
      )}
      <BottomRowInfo>
        {topic && <TopicButton to={topic._id}>{topic?.name}</TopicButton>}
        <SocialContainer>
          <CommentsButton postId={_id} commentsCount={comments?.length} />
          <Likes {...useLikesProps} _id={_id} />
          {user && <SavePost />}
        </SocialContainer>
      </BottomRowInfo>
    </StyledPostInfoContainer>
  );
};

export default PostInfo;
