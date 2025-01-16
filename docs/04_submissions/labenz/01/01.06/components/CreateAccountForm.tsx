'use client';

import { createUser } from '@/app/actions/user';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`bg-green-400
        2xl:w-fit w-full font-bold py-2 px-12 rounded-full transition-all duration-300
        whitespace-nowrap text-xs md:text-sm lg:text-base mt-4 2xl:mt-0 2xl:ml-8 border border-black
        hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[6px_6px_2px_rgba(0,0,0,0.15)]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none`}
    >
      {pending ? 'Loading...' : 'Start now!'}
    </button>
  );
}

export default function CreateAccountForm() {
  const [fingerprint, setFingerprint] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const initFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };

    initFingerprint();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setError('');
    formData.append('fingerprint', fingerprint);
    try {
      const redirectUrl = await createUser(formData);
      router.push(redirectUrl);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        console.error(e);
      }
    }
  };

  return (
    <form
      action={handleSubmit}
      className="mt-12 flex flex-col 2xl:flex-row 2xl:items-start items-end 2xl:jusitfy-end"
    >
      <label htmlFor="nickname" className="sr-only">
        Your nickname
      </label>

      <div className="px-2 2xl:p-0 flex items-end h-full">
        <input
          type="text"
          id="nickname"
          name="nickname"
          required
          className="2xl:w-64 border-b-2 border-gray-300 focus:outline-none focus:border-black transition-colors font-sans font-bold text-base md:text-sm lg:text-base text-gray-800 m-0 bg-transparent text-center xl:text-left rounded-none"
          placeholder="Your nickname"
        />
      </div>
      {error && (
        <p className="absolute mt-16 text-red-500 text-xl italic">{error}</p>
      )}
      <ArrowRight className="w-6 h-6 text-gray-800 self-center 2xl:ml-8 hidden 2xl:block " />
      <SubmitButton />
    </form>
  );
}
