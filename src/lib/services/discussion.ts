"use server";

import { revalidatePath } from "next/cache";
import prisma from "../config/prisma";
import { getAuthSession } from "../utils/session";
import { Discussion, Reply, Role } from "@/generated/prisma";
import { ActionResult } from "@/types/action";
import { DiscussionData, FormQuestion } from "@/types/services/discussion";

export async function getAllDiscussions(): Promise<DiscussionData[]> {
  const discussion = await prisma.discussion.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      replies: {
        include: {
          author: true,
        },
      },
    },
  });
  return discussion;
}

export async function getDiscussionById(id: string): Promise<Discussion | null> {
  const discussion = await prisma.discussion.findUnique({
    where: { id },
    include: {
      author: true,
      replies: {
        include: {
          author: true,
        },
      },
    },
  });
  return discussion;
}

export async function getUserDiscussions(userId: string): Promise<Discussion[]> {
  const discussions = await prisma.discussion.findMany({
    where: { authorId: userId },
    include: {
      author: true,
      replies: {
        include: {
          author: true,
        },
      },
    },
  });
  return discussions;
}

export async function createDiscussion(formData: FormQuestion): Promise<ActionResult<Discussion>> {
  const session = await getAuthSession();

  if (!session?.user?.team_id) {
    return {
      success: false,
      error: "Please login to ask a question",
    };
  }

  const title = formData.title;
  const question = formData.question;

  if (!title || !question) {
    return {
      success: false,
      error: "Title and question are required",
    };
  }

  const discussion = await prisma.discussion.create({
    data: {
      title,
      question,
      authorId: session.user.team_id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/discussions");

  return {
    success: true,
    data: discussion,
  };
}

export async function createReply(formData: FormData) : Promise<ActionResult<Reply>> {
  const session = await getAuthSession();

  if (!session?.user?.team_id || session?.user?.role!=Role.ADMIN) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }
  console.log("Session role = "+session?.user?.role)

  const content = formData.get("content") as string;
  const discussionId = formData.get("discussionId") as string;

  if (!content || !discussionId) {
    return {
      success: false,
      error: "Content and discussionId are required",
    };
  }

  const reply = await prisma.reply.create({
    data: {
      content,
      discussionId,
      authorId: session.user.team_id,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/discussions");
  revalidatePath(`/discussions/${discussionId}`);

  return {
    success: true,
    data: reply,
  };
}
