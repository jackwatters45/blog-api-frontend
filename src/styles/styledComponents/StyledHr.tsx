import { styled } from 'styled-components';

const StyledHr = styled.hr`
  border: none;
  background-color: ${({ theme }) => theme.colors.borderColor};
`;

export const StyledHrHorizontal = styled(StyledHr)`
  height: 0.5px;
  width: 100%;
`;

export const StyledHrVertical = styled(StyledHr)`
  width: 0.5px;
  height: 100%;
`;
