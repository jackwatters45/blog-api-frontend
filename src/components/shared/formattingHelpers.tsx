export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const day = dateObj.getDate();

  if (new Date().getFullYear() === dateObj.getFullYear())
    return `${month} ${day}, ${dateObj.getFullYear()}`;

  return `${month} ${day}`;
};

function htmlToText(html: string) {
  const temporaryElement = document.createElement('div');
  temporaryElement.innerHTML = html;
  return temporaryElement.textContent || temporaryElement.innerText || '';
}

export const formatContent = (content: string) => {
  const text = htmlToText(content);
  return text.length > 200 ? `${text.slice(0, 200)}...` : text;
};

export const getTitleCase = (str: string) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

export const camelToTitleCase = (str: string) => {
  const result = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  return getTitleCase(result);
};
