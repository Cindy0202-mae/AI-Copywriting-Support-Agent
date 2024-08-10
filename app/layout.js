"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  RedirectToSignIn,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedOut>
            {/* Redirect to sign-in page if not authenticated */}
            <RedirectToSignIn />
          </SignedOut>
          <SignedIn>
            {/* Render user profile management options */}
            <header
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "1rem",
              }}
            >
              <UserButton />
            </header>
            {/* Render the main content */}
            {children}
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
