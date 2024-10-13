import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const endpoindSercret = "whsec_qD07gqsjakjEKBTsBfwQKq5mOk1c5Pzp";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  console.log(req, "webHook dispatch");

  return NextResponse.json({ receibed: true });
}
