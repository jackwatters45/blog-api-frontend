import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: inter-var, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';
    line-height: 1.5;

    color-scheme: light dark;
    user-select: none;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    overflow-y: scroll;

    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  }

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  input, select {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border: 0.5px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    padding: 0.5rem;
    cursor: auto;
    color: inherit;

    ${({ theme }) => theme.shadow};
  }

  input[type='submit'] {
    cursor: pointer;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    color: inherit;
    font: inherit;
  }

  .error {
    color: #dc2626;
    font-size: 12px;
    margin: 0.5rem 0 0 1.5rem;
    list-style: disc;

    li {
      list-style: disc;
    }
  }
`;

export default GlobalStyle;
