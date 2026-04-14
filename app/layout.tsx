import { ServiceWorkerRegistration } from "../components/ServiceWorkerRegistration";

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
        {children}
      </body>
    </html>
  );
}
