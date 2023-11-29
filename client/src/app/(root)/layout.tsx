import ListItem from "@/components/ListItem";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/UI/Header";
import Player from "@/components/Player/Player";

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
];

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <main className="h-full">
        <Sidebar songs={songs}>
          <div
            className="
              bg-neutral-900
                rounded-lg
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
    "
          >
            {children}
          </div>
        </Sidebar>
        <Player />
      </main>
    </div>
  );
}
