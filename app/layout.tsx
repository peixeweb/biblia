import "./globals.css";
import { InstallPrompt } from "../components/InstallPrompt";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#d4af37",
};

export const metadata = {
  title: "Reflexão Bíblica Acadêmica | Estudos Profundos da BÍBLIA",
  description: "Portal especializado em exegese, linguística e história do Oriente Próximo.",
  authors: [{ name: "Peixeweb", url: "https://peixeweb.github.io/vendas_pela_internet/" }],
  keywords: ["BÍBLIA", "estudos bíblicos", "exegese", "história antiga"],
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <InstallPrompt />
        <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 1000, position: 'relative' }}>
          <span style={{ marginRight: '10px', fontSize: '14px', fontWeight: 500, color: '#333', fontFamily: "'Inter', sans-serif" }}>Desenvolvido por</span>
          <a href="https://peixeweb.github.io/vendas_pela_internet/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/peixeweb-logo.png" alt="Peixeweb Logo" style={{ height: '120px', width: 'auto', objectFit: 'contain' }} />
          </a>
        </header>
        {children}
        <footer style={{ padding: '40px 20px', backgroundColor: '#1c1c24', borderTop: '1px solid #333', textAlign: 'center', marginTop: 'auto' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ marginBottom: '20px', color: '#aaa', fontWeight: 600 }}>Reflexão Bíblica Acadêmica</p>
            <p style={{ marginBottom: '20px', color: '#999' }}>Contato: <a href="mailto:peixeweb@gmail.com" style={{ color: '#d4af37', textDecoration: 'none' }}>peixeweb@gmail.com</a></p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
              <a style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }} href="/termos">Termos de Uso</a>
              <a style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }} href="/privacidade">Política de Privacidade</a>
            </div>
            <p style={{ color: '#666', fontSize: '12px' }}>© 2026 Especialista em Erudição Bíblica Acadêmica.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}