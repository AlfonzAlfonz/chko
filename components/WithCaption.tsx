import { ReactNode } from "react";
import tm, { twMerge } from "tailwind-merge";

export const WithCaption = ({
  children,
  caption,
  className,
}: {
  children: ReactNode;
  caption: ReactNode;
  className?: string;
}) => {
  return (
    <figure className={twMerge("relative", className)}>
      {children}
      <figcaption className="absolute bottom-0 left-0 right-0 bg-[#EFEFEF] p-3 m-4">
        {caption}
      </figcaption>
    </figure>
  );
};
