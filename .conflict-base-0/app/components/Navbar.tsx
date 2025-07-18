'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
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
      <div className="navbar bg-primary text-primary-content fixed top-0 z-50">
        <div className="navbar-start">
          <div className="pl-5 my-1">
            <Image
              src="/logo.png"
              alt="ASPNSPS Logo"
              width={50}
              height={50}
              className='outline-solid outline-white outline-5 rounded-full'
            />
          </div>
          <Link href="/" className="btn btn-ghost text-xl">ASPNSPS</Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/schedule">Mass Schedule</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/ministries">Ministries</Link></li>
            <li><Link href="/donate">Donate</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="navbar-end">
          <button
            className="btn btn-ghost lg:hidden"
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
          <ul className="menu w-full gap-4">
            <li>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-primary-content hover:bg-primary-focus"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-primary-content hover:bg-primary-focus"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/schedule"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-primary-content hover:bg-primary-focus"
              >
                Mass Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-primary-content hover:bg-primary-focus"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/ministries"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-primary-content hover:bg-primary-focus"
              >
                Ministries
              </Link>
            </li>
            <li>
              <Link
                href="/donate"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-primary-content hover:bg-primary-focus"
              >
                Donate
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl py-4 text-center text-primary-content hover:bg-primary-focus"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}