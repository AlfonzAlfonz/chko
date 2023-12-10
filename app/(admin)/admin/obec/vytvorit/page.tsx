import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { Container } from "@mui/joy";
import { ObecForm } from "../../../../../components/admin/forms/ObecForm";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { db } from "@/lib/db";
import { ObecTable } from "@/lib/obec";

const ObecDetail = async ({ params }: { params: { id: string } }) => {
  const saveData = async (obec: ObecTable) => {
    "use server";
    return await db
      .insertInto("cities")
      .values(obec)
      .returningAll()
      .executeTakeFirstOrThrow();
  };

  return (
    <AdminLayout>
      <AdminHeader>Přidat obec</AdminHeader>
      <Container>
        <ObecForm onSubmit={saveData} />
      </Container>
    </AdminLayout>
  );
};

export default ObecDetail;
