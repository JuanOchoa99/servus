/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
// Check if we're on Vercel (Vercel automatically provides VERCEL environment variable)
const isVercel = process.env.VERCEL === "1";
// Use basePath only for GitHub Pages, not for Vercel
const basePath = (isProd && !isVercel) ? "/servus" : "";
// Use static export only for GitHub Pages (without API routes)
// Set ENABLE_STATIC_EXPORT=true for GitHub Pages deployment
const enableStaticExport = process.env.ENABLE_STATIC_EXPORT === "true";

const nextConfig = {
  // Use the repository name as basePath when deploying to GitHub Pages
  // Vercel doesn't need basePath - it handles routing automatically
  basePath: basePath,
  assetPrefix: (isProd && !isVercel) ? "/servus/" : "",
  // Static export for GitHub Pages (API routes won't work)
  // Remove this line or set ENABLE_STATIC_EXPORT=false to use API routes with Vercel/Node.js
  ...(enableStaticExport && { output: "export" }),
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath || "",
    // External API URL for static export (GitHub Pages)
    // Set this to your serverless functions URL (e.g., Vercel)
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  },
};

export default nextConfig;

 