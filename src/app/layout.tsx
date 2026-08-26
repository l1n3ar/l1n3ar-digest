import { Footer } from "@/ui/components/footer";
import { Navbar } from "@/ui/components/navbar";
import { QueryProvider } from "@/ui/components/query-provider";
import { ThemeProvider } from "@/ui/components/theme-provider";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digest",
  description: "A running feed of things worth building on.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full  antialiased`} suppressHydrationWarning>
      <body className="h-full flex flex-col overflow-y-hidden">
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Navbar />
            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
