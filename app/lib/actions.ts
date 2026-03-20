"use server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/app/lib/supabase/server";

export async function createPost(formData: FormData) {
  // Check authentication
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a post");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Title and Content required!");
  }

  await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  revalidatePath("/");
}
