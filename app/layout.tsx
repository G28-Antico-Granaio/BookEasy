import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";


export const metadata: Metadata = {
  title: "Antico Granaio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        
        <main>
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
