import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { formatDate } from '../../shared/formattingHelpers';
import { StyledHrHorizontal } from '../../../styles/styledComponents/theme';
import { TopicButton } from '../../../styles/styledComponents/HelperComponents';
import Likes from '../../shared/Likes';
import CommentsButton from '../../shared/CommentsButton';
import IPost, { ILike } from '../../../../types/post';
import useLikes from '../../../custom/useLikes';
import { useUserContext } from '../../../context/UserContext';

const StyledPostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledH1 = styled.h1`
  font-size: 2.5rem;
`;

const StyledAuthor = styled(Link)`
  font-size: 0.8rem;
  color: grey;
`;

const BottomRowInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0 0.75rem;
`;

const LikesAndComments = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
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
    <>
      <StyledPostInfoContainer>
        <StyledH1>{title}</StyledH1>
        {author ? (
          <StyledAuthor to={`/user/${author._id}`}>
            {`${author.firstName} ${author.lastName} • ${formatDate(createdAt)}`}
          </StyledAuthor>
        ) : (
          <p>{`Unknown • ${formatDate(createdAt)}`}</p>
        )}
        <BottomRowInfo>
          {topic && <TopicButton to={topic._id}>{topic?.name}</TopicButton>}
          <LikesAndComments>
            <CommentsButton commentsCount={comments?.length as number} />
            <Likes {...useLikesProps} _id={_id as string} />
          </LikesAndComments>
        </BottomRowInfo>
      </StyledPostInfoContainer>
      <StyledHrHorizontal />
    </>
  );
};

export default PostInfo;
