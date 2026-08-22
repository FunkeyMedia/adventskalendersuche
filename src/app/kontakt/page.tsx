import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, DoorIcon } from "@/components/icons";
import { LegalNotice } from "@/components/legal-notice";

export const metadata: Metadata = { title: "Kontakt", description: "Kontakt und Hinweise zu Produktdaten, redaktionellen Fragen und technischen Problemen.", alternates: { canonical: "/kontakt" } };

export default function ContactPage() {
  return <div className="page-shell simple-page"><div className="container narrow-container"><header className="page-intro"><span className="kicker">Wir hören zu</span><h1>Etwas entdeckt, das wir wissen sollten?</h1><p>Hinweise zu veränderten Produktdaten, fehlenden Angaben und technischen Problemen helfen uns, die Orientierung verlässlich zu halten.</p></header><div className="contact-card"><DoorIcon /><div><h2>Kontaktweg vor Veröffentlichung</h2><p>Die verbindliche Betreiber-E-Mail-Adresse muss vor dem produktiven Betrieb ergänzt werden. Bis dahin veröffentlichen wir bewusst kein funktionsloses Formular und keine erfundene Adresse.</p><p>Wenn du Betreiber bist, ergänze die Adresse zentral in dieser Seite, im Impressum und in der Datenschutzerklärung.</p></div></div><LegalNotice /><p className="back-link"><Link href="/ueber-uns" className="text-link">Mehr über das Projekt <ArrowIcon /></Link></p></div></div>;
}
