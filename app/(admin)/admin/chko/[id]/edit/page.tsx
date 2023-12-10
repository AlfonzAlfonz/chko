import { ChkoForm } from "@/components/admin/forms/ChkoForm";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { ChkoTable } from "@/lib/chko";
import { db } from "@/lib/db";
import { Container } from "@mui/joy";

const getData = async (id: number) => {
  const result = await db
    .selectFrom("chkos")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
  return result;
};

const ChkoDetail = async ({ params }: { params: { id: string } }) => {
  const data = await getData(+params.id);

  const saveData = async (chko: ChkoTable) => {
    "use server";
    return await db
      .updateTable("chkos")
      .where("id", "=", +params.id)
      .set(chko)
      .returningAll()
      .executeTakeFirstOrThrow();
  };

  return (
    <AdminLayout>
      <AdminHeader>{data?.name}</AdminHeader>
      <Container>
        <ChkoForm value={data} onSubmit={saveData} />
      </Container>
    </AdminLayout>
  );
};

export default ChkoDetail;
