import * as React from 'react';
import styled, { css } from 'styled-components';
import { AnswerDocument, AnswerOverlayProps, AnswerTextProps } from '../types';

const AnswerWrapper = styled.div`
  border: 1px #d1d1d1 solid;
  margin: 10px 0px;
  padding: 3px;
  border-radius: 5px;
  display: flex;
  position: relative;
  justify-content: space-between;
  cursor: pointer;
`;

const AnswerText = styled.div<AnswerTextProps>`
  font-size: 18px;
  margin: 5px;
  ${props =>
    css`
      font-weight: ${props.largest ? 'bold' : 'normal'};
    `}
`;

const AnswerOverlay = styled.div<AnswerOverlayProps>`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  opacity: 0.5;
  ${props => {
    return css`
      width: ${props.pc};
      background-color: ${props.largest ? 'cyan' : '#d1d1d1'};
    `;
  }}
`;

const CheckImage = styled.img`
  width: 20px;
  height: 20px;
  float: right;
  margin-left: 5px;
`;

export default function Answer({
  answer,
  total,
  largest,
  onVote,
  voted
}: AnswerDocument) {
  const [active, setActive] = React.useState(false);
  // include new vote when calculating percentage
  let votes = active ? answer.votes + 1 : answer.votes;
  let percentage = Math.round((votes / total) * 100);

  function selectChoice() {
    if (!voted) {
      setActive(true);
      onVote();
    }
  }

  return (
    <AnswerWrapper onClick={selectChoice}>
      <AnswerText largest={largest}>
        {answer.text}
        {active && <CheckImage src={require('../static/check-circle.svg')} />}
      </AnswerText>
      <AnswerText largest={largest}>{percentage}%</AnswerText>
      <AnswerOverlay pc={percentage + '%'} largest={largest} />
    </AnswerWrapper>
  );
}
