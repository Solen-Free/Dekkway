import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['127.0.0.1', 'localhost', 'api.dekkway.com'], // Ajoutez votre domaine de production ici
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
