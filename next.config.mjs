/** @type {import('next').NextConfig} */
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  output: "standalone",
};

export default withPWA(nextConfig);
