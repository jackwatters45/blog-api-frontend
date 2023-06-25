import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { Control, Controller, useFormState } from 'react-hook-form';
import Loading from '../Loading';
import { init } from './editorOptions';
import { PostInputs } from '../../../../types/utils/formInputs';
import { styled } from 'styled-components';
import { StyledError } from '../../../styles/styledComponents/AuthStyledComponents';

const StyledLoading = styled(Loading)`
  position: relative;
`;

interface Props {
  control: Control<PostInputs>;
}

const TinyMceEditor = ({ control }: Props) => {
  const [loading, setLoading] = useState(true);
  const { errors } = useFormState({ control });

  return (
    <div>
      {loading && <StyledLoading />}
      <div style={loading ? { display: 'none' } : {}}>
        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{
            required: 'Content is required',
            minLength: {
              value: 250,
              message: 'Content must be at least 250 characters long',
            },
            maxLength: {
              value: 10000,
              message: 'Content must be less than 10000 characters long',
            },
          }}
          render={({ field }) => (
            <Editor
              apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
              onInit={() => setLoading(false)}
              init={init}
              onEditorChange={(content) => field.onChange(content)}
              value={field.value}
            />
          )}
        />
        {errors.content && (
          <StyledError>
            <li>{errors.content.message}</li>
          </StyledError>
        )}
      </div>
    </div>
  );
};

export default TinyMceEditor;
