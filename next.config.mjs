/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/servus" : "";

const nextConfig = {
  // Use the repository name as basePath when deploying to GitHub Pages
  basePath: basePath,
  assetPrefix: isProd ? "/servus/" : "",
  // Removed output: "export" to support API routes
  // Use static export only if you don't need API routes
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath || "",
  },
};

export default nextConfig;

 