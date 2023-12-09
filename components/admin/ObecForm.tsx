"use client";

import { DeepPartial, FieldProps } from "@/components/admin/useForm";
import { FigureData, ObecData, ObecTable } from "@/lib/db";
import Delete from "@mui/icons-material/Delete";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Stack,
  Table,
  Textarea,
  Typography,
} from "@mui/joy";
import { ComponentProps } from "react";
import { ErrorMessage } from "./ErrorMessage";
import {
  AddFigureControl,
  FigureControl,
  FigureControlValue,
} from "./FigureControl/FigureControl";
import { useObecForm } from "./useObecForm";

export const ObecForm = ({
  value: initialValue,
  onSubmit: save,
}: {
  value?: ObecTable;
  onSubmit?: (obec: ObecTable) => Promise<ObecTable>;
}) => {
  const { value, state, errors, fieldProps, onSubmit } = useObecForm({
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
          <FormControl className="flex-1" error={!!errors?.metadata?.name}>
            <FormLabel>Název obce</FormLabel>
            <Input {...fieldProps<string>(["metadata", "name"])} />
            <ErrorMessage>{errors?.metadata?.name}</ErrorMessage>
          </FormControl>
        </div>

        <div className="flex gap-4 w-full">
          <FormControl className="flex-1" error={!!errors?.metadata?.category}>
            <FormLabel>Kategorie sídla</FormLabel>
            <Select
              {...fieldProps(["metadata", "category"])}
              onChange={(_, v) =>
                fieldProps(["metadata", "category"]).setValue(v)
              }
            >
              <Option value="I">I</Option>
              <Option value="II">II</Option>
              <Option value="III">III</Option>
              <Option value="IV">IV</Option>
            </Select>
            <ErrorMessage>{errors?.metadata?.category}</ErrorMessage>
          </FormControl>

          <FormControl className="flex-1" error={!!errors?.metadata?.category}>
            <FormLabel>Pásmo ochrany</FormLabel>
            <Select
              {...fieldProps(["metadata", "protectionZone"])}
              onChange={(_, v) =>
                fieldProps(["metadata", "protectionZone"]).setValue(v)
              }
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
            </Select>
            <ErrorMessage>{errors?.metadata?.protectionZone}</ErrorMessage>
          </FormControl>
        </div>

        <div className="flex gap-4">
          <FormControl
            className="flex-1"
            error={!!errors?.metadata?.position?.[0]}
          >
            <FormLabel>Zeměpisná délka</FormLabel>
            <NumberInput
              placeholder="48.9441306"
              {...fieldProps<number>(["metadata", "position", "0"])}
            />
            <FormHelperText>
              Desetiné číslo s tečkou, v rozmezí 48.5 - 51
            </FormHelperText>
            <ErrorMessage>{errors?.metadata?.position?.[0]}</ErrorMessage>
          </FormControl>
          <FormControl
            className="flex-1"
            error={!!errors?.metadata?.position?.[0]}
          >
            <FormLabel>Zeměpisná šířka</FormLabel>
            <NumberInput
              placeholder="16.7348346"
              {...fieldProps<number>(["metadata", "position", "1"])}
            />
            <FormHelperText>
              Desetiné číslo s tečkou, v rozmezí 12 - 19
            </FormHelperText>
            <ErrorMessage>{errors?.metadata?.position?.[1]}</ErrorMessage>
          </FormControl>
        </div>
      </Card>

      <Card>
        <Typography level="h3">Tabulka obce</Typography>

        <div className="flex gap-4 w-full">
          <FormControl className="flex-1" error={!!errors?.metadata?.okres}>
            <FormLabel>Okres</FormLabel>
            <Input fullWidth {...fieldProps<string>(["metadata", "okres"])} />
            <ErrorMessage>{errors?.metadata?.okres}</ErrorMessage>
          </FormControl>

          <FormControl className="flex-1" error={!!errors?.metadata?.kraj}>
            <FormLabel>Kraj</FormLabel>
            <Input fullWidth {...fieldProps<string>(["metadata", "kraj"])} />
            <ErrorMessage>{errors?.metadata?.kraj}</ErrorMessage>
          </FormControl>
        </div>

        <FormControl error={!!errors?.data?.foundedYear}>
          <FormLabel>Obec založena</FormLabel>
          <NumberInput {...fieldProps<number>(["data", "foundedYear"])} />
          <ErrorMessage>{errors?.data?.foundedYear}</ErrorMessage>
        </FormControl>

        <FormLabel>Počet obyvatel / domů</FormLabel>
        <div className="flex gap-4 w-full items-center">
          <FormControl className="flex-1" error={!!errors?.metadata?.okres}>
            <NumberInput
              fullWidth
              startDecorator="V roce"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<number>(["data", "censuses", "0", "0"])}
            />
            <ErrorMessage>{errors?.data?.censuses?.[0]?.[0]}</ErrorMessage>
          </FormControl>
          <FormControl className="flex-1" error={!!errors?.metadata?.okres}>
            <NumberInput
              fullWidth
              endDecorator="obyvatel"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<number>(["data", "censuses", "0", "1"])}
            />
            <ErrorMessage>{errors?.data?.censuses?.[0]?.[1]}</ErrorMessage>
          </FormControl>
          <div className="mb-7">/</div>
          <FormControl className="flex-1" error={!!errors?.metadata?.kraj}>
            <NumberInput
              fullWidth
              endDecorator="domů"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<number>(["data", "censuses", "0", "2"])}
            />
            <ErrorMessage>{errors?.data?.censuses?.[0]?.[2]}</ErrorMessage>
          </FormControl>
        </div>
        <div className="flex gap-4 w-full items-center">
          <FormControl className="flex-1" error={!!errors?.metadata?.okres}>
            <NumberInput
              fullWidth
              startDecorator="V roce"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<number>(["data", "censuses", "1", "0"])}
            />
            <ErrorMessage>{errors?.data?.censuses?.[1]?.[0]}</ErrorMessage>
          </FormControl>
          <FormControl className="flex-1" error={!!errors?.metadata?.okres}>
            <NumberInput
              fullWidth
              endDecorator="obyvatel"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<number>(["data", "censuses", "1", "1"])}
            />
            <ErrorMessage>{errors?.data?.censuses?.[1]?.[1]}</ErrorMessage>
          </FormControl>
          <div className="mb-7">/</div>
          <FormControl className="flex-1" error={!!errors?.metadata?.kraj}>
            <NumberInput
              fullWidth
              endDecorator="domů"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<number>(["data", "censuses", "1", "2"])}
            />
            <ErrorMessage>{errors?.data?.censuses?.[1]?.[2]}</ErrorMessage>
          </FormControl>
        </div>
      </Card>

      <Card>
        <Typography level="h3">Úvod</Typography>

        <FormLabel component="div">Úvodní foto</FormLabel>
        <div className="px-12 flex flex-col gap-4">
          <FigureControl
            {...fieldProps<FigureControlValue>(["data", "cover"])}
            error={errors?.data?.cover}
            onDelete={() => fieldProps(["data", "cover"]).setValue(undefined)}
          />
        </div>

        <FormControl error={!!errors?.data?.intro}>
          <FormLabel>Popis vesnice</FormLabel>
          <Textarea {...fieldProps<string>(["data", "intro"])} />
          <ErrorMessage>{errors?.data?.intro}</ErrorMessage>
        </FormControl>
      </Card>

      <Card>
        <Typography level="h3">Převažující charakter výstavby</Typography>

        <div className="flex gap-4 w-full overflow-scroll">
          {fieldProps(
            ["data", "characteristics"],
            ({ value, setValue }: FieldProps<DeepPartial<FigureData>[]>) => (
              <>
                {value?.map((x, i) => (
                  <FigureControl
                    key={i}
                    {...fieldProps(
                      ["data", "characteristics", i.toString()],
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
      <Card>
        <Typography level="h3">
          Přítomnost památkově chráněných objektů
        </Typography>

        <div className="flex gap-4 w-full overflow-scroll">
          {fieldProps(
            ["data", "buildings"],
            ({ value, setValue }: FieldProps<DeepPartial<FigureData>[]>) => (
              <>
                {value?.map((x, i) => (
                  <FigureControl
                    key={i}
                    {...fieldProps(
                      ["data", "buildings", i.toString()],
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

      <Card>
        <Typography level="h3">
          Podmínky ochrany a doplňující doporučení
        </Typography>

        <div className="flex flex-col">
          <FormLabel>Podmínky</FormLabel>
          <div className="flex flex-col gap-3">
            {value.data?.terms?.map((t, i) => (
              <Textarea
                key={i}
                {...fieldProps<string>(["data", "terms", i])}
                startDecorator={<div className="px-2">{i + 1}.</div>}
                endDecorator={
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <IconButton
                        color="neutral"
                        disabled={i === 0}
                        onClick={() =>
                          fieldProps<ObecData["terms"]>([
                            "data",
                            "terms",
                          ]).setValue((s) => reorder(s, i, i - 1))
                        }
                      >
                        <ArrowUpward />
                      </IconButton>
                      <IconButton
                        color="neutral"
                        disabled={i === value.data?.terms?.length}
                        onClick={() =>
                          fieldProps<ObecData["terms"]>([
                            "data",
                            "terms",
                          ]).setValue((s) => reorder(s, i, i + 1))
                        }
                      >
                        <ArrowDownward />
                      </IconButton>
                    </div>
                    <IconButton
                      color="danger"
                      onClick={() =>
                        fieldProps<ObecData["terms"]>([
                          "data",
                          "terms",
                        ]).setValue((s) => s.filter((_, ii) => i !== ii))
                      }
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

          {(value.data?.terms?.length ?? 0) <= 8 && (
            <Button
              onClick={() =>
                fieldProps<ObecData["terms"]>(["data", "terms"]).setValue(
                  (s) => [...s, ""]
                )
              }
              size="sm"
              color="neutral"
              className="self-center !mt-6"
            >
              Přidat podmínku
            </Button>
          )}
        </div>
      </Card>

      <Card>
        <Typography level="h3">Odkazy</Typography>
        <Table>
          <tbody>
            <tr>
              <th>Text</th>
              <th>Link</th>
              <th className="w-[48px]"></th>
            </tr>
            {value.data?.links?.map(([text, href] = [], i) => (
              <tr key={i}>
                <td>
                  <Input
                    key={i}
                    {...fieldProps<string>(["data", "links", i, 0])}
                    slotProps={{
                      root: { className: "!flex-row" },
                      endDecorator: { className: "!my-0" },
                    }}
                  />
                  <ErrorMessage>{errors?.data?.links?.[i]?.[0]}</ErrorMessage>
                </td>
                <td>
                  <Input
                    key={i}
                    {...fieldProps<string>(["data", "links", i, 1])}
                    slotProps={{
                      root: { className: "!flex-row" },
                      endDecorator: { className: "!my-0" },
                    }}
                  />
                  <ErrorMessage>{errors?.data?.links?.[i]?.[1]}</ErrorMessage>
                </td>
                <td className="align-top">
                  <IconButton
                    color="danger"
                    onClick={() =>
                      fieldProps<ObecData["links"]>(["data", "links"]).setValue(
                        (s) => s.filter((_, ii) => i !== ii)
                      )
                    }
                  >
                    <Delete />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          onClick={() =>
            fieldProps<ObecData["links"]>(["data", "links"]).setValue((s) => [
              ...s,
              ["", ""],
            ])
          }
          size="sm"
          color="neutral"
          className="self-center !mt-6"
        >
          Přidat odkaz
        </Button>
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

const NumberInput = (
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

const reorder = <T,>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed!);

  return result;
};
