const plugins = [
  'advlist',
  'autolink',
  'autosave',
  'lists',
  'link',
  'image',
  'charmap',
  'preview',
  'anchor',
  'searchreplace',
  'visualblocks',
  'code',
  'fullscreen',
  'insertdatetime',
  'media',
  'table',
  'codesample',
  'help',
  'wordcount',
  'emoticons',
  'searchreplace',
];

const toolbar =
  'undo redo | blocks | ' +
  'bold italic | alignleft aligncenter ' +
  'alignright alignjustify | bullist numlist  outdent indent | ' +
  'charmap emoticons link image insertdatetime  | removeformat code codesample  | searchreplace preview restoredraft help ';

const content_style = 'body {  font-size:16px }';

const skin_url =
  import.meta.env.NODE_ENV === 'development'
    ? '/src/components/Shared/TinyMce/blog-skin/skins/ui/blog-skin'
    : '/blog-skin/skins/ui/blog-skin';

export const init = {
  skin_url,
  skin: 'blog-skin',
  content_css: skin_url,
  min_width: 300,
  height: 500,
  menubar: false,
  browser_spellcheck: true,
  a11y_advanced_options: true,
  link_default_target: '_blank',
  plugins,
  toolbar,
  content_style,
};
