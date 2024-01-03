import { ObecForm } from "@/components/admin/forms/ObecForm";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { db } from "@/lib/db";
import { ObecTable } from "@/lib/obec";
import { Container } from "@mui/joy";
import { notFound } from "next/navigation";

const getData = async (id: number) => {
  if (!id) return undefined;

  const result = await db
    .selectFrom("cities")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
  return result;
};

const ObecDetail = async ({ params }: { params: { id: string } }) => {
  const data = await getData(+params.id);

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
      <AdminHeader>{data.metadata.name}</AdminHeader>
      <Container>
        <ObecForm value={data} onSubmit={saveData} />
      </Container>
    </AdminLayout>
  );
};

export default ObecDetail;
