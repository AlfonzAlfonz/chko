import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { db } from "@/lib/db";
import { Button, Card, Container, Table } from "@mui/joy";
import Link from "next/link";

const getData = async () => {
  return await db.selectFrom("cities").select(["id", "metadata"]).execute();
};

const CityList = async () => {
  const cities = await getData();

  return (
    <AdminLayout>
      <AdminHeader>
        <div>Obce</div>
        <Link href="/admin/obec/vytvorit">
          <Button size="lg">Přidat obec</Button>
        </Link>
      </AdminHeader>
      <Container>
        <Card className="mt-8">
          <Table borderAxis="xBetween" sx={{ whiteSpace: "nowrap" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Obec</th>
                <th>Okres</th>
                <th>CHKO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cities.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.metadata.name}</td>
                  <td>{c.metadata.okres}</td>
                  <td>CHKO Český kras</td>
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

export default CityList;
