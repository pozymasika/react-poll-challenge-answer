import * as React from 'react';
import styled from 'styled-components';
import { QandAsDocument, QandA, Answer as AnswerDocument } from '../types';
import maxBy from 'lodash/maxBy';
import reduce from 'lodash/reduce';
import sample from 'lodash/sample';
import Answer from './Answer';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div`
  width: 400px;
  border: 1px #d1d1d1 solid;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.25);
  @media (max-width: 425px) {
    width: 100%;
  }
`;

const TotalVotes = styled.p`
  color: #8e8888;
`;

export default function Poll({ qandas }: Props) {
  const [randomq, setRandomQ] = React.useState<QandA | undefined>(undefined);
  const [voted, setVoted] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [largestVote, setLargestVote] = React.useState<
    AnswerDocument | undefined
  >(undefined);

  function onVote() {
    // don't vote more than once
    if (!voted) {
      setVoted(true);
      setTotal(total + 1);
    }
  }
  // run this only once
  React.useEffect(() => {
    const selectedq = sample(qandas.questions);
    if (selectedq) {
      const totalVotes = reduce(
        selectedq.answers,
        (memo, current) => memo + current.votes,
        0
      );
      const largestVote = maxBy(selectedq.answers, 'votes');
      setRandomQ(selectedq);
      setTotal(totalVotes);
      setLargestVote(largestVote);
    }
  }, []);

  if (!randomq) return null;

  return (
    <PollWrapper>
      <h2> {randomq.question.text} </h2>
      {randomq.answers.map((answer, idx) => (
        <Answer
          answer={answer}
          key={idx}
          largest={largestVote && largestVote.votes === answer.votes}
          onVote={onVote}
          voted={voted}
          total={total}
        />
      ))}
      <TotalVotes> {total} votes </TotalVotes>
    </PollWrapper>
  );
}
