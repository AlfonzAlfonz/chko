"use client";

import { Button } from "@mui/joy";
import { signOut } from "next-auth/react";

export const LoginMenu = ({ username }: { username?: string }) => {
  return (
    <div className="flex items-center py-2">
      <div className="flex-1">{username}</div>
      <Button
        color="neutral"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Odhlásit
      </Button>
    </div>
  );
};
