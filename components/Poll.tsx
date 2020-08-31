import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { QandA, QandAsDocument } from '../types';
import PollAnswer from './PollAnswer';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div`
  border: 1px solid rgba(236, 236, 236, 0.76);
  border-radius: 5px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.05);
  padding: 1.5em;
  max-width: 350px;
  margin: auto;
`;

const PollQuestion = styled.h2`
  margin: 0;
  padding: 0;
`;

const PollAnswers = styled.div`
  display: grid;
  grid-gap: 8px;
  padding: 1em 0;
`;

const VoteCount = styled.div`
  color: #999;
  font-size: 0.8em;
`;

export default function Poll({ qandas }: Props) {
  // keep a copy of the poll
  const [currentPoll] = useState(
    qandas.questions[Math.round(Math.random() * 1000) % qandas.questions.length]
  );
  const [poll, setPoll] = useState<QandA>(currentPoll);
  const [votes, setVotes] = useState(0);
  const [highestVotes, setHighestVotes] = useState(0);
  const [myAnswer, setMyAnswer] = useState<number>(-1);

  useEffect(() => {
    setPoll(currentPoll);
  }, [currentPoll]);

  useEffect(() => {
    setVotes(poll.answers.reduce((acc, cur) => acc + cur.votes, 0));
    setHighestVotes(Math.max(...poll.answers.map((answer) => answer.votes)));
  }, [poll]);

  const updateVotes = useCallback(
    (index: number) => {
      setPoll({
        ...currentPoll,
        answers: currentPoll.answers.map((_answer, _index) =>
          _index === index
            ? {
                ..._answer,
                votes: _answer.votes + 1,
              }
            : _answer
        ),
      });
    },
    [currentPoll]
  );

  return (
    <PollWrapper>
      <PollQuestion>{poll.question.text}</PollQuestion>
      <PollAnswers>
        {poll.answers.map((answer, index) => (
          <PollAnswer
            isMostPopular={answer.votes === highestVotes}
            percentage={Math.round((answer.votes * 100) / votes)}
            pollAnswered={myAnswer >= 0}
            isMyAnswer={myAnswer === index}
            onClick={() => {
              updateVotes(index);
              setMyAnswer(index);
            }}
            answer={answer}
            key={answer.text}
          />
        ))}
      </PollAnswers>
      <VoteCount>
        {votes} {votes === 1 ? 'Vote' : 'Votes'}
      </VoteCount>
    </PollWrapper>
  );
}
