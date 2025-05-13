import Image from 'next/image';

export default function Hero() {
  return (
    <div className="hero min-h-screen relative">
      <div className="relative w-full">
        <Image 
          src="/img/home/hero.jpg"
          alt="Church"
          className="w-full h-screen object-cover"
          objectFit='cover'
          width={1440}
          height={1080}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>
      
      <div className="absolute inset-0 flex flex-col lg:flex-row lg:items-center px-4 sm:px-8 lg:px-12">
        <div className="max-w-xl text-left text-white w-full lg:w-1/2 mt-24 sm:mt-32 lg:mt-0 flex flex-col h-full lg:h-auto justify-between">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-100">
              Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-200">
              Welcome to our parish community. Join us in prayer and worship.
            </p>
          </div>
          <div className="mt-12 sm:mt-16 mb-20 sm:mb-24 lg:mb-0">
            <a href="/services" className="btn btn-primary text-white hover:text-amber-100 text-sm sm:text-base lg:btn-lg">
              Services Offered
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}