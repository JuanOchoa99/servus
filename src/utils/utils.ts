const getImagePrefix = () => {
  // Check if we're in the browser
  if (typeof window !== "undefined") {
    // Client-side: check the pathname or hostname to determine if we're on GitHub Pages
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;
    
    // If we're on GitHub Pages (github.io) or pathname starts with /servus, use /servus/
    if (hostname.includes("github.io") || pathname.startsWith("/servus")) {
      return "/servus/";
    }
    return "/";
  }
  
  // Server-side/build time: use environment variable
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // Ensure basePath has trailing slash if it exists
  return basePath ? `${basePath}${basePath.endsWith("/") ? "" : "/"}` : "/";
};

/**
 * Get the API base URL for calendar endpoints
 * If NEXT_PUBLIC_API_URL is set, use it (for external serverless functions)
 * Otherwise, use relative path with basePath if needed (for Next.js API routes)
 */
const getApiUrl = (): string => {
  // Check if external API URL is configured (for GitHub Pages with external serverless functions)
  if (typeof window !== "undefined") {
    const externalApiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (externalApiUrl) {
      return externalApiUrl.replace(/\/$/, ''); // Remove trailing slash
    }
    
    // Use basePath if configured (for GitHub Pages)
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    if (basePath) {
      return basePath;
    }
  }
  
  // Use relative path for Next.js API routes (works in development and on platforms like Vercel)
  // This will use '' (empty string) which means relative paths like '/api/...'
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return basePath;
};

export { getImagePrefix, getApiUrl };
 
