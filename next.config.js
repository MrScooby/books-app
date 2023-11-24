/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/books',
        permanent: false
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.lubimyczytac.pl' // TODO: move img to private host? s3?
        // port: ''
        // pathname: ''
      }
    ]
  }
}

module.exports = nextConfig
