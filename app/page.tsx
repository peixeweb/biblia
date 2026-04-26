"use client";
import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Verse {
  reference: string;
  origin?: string;
  isApocryphal?: boolean;
  versions?: Record<string, string>;
  apocryphalText?: string | null;
  text?: string;
}

interface TranslationAnalysis {
  formal: string;
  dynamic: string;
  linguistics: string;
}

interface HistoricalContext {
  period: string;
  environment: string;
  details: string;
}

interface AcademicPerspective {
  consenso: string;
  debate: string;
  canon?: string;
}

interface SearchResult {
  essentialText: string;
  paraphrases: string[];
  translationAnalysis: TranslationAnalysis;
  historicalContext: HistoricalContext;
  relatedVerses: Verse[];
  academicPerspective: AcademicPerspective;
  interpretationCurrents: string[];
  ethicalReflection: string;
  isApocryphal: boolean;
  imageSearch?: string;
  _provider?: string;
  error?: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const topics = [
  { id: "jesus", name: "Jesus de Nazaré", icon: "✝️" },
  { id: "enoch", name: "Livro de Enoque", icon: "📜" },
  { id: "thomas", name: "Evangelho de Tomé", icon: "📜" },
  { id: "paul", name: "Paulo de Tarso", icon: "✝️" },
  { id: "moses", name: "Moisés", icon: "📜" },
  { id: "genesis", name: "Gênesis 1", icon: "🌍" },
  { id: "salmos", name: "Salmos 23", icon: "🎵" },
  { id: "apocalipse", name: "Apocalipse", icon: "🔥" },
];

const suggestions = [
  "João 3:16",
  "Sermão da Montanha",
  "Livro de Jó",
  "Quem foi Maria Madalena?",
  "Gênesis e a Criação",
];

// ─── Version label descriptions ───────────────────────────────────────────────
const versionMeta: Record<string, { label: string; desc: string }> = {
  ARA:     { label: "ARA",     desc: "Almeida Revista e Atualizada" },
  NVI:     { label: "NVI",     desc: "Nova Versão Internacional" },
  MSG:     { label: "MSG",     desc: "A Mensagem" },
  "KJV-BR":{ label: "KJV",    desc: "King James (traduzida)" },
  LXX:     { label: "LXX",    desc: "Septuaginta (Grego)" },
  Vulgata: { label: "VUL",    desc: "Vulgata Latina (traduzida)" },
};

// ─── Component: Verse Card ────────────────────────────────────────────────────
function VerseCard({ verse }: { verse: Verse }) {
  const [expanded, setExpanded] = useState(false);
  const versionKeys = verse.versions ? Object.keys(verse.versions) : [];
  const hasVersions = versionKeys.length > 0;
  const primaryText = verse.versions?.["ARA"] || verse.versions?.["NVI"] || verse.text;

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e8dfc0",
      borderLeft: `4px solid ${verse.isApocryphal ? "#8b0000" : "#d4af37"}`,
      borderRadius: "10px",
      padding: "14px",
      marginBottom: "12px",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
        <strong style={{ color: "#b8860b", fontSize: "0.95rem" }}>{verse.reference}</strong>
        {verse.isApocryphal && (
          <span style={{
            background: "#8b0000", color: "#fff",
            padding: "2px 7px", borderRadius: "8px", fontSize: "0.65rem", fontWeight: "bold"
          }}>APÓCRIFO</span>
        )}
      </div>

      {/* Origin */}
      {verse.origin && (
        <div style={{
          background: "#fdf8e8", border: "1px solid #e8dfc0",
          borderRadius: "6px", padding: "6px 10px", marginBottom: "10px", fontSize: "0.75rem", color: "#7a6a2a"
        }}>
          📜 <strong>Origem:</strong> {verse.origin}
        </div>
      )}

      {/* Primary text preview */}
      {primaryText && (
        <p style={{ color: "#444", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "8px", fontStyle: "italic" }}>
          "{primaryText}"
        </p>
      )}

      {/* Expand button */}
      {hasVersions && versionKeys.length > 1 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none", border: "1px solid #d4af37", color: "#b8860b",
            borderRadius: "15px", padding: "3px 12px", fontSize: "0.75rem", cursor: "pointer",
            marginBottom: expanded ? "10px" : "0"
          }}
        >
          {expanded ? "▲ Esconder versões" : `▼ Ver todas as versões (${versionKeys.length})`}
        </button>
      )}

      {/* All versions */}
      {expanded && hasVersions && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
          {versionKeys.map((vKey) => {
            const meta = versionMeta[vKey] || { label: vKey, desc: vKey };
            const isMsg = vKey === "MSG";
            const isLxx = vKey === "LXX";
            const isApoc = vKey === "Apócrifo";
            return (
              <div key={vKey} style={{
                padding: "8px 12px",
                borderRadius: "8px",
                background: isMsg ? "#f0f7ff" : isLxx ? "#f5f0ff" : isApoc ? "#fff5f5" : "#fafafa",
                borderLeft: `3px solid ${isMsg ? "#4a90d9" : isLxx ? "#7c3aed" : isApoc ? "#8b0000" : "#d4af37"}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                  <span style={{
                    fontWeight: "bold", fontSize: "0.7rem",
                    color: isMsg ? "#4a90d9" : isLxx ? "#7c3aed" : isApoc ? "#8b0000" : "#b8860b",
                    background: isMsg ? "#dbeafe" : isLxx ? "#ede9fe" : isApoc ? "#feeaea" : "#fdf8e8",
                    padding: "1px 7px", borderRadius: "6px"
                  }}>{meta.label}</span>
                  <span style={{ fontSize: "0.68rem", color: "#888" }}>{meta.desc}</span>
                </div>
                <p style={{ color: "#444", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                  {(verse.versions as Record<string, string>)[vKey]}
                </p>
              </div>
            );
          })}

          {verse.apocryphalText && (
            <div style={{
              padding: "8px 12px", borderRadius: "8px",
              background: "#fff5f5", borderLeft: "3px solid #8b0000"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <span style={{
                  fontWeight: "bold", fontSize: "0.7rem", color: "#8b0000",
                  background: "#feeaea", padding: "1px 7px", borderRadius: "6px"
                }}>APÓCRIFO</span>
                <span style={{ fontSize: "0.68rem", color: "#888" }}>Texto deuterocanônico/apócrifo</span>
              </div>
              <p style={{ color: "#6b2626", fontSize: "0.85rem", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                {verse.apocryphalText}
              </p>
            </div>
          )}
        </div>
      )}

      {/* If only one version or not expanded, show apocryphal text always */}
      {!expanded && verse.apocryphalText && (
        <div style={{
          marginTop: "8px", padding: "8px 12px", borderRadius: "8px",
          background: "#fff5f5", borderLeft: "3px solid #8b0000"
        }}>
          <span style={{ fontSize: "0.7rem", color: "#8b0000", fontWeight: "bold" }}>Texto Apócrifo: </span>
          <span style={{ color: "#6b2626", fontSize: "0.83rem", fontStyle: "italic" }}>{verse.apocryphalText}</span>
        </div>
      )}
    </div>
  );
}

// ─── Component: Section Block ─────────────────────────────────────────────────
function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#f9f6ee",
      border: "1px solid #e8dfc0",
      borderRadius: "12px",
      padding: "18px",
      marginBottom: "16px",
    }}>
      <h3 style={{ fontSize: "0.9rem", color: "#b8860b", marginBottom: "12px", fontWeight: "bold", letterSpacing: "0.5px", textTransform: "uppercase" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const [stats, setStats] = useState({ consultas: 0, temas: 0, versiculos: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bibliaStats");
      if (saved) {
        try { setStats(JSON.parse(saved)); } catch { /* ignore */ }
      }
    }
  }, []);

  const handleSearch = async (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setSearchQuery(trimmed);
    setQuery("");
    setLoading(true);
    setResult(null);
    setErrorMsg(null);
    setCharacterImage(null);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      const data: SearchResult = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Erro ao processar a consulta. Tente novamente.");
        setLoading(false);
        return;
      }

      setResult(data);

      // Update local stats
      const newStats = {
        consultas: stats.consultas + 1,
        temas: stats.temas + 1,
        versiculos: stats.versiculos + (data.relatedVerses?.length || 0),
      };
      setStats(newStats);
      localStorage.setItem("bibliaStats", JSON.stringify(newStats));

      // Fetch image — try multiple search terms in sequence
      {
        // Build candidate terms: imageSearch from API first, then the original query,
        // then just the first meaningful word of the query
        const firstWord = trimmed.split(/[\s,.-]/)[0] || "";
        const candidates: string[] = [];
        if (data.imageSearch) candidates.push(data.imageSearch);
        candidates.push(trimmed);
        if (firstWord.length > 2 && firstWord.toLowerCase() !== trimmed.toLowerCase()) {
          candidates.push(firstWord);
        }
        // Remove duplicates
        const uniqueCandidates = [...new Set(candidates)];

        let foundImage = false;
        for (const candidate of uniqueCandidates) {
          if (foundImage) break;
          try {
            const imgRes = await fetch(`/api/image?q=${encodeURIComponent(candidate)}`);
            if (imgRes.ok) {
              const imgData = await imgRes.json();
              const imageUrl = typeof imgData.imageUrl === 'string' ? imgData.imageUrl.trim() : "";
              if (imageUrl && /^(data:|https?:\/\/)/.test(imageUrl)) {
                setCharacterImage(imageUrl);
                foundImage = true;
              }
            }
          } catch {
            // Image is optional — continue trying next candidate
          }
        }
      }
    } catch (err) {
      setErrorMsg("Falha na conexão. Verifique sua internet e tente novamente.");
      console.error("[page] fetch error:", err);
    }

    setLoading(false);
  };

  return (
    <main style={{ maxWidth: "680px", margin: "0 auto", padding: "20px" }}>
      <h1 className="sr-only">Reflexão Bíblica Acadêmica — Exegese, Linguística e História</h1>

      {/* ── Stats Panel ── */}
      <div style={{
        background: "#1a1a1a", borderRadius: "15px", padding: "18px",
        marginBottom: "24px", border: "1px solid #333"
      }}>
        <p style={{ fontSize: "0.75rem", color: "#d4af37", letterSpacing: "2px", marginBottom: "14px", textAlign: "center" }}>
          PAINEL DE IMPACTO
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", textAlign: "center" }}>
          {[
            { label: "Consultas", value: stats.consultas },
            { label: "Temas Explorados", value: stats.temas },
            { label: "Versículos", value: stats.versiculos },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#d4af37" }}>{s.value}</div>
              <div style={{ fontSize: "0.68rem", color: "#888" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Search Section ── */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.2rem", color: "#b8860b", marginBottom: "14px", fontWeight: 400 }}>
          ✨ Pergunte qualquer coisa sobre a Bíblia ✨
        </h2>
        <div style={{ position: "relative" }}>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSearch(query);
              }
            }}
            placeholder="Ex: João 3:16  |  Quem foi Maria Madalena?  |  Livro de Enoque  |  Gênesis 1..."
            className="search-input"
            rows={3}
            style={{ width: "100%", resize: "vertical", minHeight: "110px", padding: "15px 15px 65px 15px" }}
          />
          <button
            onClick={() => handleSearch(query)}
            disabled={loading || !query.trim()}
            className="search-button"
            style={{ position: "absolute", right: "10px", bottom: "10px" }}
          >
            {loading ? "⏳ Buscando..." : "🔍 Consultar"}
          </button>
        </div>

        {/* Suggestions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "12px" }}>
          <span style={{ opacity: 0.6, fontSize: "0.8rem", alignSelf: "center" }}>Sugestões:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSearch(s)}
              style={{
                padding: "5px 13px", borderRadius: "20px", border: "1px solid #d4af37",
                background: "#fffbe6", color: "#b8860b", fontSize: "0.8rem", cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Topic Buttons ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "24px" }}>
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSearch(t.name)}
            style={{
              padding: "8px 16px", borderRadius: "20px", border: "1px solid #ccc",
              background: "#fff", color: "#555", fontSize: "0.85rem", cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {t.icon} {t.name}
          </button>
        ))}
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div style={{
          background: "#fffbe6", border: "2px solid #d4af37", borderRadius: "12px",
          padding: "20px", textAlign: "center", marginBottom: "20px"
        }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>📖</div>
          <p style={{ color: "#b8860b", fontWeight: "bold" }}>Consultando fontes acadêmicas...</p>
          <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "4px" }}>
            Analisando manuscritos, traduções e contexto histórico
          </p>
        </div>
      )}

      {/* ── Error Message ── */}
      {errorMsg && !loading && (
        <div style={{
          background: "#fff5f5", border: "2px solid #e53e3e", borderRadius: "12px",
          padding: "16px", marginBottom: "20px", color: "#c53030"
        }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* ── Results ── */}
      {result && !loading && (
        <section>
          {/* Title + provider badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
            <h2 style={{ fontSize: "1.1rem", color: "#b8860b", fontWeight: "bold" }}>
              📚 Reflexão Bíblica Acadêmica
            </h2>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {result.isApocryphal && (
                <span style={{
                  background: "#8b0000", color: "#fff",
                  padding: "4px 12px", borderRadius: "15px", fontSize: "0.75rem", fontWeight: "bold"
                }}>📜 LIVRO APÓCRIFO</span>
              )}
            </div>
          </div>

          {/* Character image */}
          {characterImage && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={characterImage}
                alt={searchQuery || query}
                style={{
                  maxWidth: "260px", borderRadius: "12px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)", border: "3px solid #d4af37"
                }}
              />
            </div>
          )}

          {/* 1. Essential Text */}
          {result.essentialText && (
            <SectionBlock title="📖 Essência do Texto">
              {result.essentialText.split(/\n+/).filter(Boolean).map((p, i) => (
                <p key={i} style={{ color: "#444", lineHeight: 1.75, fontSize: "0.92rem", marginBottom: "10px" }}>{p}</p>
              ))}
            </SectionBlock>
          )}

          {/* 2. Paraphrases */}
          {result.paraphrases && result.paraphrases.length > 0 && (
            <SectionBlock title="💬 Paráfrases Acadêmicas">
              {result.paraphrases.map((p, i) => (
                <div key={i} style={{
                  display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px"
                }}>
                  <span style={{
                    minWidth: "22px", height: "22px", background: "#d4af37", color: "#000",
                    borderRadius: "50%", fontSize: "0.7rem", fontWeight: "bold",
                    display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px"
                  }}>{i + 1}</span>
                  <p style={{ color: "#555", lineHeight: 1.65, fontSize: "0.88rem", margin: 0 }}>{p}</p>
                </div>
              ))}
            </SectionBlock>
          )}

          {/* 3. Translation Analysis */}
          {result.translationAnalysis && (
            result.translationAnalysis.formal || result.translationAnalysis.dynamic || result.translationAnalysis.linguistics
          ) && (
            <SectionBlock title="🔤 Análise Comparativa de Traduções">
              {[
                { key: "formal", label: "📘 Tradução Formal (Literal)", color: "#2563eb", bg: "#eff6ff" },
                { key: "dynamic", label: "💬 Tradução Dinâmica (A Mensagem / NVI)", color: "#16a34a", bg: "#f0fdf4" },
                { key: "linguistics", label: "🏺 Análise Linguística (Grego/Hebraico/Aramaico)", color: "#7c3aed", bg: "#faf5ff" },
              ].map(({ key, label, color, bg }) => {
                const val = result.translationAnalysis[key as keyof TranslationAnalysis];
                if (!val) return null;
                return (
                  <div key={key} style={{ background: bg, borderLeft: `4px solid ${color}`, borderRadius: "8px", padding: "12px", marginBottom: "10px" }}>
                    <p style={{ fontWeight: "bold", color, fontSize: "0.8rem", marginBottom: "6px" }}>{label}</p>
                    <p style={{ color: "#444", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>{val}</p>
                  </div>
                );
              })}
            </SectionBlock>
          )}

          {/* 4. Related Verses */}
          {result.relatedVerses && result.relatedVerses.length > 0 && (
            <SectionBlock title="📜 Versículos Relacionados — Múltiplas Versões">
              {result.relatedVerses.map((v, i) => (
                <VerseCard key={i} verse={v} />
              ))}
            </SectionBlock>
          )}

          {/* 5. Historical Context */}
          {result.historicalContext?.period && (
            <SectionBlock title="🏛️ Contexto Histórico-Cultural">
              {[
                { label: "Período / Autoria", value: result.historicalContext.period },
                { label: "Ambiente Geopolítico", value: result.historicalContext.environment },
                { label: "Evidências Arqueológicas", value: result.historicalContext.details },
              ].filter(i => i.value).map((item) => (
                <div key={item.label} style={{
                  display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start"
                }}>
                  <div style={{
                    minWidth: "8px", height: "8px", background: "#d4af37", borderRadius: "50%", marginTop: "7px"
                  }} />
                  <div>
                    <strong style={{ fontSize: "0.8rem", color: "#7a6a2a", display: "block", marginBottom: "2px" }}>
                      {item.label}
                    </strong>
                    <p style={{ color: "#555", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </SectionBlock>
          )}

          {/* 6. Academic Perspective */}
          {result.academicPerspective?.consenso && (
            <SectionBlock title="🎓 Perspectiva Acadêmica">
              {[
                { label: "Consenso Acadêmico", value: result.academicPerspective.consenso, color: "#16a34a", bg: "#f0fdf4" },
                { label: "Debates e Controvérsias", value: result.academicPerspective.debate, color: "#dc2626", bg: "#fff5f5" },
                { label: "Canonicidade", value: result.academicPerspective.canon, color: "#7c3aed", bg: "#faf5ff" },
              ].filter(i => i.value).map((item) => (
                <div key={item.label} style={{
                  background: item.bg, borderLeft: `4px solid ${item.color}`,
                  borderRadius: "8px", padding: "12px", marginBottom: "10px"
                }}>
                  <p style={{ fontWeight: "bold", color: item.color, fontSize: "0.78rem", marginBottom: "5px" }}>
                    {item.label}
                  </p>
                  <p style={{ color: "#444", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </SectionBlock>
          )}

          {/* 7. Interpretation Currents */}
          {result.interpretationCurrents && result.interpretationCurrents.length > 0 && (
            <SectionBlock title="🧭 Correntes de Interpretação">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {result.interpretationCurrents.map((c, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#fff", border: "1px solid #d4af37", color: "#7a6a2a",
                      padding: "6px 14px", borderRadius: "20px", fontSize: "0.8rem"
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </SectionBlock>
          )}

          {/* 8. Ethical Reflection */}
          {result.ethicalReflection && (
            <SectionBlock title="⚖️ Reflexão Ética">
              {result.ethicalReflection.split(/\n+/).filter(Boolean).map((p, i) => (
                <p key={i} style={{
                  color: "#555", fontStyle: "italic", lineHeight: 1.75,
                  fontSize: "0.88rem", marginBottom: "10px"
                }}>{p}</p>
              ))}
            </SectionBlock>
          )}
        </section>
      )}

      {/* ── Empty state ── */}
      {!result && !loading && !errorMsg && (
        <div style={{
          background: "#f9f6ee", border: "1px dashed #d4af37",
          borderRadius: "15px", padding: "30px", textAlign: "center", color: "#888"
        }}>
          <p style={{ fontSize: "2rem", marginBottom: "10px" }}>📖</p>
          <p style={{ fontWeight: "bold", color: "#b8860b", marginBottom: "6px" }}>Pronto para uma análise profunda</p>
          <p style={{ fontSize: "0.85rem" }}>
            Digite uma pergunta, um versículo (ex: João 3:16) ou selecione um tema acima.
          </p>
        </div>
      )}
    </main>
  );
}