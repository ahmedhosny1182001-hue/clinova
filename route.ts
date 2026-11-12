import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI tutor is not configured yet. Add OPENAI_API_KEY to your server environment." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message || message.length > 8000) {
      return NextResponse.json({ error: "Provide a message (maximum 8,000 characters)." }, { status: 400 });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions: "You are CLINOVA, an educational medical tutor for medical students and clinicians. Explain evidence-based medicine clearly, distinguish established guidance from uncertainty, encourage checking current local guidelines, and never present educational content as a substitute for direct patient assessment or clinical supervision. Do not invent citations.",
        input: message
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data?.error?.message || "AI provider request failed." }, { status: response.status });
    }
    const output = (data.output || [])
      .flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content || [])
      .filter((item: { type?: string }) => item.type === "output_text")
      .map((item: { text?: string }) => item.text || "")
      .join("\n");

    return NextResponse.json({ answer: output || "No response was returned." });
  } catch {
    return NextResponse.json({ error: "Invalid request. Please try again." }, { status: 500 });
  }
}
