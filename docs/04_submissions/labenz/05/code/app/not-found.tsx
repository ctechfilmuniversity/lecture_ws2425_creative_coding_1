'use client';
import { NextPage } from 'next';
import Link from 'next/link';

const Custom404: NextPage = () => {
  return (
    <main className="flex justify-center items-center flex-col h-screen space-y-4 ">
      <h1 className="text-4xl font-display font-light">404 - Page Not Found</h1>
      <Link href="/" className="font-bold hover:underline font-sans">
        Go back home
      </Link>
    </main>
  );
};

export default Custom404;
