/* components/QueryInput.tsx */
"use client";
import React, { useState, useEffect, useRef } from "react";

interface QueryInputProps {
  onSearch: (query: string) => void;
}

export const QueryInput: React.FC<QueryInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
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
          style={{ resize: "vertical", minHeight: "60px", paddingRight: "100px" }}
        />
        
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
