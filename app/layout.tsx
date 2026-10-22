import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kids Active Point | Preschool in Dombivli',
  description:
    'A happy place for little learners to explore, play, discover, and grow. Explore Play Group, Nursery, Jr. KG and Sr. KG admissions in Dombivli.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsactivepoint.com'
  ),
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Kids Active Point Preschool',
    description: 'Big dreams begin with little steps.',
    type: 'website',
    images: [{ url: '/images/logo.png', width: 512, height: 512, alt: 'Kids Active Point Logo' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fffaf0',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
