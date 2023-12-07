'use client';

import GenreItem from '@/components/Items/GenreItem';

const genres: IGenre[] = [
  {
    id: '1',
    title: 'Podcasts',
    color: 'bg-red-500',
    songs: [],
  },
  {
    id: '2',
    title: 'Live Events',
    color: 'bg-yellow-500',
    songs: [],
  },
  {
    id: '3',
    title: 'Made for you',
    color: 'bg-green-500',
    songs: [],
  },
  {
    id: '4',
    title: 'Vietnamese',
    color: 'bg-indigo-500',
    songs: [],
  },
  {
    id: '5',
    title: 'Pop',
    color: 'bg-pink-500',
    songs: [],
  },
  {
    id: '6',
    title: 'K-Pop',
    color: 'bg-purple-500',
    songs: [],
  },
  {
    id: '7',
    title: 'Hip-Hop',
    color: 'bg-gray-500',
    songs: [],
  },
  {
    id: '8',
    title: 'Podcasts Charts',
    color: 'bg-blue-500',
    songs: [],
  },
];

const SearchPageContent = () => {
  return (
    <div
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-4
        mb-8
        mx-6
      "
    >
      {genres.map((item) => (
        <GenreItem key={item.id} data={item} onClick={() => {}} />
      ))}
    </div>
  );
};

export default SearchPageContent;
