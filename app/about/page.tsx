import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-100 pt-8">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-16 text-primary dark:text-primary-content">About Our Parish</h1>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <div className="space-y-10">
            <div className="prose max-w-none bg-base-200 dark:bg-base-200/60 p-8 rounded-xl shadow-lg dark:shadow-primary/10">
              <h2 className="text-3xl font-bold mb-6 text-primary dark:text-primary-content">Our History</h2>
              <p className="text-base text-justify leading-relaxed text-base-content">
                From being a part of the Parish of Espiritu Santo, the newborn parish erected on August 28 1951 by His Eminence Manila Archbishop Gabriel Reyes and Fr. Candido Bernal was the first parish priest and was installed by Msgr. Narciso Gatpaydan, Vicar Forane of Espiritu Santo.
              </p>
              <p className="text-base text-justify leading-relaxed mt-4 text-base-content">
                Fr. Bernal held his first public mass, &apos;Misa pro populo&apos; on October 4 1951 in a chapel that preceded the parish, the Resurreccion chapel. He rent temporarily in a dormitory in Simoun and Crisostomo streets.
              </p>
              <div className="flex justify-end mt-6">
                <a href="/about/history" className="btn btn-primary hover:bg-primary-focus transition-colors">
                  Read More
                </a>
              </div>
            </div>

            <div className="prose max-w-none bg-base-200 dark:bg-base-200/60 p-8 rounded-xl shadow-lg dark:shadow-primary/10">
              <h2 className="text-3xl font-bold mb-6 text-primary dark:text-primary-content">Our Mission</h2>
              <p className="text-base text-justify leading-relaxed text-base-content">
                The Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro stands in the midst of the City of Manila as a religious sanctuary, inviting devotees and pilgrims from all walks of life to reflection, renewal, and reconciliation. As a house of prayer, the Shrine offers individuals, as well as groups of the faithful, opportunities for the celebration of the faith and an environment conducive to personal example of the Blessed Virgin Mary, recounted in word and art, becomes an important and effective instrument to inspire, encourage and strengthen faith among the faithful.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="card bg-base-200 dark:bg-base-200/60 shadow-xl dark:shadow-primary/10 hover:shadow-2xl dark:hover:shadow-accent/10 transition-all duration-300">
              <div className="card-body p-8">
                <h2 className="text-3xl font-bold mb-8 text-primary dark:text-primary-content">Meet Our Priests</h2>
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6 bg-base-100 dark:bg-neutral/40 p-4 rounded-lg border border-base-300/40 dark:border-primary/20">
                    <div className="avatar">
                      <div className="w-32 h-32 rounded-full ring ring-primary dark:ring-primary-content ring-offset-base-100 dark:ring-offset-neutral ring-offset-2">
                        <Image
                          src="/img/about/priest/fr-tony.jpg"
                          alt="Rev. Fr. Antonio V. Navarette Jr."
                          className="object-cover"
                          width={200}
                          height={200} />
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-base-content dark:text-primary-content">Rev. Fr. Antonio V. Navarette Jr.</h3>
                      <p className="text-primary dark:text-accent font-semibold mt-1">Rector and Parish Priest</p>
                      <p className="mt-3 text-base text-base-content dark:text-base-content/90">Serving our shrine community since 2021. Fr. Tony leads our community with wisdom and compassion.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 bg-base-100 dark:bg-neutral/40 p-4 rounded-lg border border-base-300/40 dark:border-primary/20">
                    <div className="avatar">
                      <div className="w-32 h-32 rounded-full ring ring-primary dark:ring-primary-content ring-offset-base-100 dark:ring-offset-neutral ring-offset-2">
                        <Image
                          src="https://picsum.photos/200/200?random=3"
                          alt="Fr. Jasper"
                          className="object-cover"
                          width={200}
                          height={200}
                        />
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-base-content dark:text-primary-content">Rev. Fr. Jasper Rellesiva</h3>
                      <p className="text-primary dark:text-accent font-semibold mt-1">Guest Priest</p>
                      <p className="mt-3 text-base text-base-content dark:text-base-content/90">Fr. Michael focuses on youth ministry and family pastoral care.</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 bg-base-100 dark:bg-neutral/40 p-4 rounded-lg border border-base-300/40 dark:border-primary/20">
                    <div className="avatar">
                      <div className="w-32 h-32 rounded-full ring ring-primary dark:ring-primary-content ring-offset-base-100 dark:ring-offset-neutral ring-offset-2">
                        <Image
                          src="https://picsum.photos/200/200?random=4"
                          alt="Fr. Robert"
                          className="object-cover"
                          width={200}
                          height={200} />
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-base-content dark:text-primary-content">Rev. Fr. Robert Young</h3>
                      <p className="text-primary dark:text-accent font-semibold mt-1">Guest Priest</p>
                      <p className="mt-3 text-base text-base-content dark:text-base-content/90">Fr. Robert specializes in marriage counseling and adult faith formation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl dark:shadow-accent/10">
              <Image
                src="/img/about/church-building.jpg"
                alt="Church Building"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent">
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-primary-content text-2xl font-bold drop-shadow-md">Our Church Building</h3>
                  <p className="text-primary-content/90 drop-shadow">Established 1951</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}