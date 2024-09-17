import React, { FC } from "react";
import { createClient } from "../server/supabase";
import { YouTubeEmbed } from "@next/third-parties/google";

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

const getPremiumContent = async (id: number) => {
  const supabase = createClient();
  const { data: video, error } = await supabase
    .from("premium_content")
    .select("video_url")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return video;
};

type Props = {
  params: {
    id: number;
  };
};

const LessonDetailPage: FC<Props> = async ({ params }) => {
  const lesson = await getDetailLesson(params.id);
  const video = await getPremiumContent(params.id);
  const videoId = new URL(video.video_url).searchParams.get("v");
  return (
    <div className="mx-auto w-full max-w-3xl px-8 py-16">
      <h1 className="mb-6 text-3xl">{lesson.title}</h1>
      <p className="mb-8">{lesson.description}</p>
      {videoId && <YouTubeEmbed height={400} videoid={videoId} />}
    </div>
  );
};

export default LessonDetailPage;
