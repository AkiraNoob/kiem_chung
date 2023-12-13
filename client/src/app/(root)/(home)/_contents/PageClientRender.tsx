'use client';

import getAllSongs from '@/actions/getAllSongs';
import ArtistItem from '@/components/Items/ArtistItem';
import { userContext } from '@/context/UserContext';
import { useContext } from 'react';
import useSWR from 'swr';
import PageContent from '../_components/PageContent';
import PageTitle from '../_components/PageTitle';

const PageClientRender = ({ children }: { children?: React.ReactNode }) => {
  const { isLogin } = useContext(userContext);

  const { data: songs } = useSWR('songs', getAllSongs, { fallbackData: [] });

  const firstSectionPageTitle = !isLogin ? 'Melodify playlists' : 'Popular new releases';

  return (
    <>
      <PageTitle title={firstSectionPageTitle} />
      {children}
      {isLogin && (
        <>
          <PageTitle title="Popular artists" />
          <PageContent songs={songs}>
            {songs.map((item) => (
              <ArtistItem key={item.id} data={item} />
            ))}
          </PageContent>
        </>
      )}
    </>
  );
};
export default PageClientRender;
