"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="de"><body><main className="error-page"><div className="container"><h1>Adventskalendersuche braucht einen neuen Versuch.</h1><p>Bitte lade die Seite erneut. Gespeicherte Finder-Antworten verbleiben lokal in deinem Browser.</p><button type="button" onClick={reset}>Erneut versuchen</button></div></main></body></html>;
}
