import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      { hostname: "raw.githubusercontent.com" },
      { hostname: "archives.bulbagarden.net" },
    ],
    unoptimized: true,
    minimumCacheTTL: 2678400,
  },
};

export default withNextIntl(nextConfig);
