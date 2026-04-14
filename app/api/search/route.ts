import { NextRequest, NextResponse } from "next/server";
import { biblicalFigures, statistics } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    const lowerQuery = query.toLowerCase();

    let result = {
      summary: "",
      passages: [] as { reference: string; text: string }[],
      reflections: [] as string[]
    };

    const found = biblicalFigures.find(f => 
      lowerQuery.includes(f.name.toLowerCase()) ||
      lowerQuery.includes(f.id.toLowerCase()) ||
      f.interpretations.some(i => lowerQuery.includes(i.toLowerCase()))
    );

    if (found) {
      result.summary = found.essence + " " + found.context.details;
      
      if (found.relatedVerses) {
        result.passages = found.relatedVerses.map(v => ({
          reference: v.reference,
          text: v.text
        }));
      }
      
      result.reflections = [found.ethicalReflection];
    } else if (lowerQuery.includes("jesus")) {
      result.summary = "Jesus de Nazaré é a figura central do Novo Testamento, cuja pregação sobre o Reino de Deus inovou a história religiosa.";
      result.passages = [
        { reference: "Marcos 1:15", text: "O tempo está cumprido, e o reino de Deus está próximo. Arrependei-vos, e crede no evangelho." },
        { reference: "João 14:6", text: "Disse-lhe Jesus: Eu sou o caminho, e a verdade e a vida; ninguém vem ao Pai, senão por mim." }
      ];
      result.reflections = ["O Sermão da Montanha como manifesto de uma ética baseada no amor e na justiça radical."];
    } else if (lowerQuery.includes("moisés") || lowerQuery.includes("moses")) {
      result.summary = "Moisés é a figura fundamental do Pentateuco, mediador da Aliança no Sinai e guia de Israel da escravidão para a liberdade.";
      result.passages = [
        { reference: "Deuteronômio 6:4", text: "Ouve, Israel, o Senhor nosso Deus é o único Senhor." },
        { reference: "Êxodo 20:2", text: "Eu sou o Senhor teu Deus, que te tirei da terra do Egito, da casa da servidão." }
      ];
      result.reflections = ["A lei como estrutura para a justiça social e santidade coletiva."];
    } else if (lowerQuery.includes("enoc") || lowerQuery.includes("enoch")) {
      result.summary = "O Livro de Enoque é um dos textos apócrifos mais influentes, explorando a queda dos anjos, viagens celestiais e o julgamento final.";
      result.passages = [
        { reference: "Gênesis 5:24", text: "E Enoque andou com Deus... e ele não era, porque Deus o levou." }
      ];
      result.reflections = ["O desafio de manter a pureza espiritual em um mundo corrompido."];
    } else {
      result.summary = "Pesquisando sobre '" + query + "'... Para melhores resultados, tente buscar por figuras bíblicas como Jesus, Moisés, Jeremias, Paulo de Tarso, ou temas como o Sermão da Montanha.";
      result.passages = [];
      result.reflections = ["Continue explorando as Escrituras com mente abierta e coração receptivo."];
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar a consulta" }, { status: 500 });
  }
}