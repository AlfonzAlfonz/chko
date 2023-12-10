import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { mapValibotResult, useForm } from "../forms/useForm";
import { FigureControlValue } from "./FigureControl";
import { FileInput } from "./FileInput";
import { ErrorMessage } from "../forms/ErrorMessage";
import * as v from "valibot";
import { figureSchema } from "@/lib/figure";

export const EditFigureModal = ({
  open,
  onCancel,
  onOk,
  onDelete,
  value: defaultValue,
}: {
  open: boolean;
  value?: FigureControlValue;
  onCancel: () => unknown;
  onOk: (value: FigureControlValue) => unknown;
  onDelete: () => unknown;
}) => {
  const { value, errors, fieldProps, setValue, onSubmit } = useForm<
    typeof figureSchema,
    FigureControlValue
  >({
    defaultValue: defaultValue ?? {},
    onSubmit: (value) => {
      onOk(value);
    },
    validate: (val) => {
      return mapValibotResult(v.safeParse(figureSchema, val));
    },
  });

  return (
    <Modal open={open} onClose={onCancel}>
      <ModalDialog sx={{ width: "70vw" }}>
        <ModalClose />
        <Typography>Upravit obrázek</Typography>

        <form onSubmit={onSubmit}>
          <div>
            <FileInput
              url={value.url}
              error={errors?.blob}
              onChange={(blob) =>
                setValue((s) => ({
                  ...s,
                  url: URL.createObjectURL(blob),
                  blob,
                }))
              }
            />
          </div>

          <FormControl error={!!errors?.caption}>
            <FormLabel>Popisek fotky</FormLabel>
            <Input {...fieldProps<string>(["caption"])} />
            <ErrorMessage>{errors?.caption}</ErrorMessage>
          </FormControl>

          <div className="flex justify-between">
            <Button onClick={onDelete} color="danger">
              Smazat obrázek
            </Button>

            <Button type="submit" fullWidth sx={{ width: "50%" }}>
              Uložit
            </Button>
          </div>
        </form>
      </ModalDialog>
    </Modal>
  );
};
