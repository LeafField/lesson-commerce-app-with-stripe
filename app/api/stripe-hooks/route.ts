import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "../../server/supabase";

export async function POST(req: NextRequest) {
  const endpoindSercret = process.env.STRIPE_SIGNIN_SECRET!;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const supabase = createClient();
  const signature = req.headers.get("stripe-signature") ?? "";
  const reqBuffer = Buffer.from(await req.arrayBuffer());

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      endpoindSercret,
    );
    console.log(event);

    switch (event.type) {
      case "customer.subscription.created":
        const paymentIntent = event.data.object;
        await supabase
          .from("profile")
          .update({
            is_subscribed: true,
            interval: paymentIntent.items.data[0].plan.interval,
          })
          .eq("stripe_costomer", event.data.object.customer);

        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "customer.subscription.updated":
        const costomerSubscriptionUpdate = event.data.object;
        if (costomerSubscriptionUpdate.status === "canceled") {
          await supabase
            .from("profile")
            .update({
              interval: null,
              is_subscribed: false,
            })
            .eq("stripe_costomer", event.data.object.customer);
        } else {
          await supabase
            .from("profile")
            .update({
              interval: costomerSubscriptionUpdate.items.data[0].plan.interval,
              is_subscribed: true,
            })
            .eq("stripe_costomer", event.data.object.customer);
        }
        break;

      case "customer.subscription.deleted":
        await supabase
          .from("profile")
          .update({
            interval: null,
            is_subscribed: false,
          })
          .eq("stripe_costomer", event.data.object.customer);
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    return NextResponse.json({ receibed: true });
  } catch (err) {
    return NextResponse.json(`webhook error:${(err as Error).message}`, {
      status: 401,
    });
  }
}
