import { AdminHeader } from "@/components/admin/AdminHeader";
import { ObecTable, db } from "@/lib/db";
import { Container } from "@mui/joy";
import { ObecForm } from "../[id]/ObecForm";
import { AdminLayout } from "@/components/admin/AdminLayout";

const ObecDetail = async ({ params }: { params: { id: string } }) => {
  const saveData = async (obec: ObecTable) => {
    "use server";
    await db
      .updateTable("cities")
      .where("id", "=", +params.id)
      .set(obec)
      .execute();
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
