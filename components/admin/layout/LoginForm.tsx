"use client";

import { Alert, Button, FormControl, FormLabel, Input } from "@mui/joy";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginForm = ({ authenticated }: { authenticated: boolean }) => {
  const router = useRouter();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (authenticated) {
      router.push("/admin");
    }
  }, [authenticated, router]);

  return (
    <form
      className="flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        signIn("credentials", {
          redirect: false,
          username: (form.elements.namedItem("username") as any).value,
          password: (form.elements.namedItem("password") as any).value,
        }).then((res) => {
          if (res?.ok) {
            // router.push("/admin");
            window.location.href = "/admin";
          } else {
            setError(res?.error!);
          }
        });
      }}
    >
      {error && (
        <Alert color="danger" className="mb-4">
          Neplatné přihlašovací údaje
        </Alert>
      )}

      <FormControl>
        <FormLabel>Přihlašovací jméno</FormLabel>
        <Input name="username" />
      </FormControl>
      <FormControl>
        <FormLabel>Heslo</FormLabel>
        <Input name="password" type="password" />
      </FormControl>
      <Button color="primary" type="submit" className="!mt-6">
        Přihlásit
      </Button>
    </form>
  );
};
