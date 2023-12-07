"use client";

import PlayerContent from "./PlayerContent";

const Player = () => {
  return (
    <div className="fixed bottom-0 bg-black w-full px-4 py-2 h-[80px]">
      <PlayerContent />
    </div>
  );
};

export default Player;
