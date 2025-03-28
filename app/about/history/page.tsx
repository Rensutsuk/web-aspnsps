import Image from "next/image";

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-base-100 pt-8">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-16">Parish History</h1>

        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-12">
            <Image
              src="https://picsum.photos/1200/800?random=1"
              alt="Historical Church Photo"
              className="w-full h-full object-cover"
              width={1200}
              height={800}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-3xl font-bold">Our Journey Through Time</h2>
                <p className="text-lg">Since 1951</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="https://picsum.photos/600/400?random=2"
                  alt="1951 Establishment"
                  className="w-full h-full object-cover"
                  width={600}
                  height={400}
                />
              </div>
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold">1951: The Foundation</h3>
                <p>
                  From being a part of the Parish of Espiritu Santo, the newborn parish was erected on August 28, 1951, by His Eminence Manila Archbishop Gabriel Reyes. Fr. Candido Bernal was installed as the first parish priest by Msgr. Narciso Gatpaydan.
                </p>
                <p>
                  The present site, formerly a 13-hectare lot called &apos;Lumang Tinapay&apos;, was a swampy area where grass and kangkong thrived. The parish began with a small wooden chapel, funded by an initial P5000 from Archbishop Gabriel Reyes.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="prose max-w-none md:order-2">
                <h3 className="text-2xl font-bold">1966-1969: Growth and Development</h3>
                <p>
                  The cornerstone laying of the permanent church was officiated by the first Filipino prince of the church, Archbishop Rufino Cardinal Santos on November 20, 1966.
                </p>
                <p>
                  During the construction, Fr. Bernal established the community structure and strengthened formation programs. His dedication led to his appointment as Privy Chamberlain on June 29, 1969.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden md:order-1">
                <Image
                  src="https://picsum.photos/600/400?random=3"
                  alt="Church Construction"
                  className="w-full h-full object-cover"
                  width={600}
                  height={400}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="https://picsum.photos/600/400?random=4"
                  alt="1970s Era"
                  className="w-full h-full object-cover"
                  width={600}
                  height={400}
                />
              </div>
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold">1970-1976: Expansion and Celebration</h3>
                <p>
                  In 1970, the parochial boundaries were redefined between NSPS of Manila and Sta. Teresita Parish in Quezon City. The parish celebrated its Silver Jubilee on October 4, 1976, with Cardinal Jaime Sin officiating the thanksgiving mass.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="prose max-w-none md:order-2">
                <h3 className="text-2xl font-bold">1984-1989: Further Development</h3>
                <p>
                  Construction of the multi-purpose center began in 1984 and was completed in 1988. In 1989, Fr. Bernal retired after 38 years of service. Fr. Honorato Nadua became the second parish priest, initiating the construction of the rectory and Adoration Chapel.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden md:order-1">
                <Image
                  src="https://picsum.photos/600/400?random=5"
                  alt="Multi-purpose Center"
                  className="w-full h-full object-cover"
                  width={600}
                  height={400}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="https://picsum.photos/600/400?random=6"
                  alt="Modern Era"
                  className="w-full h-full object-cover"
                  width={600}
                  height={400}
                />
              </div>
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold">2001-Present: Modern Era</h3>
                <p>
                  The parish celebrated its Golden Jubilee on October 6, 2001, with Bishop Teodoro Buhain presiding. In 2005, the Nuestra Senora Del Perpetuo Socorro Foundation was established to provide scholarships and conduct community development programs.
                </p>
                <p>
                  Since 2006, Fr. Jerome Secillano, the 4th pastor, has been leading the parish&apos;s continued growth and development.
                </p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-16 text-center">
            <a href="/about" className="btn btn-primary">
              Back to About
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}