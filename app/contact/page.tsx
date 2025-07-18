'use client';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: '573083e4-de82-430c-bf51-6113280f110f',
          ...formData
        })
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        // Auto hide success modal after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left column with contact info */}
          <div className="space-y-8">
            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <a href="tel:8741-8010" className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-300 transition-all">
                    <FaPhone className="text-2xl text-primary" />
                    <div>
                      <p className="font-semibold text-lg">Phone</p>
                      <p className="text-base-content/80">8741-8010</p>
                    </div>
                  </a>

                  <a href="mailto:nsps_parish@yahoo.com" className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-300 transition-all">
                    <FaEnvelope className="text-2xl text-primary" />
                    <div>
                      <p className="font-semibold text-lg">Email</p>
                      <p className="text-base-content/80">nsps_parish@yahoo.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-2xl text-primary" />
                    <div>
                      <p className="font-semibold text-lg">Address</p>
                      <p className="text-base-content/80">2042 Calamba cor. Instruccion Street</p>
                      <p className="text-base-content/80">Sampaloc, Manila</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">
                  <FaCalendarAlt className="text-primary" />
                  Office Hours
                </h2>
                <div className="grid gap-4">
                  <div className="card bg-base-100 shadow-sm">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="badge badge-primary">Weekdays</div>
                        <h3 className="font-semibold">Tuesday - Sunday</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FaClock className="h-5 w-5 text-primary" />
                          <span>Morning: 8:00 AM - 12:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaClock className="h-5 w-5 text-primary" />
                          <span>Afternoon: 2:00 PM - 6:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card bg-base-100 shadow-sm">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="badge badge-secondary">Closed</div>
                        <h3 className="font-semibold">Monday</h3>
                      </div>
                      <p className="text-base-content/70">Office is closed for administrative work</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column with form and map */}
          <div className="space-y-8">
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body p-8">
                <h2 className="card-title text-2xl mb-8">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered input-primary w-full"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Type your name here"
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered input-primary w-full"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Message</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered textarea-primary w-full"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>

                  {success && (
                    <div className="alert alert-success">
                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>Message sent successfully!</span>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg h-[400px] overflow-hidden">
              <div className="card-body p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d634.9244505982665!2d120.99152954538765!3d14.62210283546029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b6085d63588b%3A0xc7ac4767652ee41b!2sNuestra%20Se%C3%B1ora%20del%20Perpetuo%20Socorro%20Parish%20(Archdiocese%20of%20Manila)!5e0!3m2!1sen!2sph!4v1741163032322!5m2!1sen!2sph"
                  className="w-full h-full rounded-box"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <dialog className={`modal modal-bottom sm:modal-middle ${success ? 'modal-open' : ''}`}>
        <div className="modal-box bg-success text-success-content">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Message Sent Successfully!
          </h3>
          <p className="py-4">Thank you for contacting us. We&apos;ll get back to you soon.</p>
          <div className="modal-action">
            <button className="btn btn-ghost btn-sm" onClick={() => setSuccess(false)}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}