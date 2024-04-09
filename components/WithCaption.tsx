import { ReactNode } from "react";
import tm, { twMerge } from "tailwind-merge";

export const WithCaption = ({
  children,
  caption,
  className,
  captionClassName,
}: {
  children: ReactNode;
  caption: ReactNode;
  className?: string;
  captionClassName?: string;
}) => {
  return (
    <figure className={className}>
      {children}
      <figcaption
        className={twMerge(
          "bg-chkobg p-3 mobil-popisky-11 lg:popisky-13",
          captionClassName
        )}
      >
        {caption}
      </figcaption>
    </figure>
  );
};
