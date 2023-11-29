import { twMerge } from "tailwind-merge";

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <hr
      className={twMerge(
        `border-[0.1px] border-neutral-900 my-8 w-[540px]`,
        className
      )}
    />
  );
};

export default Divider;
