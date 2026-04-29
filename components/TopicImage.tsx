/* components/TopicImage.tsx */
"use client";
import React, { useState, useEffect } from "react";

interface TopicImageProps {
  query: string;
}

// Extrai o nome central da query para a legenda
function extractQueryCore(query: string): string {
  return query
    .replace(/quem foi|quem é|quem eram|o que foi|o que é|o que são|me fale sobre|me fale de|sobre|conte sobre|na biblia|na bíblia|no antigo testamento|no novo testamento|história de|história do|\?|!|\./gi, "")
    .trim();
}

export const TopicImage: React.FC<TopicImageProps> = ({ query }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(false);
    setLoading(true);
  }, [query]);

  if (!query) return null;

  const coreTerm = extractQueryCore(query);
  const apiImageUrl = `/api/image?q=${encodeURIComponent(query)}`;

  if (error) return null;

  return (
    <div className={`topic-image-container ${loading ? 'loading' : 'loaded'}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={apiImageUrl}
        alt={coreTerm}
        className="topic-image"
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        style={{ display: loading ? 'none' : 'block' }}
      />
      {!loading && <p className="topic-image-caption">{coreTerm}</p>}
      
      <style jsx>{`
        .topic-image-container {
          width: 100%;
          min-height: 200px;
          margin: 1rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .topic-image {
          max-width: 100%;
          max-height: 500px;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .topic-image-caption {
          margin-top: 0.75rem;
          font-size: 0.9rem;
          color: #999;
          font-style: italic;
          text-transform: capitalize;
        }
        .loading {
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};
