import React from 'react';
import { Answer } from '../types';
import styled from 'styled-components';

interface PollAnswerProps {
  answer: Answer;
  onClick: () => void;
  percentage: number;
  isMostPopular: boolean;
  isMyAnswer: boolean;
  pollAnswered: boolean;
}

const PollAnswerWrapper = styled.div<{
  mostPopular: boolean;
  percentage: number;
  isMyAnswer: boolean;
}>`
  padding: 4px 10px;
  border: 1px solid rgba(229, 229, 229, 0.8);
  border-radius: 5px;
  height: 24px;
  font-size: 0.9em;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  display: grid;
  align-items: center;
  font-weight: ${(props) => (props.mostPopular ? 'bold' : '')};
  grid-auto-flow: column;
  position: relative;
  justify-content: space-between;

  &:before {
    content: '';
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) => props.percentage}%;
    height: 100%;
    transition: 0.5s width ease-in-out;
    background: ${(props) =>
      props.mostPopular ? 'rgba(154,255,244,0.49)' : 'rgba(232,232,232,0.51)'};
  }
`;

const PollCheck = styled.img<{ isMyAnswer: boolean }>`
  width: 16px;
  height: 16px;
  transform: ${(props) => (props.isMyAnswer ? 'scale(1)' : 'scale(0)')};
  transition: 0.5s transform ease-in-out;
`;

const PollAnswerText = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1em;
  align-items: center;
`;

const PollAnswerPercentage = styled.span<{ pollAnswered: boolean }>`
  transform: ${(props) =>
    props.pollAnswered ? 'translateX(0)' : 'translateX(-1000px)'};
  transition: 0.2s transform ease-in-out;
`;

const PollAnswer: React.FunctionComponent<PollAnswerProps> = ({
  answer,
  percentage,
  isMostPopular,
  pollAnswered,
  isMyAnswer,
  onClick,
}): JSX.Element => {
  return (
    <PollAnswerWrapper
      onClick={onClick}
      mostPopular={pollAnswered && isMostPopular}
      isMyAnswer={isMyAnswer}
      percentage={pollAnswered ? percentage : 0}
    >
      <PollAnswerText>
        <span>{answer.text}</span>
        <PollCheck
          isMyAnswer={isMyAnswer}
          src={require('../static/check-circle.svg')}
          alt="Selected"
        />
      </PollAnswerText>
      <PollAnswerPercentage pollAnswered={pollAnswered}>
        {percentage}%
      </PollAnswerPercentage>
    </PollAnswerWrapper>
  );
};

export default PollAnswer;
