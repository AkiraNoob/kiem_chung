import Header from '@/components/UI/Header';
import React from 'react';
import SearchInput from './_components/SearchInput';
import getSongsByTitle from '@/actions/getSongByTitle';
import SearchContent from './_components/SearchContent';
import SearchPageContent from './_components/SearchPageContent';

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <>
      <Header className="from-bg-neutral-900 mb-0">
        <SearchInput />
      </Header>
      <div className="mb-2 flex flex-col gap-y-6 px-6">
        <h1 className="text-white text-2xl font-semibold">Browse all</h1>
      </div>
      {!searchParams.title ? (
        <>
          <SearchPageContent />
        </>
      ) : (
        <SearchContent songs={songs} />
      )}
    </>
  );
};

export default Search;
