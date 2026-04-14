"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registrado:", registration.scope);
        })
        .catch((error) => {
          console.error("Falha ao registrar SW:", error);
        });
    }
  }, []);

  return null;
}
