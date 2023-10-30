import { FormHelperText } from "@mui/joy";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const ErrorMessage = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <FormHelperText
      className={twMerge("!text-chkored min-h-[18px] !text-xs", className)}
    >
      {children}
    </FormHelperText>
  );
};
