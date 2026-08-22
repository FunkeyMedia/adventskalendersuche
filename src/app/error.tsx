"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <div className="error-page"><div className="container"><span className="kicker">Etwas ist hängen geblieben</span><h1>Diese Seite konnte gerade nicht geöffnet werden.</h1><p>Deine Finder-Antworten bleiben in deinem Browser gespeichert.</p><button type="button" className="button" onClick={reset}>Noch einmal versuchen</button></div></div>;
}
