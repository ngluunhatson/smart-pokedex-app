import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

export default withNextIntl(nextConfig);
