import { FC } from 'react';

interface TagProps {
  isActive: boolean;
  onClick: () => void;
  text: string;
}

const Tag: FC<TagProps> = ({ isActive, text, onClick }) => {
  return (
    <button
      className={`text-sm uppercase font-light py-2 px-3 border rounded-xl transition-colors whitespace-nowrap 
      ${
        isActive
          ? 'bg-gray-200 border-gray-300'
          : 'hover:bg-gray-100 active:bg-gray-200'
      }`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default Tag;
