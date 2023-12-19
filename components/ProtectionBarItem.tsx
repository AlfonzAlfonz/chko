"use client";

import { ReactNode, useState } from "react";
import { ChkoModal } from "./ChkoModal";
import { ChkoTooltip } from "./ChkoTooltip";

export const ProtectionBarItem = ({
  label,
  active,
  tooltip,
  description,
  fade,
  bg,
  className,
}: {
  label: string;
  tooltip: string;
  description: ReactNode;
  active: boolean;
  fade: boolean;
  bg: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ChkoTooltip
        title={
          <span className="text-[13px]">
            <span className="popisky-13">Pásmo {label}</span> <br />
            {tooltip}
          </span>
        }
      >
        <div
          className={`flex-1 flex items-center justify-center ${bg} ${className} ${
            active ? "outline-2 outline z-10" : fade ? "opacity-50" : ""
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
            className={`w-8 h-8 flex items-center justify-center ${bg} ${className} rounded-full`}
          >
            {label}
          </span>
        </h2>
        {description}
      </ChkoModal>
    </>
  );
};
