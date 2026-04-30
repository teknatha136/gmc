import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="space-y-8">
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
          Dev · Classes 09 · 10 · 11
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          The notes app
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
          A tiny demo built across the three blocks of today's class. Every
          screen below stitches{" "}
          <span className="font-semibold text-blue-700">routing</span>,{" "}
          <span className="font-semibold text-amber-700">APIs</span>, and{" "}
          <span className="font-semibold text-purple-700">forms</span>{" "}
          together.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <FeatureCard
          to="/notes"
          accent="blue"
          path="/notes"
          title="List view"
          desc="GET all notes. The 3-state pattern in action — loading, error, data."
        />
        <FeatureCard
          to="/notes/1"
          accent="amber"
          path="/notes/:id"
          title="Detail view"
          desc="Reads the id from the URL with useParams() and fetches one note."
        />
        <FeatureCard
          to="/notes/new"
          accent="purple"
          path="/notes/new"
          title="Create form"
          desc="react-hook-form + zod, then POST and navigate to the new note."
        />
      </section>

      <section className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
        <strong className="block font-semibold">Tip — open DevTools.</strong>
        Press <kbd className="rounded bg-white px-1.5 py-0.5 text-xs">F12</kbd>{" "}
        and watch the <strong>Network</strong> tab as you click around. Every
        page has visible network activity.
      </section>
    </div>
  );
}

type FeatureCardProps = {
  to: string;
  accent: "blue" | "amber" | "purple";
  path: string;
  title: string;
  desc: string;
};

const ACCENTS = {
  blue: "border-blue-200 hover:border-blue-400 text-blue-700",
  amber: "border-amber-200 hover:border-amber-400 text-amber-800",
  purple: "border-purple-200 hover:border-purple-400 text-purple-700",
} as const;

function FeatureCard({ to, accent, path, title, desc }: FeatureCardProps) {
  return (
    <Link
      to={to}
      className={[
        "group block rounded-lg border-2 bg-white p-4 transition",
        ACCENTS[accent],
      ].join(" ")}
    >
      <p className="font-mono text-sm font-bold">{path}</p>
      <p className="mt-1 text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">{desc}</p>
    </Link>
  );
}
