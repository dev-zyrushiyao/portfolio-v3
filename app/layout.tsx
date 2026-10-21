import type { Metadata } from "next";
import { Google_Sans_Flex, Lora, Noto_Sans_Tagalog } from "next/font/google";
import "./globals.css";
import NavBar from "./components-ui/NavBar";

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
  title: "Zyrus Hiyao Portfolio",
  description: "Website of Zyrus Hiyao",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${googleSansFlex.variable} ${notoSansTagalog.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="sticky top-0 z-10">
          <NavBar />
        </div>
        {children}
      </body>
    </html>
  );
}
