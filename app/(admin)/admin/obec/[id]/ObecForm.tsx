"use client";

import { useForm } from "@/components/admin/useForm";
import { ObecData, ObecTable } from "@/lib/db";
import Delete from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Table,
  Textarea,
  Typography,
} from "@mui/joy";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import * as v from "valibot";

export const ObecForm = ({
  value: initialValue,
  onSubmit: save,
}: {
  value?: ObecTable;
  onSubmit?: (obec: ObecTable) => Promise<unknown>;
}) => {
  const { value, errors, fieldProps, onSubmit } = useForm({
    defaultValue: initialValue ?? (emptyObec as ObecTable),
    scheme: obecScheme,
    onSubmit: async (v) => {
      await save?.(v);
      alert("Uloženo");
    },
  });

  return (
    <Stack className="mt-8" gap={4}>
      <Card>
        <Typography level="h3">Obecné info</Typography>

        <FormControl error={!!errors?.metadata?.name}>
          <FormLabel>Název obce</FormLabel>
          <Input {...fieldProps<string>(["metadata", "name"])} />
          <ErrorMessage>{errors?.metadata?.name}</ErrorMessage>
        </FormControl>

        <FormControl error={!!errors?.metadata?.okres}>
          <FormLabel>Okres</FormLabel>
          <Input {...fieldProps<string>(["metadata", "okres"])} />
          <ErrorMessage>{errors?.metadata?.okres}</ErrorMessage>
        </FormControl>

        <FormControl error={!!errors?.metadata?.kraj}>
          <FormLabel>Kraj</FormLabel>
          <Input {...fieldProps<string>(["metadata", "kraj"])} />
          <ErrorMessage>{errors?.metadata?.kraj}</ErrorMessage>
        </FormControl>

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
        <Typography level="h3">Obsah</Typography>

        <FormControl error={!!errors?.data?.foundedYear}>
          <FormLabel>Obec založena</FormLabel>
          <Input {...fieldProps<string>(["data", "foundedYear"])} />
          <ErrorMessage>{errors?.data?.foundedYear}</ErrorMessage>
        </FormControl>

        <FormLabel>Domů v letech</FormLabel>
        {Object.entries(value.data?.housesIn ?? {}).map(([year, numbers]) => (
          <>
            <Input
              startDecorator={<div>{year}:</div>}
              endDecorator={
                <IconButton
                  color="danger"
                  onClick={() =>
                    fieldProps<ObecData["housesIn"]>([
                      "data",
                      "housesIn",
                    ]).setValue(({ [year]: _, ...s }) => ({ ...s }))
                  }
                >
                  <Delete />
                </IconButton>
              }
              {...fieldProps<string>(["data", "housesIn", year])}
            />
            <ErrorMessage>{errors?.data?.foundedYear}</ErrorMessage>
          </>
        ))}
        <div className="flex justify-center">
          <Button
            size="sm"
            onClick={() =>
              fieldProps<ObecData["housesIn"]>(["data", "housesIn"]).setValue(
                (s) => ({ ...s, [prompt("Rok?") ?? ""]: [] })
              )
            }
            color="neutral"
          >
            Přidat rok
          </Button>
        </div>

        <FormControl>
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

          <Button
            onClick={() =>
              fieldProps<ObecData["terms"]>(["data", "terms"]).setValue((s) => [
                ...s,
                "",
              ])
            }
            size="sm"
            color="neutral"
            className="self-center !mt-6"
          >
            Přidat podmínku
          </Button>
          <ErrorMessage>{errors?.data?.foundedYear}</ErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Odkazy</FormLabel>
          <Table>
            <tbody>
              <tr>
                <th className="w-[calc(50%-24px)]">Text</th>
                <th className="w-[calc(50%-24px)]">Link</th>
                <th className="w-[48px]"></th>
              </tr>
              {value.data?.links?.map(([text, href], i) => (
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
                        fieldProps<ObecData["links"]>([
                          "data",
                          "links",
                        ]).setValue((s) => s.filter((_, ii) => i !== ii))
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
          <ErrorMessage>{errors?.data?.foundedYear}</ErrorMessage>
        </FormControl>
      </Card>

      <Card className="mb-16">
        <Button
          size="lg"
          disabled={!!errors}
          className="self-center !px-20"
          onClick={onSubmit}
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

const emptyObec = {
  metadata: {},
  data: {},
};

type DeepPartial<T> = T extends
  | string
  | number
  | unknown[]
  | boolean
  | null
  | undefined
  ? T
  : { [K in keyof T]?: DeepPartial<T[K]> };

const ErrorMessage = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <FormHelperText
      className={twMerge("!text-chkored min-h-[18px] !text-xs", className)}
    >
      {children}
    </FormHelperText>
  );
};

const required = v.minLength<string>(1, "Pole je povinné");

const obecScheme = v.object({
  metadata: v.object({
    name: v.string([required]),
    okres: v.string([required]),
    kraj: v.string([required]),
    position: v.tuple([
      v.coerce(v.number(), Number),
      v.coerce(v.number(), Number),
    ]),
  }),
  data: v.object({
    foundedYear: v.number(),
    housesIn: v.record(v.array(v.number())),
    terms: v.array(v.string([required])),
    links: v.array(
      v.tuple([
        v.string([required]),
        v.string([required, v.url("Špatný formát odkazu")]),
      ])
    ),
  }),
});
