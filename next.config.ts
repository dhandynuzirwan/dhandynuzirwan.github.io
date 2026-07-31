import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Biarkan kosong. Vercel & Next.js 16 sudah pintar.
};

export default nextConfig;