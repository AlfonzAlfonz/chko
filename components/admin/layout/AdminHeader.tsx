import { Card, CardContent, Container, Typography } from "@mui/joy";
import { ReactNode } from "react";

export const AdminHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Card
      sx={{
        borderRadius: "0",
        borderLeft: "none",
        borderTop: "none",
        borderRight: "none",
      }}
    >
      <CardContent>
        <Container>
          <Typography level="h1" my={5} className="!flex justify-between">
            {children}
          </Typography>
        </Container>
      </CardContent>
    </Card>
  );
};
