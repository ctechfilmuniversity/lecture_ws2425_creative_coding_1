import EnvironmentSceneContext from '@/components/context/EnvironmentSceneContext';
import MobileContext from '@/components/context/MobileContext';
import PageTransitionContext from '@/components/context/PageTransitionContext';
import type { Metadata } from 'next';
import { Funnel_Display, Funnel_Sans } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import './globals.css';

const funnelDisplay = Funnel_Display({
  variable: '--font-funnel-display',
  subsets: ['latin'],
});

const funnelSans = Funnel_Sans({
  variable: '--font-funnel-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Gorm Labenz | Portfolio',
  description:
    'I design and develop motion, design and code that work togehter',
  icons: {
    icon: [
      {
        url: '/icon-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "8e5c1b14d59c45beac1cd1c3fe916737"}'
      ></Script>
      <body
        className={`${funnelDisplay.variable} ${funnelSans.variable} antialiased h-full`}
      >
        <MobileContext>
          <PageTransitionContext>
            <EnvironmentSceneContext>{children}</EnvironmentSceneContext>
          </PageTransitionContext>
        </MobileContext>
      </body>
    </html>
  );
}
