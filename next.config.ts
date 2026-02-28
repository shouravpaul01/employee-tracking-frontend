import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
 
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {}, // optional, silences Turbopack warning
  outputFileTracingRoot: __dirname, // solves lockfile root warning
};

export default withPWA(withPWA as any);