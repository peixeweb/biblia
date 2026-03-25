import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade | Reflexão Bíblica Acadêmica",
  description: "Tratamento de dados e privacidade no portal de estudos da BÍBLIA.",
  keywords: "BÍBLIA, privacidade, política de privacidade, exegese, estudos bíblicos, Peixeweb",
};

export default function PrivacidadePage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">← Voltar para a Home</Link>
      </nav>
      
      <article className="prose lg:prose-xl">
        <h1 className="text-4xl font-bold mb-6 font-playfair">Política de Privacidade</h1>
        <p className="text-sm text-gray-500 mb-8">Última atualização: 25 de março de 2026</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Coleta de Informações</h2>
          <p>
            Valorizamos sua privacidade. Este portal de estudos da <strong>BÍBLIA</strong> não coleta informações pessoais identificáveis de forma automática, exceto quando fornecidas voluntariamente ao entrar em contato conosco.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Uso de Dados e Contato</h2>
          <p>
            Informações enviadas para o e-mail <strong>peixeweb@gmail.com</strong> são utilizadas estritamente para responder dúvidas acadêmicas, sugestões de melhoria no app ou questões técnicas relacionadas ao desenvolvimento por Peixeweb. Jamais compartilharemos seus dados com terceiros para fins comerciais.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Log de Dados e Cookies</h2>
          <p>
            Podemos utilizar cookies básicos para melhorar o tempo de carregamento do app e garantir que a página abra em menos de 2 segundos, otimizando sua experiência de leitura dos textos da <strong>BÍBLIA</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Segurança</h2>
          <p>
            Implementamos práticas de segurança de ponta para proteger as informações que processamos, garantindo a integridade e a confiança (E-E-A-T) necessárias para um portal de referência acadêmica.
          </p>
        </section>
      </article>
    </main>
  );
}
