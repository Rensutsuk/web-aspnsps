'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaMoon, FaSun } from 'react-icons/fa';

type NavbarProps = {
  theme: 'mytheme' | 'mytheme-dark';
  onToggleTheme: () => void;
};

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="navbar text-white bg-transparent fixed top-0 z-50 px-4 lg:px-8 py-2">
        <div className="navbar-start">
          <div className="my-1 mr-2">
            <Image
              src="/logo.png"
              alt="ASPNSPS Logo"
              width={30}
              height={30}
            />
          </div>
          <Link href="/" className="btn btn-ghost text-white hover:text-accent text-2xl font-bold px-0">ASPNSPS</Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base">
            <li className="hover:text-accent"><Link href="/">HOME</Link></li>
            <li className="hover:text-accent"><Link href="/about">ABOUT US</Link></li>
            <li className="hover:text-accent"><Link href="/schedule">NEWS &amp; EVENTS</Link></li>
            <li className="hover:text-accent"><Link href="/gallery">GALLERY</Link></li>
            <li className="hover:text-accent"><Link href="/services">SERVICES</Link></li>
            <li className="hover:text-accent"><Link href="/jubilee">75TH JUBILEE</Link></li>
            <li className="hover:text-accent"><Link href="/contact">CONTACT US</Link></li>
          </ul>
        </div>

        <div className="navbar-end ml-auto lg:ml-0">
          <button
            type="button"
            className="btn btn-ghost btn-circle bg-transparent hover:bg-transparent hover:text-accent"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
          >
            {theme === 'mytheme-dark' ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
          </button>

          <button
            className="btn btn-ghost lg:hidden bg-transparent hover:bg-transparent hover:text-accent"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h8m-8 6h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Full screen mobile menu */}
      <div className={`fixed inset-0 bg-primary z-40 lg:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex flex-col h-full pt-20 p-4">
          <ul className="menu w-full gap-2">
            <li>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-white hover:text-accent hover:bg-primary-focus/15"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-white hover:text-accent hover:bg-primary-focus/15"
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                href="/schedule"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-white hover:text-accent hover:bg-primary-focus/15"
              >
                NEWS &amp; EVENTS
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-white hover:text-accent hover:bg-primary-focus/15"
              >
                GALLERY
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-white hover:text-accent hover:bg-primary-focus/15"
              >
                SERVICES
              </Link>
            </li>
            <li>
              <Link
                href="/jubilee"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-white hover:text-accent hover:bg-primary-focus/15"
              >
                75TH JUBILEE
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-white hover:text-accent hover:bg-primary-focus/15"
              >
                CONTACT US
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}