/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Use the repository name as basePath when deploying to GitHub Pages
  basePath: isProd ? "/servus" : "",
  assetPrefix: isProd ? "/servus/" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

 