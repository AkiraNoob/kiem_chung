import Header from "@/components/UI/Header";
import Image from "next/image";
import React from "react";
import PlaylistContent from "./_components/PlaylistContent";

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

const playlist = {
  id: "1",
  user_id: "user",
  songs: songs,
  title: "Liked Songs",
  image_path: "/images/liked.png",
};

const Playlist = () => {
  return (
    <>
      <Header />
      <div className="mt-4 p-6">
        <div className="flex flex-col md:flex-row items-center gap-x-5">
          <div className="relative h-32 w-32 lg:h-44 lg:w-44 ">
            <Image
              fill
              src={playlist.image_path}
              alt="cover_image"
              className="object-cover"
            />
          </div>
          <div
            className="
            flex
            flex-col
            mt-4
            md:mt-0
            gap-y-2
            md:items-start 
          "
          >
            <p className="hidden md:block font-semibold text-sm "> Playlist</p>
            <h1
              className="
              text-white
              text-4xl
              sm:text-5xl
              lg:text-7xl
              font-bold
            "
            >
              Liked songs
            </h1>
          </div>
        </div>
      </div>
      <PlaylistContent songs={playlist.songs} />
    </>
  );
};

export default Playlist;
