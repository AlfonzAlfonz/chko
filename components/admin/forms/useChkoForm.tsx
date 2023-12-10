import { ChkoTable, chkoScheme } from "@/lib/chko";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import * as v from "valibot";
import { DeepPartial, mapValibotResult, useForm } from "./useForm";
import { upload } from "./utils";

export const useChkoForm = ({
  initialValue,
  onSubmit: save,
}: {
  initialValue?: ChkoTable;
  onSubmit?: (chko: ChkoTable) => Promise<ChkoTable>;
}) => {
  const { id } = useParams() ?? {};
  const router = useRouter();
  const [state, setState] = useState<"posting" | "ready">("ready");
  const form = useForm<typeof chkoScheme, DeepPartial<ChkoTable>>({
    defaultValue: initialValue ?? emptyChko,
    validate: (val) => mapValibotResult(v.safeParse(chkoScheme, val)),
    onSubmit: async (v) => {
      setState("posting");

      if (!save) return;

      const prefix = "chko/" + initialValue?.id;

      const figures = await Promise.all(
        v.data.figures
          .filter(Boolean)
          .map((c, i) => upload(`${prefix}/char/${i}`, c)) ?? []
      );
      const payload = {
        ...v,
        id: v.id!,
        data: {
          ...v.data,
          figures,
        },
      } satisfies ChkoTable;

      const insertedResult = await save(payload);

      if (insertedResult) {
        if (!id) {
          router.push(`/admin/chko/${insertedResult.id}`);
        } else {
          form.setValue(insertedResult);
        }
        alert("Uloženo");
        setState("ready");
      } else {
        setState("ready");
        alert("Nebylo mozne ulozit chko");
      }
    },
  });

  return { ...form, state };
};

const emptyChko: DeepPartial<ChkoTable> = {
  name: "",
  data: {
    list1Title: "",
    list1: [],
    list2Title: "",
    list2: [],
  },
};
