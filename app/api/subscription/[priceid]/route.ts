import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../server/supabase";
import Stripe from "stripe";

export async function GET(
  _: NextRequest,
  { params }: { params: { priceid: string } },
) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getSession();
  const user = userData.session?.user;
  const priceid = params.priceid;
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

  const session = await stripe.checkout.sessions.create({
    customer: stripe_costomer_data.stripe_costomer,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceid, quantity: 1 }],
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancelled",
  });

  return NextResponse.json({ id: session.id });
}
