import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { formatDate, getUserFullName } from '../../../utils/formattingHelpers';
import { StyledHrHorizontal } from '../../../styles/styledComponents/StyledHr';
import {
  TagSidebar,
  TagsSidebar,
} from '../../../styles/styledComponents/HelperComponents';
import Likes from '../components/Likes';
import CommentsButton from '../components/Comments/CommentsButton';
import IPost, { ILike } from '../../../../types/post';
import useLikes from '../../../utils/custom/useLikes';
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
`;

const LikesAndComments = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

type Props = {
  post: IPost;
};

const PostInfo = ({ post }: Props) => {
  const { user } = useUserContext();
  const userId = user?._id as string;

  const { title, author, createdAt, tags, _id: id } = post;
  const useLikesProps = useLikes(post?.likes as ILike[], userId);

  return (
    <>
      <StyledPostInfoContainer>
        <StyledH1>{title}</StyledH1>
        <StyledAuthor to={`/user/${id}`}>
          {getUserFullName(author)} • {formatDate(createdAt)}
        </StyledAuthor>
        <BottomRowInfo>
          <TagsSidebar>
            {/* TODO tags crap */}
            {!!tags?.length &&
              tags.map((tag, index) => (
                <TagSidebar key={index} to={''}>
                  {tag}
                </TagSidebar>
              ))}
          </TagsSidebar>
          <LikesAndComments>
            <CommentsButton commentsCount={post?.comments?.length as number} />
            <Likes {...useLikesProps} _id={id as string} />
          </LikesAndComments>
        </BottomRowInfo>
      </StyledPostInfoContainer>
      <StyledHrHorizontal />
    </>
  );
};

export default PostInfo;
