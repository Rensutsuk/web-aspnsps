import Link from 'next/link';
import { FaFacebook, FaCross, FaInstagram, FaTiktok, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-6 w-full">
      <aside className="flex items-center gap-2">
        <FaCross size={24} className="fill-current" />
        <p>
          ASPNSPS
          <br />
          Serving the community since 1992
        </p>
      </aside>
      
      <nav>
        <h1 className="footer-title">Contact</h1>
        <div className="space-y-2">
          <a href="tel:8741-8010" className="flex items-center gap-2 hover:text-primary transition-colors">
            <FaPhone size={16} />
            <span>8741-8010</span>
          </a>
          <a href="mailto:nsps_parish@yahoo.com" className="flex items-center gap-2 hover:text-primary transition-colors" aria-label="Email">
            <FaEnvelope size={16} />
            <span>nsps_parish@yahoo.com</span>
          </a>
        </div>
      </nav>

      <nav>
        <h1 className="footer-title">Donate</h1>
        <Link href="/donate" className="link link-hover">
          Support Our Parish
        </Link>
      </nav>

      <nav>
        <h1 className="footer-title">Social</h1>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.facebook.com/aspnspsofficial" className="hover:text-primary transition-colors" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="https://instagram.com/aspnspsofficial" className="hover:text-pink-400 transition-colors" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href="https://tiktok.com/@aspnspsofficial" className="hover:text-indigo-400 transition-colors" aria-label="TikTok">
            <FaTiktok size={24} />
          </a>
        </div>
      </nav>
    </footer>
  );
}