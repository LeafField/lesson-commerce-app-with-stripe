import React, { FC } from "react";
import { createClient } from "../../app/server/supabase";
import AuthClientButton from "./AuthClientButton";

const AuthServerButton: FC = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getSession();
  const session = user.session;
  return <AuthClientButton session={session} />;
};

export default AuthServerButton;
