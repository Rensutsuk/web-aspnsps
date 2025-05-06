import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-100 pt-8">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-16">About Our Parish</h1>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <div className="space-y-10">
            <div className="prose max-w-none bg-base-200 p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Our History</h2>
              <p className="text-base leading-relaxed">
                From being a part of the Parish of Espiritu Santo, the newborn parish erected on August 28 1951 by His Eminence Manila Archbishop Gabriel Reyes and Fr. Candido Bernal was the first parish priest and was installed by Msgr. Narciso Gatpaydan, Vicar Forane of Espiritu Santo.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Fr. Bernal held his first public mass, &apos;Misa pro populo&apos; on October 4 1951 in a chapel that preceded the parish, the Resurreccion chapel. He rent temporarily in a dormitory in Simoun and Crisostomo streets.
              </p>
              <div className="flex justify-end mt-6">
                <a href="/about/history" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>

            <div className="prose max-w-none bg-base-200 p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-base leading-relaxed">
                We strive to be a welcoming community that celebrates God&apos;s love through worship, education, and service.
                Our mission is to spread the Gospel message and make disciples through active participation in the
                sacramental life of the Church.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body p-8">
                <h2 className="text-3xl font-bold mb-8">Meet Our Priests</h2>
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6 bg-base-100 p-4 rounded-lg">
                    <div className="avatar">
                      <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <Image
                          src="https://picsum.photos/200/200?random=2"
                          alt="Fr. John Smith"
                          className="object-cover"
                          width={200}
                          height={200} />
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold">Rev. Fr. John Smith</h3>
                      <p className="text-primary font-semibold mt-1">Parish Priest</p>
                      <p className="mt-3 text-base">Serving our parish since 2015, Fr. John leads our community with wisdom and compassion.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 bg-base-100 p-4 rounded-lg">
                    <div className="avatar">
                      <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <Image
                          src="https://picsum.photos/200/200?random=3"
                          alt="Fr. Michael Johnson"
                          className="object-cover"
                          width={200}
                          height={200}
                        />
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold">Rev. Fr. Michael Johnson</h3>
                      <p className="text-primary font-semibold mt-1">Assistant Priest</p>
                      <p className="mt-3 text-base">Fr. Michael focuses on youth ministry and family pastoral care.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 bg-base-100 p-4 rounded-lg">
                    <div className="avatar">
                      <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <Image
                          src="https://picsum.photos/200/200?random=4"
                          alt="Fr. Robert Davis"
                          className="object-cover"
                          width={200}
                          height={200} />
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold">Rev. Fr. Robert Davis</h3>
                      <p className="text-primary font-semibold mt-1">Assistant Priest</p>
                      <p className="mt-3 text-base">Fr. Robert specializes in marriage counseling and adult faith formation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/800/600?random=1"
                alt="Church Building"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-2xl font-bold">Our Church Building</h3>
                  <p className="text-white/90">Established 1995</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}