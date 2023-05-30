import { ElementType, ReactNode } from 'react';
import { useModalTrigger } from 'react-hook-modal-pure';
import DeleteModal from './DeleteModal';

type Props = {
  postId: string;
  StyledButton: ElementType;
  buttonContent: string | ReactNode;
};

const DeleteButton = ({ StyledButton, buttonContent, postId }: Props) => {
  const { isModalVisible, buttonProps, useModalParams } = useModalTrigger();

  return (
    <div>
      <StyledButton {...buttonProps}>{buttonContent}</StyledButton>
      {isModalVisible && <DeleteModal useModalParams={useModalParams} postId={postId} />}
    </div>
  );
};

export default DeleteButton;
