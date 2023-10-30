"use client";

import {
  DeepPartial,
  mapValibotResult,
  useForm,
} from "@/components/admin/useForm";
import { FigureData, ObecData, ObecTable } from "@/lib/db";
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
import { FigureControl, FigureControlValue } from "./FigureControl";

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
        : [undefined, val as v.Output<typeof obecScheme>];
    },
    onSubmit: async (v) => {
      setState("posting");
      const {
        data: {
          cover: { blob: coverBlob, ...cover },
          characteristics,
          buildings,
          ...data
        },
        ...value
      } = v;

      if (!save) return;

      const prefix = "obec/" + initialValue?.id;

      const [coverImg, cImages, bImages] = await Promise.all([
        coverBlob && upload(prefix + "/cover", coverBlob),
        Promise.all(
          characteristics.map(
            (c, i) => c?.blob && upload(`${prefix}/char/${i}`, c?.blob)
          )
        ),
        Promise.all(
          buildings.map(
            (b, i) => b?.blob && upload(`${prefix}/buildings/${i}`, b.blob)
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
          <div className="mt-8 flex">
            <Checkbox
              label={
                <>
                  Publikovat obec
                  <br />
                  <i>
                    (Pokud je pole zaškrtnuté bude obec viditelná na stránce)
                  </i>
                </>
              }
              {...fieldProps<string>(["published"])}
            />
            <ErrorMessage>{errors?.metadata?.name}</ErrorMessage>
          </div>
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

        <div className="px-12 flex flex-col gap-4">
          <FigureControl
            {...fieldProps<FigureControlValue>([
              "data",
              "characteristics",
              "0",
            ])}
          />
          <div className="flex gap-4">
            <div className="flex-1">
              <FigureControl
                {...fieldProps<FigureControlValue>([
                  "data",
                  "characteristics",
                  "1",
                ])}
              />
            </div>
            <div className="flex-1">
              <FigureControl
                {...fieldProps<FigureControlValue>([
                  "data",
                  "characteristics",
                  "2",
                ])}
              />
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <Typography level="h3">
          Přítomnost památkově chráněných objektů
        </Typography>

        <div className="px-12 flex flex-col gap-4">
          <FigureControl
            {...fieldProps<FigureControlValue>(["data", "buildings", "0"])}
          />

          <FigureControl
            {...fieldProps<FigureControlValue>(["data", "buildings", "1"])}
          />
          <FigureControl
            {...fieldProps<FigureControlValue>(["data", "buildings", "2"])}
          />
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
              <th className="w-[calc(50%-24px)]">Text</th>
              <th className="w-[calc(50%-24px)]">Link</th>
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
                <td>
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

      <Card className="mb-16">
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

const required = v.minLength<string>(1, "Pole je povinné");
const figure = v.object({
  caption: v.string([required]),
  blob: v.union([v.undefinedType(), v.blob()]),
  url: v.string(),
  width: v.number(),
  height: v.number(),
});
const optionalFigure = v.union([v.undefinedType(), figure]);

const obecScheme = v.object({
  published: v.boolean(),
  metadata: v.object({
    name: v.string([required]),
    okres: v.string([required]),
    kraj: v.string([required]),
    position: v.tuple([
      v.coerce(v.number(), Number),
      v.coerce(v.number(), Number),
    ]),
    category: v.union([
      v.literal("I"),
      v.literal("II"),
      v.literal("III"),
      v.literal("IV"),
    ]),
    protectionZone: v.union([v.literal("A"), v.literal("B"), v.literal("C")]),
  }),
  data: v.object({
    foundedYear: v.number(),
    censuses: v.array(v.tuple([v.number(), v.number(), v.number()])),
    cover: figure,
    intro: v.string([required]),
    characteristics: v.tuple([optionalFigure, optionalFigure, optionalFigure]),
    buildings: v.tuple([optionalFigure, optionalFigure, optionalFigure]),
    terms: v.array(v.string([required])),
    links: v.array(
      v.tuple([
        v.string([required]),
        v.string([required, v.url("Špatný formát odkazu")]),
      ])
    ),
  }),
});

export const upload = async (path: string, file: Blob) => {
  console.log("????????");
  const size = await getImageSize(file);
  console.log(size);

  if (!size) throw new Error("Invalid file");

  const result = await put(path + file.name, file, {
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
    };

    img.onerror = () => {
      console.log("error img");
      resolve(null);
    };

    img.src = URL.createObjectURL(blob);
    // const reader = new FileReader();
    // console.log("start");

    // reader.addEventListener("load", () => {

    // });

    // reader.addEventListener("error", () => {
    //   console.log("error read");
    //   resolve(null);
    // });

    // reader.readAsDataURL(blob);
  });
