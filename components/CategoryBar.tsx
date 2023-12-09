"use client";
import { ChkoModal } from "@/components/ChkoModal";
import { ChkoTooltip } from "@/components/ChkoTooltip";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const CategoryBar = ({
  category,
  className,
}: {
  category?: "I" | "II" | "III" | "IV";
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex select-none h-[24px] before:border-t-white before:border-r-white",
        className
      )}
    >
      <Item
        label="I"
        active={category === "I"}
        fade={!!category}
        tooltip="Sídlo má mimořádně silný vliv na vznik výrazného rázu krajiny, přírodní rámec (morfologie terénu a vegetační kryt) zde dotváří estetické hodnoty a harmonii krajiny."
        description="hodne moc ochrany"
        bg="bg-chkored"
      />
      <Item
        label="II"
        active={category === "II"}
        fade={!!category}
        tooltip="Sídlo vyznačují se výraznou krajinotvornou hodnotou, vystupuje jako významný spolutvůrčí krajinný prvek s příznivým projevem v kontextu širšího krajinného rámce."
        description="trochu ochrany"
        bg="bg-chkoorange"
      />
      <Item
        label="III"
        active={category === "III"}
        fade={!!category}
        tooltip="Sídlo nevynikající významnými urbanistickými ani architektonickými či památkovými hodnotami, jeho projev v obrazu krajiny (vnější působení) je však do značné míry harmonický."
        description="moc ne ochrany"
        bg="bg-chkoyellow"
      />
      <Item
        label="IV"
        active={category === "IV"}
        fade={!!category}
        tooltip="Sídlo nevynikající významnými urbanistickými ani architektonickými či památkovými hodnotami ani harmonickým projevem v obrazu krajiny."
        description="vubec"
        bg="bg-chkogreen"
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
}: {
  label: string;
  tooltip: string;
  description: string;
  active: boolean;
  fade: boolean;
  bg: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ChkoTooltip
        title={
          <span className="popisky-13">
            <span className="uppercase tracking-[4px]">Kategorie {label}</span>{" "}
            <br />
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
