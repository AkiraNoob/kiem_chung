// import { useToast } from "@/components/UI/Toast/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  //   const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const likeHandler = () => {
    //If user isn't logged in
    //do something....

    if (isLiked) {
      setIsLiked(false);
      //   toast({
      //     title: "Removed from Liked Songs",
      //   });
    } else {
      setIsLiked(true);
      //   toast({
      //     title: "Added to Liked Songs",
      //   });
    }

    router.refresh();
  };

  return (
    <button onClick={likeHandler} className="hover:opacity-75 transition">
      <Icon color={isLiked ? "#22c55e" : "#A7A7A7"} size={25} />
    </button>
  );
};

export default LikeButton;
