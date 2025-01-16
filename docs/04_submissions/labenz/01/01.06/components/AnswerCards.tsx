'use client';
import { DisplayMode } from '@/utils/types';
import { CardStack } from './CardStack';
import QuestionCard from './QuestionCard';

export default function AnswerCards({ answers }: { answers: DisplayMode[] }) {
  return (
    <CardStack
      renderCard={(item) => (
        <QuestionCard mode="display" question={item.question} />
      )}
      items={answers}
      getId={(item) => item.question.id}
    />
  );
}
