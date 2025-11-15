import type { NextConfig } from "next";
import lingoCompiler from "lingo.dev/compiler";

const withLingo = lingoCompiler.next({
  sourceRoot: "app",
  lingoDir: "lingo",
  sourceLocale: "en",
  targetLocales: ["hi"],
  rsc: true,
  useDirective: false,
  debug: false,
  // models: "lingo.dev",
  models: {
    "*:*": "google:gemini-2.5-flash",
  },
});

const nextConfig: NextConfig = {
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    LINGODOTDEV_API_KEY: process.env.LINGODOTDEV_API_KEY,
  },
};

// export default nextConfig;
export default withLingo(nextConfig);
