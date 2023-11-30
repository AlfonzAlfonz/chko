import logo from "@/public/static/logo.svg";
import { Card, CardContent } from "@mui/joy";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { LoginForm } from "@/components/admin/LoginForm";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

const Login = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f9f9f9]">
      <Card size="lg">
        <Image src={logo} alt="Logo" className="invert mb-7" />

        <CardContent className="space-y-2">
          <LoginForm authenticated={!!session} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
