import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.18.22", "*.ngrok-free.dev", "*.ngrok-free.app"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(self)",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/talk-to-strangers/omegle-alternative",
        destination: "/talk-to-strangers/omegle",
        permanent: true,
      },
      {
        source: "/talk-to-strangers/omegle-alternative/:path*",
        destination: "/talk-to-strangers/omegle/:path*",
        permanent: true,
      },
      {
        source: "/talk-to-strangers/monkey-alternative",
        destination: "/talk-to-strangers/monkey-app",
        permanent: true,
      },
      {
        source: "/talk-to-strangers/monkey",
        destination: "/talk-to-strangers/monkey-app",
        permanent: true,
      },
      {
        source: "/talk-to-strangers/emerald-chat",
        destination: "/talk-to-strangers/emerald",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
