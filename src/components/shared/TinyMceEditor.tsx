import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Loading from './Loading';
import { init } from '../Posts/PostForm/editorOptions';
import { PostInputs } from '../../../types/utils/formInputs';
import { styled } from 'styled-components';

const StyledLoading = styled(Loading)`
  position: relative;
`;

interface Props {
  control: Control<PostInputs>;
}

const TinyMceEditor = ({ control }: Props) => {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      {loading && <StyledLoading />}
      <div style={loading ? { display: 'none' } : {}}>
        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Editor
              apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
              onInit={() => {
                setLoading(false);
              }}
              init={init}
              onEditorChange={(content) => field.onChange(content)}
              value={field.value}
            />
          )}
        />
      </div>
    </div>
  );
};

export default TinyMceEditor;
