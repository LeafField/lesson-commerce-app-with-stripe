import React, { FC } from "react";
import { createClient } from "../server/supabase";

const getDetailLesson = async (id: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

type Props = {
  params: {
    id: number;
  };
};

const LessonDetailPage: FC<Props> = async ({ params }) => {
  const lesson = await getDetailLesson(params.id);
  return (
    <div className="mx-auto w-full max-w-3xl px-8 py-16">
      <h1 className="mb-6 text-3xl">{lesson.title}</h1>
      <p className="mb-8">{lesson.description}</p>
    </div>
  );
};

export default LessonDetailPage;
