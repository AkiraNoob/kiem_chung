'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';
import MediaItem from '../Items/MediaItem';
import PlaylistItem from '../Items/PlaylistItem';

interface LibraryProps {
  songs: ISong[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const router = useRouter();
  const onClick = () => {
    //handleClick();
  };

  return (
    <div className="flex flex-col">
      <div
        className="
            flex
            item-center
            justify-between
            px-5
            pt-4
        "
      >
        <Link
          href="/"
          className="
                inline-flex
                items-center
                gap-x-2
                text-neutral-400
                hover:text-white
            "
        >
          <TbPlaylist size={26} />
          <p
            className="
                font-medium
                text-md
            "
          >
            Your Library
          </p>
        </Link>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition
            "
        />
      </div>
      <div
        className="
            flex
            flex-col
            gap-y-2
            mt-4
            px-3
        "
      >
        <PlaylistItem
          data={{
            id: '1',
            user_id: 'user',
            songs: songs,
            title: 'Liked Songs',
            image_path: '/images/liked.png',
          }}
        />
      </div>
      <div
        className="
            flex
            flex-col
            gap-y-2
            mt-4
            px-3
        "
      >
        {songs.map((song) => (
          <MediaItem key={song.id} data={song} />
        ))}
      </div>
    </div>
  );
};

export default Library;
