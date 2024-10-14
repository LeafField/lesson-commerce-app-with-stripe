import Link from "next/link";
import React, { FC } from "react";
import { Button } from "./ui/button";
import AuthServerButton from "./auth/AuthServerButton";
import { createClient } from "../app/server/supabase";

const Header: FC = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getSession();

  return (
    <header className="flex border-b border-gray-200 px-6 py-4">
      <Link href={"/"}>
        <Button variant={"outline"}>ホーム</Button>
      </Link>
      {user.session && (
        <Link href={"/dashboard"} className="ml-4">
          <Button variant={"outline"}>ダッシュボード</Button>
        </Link>
      )}
      <Link href={"/pricing"} className="ml-4">
        <Button variant={"outline"}>価格</Button>
      </Link>
      <div className="ml-auto">
        <AuthServerButton />
      </div>
    </header>
  );
};

export default Header;
