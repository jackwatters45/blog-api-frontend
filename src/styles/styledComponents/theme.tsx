// Type: Styled Component Theme
// Description: Theme for styled components
// Docs: https://styled-components.com/docs/advanced#theming
import { css, styled } from 'styled-components';

const theme = {
  colors: {
    textPrimary: 'rgba(255, 255, 255, 0.81)',
    textSecondary: 'rgb(127, 127, 127)',
    backgroundPrimary: 'rgb(25, 25, 25)',
    backgroundSecondary: 'rgb(47, 47, 47)',
    borderColor: 'rgba(255, 255, 255, 0.282)',
  },
  hoverBackground: 'rgb(55, 55, 55);',

  shadow: css`
    box-shadow: rgb(15 15 15 / 15%) 0px 0px 0px 2px, rgb(15 15 15 / 15%) 0px 3px 6px;
  `,

  hoverStyle: css`
    &:hover {
      background-color: rgba(255, 255, 255, 0.055);
      border-radius: 4px;
    }
  `,

  hoverNoBorder: css`
    &:hover {
      background-color: rgba(255, 255, 255, 0.055);
    }
  `,
};

export default theme;

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
