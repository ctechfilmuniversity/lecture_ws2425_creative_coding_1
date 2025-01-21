'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyLinkButton({
  text,
  isDisabled = false,
}: {
  text: string;
  isDisabled?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      disabled={isDisabled}
      className={`
        bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded-full
        transition-all duration-300 
        hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)]
        flex items-center justify-center
      ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
    </button>
  );
}
