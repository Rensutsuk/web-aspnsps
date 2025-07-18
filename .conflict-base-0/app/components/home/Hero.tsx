import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/img/home/hero.jpg"
          alt="Church"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/100 via-white/30 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="transform translate-y-40">
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-grey mb-2 sm:mb-4">
            Mary: A Haven of Hope for Families
          </h1>
          <p className="text-lg sm:text-xl md:text-xl lg:text-2xl text-grey mx-auto">
            Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro
          </p>
        </div>
      </div>
    </div>
  );
}