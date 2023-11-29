import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`bg-black h-fit w-full`, className)}>
      {children}
    </div>
  );
};

export default Container;
