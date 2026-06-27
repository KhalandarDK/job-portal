import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jobs – Community Job Portal",
  description: "Connecting institutions with dedicated professionals",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-textPrimary">
        {children}
      </body>
    </html>
  );
}
