import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { db } from "@/lib/db";
import { Button, Card, Container, Switch, Table } from "@mui/joy";
import Link from "next/link";

const getData = async (chko: number) => {
  const [obecs, data] = await Promise.all([
    db
      .selectFrom("cities")
      .select(["id", "metadata", "published"])
      .where("chko", "=", chko)
      .execute(),
    db
      .selectFrom("chkos")
      .select(["id", "name", "published", "data"])
      .where("id", "=", chko)
      .executeTakeFirstOrThrow(),
  ]);
  return {
    obecs,
    chko: data,
  };
};

const ObecList = async ({ params: { id } }: { params: { id: string } }) => {
  const { obecs, chko } = await getData(+id);

  return (
    <AdminLayout>
      <AdminHeader>
        <div>{chko.name}</div>
        <div className="flex gap-6">
          <Link href={`/admin/obec/vytvorit?chko=${id}`}>
            <Button size="lg">Přidat obec</Button>
          </Link>
          <Link href={`/admin/chko/${id}/edit`}>
            <Button size="lg" variant="outlined">
              Upravit CHKO
            </Button>
          </Link>
        </div>
      </AdminHeader>
      <Container>
        <Card className="mt-8">
          <Table borderAxis="xBetween" sx={{ whiteSpace: "nowrap" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Obec</th>
                <th>Okres</th>
                <th>Publikováno</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {obecs.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.metadata.name}</td>
                  <td>{c.metadata.okres}</td>
                  <td>
                    <Switch checked={c.published} variant="outlined" readOnly />
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link href={`/admin/obec/${c.id}`}>
                      <Button component="div" size="sm">
                        Upravit
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </AdminLayout>
  );
};

export default ObecList;
