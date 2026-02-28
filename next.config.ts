import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development" ? false : true, 
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {}, 
};

export default withPWA(nextConfig as any);