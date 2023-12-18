import { ChkoForm } from "@/components/admin/forms/ChkoForm";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { ChkoTable } from "@/lib/chko";
import { db } from "@/lib/db";
import { Container } from "@mui/joy";

const ChkoDetail = async ({ params }: { params: { id: string } }) => {
  const saveData = async (chko: ChkoTable) => {
    "use server";
    return await db
      .insertInto("chkos")
      .values(chko)
      .returningAll()
      .executeTakeFirstOrThrow();
  };

  return (
    <AdminLayout>
      <AdminHeader>Vytvořit CHKO</AdminHeader>
      <Container>
        <ChkoForm onSubmit={saveData} />
      </Container>
    </AdminLayout>
  );
};

export default ChkoDetail;
