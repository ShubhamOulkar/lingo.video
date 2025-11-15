export const runtime = "nodejs";

import { unstable_cache } from "next/cache";
import { LingoDotDevEngine } from "lingo.dev/sdk";

const lingo = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY!,
});

// TODO: implement better caching for large video transcipt
const cachedTranslate = unstable_cache(
  async (text: string, sourceLocale: string | null, targetLocale: string) => {
    return await lingo.localizeText(text, {
      sourceLocale,
      targetLocale,
    });
  },
  ["lingo-translate"],
  {
    revalidate: 60 * 60 * 24 * 30, // 30 days
    tags: ["translations"],
  },
);

export async function POST(req: Request) {
  // Internal-only api
  const secret = req.headers.get("x-internal-secret");
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { text, sourceLocale, targetLocale } = await req.json();

    const translated = await cachedTranslate(
      text,
      sourceLocale ?? null,
      targetLocale,
    );

    return Response.json({ translated });
  } catch (err: any) {
    return Response.json(
      { error: err?.message || "Translation failed" },
      { status: 500 },
    );
  }
}
