import './globals.css'
import { cookies } from 'next/headers'
import BaiduAnalytics from '../components/BaiduAnalytics'
import BaiduAdScript from '../components/BaiduAd'
import GoogleAdSense from '../components/GoogleAdSense'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { OrganizationSchema, WebSiteSchema } from '../components/SchemaMarkup'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { I18nProvider } from '../components/I18nProvider'
import { getMetadata, t } from '../lib/i18n'

export const metadata = getMetadata()

export const viewport = {
  themeColor: '#1e293b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  const cookieStore = cookies()
  const locale = cookieStore.get('locale')?.value || 'en'
  const isZh = locale === 'zh'

  return (
    <html lang={isZh ? 'zh-CN' : 'en'}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={t('site.name', locale)} />

        {isZh && process.env.BAIDU_SITE_VERIFICATION && (
          <meta name="baidu-site-verification" content={process.env.BAIDU_SITE_VERIFICATION} />
        )}

        {isZh && process.env.Z360_SITE_VERIFICATION && (
          <meta name="360-site-verification" content={process.env.Z360_SITE_VERIFICATION} />
        )}

        {isZh && process.env.SOGOU_SITE_VERIFICATION && (
          <meta name="sogou_site_verification" content={process.env.SOGOU_SITE_VERIFICATION} />
        )}

        <OrganizationSchema />
        <WebSiteSchema
          name={t('site.name', locale)}
          url="https://www.zkwatcher.top"
          description={t('site.tagline', locale)}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <I18nProvider initialLocale={locale}>
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </I18nProvider>
        <GoogleAdSense />
        <GoogleAnalytics />
        {isZh && <BaiduAnalytics />}
        {isZh && <BaiduAdScript />}
      </body>
    </html>
  )
}