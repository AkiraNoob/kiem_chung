import { cookies, headers } from "next/headers";

const songs: ISong[] = [
  {
    id: "1",
    title: "Song 1",
    user_id: "1",
    author: "hi",
    image_path: "/images/liked.png",
    song_path: "....",
    genre: "pop",
  },
  {
    id: "2",
    title: "Song 2",
    user_id: "1",
    author: "hi",
    image_path: "/images/liked.png",
    song_path: "....",
    genre: "pop",
  },
  {
    id: "3",
    title: "Song 3",
    user_id: "1",
    author: "hi",
    image_path: "/images/liked.png",
    song_path: "....",
    genre: "pop",
  },
  {
    id: "4",
    title: "Song 4",
    user_id: "1",
    author: "hi",
    image_path: "/images/liked.png",
    song_path: "....",
    genre: "pop",
  },
  {
    id: "5",
    title: "Song 5",
    user_id: "1",
    author: "hi",
    image_path: "/images/liked.png",
    song_path: "....",
    genre: "pop",
  },
];

const getSongsByTitle = async (title: string): Promise<ISong[]> => {
  if (!title) return songs;

  const data = songs.filter((song) =>
    song.title.toLowerCase().includes(title.toLowerCase())
  );

  return (data as any) || [];
};

export default getSongsByTitle;
