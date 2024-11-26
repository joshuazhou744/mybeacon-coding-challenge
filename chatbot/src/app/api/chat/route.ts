// route.ts

import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.API_KEY });

interface ChatRequest {
    message: string;
}

interface ChatResponse {
    reply?: string;
    error?: string;
}

export async function POST(
    req: NextRequest
): Promise<NextResponse<ChatResponse>> {
    try {
        if (req.method !== "POST") {
            return NextResponse.json(
                { error: 'Method not allowed' },
                { status: 405 }
            );
        }
        const { message } = await req.json() as ChatRequest;
        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required and must be a string.' },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: "system", content: "You are a helpful assistant that assists prospective immigrant moving to Canada from around the world." },
                {
                    role: "user",
                    content: message,
                },
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        const botReply = completion.choices[0].message.content;
        console.log(botReply);

        if (!botReply) {
            return NextResponse.json(
                { error: 'No response from OpenAI.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ reply: botReply }, { status: 200 });

    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json(
            { error: 'An error occurred processing your request' },
            { status: 500 }
        );
    }
}