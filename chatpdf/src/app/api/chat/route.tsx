import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { content_a, content_b } from "@/constants";

import { ChatGroq } from "@langchain/groq";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";

const model = new ChatGroq({
  model: "mixtral-8x7b-32768",
  temperature: 0,
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

const History = [new SystemMessage({ content: content_a })];

export async function POST(req: Request) {
  try {
    console.log("Request for prompt");
    const { messages, chatId } = await req.json();
    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));

    if (_chats.length != 1)
      return NextResponse.json(
        {
          error: "chat not found",
        },
        { status: 404 }
      );

    const fileKey = _chats[0].fileKey;
    const lastMessage = messages[messages.length - 1];
    const context = await getContext(lastMessage.content, fileKey);

    console.log("Context: ", context);

    const response = await model.invoke([
      ...History,
      new AIMessage({ content: context }),
      new HumanMessage({ content: lastMessage.content }),
    ]);

    return NextResponse.json(response.content);
  } catch (error: any) {
    console.log("OpenAI Error: ", error.message);
  }
}
