import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tailwindcss.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  output: "standalone",
  // Specify the root directory for Turbopack to avoid conflicts with multiple lockfiles
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
