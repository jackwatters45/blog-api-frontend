import { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';

const StyledButton = styled.button`
  margin: 0.5rem 1rem 0;
  padding: 0.125rem 0.25rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  ${({ theme }) => theme.hoverStyle};
`;

interface Props {
  setCommentsShown: Dispatch<SetStateAction<number>>;
}

const ShowMoreComments = ({ setCommentsShown }: Props) => {
  const handleClick = () => setCommentsShown((prev) => prev + 3);

  return <StyledButton onClick={handleClick}>+ Show more replies</StyledButton>;
};

export default ShowMoreComments;
