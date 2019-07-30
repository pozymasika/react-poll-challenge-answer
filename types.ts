export type Question = {
  text: string;
};
export type Answer = {
  text: string;
  votes: number;
};
export type QandA = {
  question: Question;
  answers: Answer[];
};
export type QandAsDocument = {
  questions: QandA[];
};

export type AnswerDocument = {
  answer: Answer,
  total: number,
  largest: boolean | undefined;
  voted: boolean;
  onVote: () => void;
}

export type AnswerOverlayProps = {
  pc: string;
  largest: boolean | undefined;
}

export type AnswerTextProps = {
  largest: boolean | undefined;
}