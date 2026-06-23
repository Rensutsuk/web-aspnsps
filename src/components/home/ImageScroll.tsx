import Image from "next/image";

import { Box, Container, Heading, HStack } from "@chakra-ui/react";

const images1 = [
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MuRPWdcytIDoBjJxUblWz0sKTOdm7Vr8fYgeS",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MhI7c1tB2LP0wvXgsoy3JMI8AC76aUrZl9hj5",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MbvH3QrGLyvMAWJhlH1NdjqYFIoKmBauPO9iE",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MHmvUqcs7GSuO350hliR2PAUkwfTqjWtKgBIo",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MbRGgq8LyvMAWJhlH1NdjqYFIoKmBauPO9iEG",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MJFco2OTYKcBRL9fkqIDG2Oaw35yPTnjubstm",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4Mgs1LEglHSDMKvlwETU9ZoedqL5sNt60CG2ck",
];

const images2 = [
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4Mizw2FLp17OxRSuEsaqPoyAVQFtZbBH86cXgT",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MydCOcNjlK2buxd4wvEI1Z59koYcp3QWTizh0",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MOHaKlYcM4sHVUCw9lm76LtyxGDIQ1j8TYWci",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MF8KJZNAPfiX2pgHcTSwVIv9310qorsmjWJYM",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MyStuqTjlK2buxd4wvEI1Z59koYcp3QWTizh0",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MYcARFLkzR7NTeLCiUXwZhScdqsvnHPlpIg4M",
  "https://gv0zzhe6ot.ufs.sh/f/qNNctTpmyN4MdqBPxNa37wO2WfNkVMC9uoFabIqnA4PUXDyK",
];

export function ImageScroll() {
  return (
    <Box minH="calc(100dvh - 64px)" bg="gray.100" _dark={{ bg: "gray.800" }} display="flex" alignItems="center">
      <Container maxW="6xl" py={{ base: 10, md: 16 }}>
        <Heading textAlign="center" mb={8}>
          Moments in Images
        </Heading>

        <Box overflow="hidden">
          <HStack spacing={4} className="aspnsps-animate-scroll" mb={8}>
            {[...images1, ...images1].map((src, index) => (
              <Box key={`r1-${index}`} flex="none" w="256px" h="192px" position="relative">
                <Image
                  src={src}
                  alt={`Gallery image ${(index % 8) + 1}`}
                  fill
                  style={{ objectFit: "cover", borderRadius: "12px" }}
                  priority
                />
              </Box>
            ))}
          </HStack>

          <HStack spacing={4} className="aspnsps-animate-scroll-reverse">
            {[...images2, ...images2].map((src, index) => (
              <Box key={`r2-${index}`} flex="none" w="256px" h="192px" position="relative">
                <Image
                  src={src}
                  alt={`Gallery image ${(index % 8) + 9}`}
                  fill
                  style={{ objectFit: "cover", borderRadius: "12px" }}
                  priority
                />
              </Box>
            ))}
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}

