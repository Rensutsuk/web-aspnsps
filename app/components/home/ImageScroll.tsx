import Image from "next/image";

export default function ImageScroll() {
  const images1 = [
    "/img/home/carousel-1/0.jpg",
    "/img/home/carousel-1/1.jpg",
    "/img/home/carousel-1/2.jpg",
    "/img/home/carousel-1/3.jpg",
    "/img/home/carousel-1/4.jpg",
    "/img/home/carousel-1/5.jpg",
    "/img/home/carousel-1/6.jpg",
    "/img/home/carousel-1/7.jpg"
  ];
  
  const images2 = [
    "/img/home/carousel-2/0.jpg",
    "/img/home/carousel-2/1.jpg",
    "/img/home/carousel-2/2.jpg",
    "/img/home/carousel-2/3.jpg",
    "/img/home/carousel-2/4.jpg",
    "/img/home/carousel-2/5.jpg",
    "/img/home/carousel-2/6.jpg",
    "/img/home/carousel-2/7.jpg"
  ];

  return (
    <div className=" min-h-screen overflow-hidden bg-base-100 content-center">
      <h2 className="text-3xl font-bold text-center mb-8">Moments in Images</h2>
      <div className="flex animate-scroll space-x-4 mb-8">
        {[...images1, ...images1].map((imageUrl1, index) => (
          <div key={index} className="flex-none w-64 h-48">
            <Image
              src={imageUrl1}
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