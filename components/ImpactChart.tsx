/* components/ImpactChart.tsx */
"use client";
import React from "react";

interface ImpactChartProps {
  searches: number;
  topics: number;
  verses: number;
}

export const ImpactChart: React.FC<ImpactChartProps> = ({ searches, topics, verses }) => {
  const data = [
    { label: "Consultas Realizadas", value: Math.max(1, searches), color: "hsl(45 100% 50%)" },
    { label: "Temas Explorados", value: Math.max(1, topics), color: "hsla(45, 100%, 50%, 0.6)" },
    { label: "Versículos Analisados", value: Math.max(1, verses), color: "hsla(45, 100%, 50%, 0.3)" },
  ];

  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x * 100, y * 100];
  };

  return (
    <div className="impact-chart-container" style={{ textAlign: "center", margin: "2rem 0" }}>
      <h3 style={{ fontSize: "0.9rem", color: "hsl(var(--accent-soft))", marginBottom: "1.5rem", letterSpacing: "1px" }}>
        PAINEL DE IMPACTO
      </h3>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem", justifyContent: "center" }}>
        <svg viewBox="-110 -110 220 220" style={{ width: "180px", height: "180px", transform: "rotate(-90deg)" }}>
          {data.map((slice, index) => {
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += slice.value / total;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
            const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;

            const pathData = [
              `M ${startX} ${startY}`,
              `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 0 0`,
            ].join(" ");

            return (
              <path
                key={index}
                d={pathData}
                fill={slice.color}
                stroke="white"
                strokeWidth="0.5"
                style={{ transition: "all 0.5s ease" }}
              />
            );
          })}
          {/* Número central */}
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fill="hsl(var(--accent))" fontSize="36" fontWeight="bold" style={{ transform: "rotate(90deg)" }}>
            {searches}
          </text>
        </svg>
        <div style={{ textAlign: "left", fontSize: "0.85rem" }}>
          {data.map((item, index) => (
            <div key={index} style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: item.color, display: "inline-block" }}></span>
              <span style={{ opacity: 0.8 }}>{item.label}:</span>
              <span style={{ fontWeight: "bold", color: "hsl(var(--accent))" }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
