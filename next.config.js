/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.lubimyczytac.pl'
      }
    ]
  }
}

module.exports = nextConfig
