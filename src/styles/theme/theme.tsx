import { css } from 'styled-components';

export const lightTheme = {
  colors: {
    textPrimary: 'rgb(25, 25, 25)',
    textSecondary: 'rgb(47, 47, 47)',
    backgroundPrimary: 'rgb(255, 255, 255)',
    backgroundSecondary: 'rgb(233, 233, 233)',
    border: 'rgba(0, 0, 0, 0.2)',
    selected: 'rgba(0, 100, 0, 0.1)',
  },
  shadow: css`
    box-shadow: rgb(0 0 0 / 10%) 0px 1px 3px, rgb(0 0 0 / 10%) 0px 1px 2px;
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
export const darkTheme = {
  colors: {
    textPrimary: 'rgba(255, 255, 255, 0.81)',
    textSecondary: 'rgb(127, 127, 127)',
    backgroundPrimary: 'rgb(25, 25, 25)',
    backgroundSecondary: 'rgb(47, 47, 47)',
    border: 'rgba(255, 255, 255, .3)',
    selected: 'rgb(55, 55, 55)',
    hover: 'rgba(255, 255, 255, 0.055)',
  },
  shadow: css`
    box-shadow: rgb(15 15 15 / 15%) 0px 0px 0px 2px, rgb(15 15 15 / 15%) 0px 3px 6px;
  `,

  hoverStyle: css`
    &:hover {
      background-color: ${({ theme }) => theme.colors.hover};
      border-radius: 4px;
    }
  `,

  hoverNoBorder: css`
    &:hover {
      background-color: ${({ theme }) => theme.colors.hover};
    }
  `,
};
