import Tooltip from "@mui/joy/Tooltip";
import { ComponentProps } from "react";

export const ChkoTooltip = (props: ComponentProps<typeof Tooltip>) => {
  return (
    <Tooltip
      arrow
      placement="top-start"
      sx={{
        background: "white",
        color: "black",
        borderRadius: 0,
        maxWidth: "250px",
        padding: "8px",
        paddingX: "12px",
        paddingBottom: "12px",
      }}
      className="!rounded-none"
      slotProps={{
        arrow: {
          className: "!before:border-t-[white] !before:border-r-[white]",
        },
      }}
      {...props}
    />
  );
};
