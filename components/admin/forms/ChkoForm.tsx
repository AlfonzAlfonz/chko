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
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import {
  AddFigureControl,
  FigureControl,
} from "../FigureControl/FigureControl";
import { ErrorMessage } from "./ErrorMessage";
import { InfoButton } from "../InfoButton";

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
            <FormLabel>Název CHKO</FormLabel>
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

        <StringList
          {...fieldProps(["data", "list1"])}
          label="CO JE TYPICKÉ?"
          add="Přidat položku"
          maxLength={4}
        />

        <StringList
          {...fieldProps(["data", "list2"])}
          label="NAVAZUJEME NA TRADICE"
          add="Přidat položku"
          maxLength={4}
        />
      </Card>

      <Card>
        <Typography level="h3" className="!flex justify-between">
          <span>Fotografie</span>
          <InfoButton title="Fotografie nahrávejte v poměru 1:1" />
        </Typography>

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
                {(value?.length ?? 0) < 4 && (
                  <AddFigureControl
                    setValue={(s) => setValue([...value, ...s].slice(0, 5))}
                  />
                )}
              </>
            )
          )}
        </div>
      </Card>

      <Card>
        <Typography level="h3" className="!flex justify-between">
          Kontakt
        </Typography>

        <div className="flex gap-4 w-full">
          <FormControl className="flex-1" error={!!errors?.data?.contact}>
            <FormLabel>Kontaktní údaje správy CHKO</FormLabel>
            <Textarea
              {...fieldProps<string>(["data", "contact"])}
              minRows={6}
            />
            <ErrorMessage>{errors?.data?.contact}</ErrorMessage>
          </FormControl>
        </div>
      </Card>

      <Card className="mb-16 flex flex-col items-center">
        <div className="flex">
          <Checkbox
            label={
              <>
                Publikovat CHKO
                <br />
              </>
            }
            {...fieldProps<string>(["published"])}
          />
        </div>
        <i>(Pokud je pole zaškrtnuté bude obec viditelná na stránce)</i>
        <ErrorMessage>{errors?.published}</ErrorMessage>

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
