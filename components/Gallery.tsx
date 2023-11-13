"use client";

import { FigureData } from "@/lib/db";
import { FigureImage } from "./FigureImage";
import { LightBox, SliderOverlay } from "./LightBox/LightBox";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

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
          <SliderOverlay length={figures.length} setIndex={setIndex} />
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
