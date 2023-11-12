import AuthProvider from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "CCRIPT",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-[url('/assets/images/image.webp')] bg-cover bg-opacity-30"
        style={{
          backdropFilter: "blur(2px)",
        }}
      >
        <AuthProvider>
          <Navbar />
          <div className="flex flex-1 justify-center items-center min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
