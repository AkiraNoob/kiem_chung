'use client';

interface GenreItemProps {
  data: IGenre;
  className?: string;
}

const GenreItem: React.FC<GenreItemProps> = ({ data, className }) => {
  const handleOnClickEachGenre = () => {
    console.log(data.id);
  };
  return (
    <div
      onClick={handleOnClickEachGenre}
      className={`relative group flex flex-col items-start justify-start rounded-md overflow-hidden ${data.color} cursor-pointer hover:opacity-75 transition p-3 ${className}`}
    >
      <div className="flex flex-col items-start w-full pb-40 gap-y-1">
        <p className="text-2xl font-bold truncate w-full">{data.title}</p>
      </div>
    </div>
  );
};

export default GenreItem;
