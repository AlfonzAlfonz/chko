const { withSentryConfig } = require("@sentry/nextjs");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core"],
  },
  images: {
    imageSizes: [1280],
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

module.exports = withBundleAnalyzer(module.exports);
