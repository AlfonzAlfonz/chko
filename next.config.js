const { withSentryConfig } = require("@sentry/nextjs");

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

module.exports = withSentryConfig(
  module.exports,
  {
    silent: true,
    org: "denis-homolik",
    project: "jakstavetvkrajine",
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  }
);
