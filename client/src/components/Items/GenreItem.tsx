'use client';
import Image from 'next/image';
import PlayButton from '../UI/PlayButton';
import { twMerge } from 'tailwind-merge';

interface GenreItemProps {
  data: IGenre;
  onClick: (id: string) => void;
  className?: string;
}

const GenreItem: React.FC<GenreItemProps> = ({ data, onClick, className }) => {
  return (
    <div
      className={`relative group flex flex-col items-start justify-start rounded-md overflow-hidden ${data.color} cursor-pointer hover:opacity-75 transition p-3`}
    >
      <div className="flex flex-col items-start w-full pb-40 gap-y-1">
        <p className="text-2xl font-bold truncate w-full">{data.title}</p>
      </div>
    </div>
  );
};

export default GenreItem;
