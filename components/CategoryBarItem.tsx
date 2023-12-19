"use client";
import { ReactNode, useState } from "react";
import { ChkoModal } from "./ChkoModal";
import { ChkoTooltip } from "./ChkoTooltip";

export const CategoryBarItem = ({
  label,
  active,
  tooltip,
  description,
  fade,
  bg,
}: {
  label: string;
  tooltip: string;
  description: ReactNode;
  active: boolean;
  fade: boolean;
  bg: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ChkoTooltip
        title={
          <span className="text-[13px]">
            <span className="popisky-13">Kategorie {label}</span> <br />
            {tooltip}
          </span>
        }
      >
        <div
          className={`flex-1 flex items-center justify-center ${bg} ${
            active
              ? "outline-black outline-2 outline z-10"
              : fade
              ? "opacity-50"
              : ""
          }`}
          onClick={() => setOpen(true)}
        >
          {label}
        </div>
      </ChkoTooltip>
      <ChkoModal open={open} onClose={() => setOpen(false)}>
        <h2 className="flex items-center gap-4">
          <span>KATEGORIE SÍDLA</span>{" "}
          <span
            className={`w-8 h-8 flex items-center justify-center ${bg} rounded-full`}
          >
            {label}
          </span>
        </h2>
        {description}
      </ChkoModal>
    </>
  );
};
