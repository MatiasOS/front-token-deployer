/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/deployer',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
