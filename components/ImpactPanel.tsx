"use client";
import { useState, useEffect } from "react";

export function ImpactPanel() {
  const [stats, setStats] = useState({ consultas: 0, temas: 0, versiculos: 0 });

  useEffect(() => {
    const updateStats = () => {
      const saved = localStorage.getItem("bibliaStats");
      if (saved) {
        try {
          setStats(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing stats", e);
        }
      }
    };

    updateStats();
    // Listen for storage changes in case other components update it
    window.addEventListener("storage", updateStats);
    // Also listen for a custom event we can trigger when updating stats in page.tsx
    window.addEventListener("statsUpdated", updateStats);

    return () => {
      window.removeEventListener("storage", updateStats);
      window.removeEventListener("statsUpdated", updateStats);
    };
  }, []);

  const total = stats.consultas + stats.temas + stats.versiculos || 1;
  const p1 = (stats.consultas / total) * 360;
  const p2 = (stats.temas / total) * 360;

  return (
    <div style={{
      background: "#1a1a1a",
      borderRadius: "15px",
      padding: "10px",
      border: "1px solid #333",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "fit-content",
      minWidth: "180px"
    }}>
      <p style={{ 
        fontSize: "0.6rem", 
        color: "#d4af37", 
        letterSpacing: "2px", 
        marginBottom: "10px", 
        textAlign: "center", 
        fontWeight: "bold", 
        opacity: 0.8,
        textTransform: "uppercase"
      }}>
        Impacto
      </p>

      {/* Pie Chart */}
      <div style={{
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        background: `conic-gradient(
          #d4af37 0deg ${p1}deg,
          #9a7b2c ${p1}deg ${p1 + p2}deg,
          #4d3d14 ${p1 + p2}deg 360deg
        )`,
        boxShadow: "inset 0 0 12px rgba(0,0,0,0.4), 0 0 10px rgba(212,175,55,0.1)",
        position: "relative",
      }}>
        {/* Inner Circle with ALL data */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "115px",
          height: "115px",
          background: "rgba(20, 20, 20, 0.92)",
          backdropFilter: "blur(6px)",
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          padding: "8px"
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <div style={{ fontSize: "1.9rem", fontWeight: "normal", color: "#d4af37", lineHeight: 1 }}>
              {stats.consultas + stats.temas + stats.versiculos}
            </div>
            <div style={{ fontSize: "0.65rem", color: "#aaa", textTransform: "uppercase", letterSpacing: "1px", marginTop: "2px" }}>
              Análises
            </div>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "8px", 
            width: "100%", 
            marginTop: "0px"
          }}>
            {[
              { label: "C", value: stats.consultas, color: "#d4af37" },
              { label: "T", value: stats.temas, color: "#9a7b2c" },
              { label: "V", value: stats.versiculos, color: "#8b6d1e" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: "1.05rem", fontWeight: "normal", color: "#fff", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "0.55rem", color: s.color, fontWeight: "900", marginTop: "1px", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
