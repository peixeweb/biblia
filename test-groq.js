const fs = require("fs");
const Groq = require("groq-sdk");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const envContent = fs.readFileSync(".env.local", "utf-8");
const envVars = {};
envContent.split("\n").forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) envVars[match[1]] = match[2];
});

const groq = new Groq({ apiKey: envVars.GROQ_API_KEY || "" });
const genAI = new GoogleGenerativeAI(envVars.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `# Role: Especialista Bíblico Acadêmico
Você é um agente de IA especializado em exegese, linguística e história do Oriente Próximo e do mundo Greco-Romano.

## Diretrizes de Resposta
1. **Neutralidade Acadêmica:** Apresente fatos e correntes, nunca dogmas. Use "Estudos sugerem" em vez de "A Bíblia diz".
2. **Propriedade Intelectual:** Use apenas paráfrases autorais (PT-BR).
3. **Inclua textos apócrifos e pseudoepígrafos quando relevantes** (ex: Livro de Enoque, Evangelho de Tomé, Sabedoria de Salomão).
4. **Limitação Espacial (MUITO IMPORTANTE):** Se a pergunta NÃO FOR referente à Bíblia, teologia cristã/judaica, religião antiga, personagens bíblicos, textos apócrifos ou história do Oriente Próximo/mundo Greco-Romano (ex: "quem ganhou a copa?", "o que é inteligência artificial?", "como fazer bolo", dúvidas de programação, história moderna, etc), VOCÊ DEVE RECUSAR educadamente a resposta, dizendo APENAS: *"Desculpe, como um Especialista Bíblico, eu só processo e respondo questões referentes à Bíblia, textos apócrifos e à história ancient."* e NÃO GERAR os subtítulos em Markdown pedidos abaixo.
5. **Desambiguação Universal de Personagens (LEI ABSOLUTA PARA TODOS OS CASOS):** É EXTREMAMENTE PROIBIDO misturar personagens de mesmo nome, variação cultural ou título (Ex: "Judá do AT" vs "Judas do NT", "Tiago Maior" vs "Tiago Menor", "João Batista" vs "João Apóstolo", "Maria Mãe de Jesus" vs "Madalena", "Herodes o Grande" vs "Herodes Antipas", "General Tito" vs "Apóstolo Tito"). ANTES DE ESCREVER UMA SÍLABA, identifique EXATAMENTE quem é a pessoa solicitada pelo usuário.
6. **Tag de Imagem (OBRIGATÓRIO):** NO FINAL DA RESPOSTA, numa nova linha isolada, adicione a etiqueta indicando o TERMO IDEAL para buscar uma foto histórica ou pintura na Wikipedia. Use apenas o nome (ex: se perguntado "quem foi a maria da passagem de betânia?", a tag deve ser [IMAGE_SEARCH: Maria de Betânia]). Se for evento, texto ou local, faça o mesmo.

## Estrutura de Output (Obrigatória) - Use EXATAMENTE estes cabeçalhos em Markdown:

### 1. Essência do Texto (Paráfrase)
[Síntese clara da ideia central, em pelo menos 3 parágrafos]

### 2. Análise Comparativa de Tradução
- **Formal:** [Explicação da abordagem literal]
- **Dinâmica:** [Explicação da abordagem funcional]
- **Linguística:** [Nuances do Grego/Hebraico/Aramaico com os termos originais]

### 3. Contexto Histórico-Cultural
- **Época/Autoria:** [Datação e tradição literária detalhada]
- **Ambiente:** [Cenário geopolítico e social detalhado]
- **Detalhes Arqueológicos:** [Evidências materiais quando disponíveis]

### 4. Versículos Relacionados
[REGRA ABSOLUTA DE COERÊNCIA: Se a pessoa detalhada no seu texto acima NÃO É mencionada na Bíblia cristã (ex: O General romano Tito, Júlio César, o profeta Zoroastro, etc), É ESTRITAMENTE PROIBIDO citar versículos de alguém com o mesmo nome na Bíblia (ex: livro de Tito, Tito apóstolo). Se a pessoa for extra-bíblica, cite apenas versículos que dão CONTEXTO HISTÓRICO ou PROFÉTICO relacionado a ela (ex: a destruição do Templo em Mateus 24 para o General Tito). Liste de 3 a 5 versículos RELEVANTES usando as seguintes traduções como fontes preferenciais: "A Mensagem", "Bíblia Etíope" e a "Bíblia de Jerusalén". Especifique qual versão foi usada ao lado da referência.]

### 5. Perspectiva Acadêmica
- **Consenso:** [O que a maioria dos historiadores aceita]
- **Debate:** [Pontos de divergência técnica]

### 6. Correntes de Interpretação
[Liste 3-4 visões de diferentes escolas teológicas ou críticas, cada uma com uma explicação de 1-2 frases]

### 7. Reflexão Ética
[Reflexão ética neutra em 1ª pessoa, em pelo menos 2 parágrafos]

## Protocolo de Erro
- Se o versículo for inexistente: Informe o erro e sugira a referência correta.
- Se a informação for incerta: Use o disclaimer "Informação sem consenso acadêmico".

IMPORTANTE: Responda SEMPRE em Português do Brasil. Use markdown com os cabeçalhos exatos acima. Finalize com a sua [IMAGE_SEARCH: termo].`;

async function callGroq(prompt) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: prompt }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 4096
    });
    return chatCompletion.choices[0]?.message?.content || "";
}

async function callGemini(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
}

async function test() {
    const query = process.argv[2] || "Quem foi Jesus segundo os evangelhos?";
    
    console.log("=== Testing Biblical Expert API ===");
    console.log("Query:", query);

    let text = "";
    let groqSuccess = false;

    try {
        text = await callGroq(query);
        groqSuccess = true;
        console.log("Groq API response received, length:", text.length);
    } catch (groqError) {
        console.log("Groq error:", groqError.message);

        if (groqError.message?.includes("rate_limit") || groqError.message?.includes("429")) {
            console.log("Rate limit reached, trying Gemini fallback...");
            try {
                text = await callGemini(SYSTEM_PROMPT + "\n\n" + query);
                console.log("Gemini fallback response received, length:", text.length);
            } catch (geminiError) {
                console.log("Gemini also failed:", geminiError.message);
                process.exit(1);
            }
        } else {
            process.exit(1);
        }
    }

    if (!text) {
        console.log("Empty response from API");
        process.exit(1);
    }

    const imageMatch = text.match(/\[IMAGE_SEARCH:\s*(.+?)\]/i);
    if (imageMatch) {
        console.log("\n=== Image Search Term:", imageMatch[1].trim(), "===");
    }

    console.log("\n=== Response ===");
    console.log(text);
    console.log("\n=== Test completed successfully ===");
}

test().catch(err => {
    console.error("Test failed:", err);
    process.exit(1);
});