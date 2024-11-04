import type { Metadata } from 'next'
import { Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { siteMetadata } from '@/siteMetadata'
import { ThemeProvider } from '@/components/ThemeProvider'
import clsx from 'clsx'

const source_serif = Source_Serif_4({
  subsets: ['cyrillic'],
  display: 'swap',
  variable: '--font-source-serif',
})

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: siteMetadata.locale,
    type: 'website',
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={siteMetadata.lang} className={source_serif.className} suppressHydrationWarning>
      <body
        className={clsx(
          'flex flex-col scroll-smooth bg-gray-100 text-stone-900',
          'from-gray-800 to-black dark:bg-gray-800 dark:bg-gradient-to-br dark:text-stone-200'
        )}
      >
        <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
          <div className="flex">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
