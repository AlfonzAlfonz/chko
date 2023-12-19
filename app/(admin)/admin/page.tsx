import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { db } from "@/lib/db";
import { Button, Card, Container, Switch, Table } from "@mui/joy";
import Link from "next/link";

const getData = async () => {
  return await db
    .selectFrom("chkos")
    .select(["id", "name", "data", "published"])
    .execute();
};

const CityList = async () => {
  const cities = await getData();

  return (
    <AdminLayout>
      <AdminHeader>
        <div>Seznam CHKO</div>
        {/* <Link href={`/admin/chko/vytvorit`}>
          <Button size="lg">Přidat CHKO</Button>
        </Link> */}
      </AdminHeader>
      <Container>
        <Card className="mt-8">
          <Table borderAxis="xBetween" sx={{ whiteSpace: "nowrap" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Obec</th>
                <th>Publikováno</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cities.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>
                    <Switch checked={c.published} variant="outlined" readOnly />
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link href={`/admin/chko/${c.id}/list`}>
                      <Button component="div" size="sm">
                        Seznam obcí
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
