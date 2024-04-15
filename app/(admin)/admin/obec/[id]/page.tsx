import { ObecForm } from "@/components/admin/forms/ObecForm";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { db } from "@/lib/db";
import { ObecTable } from "@/lib/obec";
import { Chip, Container } from "@mui/joy";
import { notFound } from "next/navigation";

const getData = async (id: number) => {
  if (!id) return { result: undefined, chkoName: undefined };

  const result = await db
    .selectFrom("cities")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
  const chkoName = await db
    .selectFrom("chkos")
    .where("id", "=", result!.chko)
    .select("chkos.name")
    .executeTakeFirst();

  return { result, chkoName };
};

const ObecDetail = async ({ params }: { params: { id: string } }) => {
  const { result: data, chkoName } = await getData(+params.id);

  if (!data) notFound();

  const saveData = async (obec: ObecTable) => {
    "use server";
    return await db
      .updateTable("cities")
      .where("id", "=", +params.id)
      .set(obec)
      .returningAll()
      .executeTakeFirstOrThrow();
  };

  return (
    <AdminLayout>
      <AdminHeader>
        <div className="w-full flex gap-4 justify-between">
          <span>{data.metadata.name}</span>
          {chkoName?.name && <Chip color="success">CHKO: {chkoName.name}</Chip>}
        </div>
      </AdminHeader>
      <Container>
        <ObecForm value={data} onSubmit={saveData} />
      </Container>
    </AdminLayout>
  );
};

export default ObecDetail;
