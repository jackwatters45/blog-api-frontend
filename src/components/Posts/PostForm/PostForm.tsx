import { styled } from 'styled-components';
import { StyledH1, StyledMain } from '../../../styles/styledComponents/HelperComponents';
import { useSidebarContext } from '../../../context/SidebarContext';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import IPost from '../../../../types/post';
import { StyledError } from '../../../styles/styledComponents/AuthStyledComponents';
import TinyMceEditor from '../../Shared/TinyMceEditor';
import { PostInputs } from '../../../../types/utils/formInputs';
import useErrorHandler from '../../../custom/useErrorHandler';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 1.5rem;
  font-weight: 600;
`;

const StyledInput = styled.input`
  height: 2.5rem;
  font-size: 1.2rem;
`;

const SelectWrapper = styled.div`
  height: 2.5rem;
  border-radius: 0.25rem;
  overflow: hidden;
  border: 0.5px solid ${({ theme }) => theme.colors.textSecondary};
  ${(props) => props.theme.shadow};
`;

const StyledSelect = styled.select`
  font-size: 1.2rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-right: 0.5rem solid transparent;
  width: 100%;
  height: 100%;
`;

const StyledPublishSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
  gap: 1rem;
`;

const StyledPublishButton = styled.button`
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.textPrimary};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  ${(props) => props.theme.shadow};
`;
const StyleDraftButton = styled(StyledPublishButton)`
  background-color: ${(props) => props.theme.colors.textSecondary};
`;

interface Props {
  post?: IPost;
  pageTitle?: string;
}

const PostForm = ({ post, pageTitle = 'Create Post' }: Props) => {
  const { topics } = useSidebarContext();
  const { user } = useUserContext();

  const handleErrors = useErrorHandler();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [submitError, setSubmitError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PostInputs>({
    defaultValues: {
      title: post?.title,
      topic: post?.topic?._id,
      content: post?.content,
    },
  });

  const [isPublished, setIsPublished] = useState<boolean>(true);
  const onSubmit = async (formData: PostInputs) => {
    if (!user) return navigate('/login', { state: { from: pathname } });

    const data = { ...formData, published: isPublished };
    const method = post?._id ? 'PUT' : 'POST';
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts${post?._id ? `/${post._id}` : ''}`,
      {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      },
    );

    if (!res.ok) {
      handleErrors(res);
      const errorData = await res.json();
      return setSubmitError(errorData.message);
    }

    return navigate(`/my-posts`);
  };

  return (
    <StyledMain>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledH1>{pageTitle}</StyledH1>
        <StyledFormSection>
          <StyledLabel htmlFor="title">Title </StyledLabel>
          <StyledInput
            type="text"
            id="title"
            aria-invalid={errors.title ? 'true' : 'false'}
            {...register('title', {
              required: 'Title is required',
              maxLength: {
                value: 100,
                message: "First name can't exceed 100 characters",
              },
            })}
          />
          {errors.title && (
            <StyledError>
              <li>{errors.title.message}</li>
            </StyledError>
          )}
        </StyledFormSection>
        <StyledFormSection>
          <StyledLabel htmlFor="topic">Topic </StyledLabel>
          <SelectWrapper>
            <StyledSelect
              id="topic"
              aria-invalid={errors.topic ? 'true' : 'false'}
              {...register('topic', { required: true })}
            >
              <option value="">Select a topic</option>
              {topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </StyledSelect>
          </SelectWrapper>
          {errors.topic && (
            <StyledError>
              <li>Topic is required</li>
            </StyledError>
          )}
        </StyledFormSection>
        <StyledFormSection>
          <StyledLabel htmlFor="content">Content</StyledLabel>
          <TinyMceEditor control={control} />
          {errors.content && (
            <StyledError>
              <li>Content is required</li>
            </StyledError>
          )}
        </StyledFormSection>
        <StyledPublishSection>
          <StyleDraftButton type="submit" onClick={() => setIsPublished(false)}>
            {post?.published ? 'Save And Unpublish' : 'Save As Draft'}
          </StyleDraftButton>

          <StyledPublishButton type="submit" onClick={() => setIsPublished(true)}>
            Publish
          </StyledPublishButton>
        </StyledPublishSection>
        {submitError && (
          <StyledError>
            <li>{submitError}</li>
          </StyledError>
        )}
      </StyledForm>
    </StyledMain>
  );
};

export default PostForm;
