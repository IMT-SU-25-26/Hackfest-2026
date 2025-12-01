import { Discussion, Reply, Team } from "@/generated/prisma";

export interface FormQuestion{
    title: string,
    question: string
}

export interface DiscussionData extends Discussion{
    replies: ReplyData[],
    author: Team
}

export interface ReplyData extends Reply{
    author: Team
}