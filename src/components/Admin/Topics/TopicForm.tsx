import { SubmitHandler, useForm } from 'react-hook-form';
import {
  StyledError,
  StyledForm,
  StyledFormInput,
  StyledFormSection,
  StyledFormSubmitInput,
} from '../../../styles/styledComponents/FormHelpers';
import { TopicInputs } from '../../../../types/utils/formInputs';

interface Props {
  topicName?: string;
  onSubmit: SubmitHandler<TopicInputs>;
  submitText: string;
  changeError?: string;
}

const TopicForm = ({ topicName, onSubmit, submitText, changeError }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TopicInputs>({
    defaultValues: {
      name: topicName,
    },
  });

  return (
    <StyledForm method="POST" onSubmit={handleSubmit(onSubmit)}>
      <StyledFormSection>
        <label htmlFor="name">Topic Name:</label>
        <StyledFormInput
          type="text"
          id="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', {
            required: 'Name is required',
            maxLength: { value: 20, message: "Topic Name can't exceed 20 characters" },
          })}
        />
        {errors.name && (
          <StyledError>
            <li>{errors.name.message}</li>
          </StyledError>
        )}
      </StyledFormSection>
      <StyledFormSubmitInput type="submit" value={submitText} />
      {changeError && (
        <StyledError>
          <li>{changeError}</li>
        </StyledError>
      )}
    </StyledForm>
  );
};

export default TopicForm;
