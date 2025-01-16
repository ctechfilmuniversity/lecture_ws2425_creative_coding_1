import { QuestionCardProps } from '@/utils/types';

export const TEXT_SIZE_CLASSES = {
  base: 'text-sm',
  sm: 'text-base',
  xs: 'text-base',
} as const;

export function getTextSizeClass(text: string) {
  const length = text?.length || 0;
  if (length < 200) return TEXT_SIZE_CLASSES.base;
  if (length < 300) return TEXT_SIZE_CLASSES.sm;
  return TEXT_SIZE_CLASSES.xs;
}

export type QuestionCardCommonProps = {
  question: QuestionCardProps['question'];
  textSizeClass: string;
};
