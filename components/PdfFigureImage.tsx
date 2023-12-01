import { FigureData } from "@/lib/db";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
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
        className={twMerge("w-full object-contain", imgClassName)}
      />
      <figcaption className="text-[11px] leading-tight">
        {figure.caption}
      </figcaption>
    </figure>
  );
};

export const PdfImage = ({
  img,
  caption,
  imgClassName,
  ...divProps
}: {
  img: StaticImport;
  caption?: string;
  imgClassName?: string;
} & ComponentProps<"figure">) => {
  return (
    <figure {...divProps}>
      <Image
        src={img}
        alt={caption!}
        className={twMerge("w-full object-contain", imgClassName)}
      />
      <figcaption className="text-[11px] leading-tight">{caption}</figcaption>
    </figure>
  );
};
