import React, { FC } from "react";
import { createClient } from "../../app/server/supabase";
import AuthClientButton from "./AuthClientButton";

const AuthServerButton: FC = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return <AuthClientButton session={data.user} />;
};

export default AuthServerButton;
