import { ElementType, ReactNode } from 'react';
import { useModalTrigger } from 'react-hook-modal-pure';
import DeleteModal from './DeleteModal';
import { styled } from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  position: relative;
`;
interface Props {
  id: string;
  objType: string;
  StyledButton: ElementType;
  buttonContent?: string | ReactNode;
  extraButtonProps?: Record<string, unknown>;
}

const DeleteButton = ({
  StyledButton,
  buttonContent,
  extraButtonProps,
  id,
  objType,
}: Props) => {
  const { isModalVisible, buttonProps, useModalParams } = useModalTrigger();

  return (
    <StyledContainer>
      <StyledButton {...buttonProps} {...extraButtonProps}>
        {buttonContent}
      </StyledButton>
      {isModalVisible && (
        <DeleteModal useModalParams={useModalParams} objType={objType} id={id} />
      )}
    </StyledContainer>
  );
};

export default DeleteButton;
