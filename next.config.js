/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'tenor.com'
    ],
    unoptimized: true
  },
  trailingSlash: true
}

module.exports = nextConfig;
