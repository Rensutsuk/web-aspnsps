import Image from "next/image";

export default function ImageScroll() {
  const images1 = [
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MuRPWdcytIDoBjJxUblWz0sKTOdm7Vr8fYgeS",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MhI7c1tB2LP0wvXgsoy3JMI8AC76aUrZl9hj5",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MbvH3QrGLyvMAWJhlH1NdjqYFIoKmBauPO9iE",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MHmvUqcs7GSuO350hliR2PAUkwfTqjWtKgBIo",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MbRGgq8LyvMAWJhlH1NdjqYFIoKmBauPO9iEG",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MJFco2OTYKcBRL9fkqIDG2Oaw35yPTnjubstm",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4Mgs1LEglHSDMKvlwETU9ZoedqL5sNt60CG2ck"
  ];
  
  const images2 = [
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4Mizw2FLp17OxRSuEsaqPoyAVQFtZbBH86cXgT",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MydCOcNjlK2buxd4wvEI1Z59koYcp3QWTizh0",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MOHaKlYcM4sHVUCw9lm76LtyxGDIQ1j8TYWci",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MF8KJZNAPfiX2pgHcTSwVIv9310qorsmjWJYM",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MyStuqTjlK2buxd4wvEI1Z59koYcp3QWTizh0",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MYcARFLkzR7NTeLCiUXwZhScdqsvnHPlpIg4M",
    "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MdqBPxNa37wO2WfNkVMC9uoFabIqnA4PUXDyK"
  ];

  return (
    <div className="min-h-[calc(100vh-128px)] overflow-hidden content-center bg-base-200">
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
              priority
              quality={75}
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
              priority
              quality={75}
            />
          </div>
        ))}
      </div>
    </div>
  );
}