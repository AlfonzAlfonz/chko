import { FigureData } from "@/lib/db";
import Image from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const PdfFigureImage = ({
  figure,
  noCaption,
  imgClassName,
  ...divProps
}: {
  figure?: FigureData;
  noCaption?: boolean;
  imgClassName?: string;
} & ComponentProps<"figure">) => {
  if (!figure) return null;

  return (
    <figure {...divProps}>
      <Image
        key={figure.url}
        src={figure.url}
        width={figure.width}
        height={figure.height}
        alt={figure.caption}
        className={twMerge("w-full aspect-[3/2] object-contain", imgClassName)}
      />
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
};
