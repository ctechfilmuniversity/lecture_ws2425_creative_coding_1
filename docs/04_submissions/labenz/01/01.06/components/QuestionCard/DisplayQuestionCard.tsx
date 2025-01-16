import { QuestionCardCommonProps } from '@/utils/question-card';
import { MAX_LINES } from './consts';

export function DisplayQuestionCard({
  question,
  textSizeClass,
}: QuestionCardCommonProps) {
  return (
    <div
      className="flex-1 flex items-end justify-end"
      style={{ minHeight: `${MAX_LINES * 1.5}em` }}
    >
      <div
        className={`w-full p-2 rounded-md bg-transparent text-right font-sans font-extrabold leading-tight ${textSizeClass}`}
      >
        {question.answer}
      </div>
    </div>
  );
}
