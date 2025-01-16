import Background from '@/components/Background';
import CardStackHome from '@/components/CardStackHome';
import CreateAccountForm from '@/components/CreateAccountForm';
import Footer from '@/components/Footer';
import HowItWorksPopup from '@/components/HowItWorksPopUp';
import NavBar from '@/components/NavBar';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen md:h-full lg:space-y-24 xl:space-y-6">
      <NavBar />
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-20 md:gap-28 lg:gap-36 xl:gap-6 px-12 md:px-12 py-12 lg:py-0 flex-1">
        <div className="xl:col-span-1 2xl:col-span-2 flex flex-col justify-center items-center xl:items-start mb-6 md:mb-0">
          <h1 className="text-xl md:text-2xl font-bold text-center xl:text-left leading-tight">
            Your story of the year,
            <br className="hidden md:inline" /> told by those who know you best.
          </h1>
          <h2 className="text-xl md:text-3xl font-serif italic mt-4 text-center xl:text-left">
            Your friends answer questions about you.{' '}
            <br className="hidden lg:inline" />
            The answers will be unlocked next New Year&apos;s Eve.{' '}
            <br className="hidden lg:inline" />
            <HowItWorksPopup>
              <div className="underline decoration-green-400 hover:decoration-green-800 transition-colors cursor-pointer">
                How it works
              </div>
            </HowItWorksPopup>
          </h2>
          <CreateAccountForm />
        </div>
        <div className="w-full flex justify-center items-center xl:max-w-none overflow-visible h-[28rem] md:h-72 xl:h-auto">
          <div className="pt-28 pb-8">
            <CardStackHome />
          </div>
        </div>
      </div>
      <Footer />
      <Background />
    </main>
  );
}
