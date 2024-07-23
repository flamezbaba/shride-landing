/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true }, 
    // assetPrefix: '/kkk'
    // basePath: "",
    // skipTrailingSlashRedirect: true,
    trailingSlash: true
};

export default nextConfig;
