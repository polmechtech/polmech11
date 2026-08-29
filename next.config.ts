import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "polmech11-tjvs.vercel.app" }],
        destination: "https://polmech.tech/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
