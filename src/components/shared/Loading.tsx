import { styled, keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface SpinnerProps {
  size: number;
}

const Spinner = styled.div<SpinnerProps>`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  border: ${({ size }) => size / 4}px solid #f3f3f3;
  border-top: ${({ size }) => size / 4}px solid rgba(55, 55, 55, 0.5);
  border-radius: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  animation: ${spin} 1.5s linear infinite;
`;

interface Props {
  className?: string;
  size?: number;
}

function Loading({ className, size = 50 }: Props) {
  return <Spinner className={className} size={size} />;
}

export default Loading;
