import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tailwindcss.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  output: "standalone",
};

export default nextConfig;
