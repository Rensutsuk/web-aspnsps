import { FaFacebook, FaCross, FaInstagram, FaTiktok, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <aside className="flex items-center gap-2">
        <FaCross size={24} className="fill-current" />
        <p>
          ASPNSPS
          <br />
          Serving the community since 1992
        </p>
      </aside>
      
      <nav>
        <h6 className="footer-title">Contact</h6>
        <div className="space-y-2">
          <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
            <FaPhone size={16} />
            <span>(123) 456-7890</span>
          </a>
          <a href="mailto:nsps_parish@yahoo.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <FaEnvelope size={16} />
            <span>nsps_parish@yahoo.com</span>
          </a>
        </div>
      </nav>

      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.facebook.com/aspnspsofficial" className="hover:text-primary transition-colors">
            <FaFacebook size={24} />
          </a>
          <a href="https://instagram.com/aspnspsofficial" className="hover:text-pink-400 transition-colors">
            <FaInstagram size={24} />
          </a>
          <a href="https://tiktok.com/@aspnspsofficial" className="hover:text-indigo-400 transition-colors">
            <FaTiktok size={24} />
          </a>
        </div>
      </nav>
    </footer>
  );
}