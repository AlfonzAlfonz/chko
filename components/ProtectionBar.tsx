import { ObecMetadata } from "@/lib/db";
import { twMerge } from "tailwind-merge";

export const ProtectionBar = ({
  protectionZone,
  className,
  outline = "outline-black",
}: {
  protectionZone?: keyof typeof protectionZones;
  className?: string;
  outline?: string;
}) => {
  console.log({ protectionZone });
  return (
    <div className={twMerge("flex select-none w-[126px] h-[24px]", className)}>
      {Object.entries(protectionZones).map(([v, c], i) => (
        <div
          key={v}
          className={`flex-1 flex items-center justify-center ${c} ${
            i < 2 ? `${outline} text-white` : "outline-black text-black"
          } ${
            v === protectionZone
              ? "outline-2 outline z-10"
              : protectionZone
              ? "opacity-50"
              : ""
          }`}
        >
          {v}
        </div>
      ))}
    </div>
  );
};

const protectionZones: Record<ObecMetadata["protectionZone"], string> = {
  A: "bg-black",
  B: "bg-[#1A1A1A]",
  C: "bg-white",
};
