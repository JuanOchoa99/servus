const getImagePrefix = () => {
  // Mirror Next.js basePath for GitHub Pages deployment
  // NEXT_PUBLIC_BASE_PATH is set in next.config.mjs and available at build time
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  
  // Return basePath with trailing slash if it exists, or "/" for development
  // This ensures paths work in both dev (/) and prod (/servus/)
  return basePath ? `${basePath}/` : "/";
};

export { getImagePrefix };
 
