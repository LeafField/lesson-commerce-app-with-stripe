"use client";
import React from "react";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";

const SubscriptionButton = ({ planid }: { planid: string }) => {
  const processSubscription = async () => {
    const res = await fetch(`/api/subscription/${planid}`);
    const data = await res.json();

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <Button onClick={async () => processSubscription()}>
      サブスクリプション契約をする
    </Button>
  );
};

export default SubscriptionButton;
