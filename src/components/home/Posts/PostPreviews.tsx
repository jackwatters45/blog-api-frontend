import { styled } from 'styled-components';
import IPost from '../../../../types/post.d';
import { StyledHrHorizontal } from '../../../styles/styledComponents/StyledHr';
import {
  getAuthorFullName,
  formatContent,
  formatDate,
  getAuthorId,
} from '../../../utils/formatPostData';
import { Link } from 'react-router-dom';

type Props = {
  post: IPost;
};

const StyledDateAuthorDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const StyledH2 = styled.h2`
  font-size: 1.8rem;
`;

const StyledTagsSection = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin: 2rem 0 1rem;
`;

const StyledTags = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

const StyledTag = styled.li`
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const PostPreview = ({
  post: { title, content, createdAt, author, _id, tags },
}: Props) => {
  const authorId = getAuthorId(author);

  return (
    <>
      <div>
        <StyledDateAuthorDiv>
          {authorId ? (
            <Link to={`/author/${authorId}`}>{`${getAuthorFullName(author)}`}</Link>
          ) : (
            <p>Unknown</p>
          )}
          <p>•</p>
          <Link to={`/post/${_id}`}>{formatDate(createdAt)}</Link>
        </StyledDateAuthorDiv>
        <Link to={`/post/${_id}`}>
          <StyledH2>{title}</StyledH2>
        </Link>
        <Link to={`/post/${_id}`}>
          <p>{formatContent(content)}</p>
        </Link>
        <StyledTagsSection>
          <Link to={`/post/${_id}`}>
            <StyledTags>
              {!!tags?.length &&
                tags.map((tag, index) => <StyledTag key={index}>{tag}</StyledTag>)}
            </StyledTags>
          </Link>
        </StyledTagsSection>
      </div>
      <StyledHrHorizontal />
    </>
  );
};

export default PostPreview;
