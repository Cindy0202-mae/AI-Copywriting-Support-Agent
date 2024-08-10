"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useTheme, ThemeProvider } from "./Themecontext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { darkMode } = useTheme(); // Get darkMode from context

  return (
    <ClerkProvider>
      <ThemeProvider>
        <html lang="en">
          <body
            className={inter.className}
            data-theme={darkMode ? "dark" : "light"} // Set data-theme based on darkMode
          >
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
            <SignedIn>
              <Header />
              {children}
            </SignedIn>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}

// Header component without the toggle button
function Header() {
  const { darkMode } = useTheme();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "1rem",
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <UserButton />
    </header>
  );
}
