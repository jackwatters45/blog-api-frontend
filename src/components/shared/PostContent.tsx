import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { useMemo } from 'react';

const sanitizeOptions = {
  ALLOWED_TAGS: [
    'b',
    'i',
    'em',
    'strong',
    'a',
    'p',
    'br',
    'ul',
    'li',
    'ol',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ],
  ALLOWED_ATTR: ['href'],
};

interface Props {
  className?: string;
  contentHtml: string;
}

const PostContent = ({ contentHtml, className }: Props) => {
  const sanitizedJsx = useMemo(() => {
    try {
      return parse(DOMPurify.sanitize(contentHtml, sanitizeOptions));
    } catch (e) {
      console.error(e);
      return contentHtml;
    }
  }, [contentHtml]);

  return <div className={className}>{sanitizedJsx}</div>;
};

export default PostContent;
