import Image from "next/image";

export default function ImageScroll() {
  const images1 = Array.from({ length: 8 }, (_, i) => `https://picsum.photos/800/600?random=${i + 1}`);
  const images2 = Array.from({ length: 8 }, (_, i) => `https://picsum.photos/800/600?random=${i + 9}`);

  return (
    <div className="py-12 overflow-hidden bg-base-100">
      <div className="flex animate-scroll space-x-4 mb-8">
        {[...images1, ...images1].map((imageUrl, index) => (
          <div key={index} className="flex-none w-64 h-48">
            <Image
              src={imageUrl}
              alt={`Gallery image ${(index % 8) + 1}`}
              className="w-full h-full object-cover rounded-lg"
              width={800}
              height={600}
            />
          </div>
        ))}
      </div>
      <div className="flex animate-scroll-reverse space-x-4">
        {[...images2, ...images2].map((imageUrl, index) => (
          <div key={index} className="flex-none w-64 h-48">
            <Image
              src={imageUrl}
              alt={`Gallery image ${(index % 8) + 9}`}
              className="w-full h-full object-cover rounded-lg"
              width={800}
              height={600}
            />
          </div>
        ))}
      </div>
    </div>
  );
}