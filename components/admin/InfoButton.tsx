import { Tooltip, TooltipProps } from "@mui/joy";
import InfoIcon from "@mui/icons-material/Info";

export const InfoButton = (props: Omit<TooltipProps, "children">) => {
  return (
    <Tooltip {...props}>
      <InfoIcon />
    </Tooltip>
  );
};
