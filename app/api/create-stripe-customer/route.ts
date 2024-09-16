import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "../../server/supabase";

type ReturnData = {
  record: { email: string; id: string };
};

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
  if (query !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json({ message: "APIを叩く権限がありません" });
  }
  const data = (await req.json()) as ReturnData;
  const { email, id } = data.record;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const customer = await stripe.customers.create({
    email,
  });

  await supabase
    .from("profile")
    .update({
      stripe_costomer: customer.id,
    })
    .eq("id", id);

  return NextResponse.json({
    message: `stripe customer created ${customer.id}`,
  });
}
