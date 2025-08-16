/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.app.goo.gl'],  // libera esse domínio
    // ou, para permitir múltiplos hosts de forma mais flexível:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',      // aceita qualquer subdomínio
        port: '',
        pathname: '/**',     // e qualquer caminho
      },
    ],
  },
};

module.exports = nextConfig;
