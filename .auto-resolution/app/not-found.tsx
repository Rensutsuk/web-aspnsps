'use client';
import Link from 'next/link';
import { FaHome, FaSearch } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg text-base-content/70 mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="btn btn-primary gap-2"
          >
            <FaHome />
            Back to Home
          </Link>
          
          <Link 
            href="/contact" 
            className="btn btn-outline gap-2"
          >
            <FaSearch />
            Need Help?
          </Link>
        </div>
      </div>
    </div>
  );
}