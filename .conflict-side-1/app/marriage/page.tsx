import Image from 'next/image';

export default function Marriage() {
  return (
    <div className="min-h-screen bg-base-100 pt-8">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-8">Church Marriage</h1>
        <p className="text-center text-lg mb-16 max-w-3xl mx-auto">
          The Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro offers wedding services for couples seeking the sacrament of matrimony.
        </p>

        {/* Hero Image */}
        <div className="relative w-full h-[400px] mb-16 rounded-xl overflow-hidden shadow-xl">
          <Image 
            src="https://picsum.photos/1200/400?random=1" 
            alt="Church Wedding" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h2 className="text-3xl font-bold">Begin Your Journey Together</h2>
              <p className="text-xl">In the presence of God and your loved ones</p>
            </div>
          </div>
        </div>

        {/* Basic Requirements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Wedding Basic Requirements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-base-200 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Required Documents</h3>
              <ul className="space-y-3 list-disc list-inside">
                <li>New copy of <strong>Baptismal and Confirmation certificates</strong> (valid for 6 months) with annotation "FOR MARRIAGE PURPOSES ONLY"</li>
                <li>PSA Certificate of Live Birth</li>
                <li>PSA Certificate of No Marriage (CENOMAR)</li>
                <li>Marriage License from Civil Registry (valid for 120 days)</li>
                <li>Certificate of Freedom to Marry (for Filipinos living abroad)</li>
                <li>Certificate of attendance in Pre-Cana Seminar</li>
                <li>List of names and addresses of sponsors (1-6 pairs)</li>
              </ul>
            </div>
            
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-md">
              <Image 
                src="https://picsum.photos/600/300?random=2" 
                alt="Wedding Documents" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Special Cases Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Special Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-md order-2 md:order-1">
              <Image 
                src="https://picsum.photos/600/300?random=3" 
                alt="Special Wedding Cases" 
                fill 
                className="object-cover"
              />
            </div>
            
            <div className="bg-base-200 p-6 rounded-xl shadow-md order-1 md:order-2">
              <h3 className="text-xl font-bold mb-4">Additional Requirements</h3>
              
              <div className="mb-4">
                <h4 className="font-bold">For Mixed Marriages (Catholic & Non-Catholic):</h4>
                <ul className="list-disc list-inside">
                  <li>Certificate of freedom to marry from Non-Catholic Minister</li>
                  <li>Promise for Mixed Marriage Form</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold">For Filipino & Foreigner:</h4>
                <ul className="list-disc list-inside">
                  <li>Clearance from Chancery Office of the Archdiocese</li>
                  <li>Certificate of freedom to marry from foreigner's parish</li>
                  <li>Legal capacity to marry from foreigner's consulate</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold">Other Special Cases:</h4>
                <ul className="list-disc list-inside">
                  <li>Widowers/widows: Death Certificate of deceased partner</li>
                  <li>Military personnel: Certification of Freedom to Marry</li>
                  <li>Annulled marriages: Document of Nullity and approval letter</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Rules and Fees Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Rules and Fees</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-base-200 p-6 rounded-xl shadow-md col-span-1 lg:col-span-2">
              <h3 className="text-xl font-bold mb-4">Important Rules</h3>
              
              <ul className="space-y-3 list-disc list-inside">
                <li>Reservation requires ₱2,000 non-refundable down payment</li>
                <li>Punctuality is strictly enforced:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li>15 minutes late: No choir</li>
                    <li>30 minutes late: No homily</li>
                    <li>45 minutes late: Marriage rites only (no Mass)</li>
                    <li>1 hour late: Additional conditions apply</li>
                  </ul>
                </li>
                <li>Required documents must be completed 2 weeks before wedding</li>
                <li>Throwing rice, confetti, etc. inside church is not allowed</li>
                <li>Only liturgical songs and melodies are permitted</li>
                <li>Photographers must secure permits and follow church protocols</li>
                <li>Wedding coordinators must coordinate with Church Wedding Coordinator</li>
              </ul>
            </div>
            
            <div className="bg-primary text-primary-content p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Wedding Package</h3>
              <p className="text-3xl font-bold mb-4">₱20,000</p>
              
              <h4 className="font-bold mb-2">Includes:</h4>
              <ul className="space-y-2 list-disc list-inside">
                <li>Flower decoration</li>
                <li>Soloist singer</li>
                <li>Ushers and Altar servers</li>
                <li>Priest celebrant</li>
                <li>Wedding chairs with kneeler</li>
                <li>Sound system (4 microphones)</li>
                <li>Big ceiling fans</li>
                <li>Registration of Marriage Contract</li>
              </ul>
              
              <div className="mt-6 pt-4 border-t border-primary-content/30">
                <p className="font-bold">Additional Fees:</p>
                <p>₱1,000 per additional sponsor pair (beyond 6 pairs)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Wedding Entourage Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Wedding Entourage</h2>
          
          <div className="relative w-full h-[500px] mb-8 rounded-xl overflow-hidden shadow-xl">
            <Image 
              src="https://picsum.photos/1200/500?random=4" 
              alt="Wedding Entourage" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/30 flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Standard Seating Arrangement</h3>
                <p>Traditional layout for your wedding ceremony</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-base-200 p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-3">Principal Participants</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Bride & Groom</span></li>
                <li><span className="font-medium">Parents of the Bride & Groom</span></li>
                <li><span className="font-medium">Maid of Honor & Best Man</span></li>
              </ul>
            </div>
            
            <div className="bg-base-200 p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-3">Wedding Party</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Bridesmaids & Groomsmen</span></li>
                <li><span className="font-medium">Flower Girls</span></li>
                <li><span className="font-medium">Ring Bearer</span></li>
                <li><span className="font-medium">Coin Bearer</span></li>
              </ul>
            </div>
            
            <div className="bg-base-200 p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-3">Secondary Sponsors</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Candle Sponsors</span></li>
                <li><span className="font-medium">Veil Sponsors</span></li>
                <li><span className="font-medium">Cord Sponsors</span></li>
                <li><span className="font-medium">Principal Sponsors (Ninongs & Ninangs)</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Contact Information</h2>
          
          <div className="bg-base-200 p-8 rounded-xl shadow-md max-w-2xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Parish Office</h3>
              <p className="mb-1">2042 Calamba corner Instruccion St., Sampaloc, Manila</p>
              <p className="mb-1">Tel no.: 8741-8010</p>
              <p className="mb-1">Office Hours: Tuesday to Sunday, 8:00am to 12nn | 2:00pm to 6:00pm</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Church Wedding Coordinator</h3>
              <p className="mb-1">Mr. Edward Cornel</p>
              <p className="mb-1">0945-2148307</p>
              <p><a href="https://www.facebook.com/EJC24" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Facebook: EJC24</a></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}