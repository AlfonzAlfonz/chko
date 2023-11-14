import { AdminHeader } from "@/components/admin/AdminHeader";
import { ObecTable, db } from "@/lib/db";
import { Container } from "@mui/joy";
import { ObecForm } from "../../../../../components/admin/ObecForm";
import { AdminLayout } from "@/components/admin/AdminLayout";

const ObecDetail = async ({ params }: { params: { id: string } }) => {
  const saveData = async (obec: ObecTable) => {
    "use server";
    const { id } =
      (await db
        .insertInto("cities")
        .values(obec)
        .returning("id")
        .executeTakeFirst()) ?? {};

    return id;
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
