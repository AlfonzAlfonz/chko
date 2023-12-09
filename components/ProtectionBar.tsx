"use client";
import { ChkoModal } from "@/components/ChkoModal";
import { ChkoTooltip } from "@/components/ChkoTooltip";
import { ObecMetadata } from "@/lib/db";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const ProtectionBar = ({
  protectionZone,
  className,
  outline = "outline-black",
}: {
  protectionZone?: "A" | "B" | "C";
  className?: string;
  outline?: string;
}) => {
  return (
    <div className={twMerge("flex select-none h-[24px]", className)}>
      <Item
        label="A"
        active={"A" === protectionZone}
        tooltip="Přísné ochrany krajinného rázu"
        description="AAAAAAAAAAAAA"
        fade={!!protectionZone}
        bg="bg-black"
        className={`${outline} text-white`}
      />
      <Item
        label="B"
        active={"B" === protectionZone}
        tooltip="Zpřísněné ochrany krajinného rázu"
        description="BBBBBBBBBBBB"
        fade={!!protectionZone}
        bg="bg-[#AAAAAA]"
        className={"outline-black text-black"}
      />
      <Item
        label="C"
        active={"C" === protectionZone}
        tooltip="Běžná ochrana krajinného rázu"
        description="CCCCCCCCCCCCC"
        fade={!!protectionZone}
        bg="bg-white"
        className={"outline-black text-black"}
      />
    </div>
  );
};

const Item = ({
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
  description: string;
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
          <span className="popisky-13">
            <span className="uppercase tracking-[4px]">Pásmo {label}</span>{" "}
            <br />
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
