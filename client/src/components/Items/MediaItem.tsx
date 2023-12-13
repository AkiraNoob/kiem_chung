'use client';

import Image from 'next/image';

interface MediaItemProps {
  data: ISong;
}

const MediaItem: React.FC<MediaItemProps> = ({ data }) => {
  const handleOnClickEachMediaItem = () => {
    console.log(data.id);
  };
  return (
    <div
      onClick={handleOnClickEachMediaItem}
      className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
    >
      <div
        className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >
        <Image fill src={data.image_path || '/images/liked.png'} alt="MediaItem" className="object-cover" />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">By {data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
