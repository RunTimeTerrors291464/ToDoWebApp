import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend-container:3001/api/:path*', // tên service hoặc container backend trong cùng network
      },
    ];
  },
};

export default nextConfig;
