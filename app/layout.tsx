import { ServiceWorkerRegistration } from "../components/ServiceWorkerRegistration";
import { InstallPrompt } from "../components/InstallPrompt";

export const metadata = {
  title: "Pesquisa Bíblica",
  description: "Pesquisas Bíblicas Sem Viés. A Verdade da Palavra, com Clareza e Equilíbrio.",
  manifest: "/manifest.json",
  themeColor: "#d4af37",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    apple: "/icon-192x192.png",
  },
}; // <--- ESSA CHAVE AQUI ESTAVA FALTANDO!

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <ServiceWorkerRegistration />
        <InstallPrompt />
        {children}
      </body>
    </html>
  );
}