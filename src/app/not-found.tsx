import Link from "next/link";
import { ArrowIcon, DoorIcon } from "@/components/icons";

export default function NotFound() {
  return <div className="not-found-page"><div className="container"><div className="not-found-door"><DoorIcon /><span>404</span></div><span className="kicker">Dieses Türchen ist leer</span><h1>Die gesuchte Seite haben wir nicht gefunden.</h1><p>Vielleicht wurde sie verschoben – oder sie hat sich zwischen den 200 Kalendern versteckt.</p><div><Link href="/" className="button">Zur Startseite <ArrowIcon /></Link><Link href="/finder" className="button button-ghost">Finder starten</Link></div></div></div>;
}
