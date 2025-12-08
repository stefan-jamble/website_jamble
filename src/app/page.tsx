'use client';

import { useEffect, useState } from "react";
import { getCountryCode } from "@/lib/location";

export default function HomePage() {
  const [iframeSrc, setIframeSrc] = useState("/homepage.html");

  useEffect(() => {
    let isMounted = true;

    getCountryCode()
      .then((code) => {
        if (!isMounted) return;
        console.log("code:", code);
        setIframeSrc(code === "BR" ? "/homepage-br.html" : "/homepage.html");
      })
      .catch((err) => {
        console.error("Failed to get country code:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log("iframeSrc updated:", iframeSrc);
  }, [iframeSrc]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <iframe
        src={iframeSrc}
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
