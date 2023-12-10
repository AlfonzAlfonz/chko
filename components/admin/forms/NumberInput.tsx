import { Input } from "@mui/joy";
import { ComponentProps } from "react";

export const NumberInput = (
  props: Omit<ComponentProps<typeof Input>, "onChange"> & {
    onChange?: (x: { target: { value: number } }) => unknown;
  }
) => (
  <Input
    {...props}
    value={props.value ?? undefined}
    type="number"
    onChange={(e) =>
      props.onChange?.({ target: { value: e.target.valueAsNumber } })
    }
  />
);
