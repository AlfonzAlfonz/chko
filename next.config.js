/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fhg3p9dzdc6eo4av.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
