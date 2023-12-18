"use client";

import { FigureData } from "@/lib/figure";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FigureImage } from "./FigureImage";
import { LightBox, SliderOverlay } from "./LightBox/LightBox";

interface Props {
  figures: FigureData[];
  className?: string;
}

export const Gallery = ({ figures, className }: Props) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    !!figures.length && (
      <>
        <FigureImage
          figure={figures[index]}
          className={twMerge("cursor-pointer relative", className)}
          // onClick={() => setOpen(true)}
        >
          {figures.length > 1 && (
            <SliderOverlay length={figures.length} setIndex={setIndex} />
          )}
        </FigureImage>

        <LightBox
          open={open}
          data={figures}
          index={index}
          onClose={(i) => {
            setIndex(i);
            setOpen(false);
          }}
        />
      </>
    )
  );
};
