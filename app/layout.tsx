import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "운동 기록",
  description: "매일 운동을 기록하세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
