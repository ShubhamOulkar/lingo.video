import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { LingoProvider, loadDictionary } from "lingo.dev/react/rsc";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LingoProvider loadDictionary={(locale) => loadDictionary(locale)}>
          {children}
        </LingoProvider>
      </body>
    </html>
  );
}
