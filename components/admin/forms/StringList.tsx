import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import Delete from "@mui/icons-material/Delete";
import { Button, FormLabel, IconButton, Textarea } from "@mui/joy";
import { SetStateAction } from "react";

interface Props {
  label: string;
  add: string;
  value: string[];
  setValue: (s: SetStateAction<string[]>) => unknown;

  maxLength?: number;
}

export const StringList = ({
  value,
  setValue,
  maxLength,
  label,
  add,
}: Props) => {
  return (
    <div className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <div className="flex flex-col gap-3">
        {value.map((v, i) => (
          <Textarea
            key={i}
            value={v}
            onChange={(e) => setValue((s) => s.with(i, e.target.value))}
            startDecorator={<div className="px-2">{i + 1}.</div>}
            endDecorator={
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <IconButton
                    color="neutral"
                    disabled={i === 0}
                    onClick={() => setValue((s) => reorder(s, i, i - 1))}
                  >
                    <ArrowUpward />
                  </IconButton>
                  <IconButton
                    color="neutral"
                    disabled={i === value.length}
                    onClick={() => setValue((s) => reorder(s, i, i + 1))}
                  >
                    <ArrowDownward />
                  </IconButton>
                </div>
                <IconButton
                  color="danger"
                  onClick={() => setValue((s) => s.filter((_, ii) => i !== ii))}
                >
                  <Delete />
                </IconButton>
              </div>
            }
            slotProps={{
              root: { className: "!flex-row" },
              endDecorator: { className: "!my-0" },
            }}
          />
        ))}
      </div>

      {value.length <= (maxLength ?? Infinity) && (
        <Button
          onClick={() => setValue((s) => [...s, ""])}
          size="sm"
          color="neutral"
          className="self-center !mt-6"
        >
          {add}
        </Button>
      )}
    </div>
  );
};

const reorder = <T,>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed!);

  return result;
};
