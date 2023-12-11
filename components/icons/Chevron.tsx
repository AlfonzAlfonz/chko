import { ComponentProps } from "react";

export const Chevron = ({ color = "black", ...p }: ComponentProps<"svg">) => {
  return (
    <svg
      {...p}
      width="24"
      height="14"
      viewBox="0 0 24 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="23.2929"
        y1="12.7071"
        x2="11.2929"
        y2="0.707105"
        stroke={color}
        stroke-width="2"
      />
      <line
        x1="12.7071"
        y1="0.707107"
        x2="0.707105"
        y2="12.7071"
        stroke={color}
        stroke-width="2"
      />
    </svg>
  );
};
