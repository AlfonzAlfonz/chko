import Image from "next/image";
import { WithCaption } from "./WithCaption";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { FigureData } from "@/lib/figure";

export const FigureImage = ({
  figure,
  noCaption,
  imgClassName,
  ...divProps
}: {
  figure?: FigureData;
  noCaption?: boolean;
  imgClassName?: string;
} & ComponentProps<"div">) => {
  if (!figure) return null;
  const image = (
    <Image
      key={figure.url}
      src={figure.url}
      width={figure.width}
      height={figure.height}
      alt={figure.caption}
      className={twMerge("w-full bg-black object-contain", imgClassName)}
    />
  );

  return (
    <div {...divProps}>
      {figure.caption && !noCaption ? (
        <WithCaption caption={figure.caption} className="h-full">
          {image}
        </WithCaption>
      ) : (
        image
      )}
      {divProps.children}
    </div>
  );
};
