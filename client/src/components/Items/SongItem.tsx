"use client";
import Image from "next/image";
import PlayButton from "../UI/PlayButton";

interface SongItemProps {
  data: ISong;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  return (
    <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={data.image_path || "/images/liked.png"}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 truncate">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-[100px] right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
