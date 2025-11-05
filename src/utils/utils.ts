const getImagePrefix = () => {
  // Mirror Next.js basePath for GitHub Pages deployment
  // NEXT_PUBLIC_BASE_PATH is set in next.config.mjs and available at build time
  // This ensures images work correctly in both development and production
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  
  // Return basePath with trailing slash if it exists, or empty string
  // Image paths already start with /, so we need basePath/ to avoid double slashes
  return basePath ? `${basePath}/` : "";
};

export { getImagePrefix };
 
