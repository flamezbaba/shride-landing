/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: { unoptimized: true }, 
    // assetPrefix: '/kkk'
    // basePath: "",
    // skipTrailingSlashRedirect: true,
    trailingSlash: true
};

export default nextConfig;
