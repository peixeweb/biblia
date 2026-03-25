/* lib/data.ts */

export interface TranslationAnalysis {
  formal: string;
  dynamic: string;
  linguistics: string;
}

export interface HistoricalContext {
  period: string;
  environment: string;
  details: string; // Novo campo para mais detalhes
}

export interface AcademicPerspective {
  consensus: string;
  debate: string;
}

export interface Verse {
  reference: string;
  text: string;
}

export interface BiblicalFigure {
  id: string;
  name: string;
  role: string;
  keyVerse: string;
  essence: string;
  translation: TranslationAnalysis;
  context: HistoricalContext;
  academic: AcademicPerspective;
  interpretations: string[];
  ethicalReflection: string;
  relatedVerses?: Verse[]; // Atualizado para usar a interface Verse
  isApocryphal?: boolean;
}

export const biblicalFigures: BiblicalFigure[] = [
  {
    id: "jeremiah",
    name: "Jeremias",
    role: "O Profeta Chorão (Cânon Hebraico)",
    keyVerse: "\"Antes que te formasse no ventre te conheci...\" (Jeremias 1:5)",
    essence: "Jeremias emerge como a voz da consciência em um Judá à beira do colapso. Sua mensagem sintetiza a transição da religiosidade ritualística para uma fé interiorizada.",
    translation: {
      formal: "Foco nos oráculos poéticos e lamentos crus em hebraico clássico.",
      dynamic: "Enfatiza a angústia psicológica e a relutância inicial do profeta.",
      linguistics: "Hebraico: Yirmeyahu (יִרְמְיָהוּ). A raiz sugere 'Yahweh estabelece'."
    },
    context: {
      period: "627 a.C. a 586 a.C. (Final do Primeiro Templo).",
      environment: "Anatote, vila sacerdotal ao norte de Jerusalém.",
      details: "Dominado pela tensão geopolítica entre o Egito e a Babilônia. Jeremias viu a destruição do Templo e o exílio, vivendo em um estado de perseguição constante por pregar a rendição à Babilônia como vontade divina."
    },
    academic: {
      consensus: "Obra complexa com múltiplos estratos redacionais.",
      debate: "A relação exata entre Jeremias e a escola deuteronomista."
    },
    interpretations: ["Subjetividade Profética", "Deuteronomismo", "Nova Aliança"],
    ethicalReflection: "A integridade pessoal em tempos de colapso institucional.",
    relatedVerses: [
      { reference: "Jeremias 31:31", text: "Eis que vêm dias, diz o Senhor, em que farei uma aliança nova com a casa de Israel e com a casa de Judá." },
      { reference: "Lamentações 3:22", text: "As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim." }
    ]
  },
  {
    id: "enoch",
    name: "Livro de Enoque (1 Enoque)",
    role: "Literatura Apocalíptica (Apócrifo/Pseudoepígrafo)",
    keyVerse: "\"E Enoque andou com Deus... e ele não era, porque Deus o levou.\" (Gênesis 5:24)",
    essence: "Um dos textos apócrifos mais influentes, explorando a queda dos anjos (Vigilantes), viagens celestiais e o julgamento final.",
    translation: {
      formal: "Preservado integralmente apenas em Ge'ez (Etíope clássico).",
      dynamic: "Foca no simbolismo cósmico e na angelologia complexa.",
      linguistics: "Hebraico: Chanokh (חֲנוֹךְ). Etimologia aponta para 'treinado' ou 'dedicado'."
    },
    context: {
      period: "Século III a.C. ao Século I a.C.",
      environment: "Comunidades judaicas do período do Segundo Templo.",
      details: "Essencial para entender as raízes do cristianismo primitivo. Embora não esteja no cânon da maioria das igrejas (exceto a Etíope), é citado na Epístola de Judas no Novo Testamento."
    },
    academic: {
      consensus: "Coleção de diversos tratados escritos por diferentes autores.",
      debate: "A origem e o significado exato da figura do 'Filho do Homem' em Enoque."
    },
    interpretations: ["Angelologia", "Escatologia", "Tradição Etíope"],
    ethicalReflection: "O desafio de manter a pureza espiritual em um mundo corrompido.",
    relatedVerses: [
      { reference: "Judas 1:14", text: "E também estes profetizou Enoque, o sétimo depois de Adão, dizendo: Eis que é vindo o Senhor com milhares de seus santos." }
    ],
    isApocryphal: true
  },
  {
    id: "thomas-gospel",
    name: "Evangelho de Tomé",
    role: "Evangelho Gnóstico (Apócrifo)",
    keyVerse: "\"Se aqueles que vos guiam vos dizem: 'Vede, o Reino está no céu', então as aves do céu vos precederão...\"",
    essence: "Uma coleção de 114 ditos (logia) de Jesus, muitos sem paralelo nos evangelhos canônicos, focando no autoconhecimento e na luz interior.",
    translation: {
      formal: "Manuscrito em Copta encontrado em Nag Hammadi.",
      dynamic: "Tradução que busca a sabedoria poética e mística dos ditos.",
      linguistics: "Copta/Grego: O nome Didymos Judas Thomas significa 'Gêmeo'."
    },
    context: {
      period: "Provavelmente meados do Século II d.C.",
      environment: "Cenário do gnosticismo cristão egípcio.",
      details: "Oferece uma visão alternativa de Jesus como um mestre de sabedoria que aponta para o Reino dentro de cada indivíduo, contrastando com a ênfase na expiação dos pecados dos canônicos."
    },
    academic: {
      consensus: "Texto independente não dependente dos Sinóticos.",
      debate: "Se alguns ditos preservam tradições orais mais antigas que os canônicos."
    },
    interpretations: ["Gnosticismo", "Sabedoria Esotérica", "Nag Hammadi"],
    ethicalReflection: "A busca pela iluminação através do autoconhecimento radical.",
    relatedVerses: [
      { reference: "Tomé Logion 3", text: "O Reino está dentro de vós e fora de vós. Quando vos conhecerdes, sereis conhecidos e compreendereis que sois filhos do Pai vivo." }
    ],
    isApocryphal: true
  },
  {
    id: "jesus",
    name: "Jesus de Nazaré",
    role: "O Jesus Histórico / Messias",
    keyVerse: "\"E vós, quem dizeis que eu sou?\" (Mateus 16:15)",
    essence: "A figura central do Novo Testamento, cuja vida e ensinamentos sobre o Reino de Deus reformularam a história religiosa e ética do Ocidente.",
    translation: {
      formal: "Análise baseada nos manuscritos gregos originais (Koinê).",
      dynamic: "Foca na parénese e nas parábolas como pedagogia revolucionária.",
      linguistics: "Aramaico: Yeshu (ישוע). Grego: Iēsous (Ἰησοῦς). Significa 'Yahweh salva'."
    },
    context: {
      period: "C. 4 a.C. a 30/33 d.C. (Judeia sob domínio Romano).",
      environment: "Galileia e Jerusalém, contexto do Judaísmo do Segundo Templo.",
      details: "Viveu em um período de intensa expectativa messiânica e agitação política contra a ocupação romana. Sua pregação focava na inversão de valores sociais e na soberania espiritual de Deus."
    },
    academic: {
      consensus: "Reconhecido como uma figura histórica que foi batizada por João Batista e crucificada sob Pôncio Pilatos.",
      debate: "A distinção entre o 'Jesus da História' e o 'Cristo da Fé', e a cronologia exata de sua vida."
    },
    interpretations: ["Cristologia Crítica", "Jesus no Contexto Judaico", "Perspectiva Escatológica"],
    ethicalReflection: "O Sermão da Montanha como o manifesto máximo de uma ética baseada no amor e na justiça radical.",
    relatedVerses: [
      { reference: "Marcos 1:15", text: "O tempo está cumprido, e o reino de Deus está próximo. Arrependei-vos, e crede no evangelho." },
      { reference: "João 14:6", text: "Disse-lhe Jesus: Eu sou o caminho, e a verdade e a vida; ninguém vem ao Pai, senão por mim." }
    ]
  },
  {
    id: "paul",
    name: "Paulo de Tarso",
    role: "O Apóstolo dos Gentios",
    keyVerse: "\"Já não vivo eu, mas Cristo vive em mim.\" (Gálatas 2:20)",
    essence: "O principal teólogo do cristianismo primitivo, responsável pela expansão da fé cristã para além das fronteiras do judaísmo através de suas missões e cartas.",
    translation: {
      formal: "Rigor exegético nas epístolas paulinas, mantendo a complexidade retórica grega.",
      dynamic: "Foca na aplicabilidade prática da teologia da Graça.",
      linguistics: "Hebraico: Shaul (שָׁאוּל). Grego: Paulos (Παῦλος)."
    },
    context: {
      period: "C. 5 d.C. a 64/67 d.C.",
      environment: "Cidades cosmopolitas do Império Romano (Antioquia, Éfeso, Roma).",
      details: "Um cidadão romano e fariseu educado que realizou a transição do cristianismo de uma seita judaica para uma religião universal."
    },
    academic: {
      consensus: "Sete de suas cartas são consideradas indiscutivelmente autênticas.",
      debate: "A 'Nova Perspectiva sobre Paulo' e sua interpretação da Lei (Torá)."
    },
    interpretations: ["Justificação pela Fé", "Eclesiologia Paulina", "Contexto Greco-Romano"],
    ethicalReflection: "O equilíbrio entre a liberdade cristã e a responsabilidade comunitária.",
    relatedVerses: [
      { reference: "Romanos 5:1", text: "Sendo, pois, justificados pela fé, temos paz com Deus, por nosso Senhor Jesus Cristo." },
      { reference: "1 Coríntios 13:13", text: "Agora, pois, permanecem a fé, a esperança e o amor, estes três, mas o maior destes é o amor." }
    ]
  },
  {
    id: "moses",
    name: "Moisés",
    role: "O Libertador e Legislador",
    keyVerse: "\"Certamente eu serei contigo... Tira o meu povo do Egito.\" (Êxodo 3:12)",
    essence: "A figura fundamental do Pentateuco, mediador da Aliança no Sinai e guia de Israel na transição da escravidão para a liberdade.",
    translation: {
      formal: "Respeito à solenidade do hebraico bíblico arcaico.",
      dynamic: "Ênfase na liderança e no conflito épico contra o Faraó.",
      linguistics: "Hebraico: Moshe (מֹשֶׁה). Provável origem egípcia: 'mss' (filho ou gerado)."
    },
    context: {
      period: "C. Século XIII a.C. (Época da XIX Dinastia Egípcia).",
      environment: "Corte Real do Egito e o Deserto do Sinai.",
      details: "Unificou as tribos hebreias através da revelação monoteísta e da entrega da Lei (Torá), estabelecendo a base da identidade nacional de Israel."
    },
    academic: {
      consensus: "Figura fundacional da tradição de Israel, independentemente dos debates sobre a historicidade literal do Êxodo.",
      debate: "A hipótese suplementar e documental sobre a composição do Pentateuco."
    },
    interpretations: ["Teologia da Libertação", "Monoteísmo Radical", "Direito Aliancista"],
    ethicalReflection: "A lei servindo como estrutura para a justiça social e santidade coletiva.",
    relatedVerses: [
      { reference: "Deuteronômio 6:4", text: "Ouve, Israel, o Senhor nosso Deus é o único Senhor." },
      { reference: "Êxodo 20:2", text: "Eu sou o Senhor teu Deus, que te tirei da terra do Egito, da casa da servidão." }
    ]
  }
];

export const statistics = {
  peopleHelped: [
    { label: "Estudantes", value: 45 },
    { label: "Pesquisadores", value: 30 },
    { label: "Curiosos", value: 25 }
  ]
};
