"use client";

import LikeButton from "@/app/(root)/search/_components/LikeButton";
import MediaItem from "../Items/MediaItem";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "../UI/Slider";
import { useState } from "react";

const song: ISong = {
  id: "1",
  title: "Song 1",
  user_id: "1",
  author: "hi",
  image_path: "/images/liked.png",
  song_path: "....",
  genre: "pop",
};

const PlayerContent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div
        className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
      >
        <div
          onClick={() => {}}
          className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div
        className="
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          "
      >
        <AiFillStepBackward
          onClick={() => {}}
          size={30}
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
        />
        <div
          onClick={() => {}}
          className="
              flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={() => {}}
          size={30}
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon onClick={() => {}} className="cursor-pointer" size={34} />
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
