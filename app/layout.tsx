import { ServiceWorkerRegistration } from "../components/ServiceWorkerRegistration";
import { InstallPrompt } from "../components/InstallPrompt";

export const metadata = {
  title: "Pesquisa Bíblica",
  description: "Pesquisas Bíblicas Sem Viés",
  manifest: "/manifest.json",
};

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
