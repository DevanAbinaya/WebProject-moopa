/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  fallbacks: {
    image: '/images/fallback.png'
  }
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['tenor.com'],
    unoptimized: true,
  },
  trailingSlash: true,
});
