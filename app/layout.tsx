import type { Metadata } from "next";
import { Google_Sans_Flex, Lora, Noto_Sans_Tagalog } from "next/font/google";
import "./globals.css";
import NavBar from "./components/ui/NavBar";
import FooterBar from "./components/ui/FooterBar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const lora = Lora({
  variable: "--font-lora-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
});

const notoSansTagalog = Noto_Sans_Tagalog({
  variable: "--font-noto-sans-tagalog",
  subsets: ["tagalog"],
  weight: "400",
});

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Zyrus Hiyao — Frontend Developer & UI/UX Designer",
  description:
    "Explore the portfolio of Zyrus Hiyao, a frontend web developer and UI/UX designer specializing in modern web applications and mobile experiences.",
  keywords: [
    "Zyrus Hiyao",
    "Frontend Developer",
    "UI/UX Designer",
    "Next.js Portfolio",
    "React",
  ],
  authors: [{ name: "Zyrus Hiyao" }],
  metadataBase: new URL("https://zyrushiyao.vercel.app"),
  verification: {
    google: "googleac3006e21ba3c930", //from Google Search Console
  },
  openGraph: {
    title: "Zyrus Hiyao — Frontend Developer & UI/UX Designer",
    description:
      "Welcome to my personal web portfolio! I'm Zyrus Hiyao, a frontend developer and UI/UX designer showcasing responsive web applications built with React, TypeScript, and Tailwind CSS.",
    url: "https://zyrushiyao.vercel.app",
    siteName: "Zyrus Hiyao Portfolio",
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${googleSansFlex.variable} ${notoSansTagalog.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="sticky top-0 z-30">
          <NavBar />
        </div>

        {children}

        <FooterBar />
      </body>
    </html>
  );
}
