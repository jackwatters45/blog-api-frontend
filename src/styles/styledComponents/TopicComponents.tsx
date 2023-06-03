import { styled } from 'styled-components';
import { TopicButtonLarge } from './HelperComponents';
import TimeRange from '../../components/shared/TimeRange';

export const StyledTopicButton = styled(TopicButtonLarge)`
  background: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  font-size: 0.9rem;

  @media (max-width: 420px) {
    align-items: start;
    flex-wrap: wrap;
  }
`;

export const TotalValueContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  
  p {
    align-self: center;
  }
  @media (max-width: 420px) {
    align-items: center;
    flex-direction: column;
    gap: 0rem;
`;

export const StyledValue = styled.p`
  font-weight: 700;
  font-size: 1rem;

  @media (max-width: 1000px) {
    line-height: 1.2rem;
    font-size: 1.2rem;
  }
`;

export const StyledTimeRange = styled(TimeRange)`
@media (max-width: 420px) {
  flex-direction: column;
  gap: 0rem;
`;
