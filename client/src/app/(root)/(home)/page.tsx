import getAllSongs from '@/actions/getAllSongs';
import SongItem from '@/components/Items/SongItem';
import Header from '@/components/UI/Header';
import PageContent from './_components/PageContent';
import PageClientRender from './_contents/PageClientRender';

export default async function Home() {
  const songs = await getAllSongs();
  return (
    <>
      <Header />
      <div className="mt-2 mb-7 px-6">
        <PageClientRender>
          <PageContent songs={songs}>
            {songs.map((item) => (
              <SongItem key={item.id} data={item} />
            ))}
          </PageContent>
        </PageClientRender>
      </div>
    </>
  );
}
