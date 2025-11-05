const getImagePrefix = () => {
  // Mirror Next.js basePath for GitHub Pages deployment
  // Use NEXT_PUBLIC_BASE_PATH if available, otherwise check NODE_ENV
  if (typeof window !== "undefined") {
    // Client-side: check if we're on GitHub Pages
    const pathname = window.location.pathname;
    if (pathname.startsWith("/servus")) {
      return "/servus";
    }
    return "";
  }
  // Server-side/build time: use environment variable or default
  return process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === "production" ? "/servus" : "");
};

export { getImagePrefix };
 
