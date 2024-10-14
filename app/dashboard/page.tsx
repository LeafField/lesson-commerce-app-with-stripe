import React from "react";
import { createClient } from "../server/supabase";
import SubscriptionManagementButton from "../../components/checkout/SubscriptionManagementButton";

const getProfileData = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;
  if (!userId) throw new Error("userId not found");
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();
  return profile;
};

const Dashboard = async () => {
  const profile = await getProfileData();
  console.log(profile);
  return (
    <div className="mx-auto w-full max-w-3xl px-8 py-16">
      <h1 className="mb-6 text-3xl font-bold">ユーザー管理ダッシュボード</h1>
      <div className="mb-3">
        {profile?.is_subscribed
          ? `プラン加入中:${profile.interval}`
          : "プラン未加入"}
      </div>
      <SubscriptionManagementButton />
    </div>
  );
};

export default Dashboard;
