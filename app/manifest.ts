import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HiddenStamp — Invisible Image Watermark Tool',
    short_name: 'HiddenStamp',
    description:
      'Protect your images with invisible watermarks. Embed and verify hidden watermarks using LSB steganography.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#0df20d',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
