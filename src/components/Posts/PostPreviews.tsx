import { styled } from 'styled-components';
import IPost, { ILike } from '../../../types/post';
import { formatContent, formatDate } from '../shared/formattingHelpers';
import { Link } from 'react-router-dom';
import Likes from '../shared/Likes';
import { useUserContext } from '../../context/UserContext';
import useLikes from '../../custom/useLikes';
import CommentsButton from '../shared/CommentsButton';
import { PostContentPreview } from '../../styles/styledComponents/PostContentComponents';
import { useContext, useMemo } from 'react';
import { SelectedUserNameContext } from '../../context/SelectedUserNameContext';
import SavePost from '../shared/SavePost/SavePost';

const Container = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StyledDateAuthorDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
`;

const StyledH2 = styled.h2`
  font-size: 1.8rem;
  line-height: 1.2;
  margin: 0.4rem 0;
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 2rem;
  align-items: center;
`;

const LikesAndComments = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-size: 0.8rem;
`;

const StyledTopic = styled.li`
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const StyledDeleted = styled.i`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TopicReadTimeDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledReadTime = styled.p`
  font-size: 0.8rem;
  height: fit-content;
`;

interface Props {
  post: IPost;
}

const PostPreview = ({
  post: { _id, title, content, createdAt, author, topic, comments, likes },
}: Props) => {
  const { user } = useUserContext();
  const authorName = useContext(SelectedUserNameContext);

  const useLikesProps = useLikes(likes as ILike[], user?._id);

  const readTime = useMemo(() => {
    return Math.ceil(content.split(' ').length / 200);
  }, [content]);

  return (
    <Container>
      <StyledDateAuthorDiv>
        {author?._id && !author?.isDeleted ? (
          <Link to={`/user/${author._id}`}>
            {`${author.firstName} ${author.lastName}`}
          </Link>
        ) : (
          <StyledDeleted>{authorName || 'Deleted'}</StyledDeleted>
        )}
        <p>•</p>
        <Link to={`/post/${_id}`}>{formatDate(createdAt)}</Link>
      </StyledDateAuthorDiv>
      <Link to={`/post/${_id}`}>
        <StyledH2>{title}</StyledH2>
      </Link>
      <Link to={`/post/${_id}`}>
        <PostContentPreview contentHtml={formatContent(content)} />
      </Link>
      <BottomRow>
        <LikesAndComments>
          <CommentsButton postId={_id} commentsCount={comments?.length as number} />
          <Likes {...useLikesProps} _id={_id} />
          {user && <SavePost postId={_id} />}
        </LikesAndComments>
        <TopicReadTimeDiv>
          {topic && (
            <>
              <Link to={`/topic/${topic._id}`}>
                <StyledTopic>{topic.name}</StyledTopic>
              </Link>
              <p>•</p>
            </>
          )}
          {readTime && <StyledReadTime>{readTime} min read</StyledReadTime>}
        </TopicReadTimeDiv>
      </BottomRow>
    </Container>
  );
};

export default PostPreview;
