"use client";

import { FigureData } from "@/lib/db";
import { FigureImage } from "./FigureImage";
import { LightBox, useGallery } from "./LightBox/LightBox";
import { twMerge } from "tailwind-merge";

interface Props {
  figures: FigureData[];
  className?: string;
}

export const Gallery = ({ figures, className }: Props) => {
  const [gallery, open] = useGallery();

  return (
    !!figures.length && (
      <>
        <FigureImage
          figure={figures[0]}
          className={twMerge("cursor-pointer", className)}
          onClick={() => open(figures, 0)}
        />
        <LightBox {...gallery} />
      </>
    )
  );
};
