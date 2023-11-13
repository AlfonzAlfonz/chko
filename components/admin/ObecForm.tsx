"use client";

import {
  DeepPartial,
  FieldProps,
  mapValibotResult,
  useForm,
} from "@/components/admin/useForm";
import { FigureData, ObecData, ObecTable } from "@/lib/db";
import { obecScheme } from "@/lib/schemas";
import Delete from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  Checkbox,
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
import { put } from "@vercel/blob";
import { useState } from "react";
import getSlug from "speakingurl";
import * as v from "valibot";
import { ErrorMessage } from "./ErrorMessage";
import {
  AddFigureControl,
  FigureControl,
  FigureControlValue,
} from "./FigureControl/FigureControl";

export const ObecForm = ({
  value: initialValue,
  onSubmit: save,
}: {
  value?: ObecTable;
  onSubmit?: (obec: ObecTable) => Promise<void>;
}) => {
  const [state, setState] = useState<"posting" | "ready">("ready");
  const { value, errors, fieldProps, onSubmit } = useForm<
    typeof obecScheme,
    DeepPartial<ObecTable>
  >({
    defaultValue: initialValue ?? emptyObec,
    validate: (val) => {
      return val.published
        ? mapValibotResult(v.safeParse(obecScheme, val))
        : [undefined, val as any as v.Output<typeof obecScheme>];
    },
    onSubmit: async (v) => {
      setState("posting");
      const {
        data: { cover, characteristics, buildings, ...data },
        ...value
      } = v;

      if (!save) return;

      const prefix = "obec/" + initialValue?.id;

      const [coverImg, cImages, bImages] = await Promise.all([
        cover.blob && upload(prefix + "/cover", cover),
        Promise.all(
          characteristics.map(
            (c, i) => c?.blob && upload(`${prefix}/char/${i}`, c)
          )
        ),
        Promise.all(
          buildings.map(
            (b, i) => b?.blob && upload(`${prefix}/buildings/${i}`, b)
          )
        ),
      ]);

      await save({
        ...value,
        id: value.id!,
        slug: getSlug(value.metadata.name),
        published: false,
        data: {
          ...data,
          cover: {
            ...cover,
            ...coverImg,
          },
          characteristics: characteristics.map((c, i) =>
            !c
              ? undefined
              : {
                  url: cImages[i]?.url ?? c?.url,
                  width: cImages[i]?.width ?? c?.width,
                  height: cImages[i]?.height ?? c?.height,
                  caption: c?.caption,
                }
          ) satisfies (FigureData | undefined)[] as any,
          buildings: buildings.map((b, i) =>
            !b
              ? undefined
              : {
                  url: bImages[i]?.url ?? b?.url,
                  width: bImages[i]?.width ?? b?.width,
                  height: bImages[i]?.height ?? b?.height,
                  caption: b?.caption,
                }
          ) satisfies (FigureData | undefined)[] as any,
        },
      });

      setState("ready");
      alert("Uloženo");
    },
  });

  value.data?.characteristics;

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
            <ErrorMessage>{errors?.metadata?.category}</ErrorMessage>
          </FormControl>
        </div>

        <div className="flex gap-4">
          <FormControl
            className="flex-1"
            error={!!errors?.metadata?.position?.[0]}
          >
            <FormLabel>Zeměpisná délka</FormLabel>
            <Input
              placeholder="48.9441306"
              {...fieldProps<string>(["metadata", "position", "0"])}
            />
            <FormHelperText>
              Desetiné číslo s tečkou, v rozmezí 45.5 - 51
            </FormHelperText>
            <ErrorMessage>{errors?.metadata?.position?.[0]}</ErrorMessage>
          </FormControl>
          <FormControl
            className="flex-1"
            error={!!errors?.metadata?.position?.[0]}
          >
            <FormLabel>Zeměpisná šířka</FormLabel>
            <Input
              placeholder="16.7348346"
              {...fieldProps<string>(["metadata", "position", "1"])}
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
          <Input {...fieldProps<string>(["data", "foundedYear"])} />
          <ErrorMessage>{errors?.data?.foundedYear}</ErrorMessage>
        </FormControl>

        <FormLabel>Počet obyvatel / domů</FormLabel>
        <div className="flex gap-4 w-full items-center">
          <FormControl className="flex-1" error={!!errors?.metadata?.okres}>
            <Input
              fullWidth
              type="number"
              startDecorator="V roce"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<string>(["data", "censuses", "0", "0"])}
            />
            <ErrorMessage>{errors?.metadata?.okres}</ErrorMessage>
          </FormControl>
          <FormControl className="flex-1" error={!!errors?.metadata?.okres}>
            <Input
              fullWidth
              type="number"
              endDecorator="obyvatel"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<string>(["data", "censuses", "0", "1"])}
            />
            <ErrorMessage>{errors?.metadata?.okres}</ErrorMessage>
          </FormControl>
          <div className="mb-7">/</div>
          <FormControl className="flex-1" error={!!errors?.metadata?.kraj}>
            <Input
              fullWidth
              type="number"
              endDecorator="domů"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<string>(["data", "censuses", "0", "2"])}
            />
            <ErrorMessage>{errors?.metadata?.kraj}</ErrorMessage>
          </FormControl>
        </div>
        <div className="flex gap-4 w-full items-center">
          <FormControl className="flex-1" error={!!errors?.metadata?.okres}>
            <Input
              fullWidth
              type="number"
              startDecorator="V roce"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<string>(["data", "censuses", "1", "0"])}
            />
            <ErrorMessage>{errors?.metadata?.okres}</ErrorMessage>
          </FormControl>
          <FormControl className="flex-1" error={!!errors?.metadata?.okres}>
            <Input
              fullWidth
              type="number"
              endDecorator="obyvatel"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<string>(["data", "censuses", "1", "1"])}
            />
            <ErrorMessage>{errors?.metadata?.okres}</ErrorMessage>
          </FormControl>
          <div className="mb-7">/</div>
          <FormControl className="flex-1" error={!!errors?.metadata?.kraj}>
            <Input
              fullWidth
              type="number"
              endDecorator="domů"
              slotProps={{ input: { style: { appearance: "textfield" } } }}
              {...fieldProps<string>(["data", "censuses", "1", "2"])}
            />
            <ErrorMessage>{errors?.metadata?.kraj}</ErrorMessage>
          </FormControl>
        </div>
      </Card>

      <Card>
        <Typography level="h3">Úvod</Typography>

        <FormLabel component="div">Úvodní foto</FormLabel>
        <div className="px-12 flex flex-col gap-4">
          <FigureControl
            {...fieldProps<FigureControlValue>(["data", "cover"])}
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
                {value.map((x, i) => (
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
                {value.map((x, i) => (
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
                  <div>
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
        <div className="flex">
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
        <ErrorMessage>{errors?.metadata?.name}</ErrorMessage>

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

const emptyObec: DeepPartial<ObecTable> = {
  metadata: {},
  data: {
    censuses: [
      [1869, undefined, undefined],
      [2011, undefined, undefined],
    ],
  },
};

export const upload = async (
  path: string,
  { blob, url }: FigureControlValue
) => {
  if (!blob) return;

  url && URL.revokeObjectURL(url);

  const size = await getImageSize(blob);

  if (!size) throw new Error("Invalid file");

  const result = await put(path + blob.name, blob, {
    access: "public",
    token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
  });
  return {
    url: result.url,
    width: size[0],
    height: size[1],
  };
};

const getImageSize = (blob: Blob) =>
  new Promise<[number, number] | null>((resolve) => {
    console.log("loaded");
    const img = document.createElement("img");

    img.onload = () => {
      resolve([img.naturalWidth, img.naturalHeight]);
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      console.log("error img");
      resolve(null);
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(blob);
  });
