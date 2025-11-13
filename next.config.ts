import type { NextConfig } from "next";
import lingoCompiler from "lingo.dev/compiler";

const withLingo = lingoCompiler.next({
  sourceRoot: "app",
  lingoDir: "lingo",
  sourceLocale: "en",
  targetLocales: ["es"],
  rsc: true,
  useDirective: false,
  debug: false,
  // models: "lingo.dev",
  models: {
    "*:*": "google:gemini-2.5-flash",
  },
});

const nextConfig: NextConfig = {
  /* config options here */
};

// export default nextConfig;
export default withLingo(nextConfig);
