/* components/TopicImage.tsx */
"use client";
import React, { useState, useEffect } from "react";

interface TopicImageProps {
  query: string;
}

// Extrai o nome central da query
function extractQueryCore(query: string): string {
  return query
    .replace(/quem foi|quem é|quem eram|o que foi|o que é|o que são|me fale sobre|me fale de|sobre|conte sobre|na biblia|na bíblia|no antigo testamento|no novo testamento|história de|história do|\?|!|\./gi, "")
    .trim();
}

// Verifica o tipo de termo procurado para adaptar o filtro de imagem
function getQueryCategory(term: string): "escrito" | "evento" | "personagem" {
  const t = term.toLowerCase();
  
  const textKeywords = ['livro', 'epístola', 'evangelho', 'carta', 'manuscrito', 'papiro', 'códice', 'pergaminho', 'gênesis', 'êxodo', 'levítico', 'números', 'deuteronômio', 'salmos', 'provérbios', 'apocalipse', 'testamento', 'torá', 'bíblia', 'biblia', 'texto', 'manuscritos'];
  if (textKeywords.some(k => t.includes(k))) return "escrito";

  const eventKeywords = ['êxodo', 'travessia', 'dilúvio', 'batalha', 'guerra', 'destruição', 'queda', 'nascimento', 'crucificação', 'ressurreição', 'milagre', 'casamento', 'ceia', 'concílio', 'viagem', 'império', 'cidade', 'jerusalém', 'babilônia'];
  if (eventKeywords.some(k => t.includes(k))) return "evento";

  return "personagem"; // Default restrito
}

export const TopicImage: React.FC<TopicImageProps> = ({ query }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      setImageUrl(null);
      setCaption("");
      const coreTerm = extractQueryCore(query);
      if (!coreTerm) return;

      const category = getQueryCategory(coreTerm);

      // Estratégias de busca
      const searchStrategies = [
        { wiki: "pt", term: coreTerm },
        { wiki: "pt", term: category === "personagem" ? `${coreTerm} personagem bíblico` : `${coreTerm} bíblia` },
        { wiki: "en", term: `${coreTerm} bible` },
        { wiki: "en", term: coreTerm },
      ];

      for (const strategy of searchStrategies) {
        try {
          const baseUrl = strategy.wiki === "pt" 
            ? "https://pt.wikipedia.org" 
            : "https://en.wikipedia.org";

          const searchRes = await fetch(
            `${baseUrl}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(strategy.term)}&format=json&origin=*&srlimit=3`
          );
          const searchData = await searchRes.json();
          const pages = searchData.query?.search;
          if (!pages || pages.length === 0) continue;

          for (const page of pages) {
            const imgRes = await fetch(
              `${baseUrl}/w/api.php?action=query&titles=${encodeURIComponent(page.title)}&prop=pageimages|images&format=json&origin=*&pithumbsize=600`
            );
            const imgData = await imgRes.json();
            const pageData = Object.values(imgData.query?.pages || {})[0] as {
              thumbnail?: { source: string };
              title?: string;
              images?: { title: string }[];
            };

            if (pageData?.thumbnail?.source) {
              const src = pageData.thumbnail.source.toLowerCase();
              
              // Base de exclusão para coisas inúteis (ícones de UI, logos da Wiki)
              const isUIBad = src.includes("icon") || src.includes("logo.svg") || src.includes("question") || src.includes("stub") || src.includes("edit");
              
              const pageTitleLow = page.title.toLowerCase();
              const isChurch = pageTitleLow.includes("igreja") || 
                               pageTitleLow.includes("church") || 
                               pageTitleLow.includes("santos dos últimos dias") || 
                               pageTitleLow.includes("mormon") || 
                               pageTitleLow.includes("testemunha") || 
                               pageTitleLow.includes("adventista") || 
                               pageTitleLow.includes("assembleia") || 
                               pageTitleLow.includes("metodista") ||
                               pageTitleLow.includes("universal") ||
                               pageTitleLow.includes("catedral") ||
                               pageTitleLow.includes("denominação");

              if (isUIBad || isChurch) continue;

              // Lógica baseada na categoria
              let isAcceptable = true;
              
              if (category === "personagem") {
                // Rejeita mapas, livros, textos para personagens
                if (src.includes("map") || src.includes("book") || src.includes("text") || src.includes("scroll") || src.includes("codex") || src.includes("papyrus") || src.includes("flag")) {
                  isAcceptable = false;
                }
              } else if (category === "escrito") {
                // Aceita tudo de escrito (livros, códices, papiros), rejeita mapas flagrantes ou bandeiras
                if (src.includes("map") || src.includes("flag")) {
                  isAcceptable = false;
                }
              } else if (category === "evento") {
                // Eventos e locais aceitam mapas, pinturas, etc. Rejeita apenas flags estáticas
                if (src.includes("flag")) {
                  isAcceptable = false;
                }
              }

              if (isAcceptable) {
                setImageUrl(pageData.thumbnail.source);
                setCaption(page.title);
                return; // Parar na primeira imagem boa
              }
            }
          }
        } catch {
          // Ignorar e tentar próxima estratégia
        }
      }
    };

    fetchImage();
  }, [query]);

  if (!imageUrl) return null;

  return (
    <div className="topic-image-container">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={caption}
        className="topic-image"
      />
      <p className="topic-image-caption">{caption}</p>
    </div>
  );
};
