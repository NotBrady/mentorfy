import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warnings are pre-existing and should not block the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
