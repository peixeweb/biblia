import Link from "next/link";

export const metadata = {
  title: "Termos de Uso | Reflexão Bíblica Acadêmica",
  description: "Termos e condições de uso do portal de exegese e estudos da BÍBLIA.",
  keywords: "BÍBLIA, termos de uso, exegese, estudos bíblicos, Peixeweb",
};

export default function TermosPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">← Voltar para a Home</Link>
      </nav>
      
      <article className="prose lg:prose-xl">
        <h1 className="text-4xl font-bold mb-6 font-playfair">Termos de Uso</h1>
        <p className="text-sm text-gray-500 mb-8">Última atualização: 25 de março de 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar o portal <strong>Reflexão Bíblica Acadêmica</strong>, desenvolvido por Peixeweb, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Licença de Uso</h2>
          <p>
            O conteúdo aqui apresentado, focado em estudos da <strong>BÍBLIA</strong> sob uma perspectiva de exegese, linguística e história, é para fins informativos e acadêmicos. É concedida permissão para baixar temporariamente uma cópia dos materiais para visualização pessoal e não comercial.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. E-E-A-T e Isenção de Responsabilidade</h2>
          <p>
            Nossa plataforma segue as diretrizes de <strong>Experiência, Especialidade, Autoridade e Confiança (E-E-A-T)</strong> da Google. Embora busquemos a maior precisão histórica e linguística nos textos bíblicos, o conteúdo é fornecido "como está" e não substitui a consulta direta a fontes primárias ou orientação acadêmica especializada.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Contato</h2>
          <p>
            Para questões relacionadas a estes termos, entre em contato através do e-mail: <strong>peixeweb@gmail.com</strong>.
          </p>
        </section>
      </article>
    </main>
  );
}
