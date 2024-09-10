"use client";
import React, { FC, useCallback } from "react";
import { Button } from "../ui/button";
import { Session } from "@supabase/supabase-js";
import { createClient } from "../../app/client/supabase";
import { useRouter } from "next/navigation";

type Props = {
  session: Session | null;
};

const AuthClientButton: FC<Props> = ({ session }) => {
  const router = useRouter();
  const supabase = createClient();
  const handleSignIn = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }, [supabase]);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.refresh();
  }, [supabase, router]);

  return (
    <>
      {session ? (
        <Button onClick={handleSignOut}>ログアウト</Button>
      ) : (
        <Button onClick={handleSignIn}>サインイン</Button>
      )}
    </>
  );
};

export default AuthClientButton;
