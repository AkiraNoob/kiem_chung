"use client";

import Header from "@/components/UI/Header";
import ListItem from "@/components/ListItem";
import Link from "next/link";
import PageContent from "./_components/PageContent";
import SongItem from "@/components/Items/SongItem";
import ArtistItem from "@/components/Items/ArtistItem";
import PageTitle from "./_components/PageTitle";

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

export default function Home() {
  const isLogin = false;

  return (
    <>
      <Header />
      <div className="mt-2 mb-7 px-6">
        {isLogin === false ? (
          <>
            <PageTitle title="Melodify playlists" />
            <PageContent songs={songs}>
              {songs.map((item) => (
                <SongItem key={item.id} data={item} onClick={() => {}} />
              ))}
            </PageContent>
          </>
        ) : (
          <>
            <PageTitle title="Popular new releases" />
            <PageContent songs={songs}>
              {songs.map((item) => (
                <SongItem key={item.id} data={item} onClick={() => {}} />
              ))}
            </PageContent>
            <PageTitle title="Popular artists" />
            <PageContent songs={songs}>
              {songs.map((item) => (
                <ArtistItem key={item.id} data={item} onClick={() => {}} />
              ))}
            </PageContent>
          </>
        )}
      </div>
    </>
  );
}
