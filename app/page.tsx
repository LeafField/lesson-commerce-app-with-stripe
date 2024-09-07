import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "./server/supabase";

const getAllLessons = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("lesson").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default async function Home() {
  const data = await getAllLessons();

  return (
    <main className="mx-auto my-16 w-full max-w-3xl px-2">
      <div className="flex flex-col gap-3">
        {data.map((lesson) => (
          <Link key={lesson.id} href={`/${lesson.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{lesson.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
