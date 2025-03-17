// Styled Components
import styled, { keyframes } from "styled-components";

// Keyframes for animation
const progressAnimation = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%; /* Adjust this percentage based on the progress */
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled components
const ProgressWidget = styled.div`
  margin: 20px auto;
  text-align: center;
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  margin: 0 auto;
`;

const ProgressBar = styled.div`
  position: relative;
  flex: 1;
  height: 4px;
  background-color: #e0e0e0;
  margin: 0 10px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background-color: #3b82f6;
  animation: ${progressAnimation} 1s ease forwards;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ completed, active }) =>
    completed ? "#3b82f6" : active ? "#3b82f6" : "#e0e0e0"};
  color: ${({ completed }) => (completed ? "white" : "#000")};
  font-size: 12px;
  cursor: pointer;
  animation: ${({ active }) => (active ? pulseAnimation : "none")} 1s infinite;
`;

// Functional component
const ProgressBarr = () => {
  return (
    <ProgressWidget>
      <ProgressContainer>
        <Step completed>✔</Step>
        <ProgressBar>
          <ProgressFill />
        </ProgressBar>
        <Step active>2</Step>
        <ProgressBar>
          <ProgressFill />
        </ProgressBar>
        <Step>3</Step>
      </ProgressContainer>
    </ProgressWidget>
  );
};

export default ProgressBarr;
