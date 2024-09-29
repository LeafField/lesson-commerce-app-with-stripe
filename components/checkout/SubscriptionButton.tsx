"use client";
import React from "react";
import { Button } from "../ui/button";

const SubscriptionButton = ({ planid }: { planid: string }) => {
  const processSubscription = async () => {
    const res = await fetch(`/api/subscription/${planid}`);
    const data = await res.json();
    console.log(data);
  };
  return (
    <Button onClick={async () => processSubscription()}>
      サブスクリプション契約をする
    </Button>
  );
};

export default SubscriptionButton;
