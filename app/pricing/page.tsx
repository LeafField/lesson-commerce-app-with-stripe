import Stripe from "stripe";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

interface Plan {
  id: string;
  name: string;
  price: string | null;
  interval: Stripe.Plan.Interval | null;
  currency: string;
}

const getAllPlans = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { data: plansList } = await stripe.plans.list();

  const plans = await Promise.all(
    plansList.map(async (plan) => {
      if (!plan.product) return;
      const product = await stripe.products.retrieve(plan.product.toString());
      return {
        id: plan.id,
        name: product.name,
        price: plan.amount_decimal,
        interval: plan.interval,
        currency: plan.currency,
      };
    }),
  );

  const sortedPlans = plans.sort(
    (a, b) => parseInt(a!.price!) - parseInt(b!.price!),
  );

  return sortedPlans;
};

const PricingPage = async () => {
  const plans = await getAllPlans();

  return (
    <div className="mx-auto flex w-full max-w-3xl justify-around py-16">
      {plans.map((plan) => (
        <Card key={plan?.id} className="shadow-md">
          <CardHeader>
            <CardTitle>{plan?.name}</CardTitle>
            <CardDescription>{plan?.name}プラン</CardDescription>
          </CardHeader>
          <CardContent>
            {plan?.price}円/{plan?.interval}
          </CardContent>
          <CardFooter>
            <Button>サブスクリプション契約する</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PricingPage;
