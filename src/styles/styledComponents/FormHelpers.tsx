import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const StyledFormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 5vh 25px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StyledH1Centered = styled.h1`
  text-align: center;
`;

export const StyledFormNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const StyledFormLink = styled(Link)`
  text-decoration: underline;
`;

export const StyledForm = styled.form`
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 2rem;
  border-radius: 4px;
  ${({ theme }) => theme.shadow};
`;

export const StyledFormSubmitInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.backgroundSecondary};
  background: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  box-shadow: none;

  &:hover {
    opacity: 0.7;
  }
`;

export const StyledFormSection = styled.div`
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StyledFormInput = styled.input`
  height: 40px;
  width: 100%;
  font-size: 1rem;
  ${(props) => props.theme.shadow};
`;

export const StyledTextArea = styled.textarea`
  height: 120px;
  width: 100%;
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: none;
  font-size: 0.9rem;
  ${(props) => props.theme.shadow};
`;

export const SelectWrapper = styled.div`
  border-radius: 0.25rem;
  overflow: hidden;
  ${(props) => props.theme.shadow};
`;

export const StyledFormSelect = styled.select`
  height: 40px;
  width: 100%;
  border: none;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border-right: 0.5rem solid transparent;
`;

export const StyledFormInstructions = styled.ul`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.5rem 0 0 1.5rem;

  li {
    list-style: disc;
  }
`;

export const StyledError = styled.ul`
  color: #dc2626;
  font-size: 12px;
  margin: 0.5rem 0 0 1.5rem;
  list-style: disc;

  li {
    list-style: disc;
  }
`;
