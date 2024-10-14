import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../server/supabase";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const { data: stripe_costomer_data } = await supabase
    .from("profile")
    .select("stripe_costomer")
    .eq("id", user.id)
    .single();
  if (!stripe_costomer_data?.stripe_costomer) {
    return NextResponse.json("nothing stripe_costomer_data", { status: 401 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_costomer_data.stripe_costomer,
    return_url: "http://localhost:3000/dashboard",
  });

  return NextResponse.json({ url: session.url });
}
