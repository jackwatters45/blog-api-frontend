import { styled } from 'styled-components';

export const StyledForm = styled.form`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  margin: 1rem 0.5rem;
  border-radius: 0.25rem;
  border: 0.5px solid ${({ theme }) => theme.colors.textPrimary};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const StyledInput = styled.input`
  box-shadow: none;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: none;
`;

export const UnstyledForm = styled.form`
  padding: 1rem 0;
  width: 100%;
`;

export const UnstyledInput = styled.input`
  box-shadow: none;
  width: calc(100% - 59.25px);
  outline: solid 1px ${({ theme }) => theme.colors.textPrimary};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: none;
  border: none;
`;
export const StyledButton = styled.input`
  background: transparent;
  border: none;
  box-shadow: none;
  border-left: 1px solid ${({ theme }) => theme.colors.textPrimary};
  border-radius: 0;
  padding: 0.5rem 1rem;
`;

export const StyledAddForm = styled.form`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  margin: 1rem 0.5rem;
  border-radius: 0.25rem;
  border: 0.5px solid ${({ theme }) => theme.colors.textPrimary};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const StyledAddInput = styled.input`
  box-shadow: none;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: none;
`;

export const StyledAddButton = styled.input`
  background: transparent;
  border: none;
  box-shadow: none;
  border-left: 1px solid ${({ theme }) => theme.colors.textPrimary};
  border-radius: 0;
  padding: 0.5rem 1rem;
`;
