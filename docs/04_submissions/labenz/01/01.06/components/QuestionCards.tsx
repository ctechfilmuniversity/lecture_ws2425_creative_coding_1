'use client';
import { Question } from '@/utils/types';
import { useEffect, useState } from 'react';
import { CardStack } from './CardStack';
import QuestionCard from './QuestionCard';

type Props = {
  questions: Question[];
  userId: string;
};

// Fisher-Yates shuffle algorithm
const shuffle = (array: Question[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function QuestionCards({ questions, userId }: Props) {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setShuffledQuestions(shuffle(questions));
  }, [questions]);

  return (
    <CardStack
      renderCard={(question) => (
        <QuestionCard mode="write" question={question} userId={userId} />
      )}
      items={shuffledQuestions}
      getId={(item) => item.id}
      isNextCardOnCardClick={false}
    />
  );
}
