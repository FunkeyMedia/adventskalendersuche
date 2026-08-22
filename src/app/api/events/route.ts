import { after } from "next/server";

const idPattern = /^AK-\d{4}$/;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 1024) return Response.json({ error: "Payload zu groß" }, { status: 413 });
  try {
    const body = await request.json() as { event?: string; productId?: string; occurredAt?: string };
    if (body.event !== "affiliate_click" || !body.productId || !idPattern.test(body.productId)) return Response.json({ error: "Ungültiges Ereignis" }, { status: 400 });
    after(() => console.info(JSON.stringify({ event: body.event, productId: body.productId, occurredAt: body.occurredAt || new Date().toISOString() })));
    return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
  } catch { return Response.json({ error: "Ungültiges JSON" }, { status: 400 }); }
}
