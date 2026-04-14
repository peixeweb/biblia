"use client";
import { useState, useEffect } from "react";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    const promptEvent = deferredPrompt as any;
    promptEvent.prompt();
    
    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") {
      setShowInstallButton(false);
    }
    setDeferredPrompt(null);
  };

  if (!showInstallButton) return null;

  return (
    <button
      onClick={handleInstall}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#d4af37",
        color: "#000",
        border: "none",
        padding: "12px 24px",
        borderRadius: "50px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      📲 Instalar App
    </button>
  );
}