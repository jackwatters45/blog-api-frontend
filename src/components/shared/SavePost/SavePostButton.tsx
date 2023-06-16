import { mdiBookmark, mdiBookmarkOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { styled } from 'styled-components';

const CenteredButton = styled.button`
  display: flex;
  align-items: center;
`;

interface Props {
  onClick: () => void;
  isSaved: boolean;
}

const SavePostButton = ({ onClick, isSaved }: Props) => {
  return (
    <CenteredButton onClick={onClick}>
      <Icon path={isSaved ? mdiBookmark : mdiBookmarkOutline} size={0.75} />
    </CenteredButton>
  );
};

export default SavePostButton;
