/* app/page.tsx */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { biblicalFigures, BiblicalFigure } from "../lib/data";
import { QueryInput } from "../components/QueryInput";
import { FigureView } from "../components/FigureView";
import { ImpactChart } from "../components/ImpactChart";
import { TopicImage } from "../components/TopicImage";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [selectedFigure, setSelectedFigure] = useState<BiblicalFigure | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [imageQuery, setImageQuery] = useState<string | null>(null);
  const [searchKey, setSearchKey] = useState(0);
  const [currentQuery, setCurrentQuery] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  // Estados reais do Supabase
  const [totalSearches, setTotalSearches] = useState(0);
  const [totalTopics, setTotalTopics] = useState(0);
  const [totalVerses, setTotalVerses] = useState(0);

  useEffect(() => {
    // Busca inicial
    const fetchStats = async () => {
      const { data } = await supabase.from('statistics').select('*').eq('id', 1).single();
      if (data) {
        setTotalSearches(data.total_consultas);
        setTotalTopics(data.total_temas);
        setTotalVerses(data.total_versiculos);
      }
    };
    fetchStats();

    // Inscrição em tempo real
    const channel = supabase.channel('realtime_stats')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'statistics', filter: 'id=eq.1' }, (payload) => {
        if (payload.new) {
          setTotalSearches(payload.new.total_consultas);
          setTotalTopics(payload.new.total_temas);
          setTotalVerses(payload.new.total_versiculos);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    setSelectedFigure(biblicalFigures[0]);
  }, []);

  useEffect(() => {
    if ((aiResponse || isSearching) && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [aiResponse, isSearching]);

  const handleGlobalSearch = async (query: string) => {
    setAiResponse(null);
    setAiError(null);
    setImageQuery(null);
    setCurrentQuery(query);
    setIsSearching(true);
    setSearchKey(prev => prev + 1);
    
    // Atualização otimista
    setTotalSearches(prev => prev + 1);
    setTotalTopics(prev => prev + 1);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAiError(data.error || "Erro desconhecido.");
      } else {
        setAiResponse(data.response);
        setImageQuery(data.imageQuery || query);
      }
    } catch {
      setAiError("Erro de conexão. Verifique se o servidor está rodando.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="container">
      {/* SEO E-E-A-T: H1 estrutural com palavra-chave principal */}
      <h1 className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0' }}>
        Reflexão Bíblica Acadêmica - Estudos Profundos sobre a BÍBLIA e Exegese
      </h1>

      {/* JSON-LD para Google Search (E-E-A-T) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Reflexão Bíblica Acadêmica",
            "description": "Estudos profundos e acadêmicos sobre a BÍBLIA, utilizando exegese, linguística e história.",
            "publisher": {
              "@type": "Person",
              "name": "Peixeweb",
              "email": "peixeweb@gmail.com"
            },
            "mainEntity": {
              "@type": "ScholarlyArticle",
              "headline": "A BÍBLIA sob uma perspectiva acadêmica e histórica",
              "author": {
                "@type": "Person",
                "name": "Peixeweb"
              }
            }
          })
        }}
      />

      <ImpactChart 
        searches={totalSearches} 
        topics={totalTopics} 
        verses={totalVerses} 
      />
      <QueryInput onSearch={handleGlobalSearch} />

      <div className="glass-card" ref={resultRef} key={searchKey}>
        {isSearching ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <div className="loader" style={{ marginBottom: "1rem" }}>⏳ Consultando Especialista Bíblico...</div>
            <p style={{ opacity: 0.5 }}>Analisando manuscritos e contexto histórico com IA...</p>
          </div>
        ) : aiError ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <h2 style={{ color: "#ff6b6b", marginBottom: "1rem" }}>⚠️ Erro</h2>
            <p>{aiError}</p>
          </div>
        ) : aiResponse ? (
          <AIResponseView response={aiResponse} query={imageQuery || currentQuery} />
        ) : selectedFigure ? (
          <FigureView figure={selectedFigure} />
        ) : (
          <p>Selecione um tema ou faça uma pergunta.</p>
        )}
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
        {biblicalFigures.filter(f => ["jesus", "moses", "paul", "jeremiah", "enoch", "thomas-gospel"].includes(f.id)).map(f => (
          <button
            key={f.id}
            onClick={() => {
              setAiResponse(null);
              setAiError(null);
              setSelectedFigure(f);
              setSearchKey(prev => prev + 1);
              if (resultRef.current) {
                resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className={`suggestion-tag ${selectedFigure?.id === f.id && !aiResponse ? "active" : ""}`}
            style={selectedFigure?.id === f.id && !aiResponse ? { borderColor: "hsl(var(--accent))", color: "hsl(var(--accent))" } : {}}
          >
            {f.isApocryphal ? "📜 " : ""}{f.name}
          </button>
        ))}
      </div>
    </main>
  );
}

/* Componente para renderizar a resposta da IA em markdown */
function AIResponseView({ response, query }: { response: string; query: string }) {
  const renderMarkdown = (md: string) => {
    let html = md
      .replace(/^### (\d+\.\s.+)$/gm, '<h3 class="section-title" style="margin-top: 2.5rem">$1</h3>')
      .replace(/^### (.+)$/gm, '<h3 class="section-title" style="margin-top: 2.5rem">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li style="margin-bottom: 0.5rem">$1</li>')
      .replace(/^\d+\.\s(.+)$/gm, '<li style="margin-bottom: 0.5rem">$1</li>')
      .replace(/\n\n/g, '</p><p style="margin-top: 1rem; line-height: 1.8">')
      .replace(/\n/g, '<br/>');

    html = html.replace(/(<li[^>]*>.*?<\/li>(\s*<br\/>)?)+/g, (match) => {
      return `<ul style="margin-left: 1.5rem; margin-top: 0.5rem">${match}</ul>`;
    });

    return `<p style="line-height: 1.8">${html}</p>`;
  };

  return (
    <div className="ai-response animate-fade">
      <p style={{ textAlign: "center", fontStyle: "italic", opacity: 0.5, marginBottom: "1rem", fontSize: "0.9rem" }}>com base em erudição acadêmica</p>
      <TopicImage query={query} />
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📜 Análise do Especialista Bíblico</h1>
      </header>
      <div
        className="reflection-content"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(response) }}
      />
    </div>
  );
}
