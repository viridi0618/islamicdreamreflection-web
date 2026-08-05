import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // The web app shares a repo root with the data layer (which has its own
  // package-lock.json). Pin the tracing root to the repo root to silence the
  // "inferred workspace root" warning and keep build traces correct.
  outputFileTracingRoot: path.join(__dirname, "..")
};

export default nextConfig;
