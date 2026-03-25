/* components/QueryInput.tsx */
"use client";
import React, { useState, useEffect, useRef } from "react";

interface QueryInputProps {
  onSearch: (query: string) => void;
}

export const QueryInput: React.FC<QueryInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "pt-BR";

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript) {
            setQuery(currentTranscript);
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Erro na escuta:", event.error);
          setIsListening(false);
        };
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        setQuery(""); // Limpa o input antes de ouvir
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Desculpe, seu navegador não tem suporte para Pesquisa por Voz (Web Speech API). Tente usar o Chrome ou Safari.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
      }
      onSearch(query.trim());
      setQuery(""); // Limpa a caixa após a consulta
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sem Shift submete o formulário
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
    // Shift+Enter faz quebra de linha normalmente
  };

  return (
    <div className="search-container" style={{ marginBottom: "3rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "1.5rem", color: "hsl(var(--accent))", marginBottom: "1.5rem", fontWeight: "400", letterSpacing: "1px" }}>
        ✨ Pergunte qualquer coisa sobre a Bíblia ✨
      </h2>
      <form onSubmit={handleSubmit} style={{ position: "relative" }}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ex: Quem foi Jesus? O que é Gênesis? João 3:16..."
          className="search-input"
          rows={3}
          style={{ resize: "vertical", minHeight: "60px", paddingRight: "160px" }}
        />
        
        {/* Botão de Microfone */}
        <button
          type="button"
          onClick={toggleListening}
          style={{
            position: "absolute",
            right: "120px",
            bottom: "10px",
            background: isListening ? "#ff4b4b" : "transparent",
            color: isListening ? "white" : "hsl(var(--accent))",
            border: isListening ? "none" : "1px solid hsl(var(--accent-soft))",
            borderRadius: "5px",
            padding: "8px 13px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isListening ? "0 0 15px rgba(255, 75, 75, 0.4)" : "none",
            animation: isListening ? "pulse 1.5s infinite" : "none"
          }}
          title={isListening ? "Ouvindo... Clique para parar" : "Pesquisar por Voz"}
        >
          {isListening ? "⏹️ Parar" : "🎙️"}
        </button>

        {/* Estilo local para a animação do gravador */}
        {isListening && (
          <style>{`
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
          `}</style>
        )}

        <button type="submit" className="search-button" style={{ position: "absolute", right: "10px", bottom: "10px" }}>
          Consultar
        </button>
      </form>
      <div className="suggestions">
        <span style={{ opacity: 0.6, fontSize: "0.85rem" }}>Sugestões: </span>
        {["Quem foi Jesus?", "Livro de Enoque", "Sermão da Montanha", "Moisés", "Paulo de Tarso"].map((s) => (
          <button
            key={s}
            onClick={() => {
              onSearch(s);
            }}
            className="suggestion-tag"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};
