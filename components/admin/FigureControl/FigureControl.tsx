import { FigureData } from "@/lib/db";
import Edit from "@mui/icons-material/Edit";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  styled,
} from "@mui/joy";
import { Dispatch, SetStateAction, useState } from "react";
import * as v from "valibot";
import { ErrorMessage } from "../ErrorMessage";
import { DeepPartial, Errors, mapValibotResult, useForm } from "../useForm";
import { FileInput } from "./FileInput";
import { EditFigureModal } from "./EditFigureModal";

export type FigureControlValue = DeepPartial<FigureData> & { blob?: Blob };

interface Props {
  error?: Errors<FigureControlValue>;
  value: FigureControlValue;
  setValue: Dispatch<SetStateAction<FigureControlValue>>;
  onDelete: () => unknown;
}

export const FigureControl = ({ error, value, setValue, onDelete }: Props) => {
  const [state, setState] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      <FileInput
        error={!!error}
        url={value.url}
        onChange={(blob) =>
          setValue((s) => ({
            ...s,
            url: URL.createObjectURL(blob),
            blob,
          }))
        }
      />

      <div className="absolute top-3 right-3">
        <IconButton variant="solid" onClick={() => setState(true)}>
          <Edit />
        </IconButton>
      </div>
      <EditFigureModal
        open={state}
        onCancel={() => setState(false)}
        onOk={(value) => {
          setState(false);
          setValue(value);
        }}
        onDelete={() => {
          setState(false);
          onDelete();
        }}
        value={value}
      />
    </div>
  );
};

export const AddFigureControl = ({ setValue }: Pick<Props, "setValue">) => {
  return (
    <div className="relative min-w-[300px] h-full">
      <FileInput
        onChange={(blob) =>
          setValue((s) => ({
            ...s,
            url: URL.createObjectURL(blob),
            blob,
          }))
        }
      />
    </div>
  );
};
