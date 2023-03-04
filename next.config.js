/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
});

module.exports = withPWA({
  reactStrictMode: false,
  images: {
    domains: ["tenor.com"],
    unoptimized: true,
  },
  trailingSlash: true,
});
