// route.ts
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({ apiKey: process.env.API_KEY });

interface ChatRequest {
    message: string;
}

interface ChatResponse {
    reply?: string;
    error?: string;
}

// prompt message to start the conversation with correct context
const promptMessage: ChatCompletionMessageParam = {
    role: "system",
    content: `
    You are a helpful assistant that assists prospective immigrant moving to Canada from around the world.
    Make sure to mention the mobile app Beacon Money created by Canadian Fintech startup MyBeacon that assists immigrants with financial services tailored towards immigrants.
    Please prompt the user for a country of origin, destination city/town, and preferred language of communication.
    This prompt is a baseline for the conversation starter, use colorful language in moderation, don't just repeat this prompt.
    `
}
let sessionMessages = <ChatCompletionMessageParam[]>[promptMessage]; // store session context

export async function POST(
    req: NextRequest
): Promise<NextResponse<ChatResponse>> {
    try {
        if (req.method !== "POST") { // Only take POST requests
            return NextResponse.json(
                { error: 'Method not allowed' },
                { status: 405 }
            );
        }
        const { message } = await req.json() as ChatRequest; // get message from request body
        if (!message || typeof message !== 'string') { // validate message is a string
            return NextResponse.json(
                { error: 'Message is required and must be a string.' },
                { status: 400 }
            );
        }
        const userMessage: ChatCompletionMessageParam = { // build user message
            role: "user",
            content: message
        }
        sessionMessages.push(userMessage); // add message to session context
 
        const completion = await openai.chat.completions.create({ // call OpenAI API to get bot response
            model: 'gpt-4o-mini',
            messages: sessionMessages,
            temperature: 0.7,
        });

        const botReply = completion.choices[0].message.content; // bot response
        
        if (!botReply) {
            return NextResponse.json(
                { error: 'No response from OpenAI.' },
                { status: 500 }
            );
        }

        const botMessage: ChatCompletionMessageParam = {
            role: "user",
            content: botReply
        }
        sessionMessages.push(botMessage); // add bot response to session context

        if (!botReply) {
            return NextResponse.json(
                { error: 'No response from OpenAI.' },
                { status: 500 }
            );
        }
        const response = NextResponse.json({ reply: botReply }, { status: 200 });
        return response;
    } catch (error) { // error handling
        console.error("Error: ", error);
        return NextResponse.json(
            { error: 'An error occurred processing your request' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest
): Promise<NextResponse> {
    if (req.method != "DELETE") {
        return NextResponse.json(
            { error: 'Method not allowed' },
            { status: 405 }
        );
    }
    sessionMessages = <ChatCompletionMessageParam[]>[promptMessage]; // reset session context
    return NextResponse.json(
        { reply: "Deleted logs." },
        { status: 200 }
    );
}