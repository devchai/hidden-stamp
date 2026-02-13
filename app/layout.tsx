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
const SITE_DESCRIPTION_KO =
  '무료 비가시 워터마크 도구 — LSB 스테가노그래피로 JPEG, PNG, WebP 이미지에 보이지 않는 워터마크를 삽입하고 검증하세요. 회원가입 없이 브라우저에서 바로 사용할 수 있습니다.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'HiddenStamp — Free Invisible Image Watermark Tool | 무료 비가시 워터마크 도구',
    template: '%s | HiddenStamp',
  },
  description: `${SITE_DESCRIPTION} ${SITE_DESCRIPTION_KO}`,
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
    // Korean (한국어)
    '워터마크',
    '보이지 않는 워터마크',
    '투명 워터마크',
    '이미지 워터마크',
    '디지털 워터마크',
    '숨겨진 워터마크',
    '워터마크 넣기',
    '워터마크 삽입',
    '워터마크 확인',
    '워터마크 검증',
    '워터마크 감지',
    '스테가노그래피',
    '이미지 저작권 보호',
    '사진 워터마크',
    '사진 저작권',
    '이미지 보호',
    '무료 워터마크',
    '온라인 워터마크',
    '워터마크 무료 사이트',
    '이미지 워터마크 넣기',
    '사진 워터마크 넣는법',
    '보이지 않는 워터마크 만들기',
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
    {
      '@type': 'Question',
      name: '보이지 않는 워터마크란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '보이지 않는 워터마크는 사람의 눈에 보이지 않도록 이미지에 숨겨진 메시지입니다. HiddenStamp는 LSB(최하위 비트) 스테가노그래피 기술을 사용하여 이미지 픽셀에 텍스트를 삽입하며, 이미지의 시각적 품질에는 영향을 주지 않습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '이미지에 보이지 않는 워터마크를 어떻게 넣나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HiddenStamp에 이미지(JPEG, PNG, WebP)를 업로드하고 원하는 워터마크 텍스트를 입력한 후 Upload 버튼을 클릭하세요. 보이지 않는 워터마크가 삽입된 PNG 파일을 다운로드할 수 있습니다. 회원가입 없이 무료로 사용 가능합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '이미지에 숨겨진 워터마크를 어떻게 확인하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HiddenStamp에서 Verify 모드로 전환한 후 이미지를 업로드하고 Verify 버튼을 클릭하세요. 숨겨진 워터마크가 있으면 삽입된 텍스트가 표시됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'HiddenStamp는 무료인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, HiddenStamp는 완전 무료입니다. 회원가입, 로그인, 다운로드 없이 브라우저에서 바로 사용할 수 있으며, 한 번에 최대 20장의 이미지에 워터마크를 넣을 수 있습니다.',
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
