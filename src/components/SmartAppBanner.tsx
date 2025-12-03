"use client";
import React, { useState, useEffect } from "react";

interface SmartBannerProps {
  appName: string;
  appStoreUrl: string;
  playStoreUrl: string;
  delay?: number; // in ms
}

const SmartBanner: React.FC<SmartBannerProps> = ({
  appName,
  appStoreUrl,
  playStoreUrl,
  delay = 1000,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => setShow(false);

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (!show) return null;

  const openAppWithFallback = (deepLink: string, storeUrl: string) => {
    const start = Date.now();
    window.location.href = deepLink;
    setTimeout(() => {
      const now = Date.now();
      if (now - start < 1500) {
        window.location.href = storeUrl;
      }
    }, 500);
  };

  return (
    <div className="w-full py-2 pl-2 pr-6 flex flex-row justify-between items-center border border-b-1 border-slate-100">
      <div className="flex flex-row justify-center items-center">
        <button
          onClick={handleClose}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
        <p>{appName}</p>
      </div>
      {isIOS && (
        <button
          className="text-sm bg-blue-500 p-0"
          onClick={() => openAppWithFallback("myapp://open", appStoreUrl)}
        >
          Open
        </button>
      )}
      {isAndroid && (
        <button
          className="text-sm bg-blue-500 p-0"
          onClick={() => openAppWithFallback("myapp://open", playStoreUrl)}
        >
          Open
        </button>
      )}
    </div>
  );
};

export default SmartBanner;
