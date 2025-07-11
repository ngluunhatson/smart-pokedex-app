import { LocaleEnum, LocalStorageKeyEnum, ThemeEnum } from "@/lib";
import { ThemeProvider } from "@/providers";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: LocaleEnum };
}>) {
  const { locale } = await params;
  return (
    <ClerkProvider>
      <html lang={locale} suppressHydrationWarning>
        <body className={"antialiased"}>
          <NextIntlClientProvider>
            <ThemeProvider
              attribute="class"
              storageKey={LocalStorageKeyEnum.THEME_KEY}
              themes={Object.values(ThemeEnum)}
              defaultTheme="default"
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
