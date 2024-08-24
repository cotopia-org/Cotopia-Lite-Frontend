import { Toaster } from "sonner";
import "./globals.css";
import "@xyflow/react/dist/style.css";
import { Viewport } from "next";

export const viewport: Viewport = {
  initialScale: 1,
  width:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
