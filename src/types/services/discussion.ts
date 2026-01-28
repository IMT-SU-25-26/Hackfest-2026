import { Discussion, Reply, Team, User } from "@/generated/prisma";

export interface FormQuestion{
    title: string,
    question: string
}

export interface DiscussionData extends Discussion{
    replies: ReplyData[],
    author: User
}

export interface ReplyData extends Reply{
    author: User
}