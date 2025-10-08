import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gv0zzhe6ot.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ],
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
