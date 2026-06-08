/*
 * Footer.jsx
 * Multi-column responsive footer containing brand information,
 * quick navigation links, contact details, social media icons, and copyright.
 */
import { Mail, Hexagon } from "lucide-react";
import Button from "./Button";
const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0a0b] border-t border-zinc-900 pt-16 pb-8 text-zinc-400">
      {/* 4. CALL TO ACTION SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-[80vw] px-4 py-24 sm:px-6 lg:px-8 text-center h-[60vh] flex flex-col justify-center items-center bg-[radial-gradient(circle,rgba(243,127,48,0.08)_0%,rgba(243,127,48,0.02)_60%,rgba(15,15,16,0)_100%)]">
        {/* Title */}
        <h2 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          be a part of <span className="text-brand-primary">CodeMate</span>
        </h2>

        {/* Description */}
        <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md mx-auto mb-8">
          Join a community that helps you grow, connect, and stay ahead.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button variant="primary" size="lg">
            Join Us
          </Button>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Brand & Address Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center text-brand-primary">
                <Hexagon className="h-6 w-6 fill-brand-primary/20 stroke-[2]" />
                <div className="absolute font-sans text-[10px] font-bold text-white leading-none">
                  {"</>"}
                </div>
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-white">
                Code<span className="text-brand-primary">Mate</span>
              </span>
            </div>

            <div className="space-y-1.5 text-sm font-sans text-zinc-500">
              <p>SCET, Surat, Gujarat</p>
              <p>India - 395001</p>
              <p className="pt-2">
                <a
                  href="mailto:co-codemate@gmail.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  co-codemate@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-brand-primary font-medium hover:text-brand-primary-dark transition-colors duration-200"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower footer */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 font-sans order-2 sm:order-1 text-center sm:text-left">
            &copy; 2026 CodeMate. All rights reserved.
          </p>

          <div className="flex items-center gap-5 order-1 sm:order-2">
            <a
              href="mailto:co-codemate@gmail.com"
              className="text-zinc-600 hover:text-white transition-colors duration-200"
              aria-label="Email CodeMate"
            >
              <Mail className="h-5 w-5 stroke-[1.5]" />
            </a>

            {/* Custom SVG for LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-white transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <svg
                className="h-[18px] w-[18px] fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Custom SVG for Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-white transition-colors duration-200"
              aria-label="Instagram Profile"
            >
              <svg
                className="h-[18px] w-[18px] fill-none stroke-current stroke-[2]"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
