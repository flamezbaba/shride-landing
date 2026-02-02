/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.shrideapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shrideapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shrideapp.com.ng",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.0.102",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 31536000,
  },
  // images: { unoptimized: true },
  // assetPrefix: '/kkk'
  // basePath: "",
  // skipTrailingSlashRedirect: true,
  trailingSlash: true,
};

export default nextConfig;
