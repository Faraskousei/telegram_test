/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'api.telegram.org'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
  },
  // Force dynamic rendering for API routes
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig
