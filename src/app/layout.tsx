import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pipedrive + OpenAI Integration",
  description: "A Next.js application that integrates Pipedrive CRM with OpenAI's AI capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
