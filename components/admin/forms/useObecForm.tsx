import { ObecTable, obecScheme } from "@/lib/obec";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import getSlug from "speakingurl";
import * as v from "valibot";
import { DeepPartial, mapValibotResult, useForm } from "./useForm";
import { upload } from "./utils";

export const useObecForm = ({
  initialValue,
  onSubmit: save,
}: {
  initialValue?: ObecTable;
  onSubmit?: (obec: ObecTable) => Promise<ObecTable>;
}) => {
  const { id } = useParams() ?? {};
  const router = useRouter();
  const [state, setState] = useState<"posting" | "ready">("ready");
  const form = useForm<typeof obecScheme, DeepPartial<ObecTable>>({
    defaultValue: initialValue ?? emptyObec,
    validate: (val) => mapValibotResult(v.safeParse(obecScheme, val)),
    onSubmit: async (v) => {
      setState("posting");

      if (!save) return;

      const prefix = "obec/" + initialValue?.id;

      const [cover, characteristics, buildings] = await Promise.all([
        upload(prefix + "/cover", v.data.cover),
        Promise.all(
          v.data.characteristics
            .filter(Boolean)
            .map((c, i) => upload(`${prefix}/char/${i}`, c)) ?? []
        ),
        Promise.all(
          v.data.buildings
            .filter(Boolean)
            .map((b, i) => upload(`${prefix}/buildings/${i}`, b)) ?? []
        ),
      ]);

      const payload = {
        ...v,
        id: v.id!,
        slug: getSlug(v.metadata.name),
        data: {
          ...v.data,
          cover,
          characteristics,
          buildings,
        },
      } satisfies ObecTable;

      const insertedResult = await save(payload);

      if (insertedResult) {
        fetch(`/api/prerender-pdf/${insertedResult.id}`, {
          method: "HEAD",
        });

        if (!id) {
          router.push(`/admin/obec/${insertedResult.id}`);
        } else {
          form.setValue(insertedResult);
        }
        alert(
          "Uloženo. Změny se projeví do několika minut (tvorba pdf souboru může trvat až hodinu)."
        );
        setState("ready");
      } else {
        setState("ready");
        alert("Nebylo mozne ulozit obec");
      }
    },
  });

  return { ...form, state };
};

const emptyObec: DeepPartial<ObecTable> = {
  published: true,
  metadata: {
    position: [],
  },
  data: {
    censuses: [
      [1869, undefined, undefined],
      [2011, undefined, undefined],
    ],
    characteristics: [],
    buildings: [],
    terms: [],
    termsButton: [],
    links: [],
  },
};
