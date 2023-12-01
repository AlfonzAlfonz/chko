import { ObecMetadata } from "@/lib/db";

export const ProtectionBar = ({
  protectionZone,
}: {
  protectionZone?: keyof typeof protectionZones;
}) => {
  return (
    <div className="flex select-none">
      {Object.entries(protectionZones).map(([v, c], i) => (
        <div
          key={v}
          className={`w-[42px] h-[24px] flex items-center justify-center ${c} ${
            i < 2 ? "outline-white text-white" : "outline-black text-black"
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
