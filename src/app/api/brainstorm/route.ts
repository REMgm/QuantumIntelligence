import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are an AI brainstorm partner for Remco Vroom's "Quantum Intelligence" publication strategy. Remco is Head of MarTech AI Transformation & CX-Performance at Monks, with 30+ years of experience and multiple Cannes Lions.

His thesis on "Quantum Intelligence" covers MarTech / AI Transformation — the convergence of AI, marketing technology, and enterprise digital transformation.

The publication strategy has 3 phases:
1. Thesis Publication — Open access on Zenodo, SSRN, ArXiv, ResearchGate
2. Practical Book — Self-published on Amazon KDP, translating academic work into actionable C-suite frameworks
3. Article Series — Pitching HBR, MIT Tech Review, Forbes, Wired, Fast Company, TechCrunch

Help Remco brainstorm:
- Pitch angles and hooks for each publication
- Chapter outlines for the practical book
- LinkedIn thought leadership content ideas
- Differentiation strategies in the crowded AI/MarTech space
- Title ideas, subtitle options, and framing devices
- Marketing and amplification tactics
- Speaking engagement strategies

Be concise, strategic, and challenger-minded. Use bullet points when listing ideas. Match Remco's flip-thinking philosophy — always consider unexpected angles.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "⚠️ The Anthropic API key is not configured. Please add ANTHROPIC_API_KEY to your environment variables in Vercel.",
      });
    }

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const text = response.content
      .filter((block: { type: string }) => block.type === "text")
      .map((block: { type: string; text?: string }) => (block as { type: "text"; text: string }).text)
      .join("\n");

    return NextResponse.json({ reply: text });
  } catch (error: unknown) {
    console.error("Brainstorm API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ reply: `Error: ${message}` }, { status: 500 });
  }
}
