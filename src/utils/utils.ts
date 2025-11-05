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

export { getImagePrefix };
 
