"use client";
import React, { FC, useCallback } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SubscriptionManagementButton: FC = () => {
  const router = useRouter();

  const loadPortal = useCallback(async () => {
    const res = await fetch("/api/portal");
    const data = await res.json();
    router.push(data.url);
  }, [router]);
  return (
    <div>
      <Button onClick={loadPortal}>サブスクリプション管理</Button>
    </div>
  );
};

export default SubscriptionManagementButton;
