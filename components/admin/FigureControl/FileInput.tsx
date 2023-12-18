import { Button, FormControl, styled } from "@mui/joy";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FigureControlValue } from "./FigureControl";

export const FileInput = ({
  value,
  error,
  onChange,
}: {
  value?: FigureControlValue;
  onChange: (b: Blob) => unknown;
  error?: unknown;
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
        onChange={(e) => e.target.files?.[0] && onChange(e.target.files?.[0])}
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
