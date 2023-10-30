import { FigureData } from "@/lib/db";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Delete from "@mui/icons-material/Delete";
import { Button, FormControl, IconButton, Input, styled } from "@mui/joy";
import { Dispatch, SetStateAction } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Errors } from "./useForm";

export type FigureControlValue = FigureData & { blob?: Blob };

interface Props {
  error?: Errors<FigureControlValue>;
  value: FigureControlValue;
  setValue: Dispatch<SetStateAction<FigureControlValue>>;
}

export const FigureControl = ({ error, value, setValue }: Props) => {
  return (
    <div className="relative">
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
        {value?.blob ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={URL.createObjectURL(value.blob)} alt="file" />
        ) : value?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value.url} alt="file" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <CloudUploadIcon sx={{ width: "32px", height: "32px", mb: 2 }} />
            <div className="bg-transparent">Nahrát soubor</div>
          </div>
        )}

        <VisuallyHiddenInput
          type="file"
          onChange={(e) =>
            setValue((s) => ({ ...s, blob: e.target.files?.[0] ?? undefined! }))
          }
        />
      </FormControl>
      {(value?.blob || value?.url) && (
        <>
          <div className="absolute top-3 right-3">
            <IconButton
              size="sm"
              variant="solid"
              color="danger"
              onClick={() =>
                setValue((s) => ({ ...s, url: undefined!, blob: undefined! }))
              }
            >
              <Delete />
            </IconButton>
          </div>
          <FormControl
            error={!!error?.caption}
            className="!absolute bottom-0 w-full px-3 pb-1 -translate-y-full"
          >
            <Input
              placeholder="Popisek fotky"
              value={value.caption}
              onChange={(e) =>
                setValue((s) => ({ ...s, caption: e.target.value }))
              }
            />
          </FormControl>
          <div className="!absolute bottom-0 w-full px-5 -translate-y-full">
            <ErrorMessage>{error?.caption}</ErrorMessage>
          </div>
        </>
      )}
    </div>
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
