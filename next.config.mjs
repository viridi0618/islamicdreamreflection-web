/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Custom build directory so local builds can run even if a stale/corrupt
  // .next folder exists on the developer machine. Git ignores both names.
  distDir: process.env.NEXT_DIST_DIR || ".next"
};

export default nextConfig;
