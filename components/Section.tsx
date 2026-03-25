/* components/Section.tsx */
import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}

export const Section: React.FC<SectionProps> = ({ title, children, last }) => {
  return (
    <section className="section" style={last ? { border: "none" } : {}}>
      <h2 className="section-title">{title}</h2>
      <div className="reflection-content">{children}</div>
    </section>
  );
};
