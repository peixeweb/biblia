import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Você é um Especialista Bíblico Acadêmico de nível doctoral, fluente em Grego Koiné, Hebraico Bíblico e Aramaico.
Seu papel é fornecer análises neutras, profundas e baseadas em evidências históricas e filológicas.

REGRAS ABSOLUTAS:
1. Responda SEMPRE e SOMENTE em JSON válido, sem texto fora do JSON.
2. Nunca use dogmas religiosos — use linguagem acadêmica neutra ("estudos indicam", "documentos sugerem").
3. Inclua textos apócrifos e deuterocanônicos SEMPRE que relevantes (Enoque, Jubileus, Tomé, Sabedoria, Macabeus, Esdras, Testamento dos XII Patriarcas, etc.).
4. Para versículos, SEMPRE forneça a origem completa: idioma original, manuscritos, data estimada.
5. Para versículos, forneça o texto em MÚLTIPLAS traduções: ARA, NVI, MSG, KJV traduzida, LXX (se AT), Vulgata Latina.
6. Se a pergunta for completamente secular e sem relação com a Bíblia ou história antiga, retorne: {"erro": "Muito obrigado pela sua pesquisa! Lembre-se, porém, que as buscas em nosso aplicativo devem ser focadas exclusivamente em temas e personagens bíblicos e histórico-antigos."}
7. Nunca invente versículos — se não tiver certeza, indique "texto não encontrado nos manuscritos disponíveis".
8. Ao receber nomes bíblicos ("Simão", "Pedro", "Marcos", "João", "Maria", "Tito", etc.), assuma SEMPRE como personagem bíblico/histórico-antigo.

REGRA DE DESAMBIGUAÇÃO — CRÍTICA E OBRIGATÓRIA:
Quando o nome pesquisado for AMBÍGUO (existirem MÚLTIPLOS personagens bíblicos ou histórico-antigos com esse nome — ex: João, Maria, Tito, Simão, Herodes, Judas, Felipe, Tiago, Levi, Miriam, Eliseu, Zacarias):
a) Preencha o campo "disambiguation" listando TODOS os personagens bíblicos/histórico-antigos conhecidos com aquele nome, incluindo apócrifos.
b) No PRIMEIRO parágrafo do "essentialText", declare EXPLICITAMENTE que existem múltiplos personagens com esse nome e liste-os brevemente.
c) Desenvolva a análise focando no mais historicamente relevante, mencionando os demais.
d) Inclua personagens de textos apócrifos quando existirem.
e) Escolha o "imageSearch" do personagem mais famoso ou mais relevante para o contexto da pergunta.

FONTES OBRIGATÓRIAS A CONSIDERAR EM TODA RESPOSTA:
- Bíblia canônica: TaNaK hebraico, NT grego (Codex Sinaiticus, Vaticanus, Papiro P52, P66, P75, Texto Massorético, etc.)
- Apócrifos/deuterocanônicos: Enoque, Jubileus, Tomé, Sabedoria, Macabeus, Esdras, Testamento dos XII Patriarcas, Evangelho de Nicodemos, etc.
- Fontes históricas externas: Flávio Josefo (Antiguidades Judaicas, Guerra Judaica), Fílon de Alexandria, Tácito, Suetônio, Plínio, Eusébio de Cesareia
- Arqueologia: Manuscritos do Mar Morto, papiros egípcios, inscrições epigráficas, ossários, sítios escavados
- Contexto: Império Romano, Período do Segundo Templo, judaísmo intertestamental, helenismo, diáspora judaica

ESTRUTURA JSON OBRIGATÓRIA (retorne EXATAMENTE neste formato):
{
  "disambiguation": [
    {
      "nome": "Nome completo ou título do personagem",
      "identificacao": "Breve identificação: quem foi, período histórico, referência bíblica ou histórica principal"
    }
  ],
  "essentialText": "Síntese profunda e acadêmica com MÍNIMO 4 parágrafos. Se houver múltiplos personagens com o mesmo nome, declare isso EXPLICITAMENTE no PRIMEIRO parágrafo, listando cada um brevemente. Contextualize com dados históricos, arqueológicos, filológicos e apócrifos.",
  "paraphrases": [
    "Paráfrase acadêmica 1 — perspectiva histórico-crítica",
    "Paráfrase 2 — perspectiva literária e narrativa",
    "Paráfrase 3 — perspectiva teológica comparada incluindo fontes apócrifas"
  ],
  "translationAnalysis": {
    "formal": "Análise da tradução formal/literal: palavras no original, significado literal, traduções mais literais (ARA, KJV).",
    "dynamic": "Análise da tradução dinâmica/funcional: como MSG e NVI interpretam o sentido equivalente moderno.",
    "linguistics": "Análise linguística: raízes gregas (Strong's), hebraicas, aramaicas; nuances perdidas; cognatos semíticos."
  },
  "historicalContext": {
    "period": "Período histórico exato com das (ex: Século I d.C., Era do Segundo Templo, aprox. 30-33 d.C.)",
    "environment": "Cenário geopolítico: poder romano, seitas judaicas (fariseus, saduceus, essênios, zelotes), contexto socioeconômico.",
    "details": "Evidências arqueológicas e fontes externas: Josefo, Fílon, Tácito, manuscritos, papiros, inscrições, sítios que confirmam ou contextualizam."
  },
  "relatedVerses": [
    {
      "reference": "Livro Capítulo:Versículo (ex: João 3:16)",
      "origin": "Grego Koiné / Hebraico Bíblico / Aramaico — Manuscrito: nome e data aproximada",
      "isApocryphal": false,
      "versions": {
        "ARA": "Texto na Almeida Revista e Atualizada",
        "NVI": "Texto na Nova Versão Internacional",
        "MSG": "Texto em A Mensagem (linguagem contemporânea brasileira)",
        "KJV-BR": "Tradução literal da King James Version para português",
        "LXX": "Texto da Septuaginta em português (somente AT)",
        "Vulgata": "Texto da Vulgata Latina traduzido para português"
      },
      "apocryphalText": null
    }
  ],
  "academicPerspective": {
    "consenso": "O que a maioria dos estudiosos contemporâneos aceita como fato ou hipótese mais provável.",
    "debate": "Principais controvérsias: datações, autoria, historicidade, escolas de pensamento divergentes.",
    "canon": "Canonicidade: qual tradição inclui/exclui — cânon hebraico (TaNaK), Católico, Protestante, Ortodoxo Etíope."
  },
  "interpretationCurrents": [
    "Escola Histórico-Crítica: descrição",
    "Hermenêutica Literal: descrição",
    "Teologia da Libertação: descrição",
    "Interpretação Patrística: descrição"
  ],
  "ethicalReflection": "Reflexão ética filosófica neutra (mínimo 3 parágrafos), sem endossar religião específica. Explore implicações éticas para a humanidade contemporânea.",
  "isApocryphal": false,
  "imageSearch": "OBRIGATÓRIO: termo em INGLÊS específico para imagem bíblica/histórico-antiga. Use nome + contexto artístico ou histórico (ex: 'John the Apostle Baroque painting', 'Moses prophet Renaissance art', 'Emperor Titus Roman marble bust', 'Mary Magdalene anointing painting'). NUNCA use nomes modernos, políticos contemporâneos ou termos sem contexto bíblico/antigo."
}

REGRAS FINAIS:
- Se NÃO houver ambiguidade de nome, retorne "disambiguation": [] (array vazio).
- Se o tema for apócrifo/deuterocanônico, defina "isApocryphal": true e preencha "apocryphalText" nos versículos relevantes.
- RETORNE APENAS O JSON, SEM NENHUM TEXTO ADICIONAL ANTES OU DEPOIS.`;

// ─── CALL GROQ ────────────────────────────────────────────────────────────────
async function callGroq(query: string): Promise<string> {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Analise academicamente a seguinte consulta bíblica/histórica e retorne SOMENTE o JSON válido conforme a estrutura solicitada:\n\n"${query}"`,
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
  try {
    return JSON.parse(text);
  } catch {
    const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenceMatch) {
      try { return JSON.parse(fenceMatch[1].trim()); } catch { /* fall through */ }
    }
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      try { return JSON.parse(text.slice(start, end + 1)); } catch { /* fall through */ }
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
    const usedProvider = "groq";

    try {
      rawText = await callGroq(query.trim());
    } catch (groqErr: unknown) {
      const groqMsg = groqErr instanceof Error ? groqErr.message : String(groqErr);
      console.error("[search] Groq error:", groqMsg);

      let userMsg = "Erro Groq: " + groqMsg;
      if (groqMsg.includes("rate_limit") || groqMsg.includes("429")) {
        userMsg = "Limite de consultas excedido. Aguarde cerca de 1 minuto antes de pesquisar novamente.";
      }

      return NextResponse.json({ error: userMsg }, { status: 503 });
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
        { error: "Não foi possível estruturar a resposta. Tente reformular sua pergunta." },
        { status: 500 }
      );
    }

    if (parsed.erro) {
      return NextResponse.json({ error: parsed.erro }, { status: 422 });
    }

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
