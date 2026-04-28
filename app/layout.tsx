import "./globals.css";
import { InstallPrompt } from "../components/InstallPrompt";
import { ImpactPanel } from "../components/ImpactPanel";

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
        <header className="main-header" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '10px 20px', 
          backgroundColor: '#d4af37', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)', 
          zIndex: 1000, 
          position: 'relative',
          gap: '10px',
          overflow: 'hidden' // hidden to prevent SVG overflow
        }}>
          <a href="https://peixeweb.github.io/vendas_pela_internet/" target="_blank" rel="noopener noreferrer" className="header-logo-container" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            width: '150px',
            height: '150px',
            flexShrink: 0
          }}>
            {/* Circular Text SVG */}
            <svg viewBox="0 0 200 200" style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              animation: 'rotate-text 20s linear infinite'
            }}>
              <defs>
                <path id="circlePath" d="M 100, 100 m -75, 0 a 75, 75 0 1, 1 150, 0 a 75, 75 0 1, 1 -150, 0" />
              </defs>
              <text style={{ fontSize: '13px', fontWeight: 'bold', fill: '#000', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                <textPath xlinkHref="#circlePath">
                  Marketing Digital Com Inteligência • Marketing Digital Com Inteligência • 
                </textPath>
              </text>
            </svg>
            
            <img src="/logo-sem-fundo.png" alt="Peixeweb Logo" style={{ 
              height: 'auto', 
              width: '90px', 
              objectFit: 'contain',
              position: 'relative',
              zIndex: 2
            }} />
          </a>

          <div className="header-impact">
            <ImpactPanel />
          </div>


          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes rotate-text {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @media (max-width: 600px) {
              .main-header {
                padding: 10px 5px !important;
                gap: 5px !important;
              }
              .header-logo-container {
                width: 120px !important;
                height: 120px !important;
              }
              .header-logo-container img {
                width: 70px !important;
              }
              .header-logo-container svg text {
                font-size: 15px !important;
              }
              .header-impact {
                transform: scale(0.75);
                transform-origin: right center;
              }
            }
          `}} />
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
