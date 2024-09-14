/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH,
  swcMinify: true,
  experimental: {
    cpus: 8
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/note',
        permanent: true
      }
    ]
  }
}

export default nextConfig
