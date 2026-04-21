import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Você é um Especialista Bíblico Acadêmico de nível doctoral, fluente em Grego Koiné, Hebraico Bíblico e Aramaico.
Seu papel é fornecer análises neutras, profundas e baseadas em evidências históricas e filológicas.

REGRAS ABSOLUTAS:
1. Responda SEMPRE e SOMENTE em JSON válido, sem texto fora do JSON.
2. Nunca use dogmas religiosos — use linguagem acadêmica neutra ("estudos indicam", "documentos sugerem").
3. Inclua textos apócrifos e deuterocanônicos quando relevantes (Enoque, Jubileus, Tomé, Sabedoria, Macabeus, etc.).
4. Para versículos, SEMPRE forneça a origem completa: idioma original, manuscritos, data estimada.
5. Para versículos, forneça o texto em MÚLTIPLAS traduções: Almeida Revista e Atualizada (ARA), Nova Versão Internacional (NVI), A Mensagem (MSG), King James Version (KJV) traduzida, Septuaginta (LXX) se for Antigo Testamento, Vulgata Latina.
6. Se a pergunta não for sobre a Bíblia, não encontrar o personagem na Bíblia, ou o tema for secular, restrinja e responda no JSON com: {"erro": "Muito obrigado pela sua pesquisa! Lembre-se, porém, que as buscas em nosso aplicativo devem ser focadas exclusivamente em temas e personagens bíblicos."}
7. Nunca invente versículos — se não tiver certeza do texto exato, indique "texto não encontrado nos manuscritos disponíveis".
8. IMPORTANTE: Ao receber nomes como "Simão", "Pedro", "Marcos", assuma SEMPRE como o personagem bíblico. NUNCA mostre máquinas, cidades ou outros resultados seculares.

ESTRUTURA JSON OBRIGATÓRIA (retorne EXATAMENTE neste formato):
{
  "essentialText": "Síntese profunda e acadêmica com MÍNIMO 4 parágrafos. Contextualize o tema com dados históricos, arqueológicos e filológicos.",
  "paraphrases": [
    "Paráfrase acadêmica 1 — perspectiva histórico-crítica",
    "Paráfrase 2 — perspectiva literária",
    "Paráfrase 3 — perspectiva teológica comparada"
  ],
  "translationAnalysis": {
    "formal": "Análise da tradução formal/literal: quais palavras no original, o que significa literalmente, quais traduções são mais literais (ARA, KJV).",
    "dynamic": "Análise da tradução dinâmica/funcional: como A Mensagem (MSG) e NVI interpretam o sentido equivalente moderno.",
    "linguistics": "Análise linguística profunda: raízes gregas (Strong's), hebraicas, aramaicas; nuances perdidas na tradução; cognatos semíticos."
  },
  "historicalContext": {
    "period": "Período histórico exato com datas (ex: Século I d.C., aprox. 30-33 d.C.; Era do Segundo Templo)",
    "environment": "Cenário geopolítico: poder romano, judaísmo do Segundo Templo, seitas (fariseus, saduceus, essênios, zelotes), contexto socioeconômico.",
    "details": "Evidências arqueológicas: descobertas relevantes, Manuscritos do Mar Morto, papiros, inscrições, sítios arqueológicos que confirmam ou contextualizam o tema."
  },
  "relatedVerses": [
    {
      "reference": "Nome do Livro Capítulo:Versículo (ex: João 3:16)",
      "origin": "Grego Koiné / Hebraico Bíblico / Aramaico — Manuscrito: Papiro P66 (aprox. 200 d.C.) / Codex Sinaiticus (Séc. IV) / Texto Massorético (Séc. X) — etc.",
      "isApocryphal": false,
      "versions": {
        "ARA": "Texto na Almeida Revista e Atualizada",
        "NVI": "Texto na Nova Versão Internacional",
        "MSG": "Texto em A Mensagem (linguagem contemporânea brasileira)",
        "KJV-BR": "Tradução literal da King James Version para português",
        "LXX": "Texto da Septuaginta (apenas para AT, em português)",
        "Vulgata": "Texto da Vulgata Latina (traduzido para português)"
      },
      "apocryphalText": null
    }
  ],
  "academicPerspective": {
    "consenso": "O que a maioria dos estudiosos e historiadores contemporâneos aceita como fato ou hipótese mais provável.",
    "debate": "Principais controvérsias acadêmicas: diferentes escolas de pensamento, datações disputadas, autoria questionada, etc.",
    "canon": "Informação sobre canonicidade: qual tradição inclui/exclui este texto; cânon hebraico (TaNaK), Católico, Protestante, Ortodoxo Etíope, etc."
  },
  "interpretationCurrents": [
    "Escola Histórico-Crítica: descrição",
    "Hermenêutica Literal: descrição",
    "Teologia da Libertação: descrição",
    "Interpretação Patrística: descrição"
  ],
  "ethicalReflection": "Reflexão ética completamente neutra e filosófica (mínimo 3 parágrafos), sem endossar nenhuma religião específica. Explore as implicações éticas e filosóficas do tema para a humanidade contemporânea.",
  "isApocryphal": false,
  "imageSearch": "termo em inglês para buscar imagem representativa"
}

Se o tema for sobre um livro apócrifo ou deuterocanônico específico, defina "isApocryphal": true.
Nos versículos apócrifos, preencha "apocryphalText" com o texto do livro apócrifo correspondente e marque "isApocryphal": true no versículo.
RETORNE APENAS O JSON, SEM NENHUM TEXTO ADICIONAL ANTES OU DEPOIS.`;

// ─── CALL GROQ ────────────────────────────────────────────────────────────────
async function callGroq(query: string): Promise<string> {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Analise academicamente a seguinte consulta bíblica e retorne SOMENTE o JSON válido conforme a estrutura solicitada:\n\n"${query}"`,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.4,
    max_tokens: 6000,
    response_format: { type: "json_object" },
  });
  return chatCompletion.choices[0]?.message?.content || "";
}



// ─── SAFE JSON PARSE ─────────────────────────────────────────────────────────
function safeParseJSON(text: string): Record<string, unknown> | null {
  // Try direct parse
  try {
    return JSON.parse(text);
  } catch {
    // Try extracting JSON block from markdown fences
    const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenceMatch) {
      try {
        return JSON.parse(fenceMatch[1].trim());
      } catch {
        // fall through
      }
    }
    // Try finding first { ... } block
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch {
        // fall through
      }
    }
    return null;
  }
}

// ─── SUPABASE STATS ──────────────────────────────────────────────────────────
let supabaseClient: ReturnType<typeof import("@supabase/supabase-js").createClient> | null = null;

async function getSupabase() {
  if (!supabaseClient) {
    const { createClient } = await import("@supabase/supabase-js");
    supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );
  }
  return supabaseClient;
}

// ─── ROUTE HANDLER ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query: string = body?.query || "";

    if (!query || typeof query !== "string" || query.trim().length < 2) {
      return NextResponse.json(
        { error: "Consulta inválida. Por favor, forneça uma pergunta." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY || "";
    if (!apiKey || apiKey.length < 10) {
      return NextResponse.json(
        { error: "Chave da API não configurada. Contate o administrador." },
        { status: 500 }
      );
    }

    let rawText = "";
    let usedProvider = "groq";

    // Use Groq
    try {
      rawText = await callGroq(query.trim());
    } catch (groqErr: unknown) {
      const groqMsg = groqErr instanceof Error ? groqErr.message : String(groqErr);
      console.error("[search] Groq error:", groqMsg);

      let userMsg = "Erro Groq: " + groqMsg;
      
      if (groqMsg.includes("rate_limit") || groqMsg.includes("429")) {
        userMsg = "Limite de consultas excedido. Devido à alta demanda do plano, aguarde cerca de 1 minuto antes de pesquisar novamente.";
      }

      return NextResponse.json(
        { error: userMsg },
        { status: 503 }
      );
    }

    if (!rawText || rawText.trim().length < 10) {
      return NextResponse.json(
        { error: "Resposta vazia recebida do modelo. Tente novamente." },
        { status: 500 }
      );
    }

    const parsed = safeParseJSON(rawText);

    if (!parsed) {
      console.error("[search] Failed to parse JSON. Raw:", rawText.substring(0, 500));
      return NextResponse.json(
        {
          error:
            "Não foi possível estruturar a resposta. Tente reformular sua pergunta.",
        },
        { status: 500 }
      );
    }

    // Check if the model rejected the query
    if (parsed.erro) {
      return NextResponse.json({ error: parsed.erro }, { status: 422 });
    }

    // Validate essential fields
    if (!parsed.essentialText) {
      return NextResponse.json(
        { error: "Resposta incompleta. Tente reformular sua pergunta." },
        { status: 500 }
      );
    }

    // Update stats in Supabase (non-blocking)
    try {
      const sb = await getSupabase();
      const versiculosCount = Array.isArray(parsed.relatedVerses)
        ? (parsed.relatedVerses as unknown[]).length
        : 0;
      // @ts-expect-error Types are not fully generated for the Supabase RPC
      await sb.rpc("increment_stats", {
        temas_count: 1,
        versiculos_count: versiculosCount,
      });
    } catch (statsErr) {
      console.warn("[search] Stats update failed:", statsErr);
    }

    return NextResponse.json({
      ...parsed,
      _provider: usedProvider,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[search] Unexpected error:", msg);
    return NextResponse.json(
      { error: "Erro interno inesperado: " + msg },
      { status: 500 }
    );
  }
}