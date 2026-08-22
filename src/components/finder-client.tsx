"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowIcon, CompassIcon, DoorIcon, GiftIcon, HeartIcon, SparkIcon } from "@/components/icons";
import { answersToSearchParams } from "@/lib/finder";
import type { FinderAnswers } from "@/lib/types";

const STORAGE_KEY = "adventskalender-finder:v1";

type Option = { value: string; label: string; description: string; icon: "door" | "gift" | "heart" | "spark" | "compass" };
type Question = { key: keyof FinderAnswers; title: string; hint: string; options: Option[]; when?: (answers: FinderAnswers) => boolean };

const icons = { door: DoorIcon, gift: GiftIcon, heart: HeartIcon, spark: SparkIcon, compass: CompassIcon };

const questions: Question[] = [
  { key: "recipient", title: "Für wen soll die Vorfreude sein?", hint: "Das bestimmt Zielgruppe, Altersfilter und passende Themen.", options: [
    { value: "kind", label: "Für ein Kind", description: "Altersgerecht und spielerisch", icon: "gift" },
    { value: "frau", label: "Für eine Frau", description: "Von Genuss bis Self-Care", icon: "spark" },
    { value: "mann", label: "Für einen Mann", description: "Genuss, Rätsel und Besonderes", icon: "compass" },
    { value: "paar", label: "Für ein Paar", description: "Gemeinsame Adventsmomente", icon: "heart" },
    { value: "familie", label: "Für die Familie", description: "Zusammen entdecken", icon: "door" },
    { value: "haustier", label: "Für ein Haustier", description: "Hund oder Katze beschenken", icon: "heart" },
    { value: "offen", label: "Ich bin nicht sicher", description: "Wir halten die Auswahl offen", icon: "compass" },
  ]},
  { key: "childAge", title: "Wie alt ist das Kind ungefähr?", hint: "Wir schließen Kalender aus, deren Mindestalter nicht passt.", when: (answers) => answers.recipient === "kind", options: [
    { value: "unter6", label: "Unter 6", description: "Einfach, sicher, staunenswert", icon: "gift" },
    { value: "6bis9", label: "6–9 Jahre", description: "Spielen und entdecken", icon: "door" },
    { value: "10bis13", label: "10–13 Jahre", description: "Knobeln und kreativ sein", icon: "compass" },
    { value: "14bis17", label: "14–17 Jahre", description: "Schon ziemlich erwachsen", icon: "spark" },
  ]},
  { key: "interest", title: "Was bringt die Augen zum Leuchten?", hint: "Wähle das Thema, das am besten zur Person passt.", options: [
    { value: "genuss", label: "Genuss", description: "Tee, Kaffee und Leckereien", icon: "heart" },
    { value: "beauty", label: "Beauty & Pflege", description: "Kleine tägliche Auszeiten", icon: "spark" },
    { value: "knobeln", label: "Knobeln", description: "Rätsel, Quiz und Experimente", icon: "compass" },
    { value: "kreativ", label: "Kreativ", description: "Basteln und Selbermachen", icon: "door" },
    { value: "spiel", label: "Spielen", description: "Figuren, Fahrzeuge und Bausets", icon: "gift" },
    { value: "lesen", label: "Lesen", description: "Geschichten und Minibücher", icon: "door" },
    { value: "schmuck", label: "Schmuck", description: "Accessoires und kleine Highlights", icon: "spark" },
    { value: "offen", label: "Überrascht mich", description: "Thema bewusst offenlassen", icon: "compass" },
  ]},
  { key: "budget", title: "Welcher Rahmen fühlt sich gut an?", hint: "Wir verwenden Budgetklassen – der aktuelle Amazon-Preis kann sich ändern.", options: [
    { value: "unter20", label: "Bis 20 €", description: "Kleine Freude, klug gewählt", icon: "door" },
    { value: "20bis40", label: "20–40 €", description: "Die beliebte Mitte", icon: "gift" },
    { value: "40bis70", label: "40–70 €", description: "Mehr Inhalt und Auswahl", icon: "spark" },
    { value: "ueber70", label: "Ab 70 €", description: "Premium und besonders", icon: "heart" },
    { value: "offen", label: "Preis ist zweitrangig", description: "Der beste Match zählt", icon: "compass" },
  ]},
  { key: "priority", title: "Was soll am stärksten zählen?", hint: "Diese Priorität verfeinert den Match-Score – sie überschreibt keine Sicherheitsfilter.", options: [
    { value: "preis", label: "Gutes Preisgefühl", description: "Budget besonders gewichten", icon: "door" },
    { value: "qualitaet", label: "Bewährte Qualität", description: "Datenlage und Bewertung gewichten", icon: "spark" },
    { value: "nachhaltigkeit", label: "Nachhaltigkeit", description: "Wiederverwendbare Ansätze bevorzugen", icon: "heart" },
    { value: "ueberraschung", label: "Etwas Besonderes", description: "Ungewöhnliche Ideen bevorzugen", icon: "gift" },
    { value: "offen", label: "Ausgewogen", description: "Alle Kriterien balancieren", icon: "compass" },
  ]},
];

export function FinderClient() {
  const router = useRouter();
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [step, setStep] = useState(0);
  const [quick, setQuick] = useState(false);
  const [restored, setRestored] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const activeQuestions = useMemo(() => questions.filter((question) => (!question.when || question.when(answers)) && (!quick || question.key !== "priority")), [answers, quick]);
  const question = activeQuestions[Math.min(step, activeQuestions.length - 1)];
  const progress = Math.round(((step + 1) / activeQuestions.length) * 100);

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as { answers: FinderAnswers; step: number; quick: boolean };
          setAnswers(parsed.answers || {});
          setStep(parsed.step || 0);
          setQuick(Boolean(parsed.quick));
          setRestored(true);
        }
      } catch { localStorage.removeItem(STORAGE_KEY); }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step, quick }));
  }, [answers, step, quick, hydrated]);

  function choose(value: string) {
    const next = { ...answers, [question.key]: value } as FinderAnswers;
    setAnswers(next);
    const remaining = activeQuestions.length - 1;
    if (step >= remaining) router.push(`/ergebnisse?${answersToSearchParams(next)}`);
    else setStep((current) => current + 1);
  }

  function reset() { localStorage.removeItem(STORAGE_KEY); setAnswers({}); setStep(0); setRestored(false); }

  return (
    <section className="finder-shell" aria-labelledby="finder-question">
      <div className="finder-topline">
        <div><span>Schritt {step + 1} von {activeQuestions.length}</span><strong>{progress}%</strong></div>
        <div className="progress-track" aria-label={`Fortschritt ${progress} Prozent`}><span style={{ width: `${progress}%` }} /></div>
      </div>
      <div className="finder-mode">
        <button type="button" className={!quick ? "active" : ""} onClick={() => { setQuick(false); setStep(0); }}>Genauer Modus</button>
        <button type="button" className={quick ? "active" : ""} onClick={() => { setQuick(true); setStep(0); }}>Schnellmodus · unter 1 Minute</button>
      </div>
      {restored ? <p className="restore-note">Dein letzter Zwischenstand wurde wiederhergestellt. <button type="button" onClick={reset}>Neu beginnen</button></p> : null}
      <div className="finder-question" key={question.key}>
        <span className="kicker">Eine Entscheidung genügt</span>
        <h1 id="finder-question">{question.title}</h1>
        <p>{question.hint}</p>
        <div className="answer-grid">
          {question.options.map((option) => {
            const Icon = icons[option.icon];
            const selected = answers[question.key] === option.value;
            return <button type="button" key={option.value} className={`answer-card ${selected ? "selected" : ""}`} onClick={() => choose(option.value)} aria-pressed={selected}><Icon /><span><strong>{option.label}</strong><small>{option.description}</small></span><ArrowIcon /></button>;
          })}
        </div>
      </div>
      <div className="finder-controls">
        <button type="button" className="button button-ghost" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Zurück</button>
        <span>Antworten werden automatisch gespeichert.</span>
      </div>
    </section>
  );
}
