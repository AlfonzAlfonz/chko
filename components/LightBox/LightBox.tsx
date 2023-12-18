"use client";

import { FigureData } from "@/lib/figure";
import { Modal } from "@mui/base";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { WithCaption } from "../WithCaption";
import { Chevron } from "../icons/Chevron";
import "./lightbox.css";

interface Props {
  open: boolean;
  onClose: (index: number) => unknown;

  data: FigureData[];

  index: number;
}

export const LightBox = ({
  open,
  data,
  index: initialIndex,
  onClose,
}: Props) => {
  const [index, setIndex] = useState(initialIndex);
  const activeFigure = data?.[index];

  return (
    <Modal
      className="lightbox"
      aria-labelledby={activeFigure?.caption}
      open={open}
      onClose={() => onClose(index)}
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { className: "lightbox-backdrop" } }}
    >
      {activeFigure ? (
        <div className="lightbox-content">
          <WithCaption caption={activeFigure.caption}>
            <Image
              src={activeFigure.url}
              width={activeFigure.width}
              height={activeFigure.height}
              alt="Caption"
              className="min-w-[50vw]"
              style={{ aspectRatio: activeFigure.width / activeFigure.height }}
            />
          </WithCaption>

          <SliderOverlay length={data.length} setIndex={setIndex} />
        </div>
      ) : (
        <div />
      )}
    </Modal>
  );
};

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={`${open ? "MuiBackdrop-open" : ""} ${className}`}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.displayName = "Backdrop";

export const SliderOverlay = ({
  setIndex,
  length,
}: {
  setIndex: Dispatch<SetStateAction<number>>;
  length: number;
}) => {
  return (
    <div className="absolute w-full h-full flex justify-between items-center p-2 inset-0 slider-overlay">
      <div className="button w-12 h-12 p-0 flex items-center justify-center">
        <Chevron
          style={{
            transform: "rotate(-90deg)",
            cursor: "pointer",
          }}
          onClick={() => setIndex((s) => (s === 0 ? length - 1 : s - 1))}
        />
      </div>
      <div className="button w-12 h-12 p-0 flex items-center justify-center">
        <Chevron
          style={{
            transform: "rotate(90deg)",
            cursor: "pointer",
          }}
          onClick={() => setIndex((s) => (s + 1) % length)}
        />
      </div>
    </div>
  );
};
