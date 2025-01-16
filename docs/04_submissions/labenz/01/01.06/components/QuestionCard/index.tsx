'use client';

import { getTextSizeClass } from '@/utils/question-card';
import { QuestionCardProps } from '@/utils/types';
import { useMemo } from 'react';
import { DisplayQuestionCard } from './DisplayQuestionCard';
import { WriteQuestionCard } from './WriteQuestionCard';

export default function QuestionCard({
  question,
  userId,
  mode = 'write',
}: QuestionCardProps) {
  const textSizeClass = useMemo(
    () =>
      mode === 'display' && question.answer
        ? getTextSizeClass(question.answer)
        : getTextSizeClass(''),
    [mode, question.answer]
  );

  return (
    <div className="rounded-xl lg:p-6 p-4 flex flex-col bg-orange-100 border border-black w-80 sm:w-[28rem] md:w-[32rem] xl:w-[36rem] md:h-72 xl:h-80">
      <h3 className="xl:text-xl lg:text-2xl text-xl font-serif mb-4 leading-tight text-left italic">
        {question.text}
      </h3>

      {mode === 'write' && userId ? (
        <WriteQuestionCard
          question={question}
          userId={userId}
          textSizeClass={textSizeClass}
        />
      ) : (
        <DisplayQuestionCard
          question={question}
          textSizeClass={textSizeClass}
        />
      )}
    </div>
  );
}
