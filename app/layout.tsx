import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const SITE_URL = 'https://www.hiddenstamp.com';
const SITE_NAME = 'HiddenStamp';
const SITE_DESCRIPTION =
  'Protect your images with invisible watermarks. Embed and verify hidden watermarks using LSB steganography — free, fast, and no sign-up required.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HiddenStamp — Invisible Image Watermark Tool',
    template: '%s | HiddenStamp',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'invisible watermark',
    'image watermark',
    'steganography',
    'LSB watermark',
    'watermark embed',
    'watermark verify',
    'image protection',
    'digital watermark',
    'hidden watermark',
    'copyright protection',
    'image copyright',
    'watermark tool',
    'free watermark',
    'online watermark',
  ],
  authors: [{ name: 'HiddenStamp' }],
  creator: 'HiddenStamp',
  publisher: 'HiddenStamp',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'HiddenStamp — Invisible Image Watermark Tool',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HiddenStamp — Invisible Image Watermark Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HiddenStamp — Invisible Image Watermark Tool',
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  category: 'technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires a modern web browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Embed invisible watermarks into images',
    'Verify hidden watermarks in images',
    'Support JPEG, PNG, WebP formats',
    'LSB steganography technology',
    'No sign-up required',
    'Batch processing up to 20 images',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} font-display`}>
        {children}
      </body>
    </html>
  );
}
