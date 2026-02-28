"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function InstallToast() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault(); // prevent default browser prompt
      setDeferredPrompt(e);

      toast.custom((id) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            backgroundColor: "#1f2937",
            color: "white",
            borderRadius: "8px",
            minWidth: "280px",
          }}
        >
          <span>Install this app for a better experience</span>
          <button
            style={{
              marginLeft: "12px",
              padding: "6px 12px",
              backgroundColor: "#4ade80",
              color: "#000",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={async () => {
              if (!deferredPrompt) return;
              deferredPrompt.prompt();
              const choice = await deferredPrompt.userChoice;
              console.log("User choice:", choice.outcome); // accepted / dismissed
              toast.dismiss(id);
            }}
          >
            Install
          </button>
        </div>
      ));
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return null;
}