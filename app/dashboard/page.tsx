import React from "react";
import { createClient } from "../server/supabase";

const getProfileData = async () => {
  const supabase = createClient();
  const {} = await supabase.from("profile").select("*").single();
};

const Dashboard = () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-8 py-16">
      <h1 className="mb-6 text-3xl font-bold">ユーザー管理ダッシュボード</h1>
      <div>
        <div>プラン加入中です。</div>
        <button>サブスクリプション管理</button>
      </div>
    </div>
  );
};

export default Dashboard;
