import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

export default async function IntlProvider({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
