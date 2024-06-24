"use client";

import { loader } from "@/lib/loader";
import { FigureData } from "@/lib/figure";
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
      <div />
      <Image
        key={figure.url}
        src={figure.url}
        loader={loader}
        width={figure.width}
        height={figure.height}
        alt={figure.caption}
        quality={30}
        className={twMerge("w-full object-contain", imgClassName)}
      />
      {figure.caption && (
        <figcaption className="text-[11px] leading-tight">
          {figure.caption}
        </figcaption>
      )}
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
