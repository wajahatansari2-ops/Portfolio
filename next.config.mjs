/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Three.js is transpiled for better tree-shaking
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Aggressive code-splitting + compression for high Lighthouse scores
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
