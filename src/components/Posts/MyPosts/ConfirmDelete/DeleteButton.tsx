import { ElementType, ReactNode } from 'react';
import { useModalTrigger } from 'react-hook-modal-pure';
import DeleteModal from './DeleteModal';
import { styled } from 'styled-components';

type Props = {
  id: string;
  objType: string;
  StyledButton: ElementType;
  buttonContent?: string | ReactNode;
  extraButtonProps?: Record<string, unknown>;
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

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
