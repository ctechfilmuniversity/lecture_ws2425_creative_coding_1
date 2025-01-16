import Link from 'next/link';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="border-t border-black mt-auto bg-orange-50">
      <div className="px-4 md:px-12 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            href={'/'}
            className="font-bold font-sans italic hover:-translate-y-1 hover:-translate-x-1 transition-transform text-green-500"
          >
            <Logo className="w-48" />
          </Link>

          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-4 md:gap-x-6 gap-y-2 text-base md:text-lg text-black italic">
            <a
              href="#"
              className="hover:-translate-y-1 hover:-translate-x-1 transition-transform"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:-translate-y-1 hover:-translate-x-1 transition-transform"
            >
              Legal Notice
            </a>
            <a
              href="#"
              className="hover:-translate-y-1 hover:-translate-x-1 transition-transform"
            >
              Terms
            </a>
            {/* <span className="hidden md:inline text-black">|</span>
            <div className="flex items-center gap-4 text-black mt-2 md:mt-0">
              <a
                href="#"
                className="hover:-translate-y-1 hover:-translate-x-1 transition-transform"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="hover:-translate-y-1 hover:-translate-x-1 transition-transform"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="hover:-translate-y-1 hover:-translate-x-1 transition-transform"
              >
                <Github className="w-4 h-4" />
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
