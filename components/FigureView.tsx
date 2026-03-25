/* components/FigureView.tsx */
import React from "react";
import { BiblicalFigure } from "../lib/data";
import { Section } from "./Section";

interface FigureViewProps {
  figure: BiblicalFigure;
}

export const FigureView: React.FC<FigureViewProps> = ({ figure }) => {
  return (
    <div className="figure-view animate-fade" key={figure.id}>
      <header style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <h1 style={{ fontSize: "2.8rem", marginBottom: "0.5rem" }}>{figure.name}</h1>
        <p className="linguistics-tag" style={{ display: "inline-block", marginBottom: "0.5rem" }}>
          {figure.role}
        </p>
        <p style={{ fontStyle: "italic", opacity: 0.7, fontSize: "1.1rem", marginTop: "0.5rem" }}>
          {figure.keyVerse}
        </p>
      </header>

      <Section title="1. Essência do Texto (Paráfrase)">
        <p>{figure.essence}</p>
      </Section>

      <Section title="2. Análise Comparativa de Tradução">
        <p>
          <span className="linguistics-tag">{figure.translation.linguistics}</span>
        </p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "1rem" }}>
          <li>
            <strong>Formal:</strong> {figure.translation.formal}
          </li>
          <li>
            <strong>Dinâmica:</strong> {figure.translation.dynamic}
          </li>
        </ul>
      </Section>

      <Section title="3. Contexto Histórico-Cultural">
        <div className="detail-card">
          <div className="detail-row">
            <strong>📅 Época:</strong>
            <span>{figure.context.period}</span>
          </div>
          <div className="detail-row">
            <strong>🌍 Ambiente:</strong>
            <span>{figure.context.environment}</span>
          </div>
        </div>
        <div style={{ marginTop: "1rem", padding: "1.2rem", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "10px", borderLeft: "4px solid hsl(var(--accent))" }}>
          <strong>📚 Detalhes Acadêmicos:</strong>
          <p style={{ marginTop: "0.5rem", lineHeight: "1.7" }}>{figure.context.details}</p>
        </div>
      </Section>

      {figure.relatedVerses && figure.relatedVerses.length > 0 && (
        <Section title="📖 Versículos Relacionados">
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {figure.relatedVerses.map((v, i) => (
              <li key={i} className="verse-card">
                <div style={{ fontWeight: "bold", fontSize: "0.9rem", color: "hsl(var(--accent))", marginBottom: "0.5rem" }}>
                  📖 {v.reference}
                </div>
                <div style={{ fontStyle: "italic", opacity: 0.9, lineHeight: "1.7" }}>
                  &ldquo;{v.text}&rdquo;
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="4. Perspectiva Acadêmica">
        <div className="academic-cards">
          <div className="academic-card consensus">
            <div className="academic-card-label">✅ Consenso</div>
            <p>{figure.academic.consensus}</p>
          </div>
          <div className="academic-card debate">
            <div className="academic-card-label">⚖️ Debate</div>
            <p>{figure.academic.debate}</p>
          </div>
        </div>
      </Section>

      <Section title="5. Correntes de Interpretação">
        <div className="interpretation-list">
          {figure.interpretations.map((interp, i) => (
            <div key={i} className="interpretation-item">
              <span className="interpretation-number">{i + 1}</span>
              <span className="interpretation-text">{interp}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="6. Reflexão Ética" last>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.8", fontStyle: "italic" }}>{figure.ethicalReflection}</p>
      </Section>
    </div>
  );
};
