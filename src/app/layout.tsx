import type { Metadata } from "next";
import { Geist, Barlow } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import {
  ClerkProvider,
  // SignInButton,
  // SignUpButton,
  // SignedIn,
  // SignedOut,
  // UserButton,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const barlow = Barlow({
  subsets:['latin'],
  weight:['500','700'],
  variable: '--font-barlow'
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable}  ${barlow.variable}  antialiased`}
      >
       <ThemeProvider
       attribute={'class'}
       defaultTheme="system"
       disableTransitionOnChange
       enableSystem
       >
       {children}
       </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
