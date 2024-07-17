import { Button, FormControl, styled } from "@mui/joy";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FigureControlValue } from "./FigureControl";

export const FileInput = <TMulti extends boolean>({
  value,
  error,
  onChange,
  multiple,
}: {
  value?: FigureControlValue;
  onChange: (b: Blob[]) => unknown;
  error?: unknown;
  multiple?: TMulti;
}) => {
  return (
    <FormControl
      error={!!error}
      slots={{ root: Button }}
      slotProps={{ root: { component: "label", variant: "outlined" } }}
      sx={{
        justifyItems: "center",
        alignItems: "center",
        p: 0,
        overflow: "hidden",
        width: "100%",
        minHeight: "200px",
      }}
      onDrop={(e) => {
        e.preventDefault();
        const files = toArray(e.dataTransfer.items)
          .filter((i) => i.kind === "file")
          .map((i) => i.getAsFile()!);
        onChange(files);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      {value?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value.url} alt="file" className="max-h-[30vh]" />
      ) : (
        <div className="flex flex-col items-center justify-center w-[250px]">
          <CloudUploadIcon sx={{ width: "32px", height: "32px", mb: 2 }} />
          <div className="bg-transparent">Nahrát soubor</div>
        </div>
      )}

      <VisuallyHiddenInput
        type="file"
        multiple={multiple}
        onChange={(e) =>
          e.target.files?.[0] && onChange(toArray(e.target.files))
        }
      />
    </FormControl>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const toArray = <T,>(iter: { [i: number]: T; length: number }): T[] => {
  const result: T[] = [];
  for (let i = 0; i < iter.length; i++) result.push(iter[i]!);
  return result;
};
