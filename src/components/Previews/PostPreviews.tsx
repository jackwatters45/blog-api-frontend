import { styled } from 'styled-components';
import IPost from '../../../types/post';
import { StyledHrHorizontal } from '../../styles/styledComponents/StyledHr';
import {
  getUserFullName,
  formatContent,
  formatDate,
  getUserId,
} from '../../utils/formattingHelpers';
import { Link } from 'react-router-dom';

type Props = {
  post: IPost;
};

const Container = styled.div`
  margin: 2rem 0;
`;

const StyledDateAuthorDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
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
  const authorId = getUserId(author);

  return (
    <>
      <Container>
        <StyledDateAuthorDiv>
          {authorId ? (
            <Link to={`/user/${authorId}`}>{getUserFullName(author)}</Link>
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
        {!!tags?.length && (
          <StyledTagsSection>
            <Link to={`/post/${_id}`}>
              <StyledTags>
                {tags.map((tag, index) => (
                  <StyledTag key={index}>{tag}</StyledTag>
                ))}
              </StyledTags>
            </Link>
          </StyledTagsSection>
        )}
      </Container>
      <StyledHrHorizontal />
    </>
  );
};

export default PostPreview;
