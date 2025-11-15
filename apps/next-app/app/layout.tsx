import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist } from "next/font/google";
import { LingoProvider, loadDictionary } from "lingo.dev/react/rsc";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await cookies()).get("lingo-locale")?.value || "en";
  const dictionary = (await import(`../public/meta-og/${locale}.json`)).default;
  // fetch meta content from your dictionary
  const title = dictionary.meta?.title;
  const description = dictionary.meta?.description;

  return {
    title,
    description,
    twitter: {
      title: title,
      description: description,
      images: "https://lingo-video.vercel.app/og.png",
      creator: "dev Shubham oulkar",
      creatorId: "@shubhuoulkar",
      site: "https://lingo-video.vercel.app",
      siteId: "Lingo.video",
    },
    openGraph: {
      type: "website",
      url: "https://lingo-video.vercel.app",
      title: title,
      description: description,
      siteName: "Lingo.video",
      images: [{ url: "https://lingo-video.vercel.app/og.png" }],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable}`}>
        <LingoProvider loadDictionary={(locale) => loadDictionary(locale)}>
          {children}
        </LingoProvider>
      </body>
    </html>
  );
}
