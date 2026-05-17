// @ts-nocheck
import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { getGarrison365Config, buildCssVars } from '@/lib/garrison365-config';

import { Garrison365LivePreview } from '@/components/Garrison365LivePreview';
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Balance Pilates — Reformer & Community Pilates',
  description: 'Small-group reformer Pilates in Denver. Community-first, instructor-guided, progressive method. First month $99.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = await getGarrison365Config();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`} style={vars as React.CSSProperties}>
      <body>{children}<Garrison365LivePreview /></body>
    </html>
  );
}
