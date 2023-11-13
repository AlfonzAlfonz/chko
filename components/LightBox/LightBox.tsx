"use client";

import { FigureData } from "@/lib/db";
import { Modal } from "@mui/base";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Chevron } from "../Chevron";
import "./lightbox.css";
import { WithCaption } from "../WithCaption";

interface Props {
  data?: FigureData[];
  initialIndex: number;
  onClose: () => unknown;
}

export const LightBox = ({ data, initialIndex, onClose }: Props) => {
  const [index, setIndex] = useState(0);
  const open = !!data;

  useEffect(() => {
    setIndex(data ? initialIndex % data.length : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const activeFigure = data?.[index];

  return (
    <Modal
      className="lightbox"
      aria-labelledby={activeFigure?.caption}
      open={open}
      onClose={onClose}
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

          <div className="absolute w-full h-full flex justify-between items-center p-2">
            <Chevron
              style={{
                transform: "rotate(-90deg) scale(1.4)",
                cursor: "pointer",
              }}
              onClick={() =>
                setIndex((s) => (s === 0 ? data.length - 1 : s - 1))
              }
            />
            <Chevron
              style={{
                transform: "rotate(90deg) scale(1.4)",
                cursor: "pointer",
              }}
              onClick={() => setIndex((s) => (s + 1) % data.length)}
            />
          </div>
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

export const useGallery = () => {
  const [state, setState] = useState<Props>({
    data: undefined,
    initialIndex: 0,
    onClose: () => {},
  });

  return [
    state,
    (data: FigureData[] | undefined, initialIndex: number) =>
      setState({
        data,
        initialIndex,
        onClose: () =>
          setState({ data: undefined, initialIndex: 0, onClose: () => {} }),
      }),
  ] as const;
};
