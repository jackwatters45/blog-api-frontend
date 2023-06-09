import { styled } from 'styled-components';
import { TopicButtonLarge } from './HelperComponents';

export const StyledTopicButton = styled(TopicButtonLarge)`
  background: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-evenly;
  font-size: 0.9rem;
  flex-wrap: wrap;
`;

export const TotalValueContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  p {
    align-self: center;
  }
`;

export const StyledValue = styled.p`
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.2rem;
`;
