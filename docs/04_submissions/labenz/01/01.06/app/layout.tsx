import localFont from 'next/font/local';
import './globals.css';

const ebGaramond = localFont({
  src: [
    {
      path: '../public/fonts/EBGaramond-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/EBGaramond-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/EBGaramond-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/EBGaramond-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/EBGaramond-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/EBGaramond-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/EBGaramond-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/EBGaramond-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/EBGaramond-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/EBGaramond-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-eb-garamond',
});

const monumentExtended = localFont({
  src: [
    {
      path: '../public/fonts/MonumentExtended-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/MonumentExtended-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/MonumentExtended-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/MonumentExtended-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/MonumentExtended-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-monument-extended',
});

export const metadata = {
  title: "Your Year in Review 2024 | Friends' Reflections",
  description:
    "Discover how your friends saw your 2024! View your personal dashboard, share your link with friends, and get ready to unlock their heartwarming, funny, and surprising perspectives on your year this New Year's Eve.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-orange-50">
      <body
        className={`${ebGaramond.variable} ${monumentExtended.variable} antialiased h-full overflow-x-hidden xl:overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
