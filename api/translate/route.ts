export const runtime = "nodejs";

import { LingoDotDevEngine } from "lingo.dev/sdk";

const lingo = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { text, sourceLocale, targetLocale } = await req.json();

    const translated = await lingo.localizeText(text, {
      sourceLocale: sourceLocale ?? null,
      targetLocale,
    });

    return Response.json({ translated });
  } catch (err: any) {
    return Response.json(
      { error: err?.message || "Translation failed" },
      { status: 500 },
    );
  }
}
