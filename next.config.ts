// @ts-ignore
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false, // Força a ativação
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Se houver outras configs aqui, mantenha-as
};

export default withPWA(nextConfig);