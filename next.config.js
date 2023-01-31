/** @type {import('next').NextConfig} */

const NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tenor.com"],
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = NextConfig;
