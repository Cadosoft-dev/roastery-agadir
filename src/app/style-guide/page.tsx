import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

const colors = [
  ["Charcoal", "#3D4345"],
  ["Gold", "#C9A96E"],
  ["Ivory", "#F5F0E8"],
  ["Espresso", "#1E1A17"],
  ["Terracotta", "#B5623A"],
  ["Olive", "#5C6345"],
  ["Smoke", "#2A2E2F"]
];

export default function StyleGuide() {
  return (
    <main className="min-h-screen bg-[var(--color-espresso)] py-20 text-[var(--text-on-dark)]">
      <div className="section-shell">
        <Link href="/" className="text-sm uppercase tracking-[0.14em] text-[var(--color-gold)]">
          Retour au site
        </Link>
        <SectionLabel>Style guide</SectionLabel>
        <h1 className="font-display mt-6 text-6xl font-light">ROASTERY Design System</h1>

        <section className="mt-14">
          <h2 className="font-display text-4xl">Colors</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map(([name, hex]) => (
              <div key={hex} className="rounded-sm border border-[var(--color-border)] p-4">
                <div className="h-24 rounded-sm" style={{ background: hex }} />
                <p className="mt-4 text-sm uppercase tracking-[0.14em]">{name}</p>
                <p className="mt-1 text-sm text-[var(--text-on-dark)]/55">{hex}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-4xl">Typography</h2>
          <div className="mt-6 grid gap-5">
            <p className="font-display text-hero font-light">Où Agadir ralentit.</p>
            <p className="font-display text-h2">La carte comme un carnet.</p>
            <p className="text-body text-[var(--text-on-dark)]/70">DM Sans body text with a generous line-height for editorial restaurant copy.</p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-4xl">Buttons & Forms</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button>Filled Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="text">Text Button</Button>
          </div>
          <div className="mt-8 grid max-w-xl gap-3">
            <input placeholder="Form field" className="h-12 rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)] px-4" />
            <textarea placeholder="Textarea" rows={4} className="rounded-sm border border-[var(--color-border)] bg-[var(--color-smoke)] px-4 py-3" />
          </div>
        </section>
      </div>
    </main>
  );
}
