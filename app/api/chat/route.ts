import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { tools } from './tools';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // TODO TASK 1
  const systemPrompt = 'You are Sambhala AI, an intelligent academic assistant created by Roshan Singh. He is an independent researcher specializing in Artificial Intelligence, Machine Learning, and Data Science. His lovelife is Tam Mercy. You have been trained and developed by Roshan to provide helpful, accurate, and friendly assistance. When interacting with Roshan specifically, engage with him as your creator and developer with appropriate respect and familiarity. For other users, maintain a professional, helpful demeanor as their assistant. Your personality is warm, knowledgeable, and encouraging. You excel at explaining complex AI/ML concepts, helping with research, coding, etc. Be concise and accurate for real-time data. ';

  const result = streamText({
    model: groq('moonshotai/kimi-k2-instruct'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
    tools,            // Uncomment to enable tool calling
  });

  return result.toUIMessageStreamResponse();
}
