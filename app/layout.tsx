import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reflexão Bíblica Acadêmica | Estudos Profundos da BÍBLIA",
  description: "Portal especializado em exegese, linguística e história do Oriente Próximo. Desenvolvido por Peixeweb com foco em E-E-A-T.",
  keywords: "BÍBLIA, estudos bíblicos, exegese, história antiga, hebraico, grego, Peixeweb",
  authors: [{ name: "Peixeweb", url: "https://peixeweb.github.io/vendas_pela_internet/" }],
  openGraph: {
    title: "Reflexão Bíblica Acadêmica",
    description: "Estudos acadêmicos e profundos sobre a BÍBLIA.",
    type: "website",
    locale: "pt_BR",
    url: "https://biblia-app.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Outfit:wght@400;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="flex flex-col min-h-screen">
        <header style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", backgroundColor: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", zIndex: 1000, position: "relative" }}>
          <span style={{ marginRight: "10px", fontSize: "14px", fontWeight: 500, color: "#333", fontFamily: "'Inter', sans-serif" }}>Desenvolvido por</span>
          <a href="https://peixeweb.github.io/vendas_pela_internet/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center" }}>
            <img src="https://github.com/peixeweb.png" alt="Peixeweb Logo" style={{ height: "120px", cursor: "pointer", borderRadius: "50%" }} />
          </a>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer style={{ padding: "40px 20px", backgroundColor: "#f8f9fa", borderTop: "1px solid #eee", textAlign: "center", marginTop: "auto" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p style={{ marginBottom: "20px", color: "#333", fontWeight: 600 }}>Reflexão Bíblica Acadêmica</p>
            <p style={{ marginBottom: "20px", color: "#666" }}>
              Contato: <a href="mailto:peixeweb@gmail.com" style={{ color: "#0070f3", textDecoration: "none" }}>peixeweb@gmail.com</a>
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
              <Link href="/termos" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Termos de Uso</Link>
              <Link href="/privacidade" style={{ color: "#666", textDecoration: "none", fontSize: "14px" }}>Política de Privacidade</Link>
            </div>
            <p style={{ color: "#999", fontSize: "12px" }}>
              &copy; {new Date().getFullYear()} Especialista em Erudição Bíblica Acadêmica. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
