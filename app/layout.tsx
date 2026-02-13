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
  'Free invisible watermark tool — embed and verify hidden watermarks in JPEG, PNG, WebP images using LSB steganography. Protect your photos and digital art from unauthorized use. No sign-up, no download, works in your browser.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HiddenStamp — Free Invisible Image Watermark Tool Online',
    template: '%s | HiddenStamp',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    // Core features
    'invisible watermark',
    'image watermark',
    'digital watermark',
    'hidden watermark',
    'watermark tool',
    // Actions
    'watermark embed',
    'watermark verify',
    'watermark detector',
    'check watermark',
    'add watermark to image',
    'embed watermark online',
    'verify watermark online',
    // Technology
    'steganography',
    'LSB steganography',
    'LSB watermark',
    'image steganography tool',
    // Use cases
    'image protection',
    'copyright protection',
    'image copyright',
    'photo watermark',
    'protect photos online',
    'image ownership proof',
    'digital art protection',
    'watermark for photographers',
    'proof of ownership image',
    // Format & platform
    'free watermark',
    'online watermark',
    'watermark JPEG PNG WebP',
    'browser watermark tool',
    'no signup watermark',
    'batch watermark images',
    // Long-tail
    'invisible watermark free online',
    'how to add invisible watermark',
    'detect hidden watermark in image',
    'steganography watermark tool free',
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
    title: 'HiddenStamp — Free Invisible Image Watermark Tool Online',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HiddenStamp — Free Invisible Image Watermark Tool Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HiddenStamp — Free Invisible Image Watermark Tool Online',
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

const jsonLdApp = {
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
    'Browser-based, no download needed',
    'Custom watermark text up to 256 characters',
  ],
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an invisible watermark?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An invisible watermark is a hidden message embedded into an image that is not visible to the human eye. HiddenStamp uses LSB (Least Significant Bit) steganography to embed text into image pixels without altering the visual appearance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add an invisible watermark to my image?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your image (JPEG, PNG, or WebP) to HiddenStamp, enter your custom watermark text, and click Upload. The tool will embed the hidden watermark and return a downloadable PNG file with the invisible watermark.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I verify if an image has a hidden watermark?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Switch to Verify mode on HiddenStamp, upload the image you want to check, and click Verify. The tool will scan for embedded watermarks and display the hidden text if found.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is HiddenStamp free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, HiddenStamp is completely free. No sign-up, no login, and no downloads required. You can watermark up to 20 images at once directly in your browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'What image formats does HiddenStamp support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HiddenStamp supports JPEG, PNG, and WebP formats for input. All watermarked images are output as PNG files to preserve the embedded watermark data without lossy compression.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will the watermark change how my image looks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The LSB steganography technique modifies only the least significant bits of pixel data, making the changes imperceptible to the human eye. Your image will look identical before and after watermarking.',
      },
    },
  ],
};

const jsonLdHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Add an Invisible Watermark to Your Image',
  description:
    'Step-by-step guide to embed a hidden watermark into any JPEG, PNG, or WebP image using HiddenStamp.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Open HiddenStamp',
      text: 'Go to hiddenstamp.com and make sure Stamp mode is selected.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Upload your images',
      text: 'Drag and drop your images or click the upload area. You can upload up to 20 images at once (JPEG, PNG, or WebP, max 4.5 MB each).',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Embed the watermark',
      text: 'Click the Upload button. HiddenStamp will embed an invisible watermark into each image using LSB steganography.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Download your watermarked images',
      text: 'Once processing is complete, download the watermarked image (PNG) or a ZIP file if you uploaded multiple images.',
    },
  ],
  tool: {
    '@type': 'HowToTool',
    name: 'HiddenStamp — free online invisible watermark tool',
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} font-display`}>
        {children}
      </body>
    </html>
  );
}
