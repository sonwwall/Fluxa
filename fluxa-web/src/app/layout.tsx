import type { Metadata } from "next";
import { cookies } from "next/headers";

import type { Locale } from "@/features/i18n/i18n";

import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fluxa",
  description: "Fluxa blog frontend",
};

const LOCALE_COOKIE = "fluxa.locale";

function parseLocale(value: string | undefined): Locale | null {
  if (value === "en" || value === "zh") {
    return value;
  }

  return null;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localeCookie = parseLocale((await cookies()).get(LOCALE_COOKIE)?.value);
  const initialLocale = localeCookie ?? "en";

  return (
    <html lang={initialLocale === "zh" ? "zh-CN" : "en"} suppressHydrationWarning>
      <body>
        <Providers
          initialLocale={initialLocale}
          shouldDelayLocaleRender={!localeCookie}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
