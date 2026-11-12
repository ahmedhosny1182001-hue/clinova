import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLINOVA — Learn Medicine. Think Clinically.",
  description: "An AI-powered clinical learning platform for medical students and clinicians.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
