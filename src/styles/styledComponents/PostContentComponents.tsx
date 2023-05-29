import { styled } from 'styled-components';
import PostContent from '../../components/shared/PostContent';

export const PostContentDefault = styled(PostContent)`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  html {
    font-size: 18px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    letter-spacing: 0.05em;
  }

  p,
  li {
    line-height: 2;
    margin-bottom: 1rem;
  }

  ul,
  ol {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  pre {
    background-color: #f5f5f5;
    padding: 1em;
    overflow-x: auto;
  }

  a:hover {
    text-decoration: underline;
  }

  img,
  blockquote,
  pre {
    margin: 1rem 0;
  }
`;

export const PostContentPreview = styled(PostContent)`
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  margin-top: 0.25rem;
`;
