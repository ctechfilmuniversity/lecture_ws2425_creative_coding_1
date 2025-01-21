export interface Question {
  id: string;
  text: string;
  answer?: string;
}

export type WriteMode = {
  mode: 'write';
  userId: string;
  question: Question;
};

export type DisplayMode = {
  mode: 'display';
  userId?: string;
  question: Question;
};

export type QuestionCardProps = WriteMode | DisplayMode;
