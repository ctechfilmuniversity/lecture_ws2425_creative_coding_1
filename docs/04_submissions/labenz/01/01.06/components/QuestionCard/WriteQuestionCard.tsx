'use client';

import { submitAnswer } from '@/app/actions/answer';
import {
  QuestionCardCommonProps,
  getTextSizeClass,
} from '@/utils/question-card';
import { Send } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { MAX_LINES } from './consts';

type WriteQuestionCardProps = QuestionCardCommonProps & {
  userId: string;
};

export function WriteQuestionCard({
  question,
  userId,
  textSizeClass: initialTextSizeClass,
}: WriteQuestionCardProps) {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [textSizeClass, setTextSizeClass] = useState(initialTextSizeClass);
  const [lineCount, setLineCount] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const updateHiddenInput = useCallback(() => {
    if (contentRef.current && hiddenInputRef.current) {
      const text = contentRef.current.innerText;
      hiddenInputRef.current.value = text;
      setTextSizeClass(getTextSizeClass(text));

      const lines = text.split('\n').filter((line) => line.trim() !== '');

      setLineCount(lines.length);
    }
  }, []);

  const handleSubmit = async (formData: FormData) => {
    if (!userId) {
      setError('userId is required');
      throw new Error('userId is required');
    }
    setError('');
    try {
      updateHiddenInput();
      await submitAnswer(formData);
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    }
  };

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && lineCount >= MAX_LINES) {
        e.preventDefault();
      }
    },
    [lineCount]
  );

  return (
    <form
      action={handleSubmit}
      className="flex flex-col flex-1 justify-end h-full"
    >
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="questionId" value={question.id} />
      <input type="hidden" name="text" ref={hiddenInputRef} required />

      <div
        className="flex-1 flex items-end justify-end flex-shrink-0"
        style={{ minHeight: `${MAX_LINES * 1.5}em` }}
      >
        <div
          ref={contentRef}
          contentEditable
          onInput={updateHiddenInput}
          onKeyDown={handleKeyDown}
          className={`w-full p-2 rounded-md bg-transparent text-right font-sans font-extrabold leading-tight ${textSizeClass} outline-none placeholder 
empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:font-bold ${
            lineCount >= MAX_LINES ? 'border-2 border-red-500' : ''
          }`}
          data-placeholder="Write your answer..."
          style={{
            whiteSpace: 'pre-wrap',
            overflowY: 'auto',
          }}
          onPaste={handlePaste}
        />
      </div>

      {lineCount >= MAX_LINES && (
        <p className="text-red-500 text-sm mt-1">Max lines reached</p>
      )}

      <p
        className={`text-red-600 text-xs text-right font-sans mb-6 ${
          error ? 'opacity-100' : 'opacity-0'
        }`}
        aria-live="polite"
      >
        {error}
      </p>

      <div className="flex justify-end">
        <button
          type="submit"
          className={`${
            success
              ? 'bg-green-800 hover:bg-green-600'
              : 'bg-slate-800 hover:bg-slate-600'
          } w-fit text-white text-xs py-2 px-6 rounded-full transition-colors whitespace-nowrap`}
        >
          <Send className="w-4 inline-block mr-2" />
          {success ? 'Thank you!' : 'Send'}
        </button>
      </div>
    </form>
  );
}
