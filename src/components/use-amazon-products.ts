"use client";

import { useEffect, useMemo, useState } from "react";
import type { AmazonProductData } from "@/lib/types";

export function useAmazonProducts(asins: string[]) {
  const key = useMemo(() => Array.from(new Set(asins.filter(Boolean))).slice(0, 10).join(","), [asins]);
  const [items, setItems] = useState<Map<string, AmazonProductData>>(new Map());

  useEffect(() => {
    if (!key) return;

    const controller = new AbortController();
    void fetch(`/api/amazon/items?asins=${encodeURIComponent(key)}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Amazon data unavailable")))
      .then((payload: { items?: AmazonProductData[] }) => {
        setItems(new Map((payload.items || []).map((item) => [item.asin.toUpperCase(), item])));
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setItems(new Map());
      });

    return () => controller.abort();
  }, [key]);

  return items;
}
