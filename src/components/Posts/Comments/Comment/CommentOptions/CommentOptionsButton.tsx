import { styled } from 'styled-components';
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { useModalTrigger } from 'react-hook-modal-pure';
import CommentOptionsModal from './CommentOptionsModal';
import { Dispatch, SetStateAction } from 'react';

const StyledButton = styled.button`
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  ${({ theme }) => theme.hoverNoBorder};
  border-radius: 0.25rem;
  padding: 2px;
  line-height: 0;
`;

interface Props {
  commentId: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const CommentOptionsButton = ({ commentId, setIsEditing }: Props) => {
  const { isModalVisible, buttonProps, useModalParams } = useModalTrigger();

  return (
    <div>
      <StyledButton {...buttonProps}>
        <Icon path={mdiDotsVertical} size={0.8} />
      </StyledButton>
      {isModalVisible && (
        <CommentOptionsModal
          useModalParams={useModalParams}
          commentId={commentId}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default CommentOptionsButton;
