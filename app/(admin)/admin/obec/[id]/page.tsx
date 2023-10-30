import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ObecTable, db } from "@/lib/db";
import { Container } from "@mui/joy";
import { ObecForm } from "@/components/admin/ObecForm";

const getData = async (id: number) => {
  return await db
    .selectFrom("cities")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
};

const ObecDetail = async ({ params }: { params: { id: string } }) => {
  const data = await getData(+params.id);

  const saveData = async (obec: ObecTable) => {
    "use server";
    const { id } = await db
      .updateTable("cities")
      .where("id", "=", +params.id)
      .set(obec)
      .returning("id")
      .executeTakeFirstOrThrow();

  };

  return (
    <AdminLayout>
      <AdminHeader>{data?.metadata.name}</AdminHeader>
      <Container>
        <ObecForm value={data} onSubmit={saveData} />
      </Container>
    </AdminLayout>
  );
};

export default ObecDetail;
