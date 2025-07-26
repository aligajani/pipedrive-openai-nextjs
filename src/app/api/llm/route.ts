import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, previous_response_id } = body;

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: message,
      previous_response_id: previous_response_id || undefined,
      store: true,
    });

    return NextResponse.json({ 
      response: response.output_text,
      response_id: response.id
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
