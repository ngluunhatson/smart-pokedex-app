import { LocalStorageKeyEnum, ThemeEnum } from "@/lib";
import { ThemeProvider } from "@/providers";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Pokédex App",
  applicationName: "Smart Pokédex App",
  creator: "Son Nguyen",
  publisher: "Son Nguyen",
  description:
    "A highly interactive Pokédex that allows users to search by name, ID, type, ability, or even egg group.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "favicon-dark",
        href: "/images/favicon.png",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "favicon-light",
        href: "/images/favicon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={"antialiased"}>
          <ThemeProvider
            attribute="class"
            storageKey={LocalStorageKeyEnum.THEME_KEY}
            themes={Object.values(ThemeEnum)}
            defaultTheme="default"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
