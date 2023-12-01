import { ObecMetadata } from "@/lib/db";
import { twMerge } from "tailwind-merge";

export const CategoryBar = ({
  category,
  className,
}: {
  category?: keyof typeof categories;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex select-none w-[168px] h-[24px]", className)}>
      {Object.entries(categories).map(([v, c]) => (
        <div
          key={v}
          className={`flex-1 flex items-center justify-center ${c} ${
            v === category
              ? "outline-black outline-2 outline z-10"
              : category
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

const categories: Record<ObecMetadata["category"], string> = {
  I: "bg-chkored",
  II: "bg-chkoorange",
  III: "bg-chkoyellow",
  IV: "bg-chkogreen",
};
