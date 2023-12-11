"use client";

import { NumberInput } from "@/components/admin/forms/NumberInput";
import { StringList } from "@/components/admin/forms/StringList";
import { useChkoForm } from "@/components/admin/forms/useChkoForm";
import { DeepPartial, FieldProps } from "@/components/admin/forms/useForm";
import { ChkoTable } from "@/lib/chko";
import { FigureData } from "@/lib/figure";
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import {
  AddFigureControl,
  FigureControl,
} from "../FigureControl/FigureControl";
import { ErrorMessage } from "./ErrorMessage";

export const ChkoForm = ({
  value: initialValue,
  onSubmit: save,
}: {
  value?: ChkoTable;
  onSubmit?: (obec: ChkoTable) => Promise<ChkoTable>;
}) => {
  const { value, state, errors, fieldProps, onSubmit } = useChkoForm({
    initialValue,
    onSubmit: save,
  });

  return (
    <Stack
      className="mt-8"
      gap={4}
      sx={
        state === "posting"
          ? { userSelect: "none", pointerEvents: "none", opacity: 0.5 }
          : {}
      }
    >
      <Card>
        <Typography level="h3">Obecné informace</Typography>

        <div className="flex gap-4 w-full">
          <FormControl className="flex-1" error={!!errors?.name}>
            <FormLabel>Název obce</FormLabel>
            <Input {...fieldProps<string>(["name"])} />
            <ErrorMessage>{errors?.name}</ErrorMessage>
          </FormControl>
        </div>

        <div className="flex gap-4">
          <FormControl className="flex-1" error={!!errors?.data?.position?.[0]}>
            <FormLabel>Zeměpisná délka</FormLabel>
            <NumberInput
              placeholder="48.9441306"
              {...fieldProps<number>(["data", "position", "0"])}
            />
            <FormHelperText>
              Desetiné číslo s tečkou, v rozmezí 48.5 - 51
            </FormHelperText>
            <ErrorMessage>{errors?.data?.position?.[0]}</ErrorMessage>
          </FormControl>
          <FormControl className="flex-1" error={!!errors?.data?.position?.[0]}>
            <FormLabel>Zeměpisná šířka</FormLabel>
            <NumberInput
              placeholder="16.7348346"
              {...fieldProps<number>(["data", "position", "1"])}
            />
            <FormHelperText>
              Desetiné číslo s tečkou, v rozmezí 12 - 19
            </FormHelperText>
            <ErrorMessage>{errors?.data?.position?.[1]}</ErrorMessage>
          </FormControl>
        </div>
      </Card>

      <Card>
        <Typography level="h3">Obsah</Typography>

        <div className="flex gap-4 w-full">
          <FormControl className="flex-1" error={!!errors?.name}>
            <FormLabel>Nadpis 1</FormLabel>
            <Input {...fieldProps<string>(["data", "list1Title"])} />
            <ErrorMessage>{errors?.name}</ErrorMessage>
          </FormControl>
        </div>

        <StringList
          {...fieldProps(["data", "list1"])}
          label="List 1"
          add="Pridat"
          maxLength={4}
        />

        <div className="flex gap-4 w-full">
          <FormControl className="flex-1" error={!!errors?.name}>
            <FormLabel>Nadpis 2</FormLabel>
            <Input {...fieldProps<string>(["data", "list2Title"])} />
            <ErrorMessage>{errors?.name}</ErrorMessage>
          </FormControl>
        </div>

        <StringList
          {...fieldProps(["data", "list2"])}
          label="List 1"
          add="Pridat"
          maxLength={4}
        />
      </Card>

      <Card>
        <Typography level="h3">Dlazdice</Typography>

        <ErrorMessage>{errors?.data?.figures}</ErrorMessage>
        <div className="flex gap-4 w-full overflow-scroll">
          {fieldProps(
            ["data", "figures"],
            ({ value, setValue }: FieldProps<DeepPartial<FigureData>[]>) => (
              <>
                {value?.map((x, i) => (
                  <FigureControl
                    key={i}
                    {...fieldProps(
                      ["data", "figures", i.toString()],
                      (props: FieldProps<DeepPartial<FigureData>>) => ({
                        ...props,
                        onDelete: () => {
                          setValue(value.filter((_, ii) => i !== ii));
                        },
                      })
                    )}
                  />
                ))}
                <AddFigureControl
                  setValue={(s) => {
                    const fig =
                      typeof s === "function" ? s({ width: 0, height: 0 }) : s;
                    setValue([...value, fig]);
                  }}
                />
              </>
            )
          )}
        </div>
      </Card>

      <Card className="mb-16 flex flex-col items-center">
        {/* <div className="flex">
          <Checkbox
            label={
              <>
                Publikovat obec
                <br />
              </>
            }
            {...fieldProps<string>(["published"])}
          />
        </div>
        <i>(Pokud je pole zaškrtnuté bude obec viditelná na stránce)</i>
        <ErrorMessage>{errors?.metadata?.name}</ErrorMessage> */}

        <Button
          size="lg"
          disabled={!!errors && state === "ready"}
          className="self-center !px-20"
          onClick={onSubmit}
          startDecorator={state === "posting" && <CircularProgress />}
        >
          Uložit
        </Button>
        {!!errors && (
          <ErrorMessage className="self-center !text-md">
            Formulář obsahuje chyby, proto není možné ho uložit
          </ErrorMessage>
        )}
      </Card>
    </Stack>
  );
};