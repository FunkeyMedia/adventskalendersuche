"use client";

import type { ReactNode } from "react";

export function AffiliateLink({ href, productId, className = "button", children }: { href: string; productId: string; className?: string; children: ReactNode }) {
  function trackClick() {
    const payload = JSON.stringify({ event: "affiliate_click", productId, occurredAt: new Date().toISOString() });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/events", new Blob([payload], { type: "application/json" }));
    else void fetch("/api/events", { method: "POST", headers: { "content-type": "application/json" }, body: payload, keepalive: true });
  }

  return <a href={href} target="_blank" rel="sponsored nofollow noopener noreferrer" className={className} onClick={trackClick}>{children}</a>;
}
