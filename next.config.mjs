/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/my", destination: "/", statusCode: 301 },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
