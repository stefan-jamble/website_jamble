import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jamble-test.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
