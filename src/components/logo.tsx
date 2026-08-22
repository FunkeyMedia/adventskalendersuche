import Link from "next/link";
import { DoorIcon } from "@/components/icons";

export function Logo() {
  return (
    <Link href="/" className="brand-logo" aria-label="Adventskalendersuche – Startseite">
      <span className="brand-mark"><DoorIcon /></span>
      <span><strong>Adventskalender</strong><em>suche</em></span>
    </Link>
  );
}
