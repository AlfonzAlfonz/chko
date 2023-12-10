import { FormHelperText } from "@mui/joy";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const ErrorMessage = ({
  children,
  className,
}: {
  children: unknown;
  className?: string;
}) => {
  return (
    <FormHelperText
      className={twMerge("!text-chkored min-h-[18px] !text-xs", className)}
    >
      {renderError(children)}
    </FormHelperText>
  );
};

const renderError = (e: unknown) => {
  if (!e || typeof e === "object") return "";
};
