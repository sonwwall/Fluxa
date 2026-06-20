"use client";

import { I18nProvider, type Locale } from "@/features/i18n/i18n";

export function Providers({
  children,
  initialLocale,
  shouldDelayLocaleRender,
}: Readonly<{
  children: React.ReactNode;
  initialLocale: Locale;
  shouldDelayLocaleRender: boolean;
}>) {
  return (
    <I18nProvider
      initialLocale={initialLocale}
      shouldDelayRender={shouldDelayLocaleRender}
    >
      {children}
    </I18nProvider>
  );
}
