const getImagePrefix = () => {
  // Mirror Next.js basePath for GitHub Pages deployment
  return process.env.NODE_ENV === "production" ? "/servus/" : "";
};

export { getImagePrefix };
 
