export function About() {
  return (
    <div className="space-y-4">
      <p className="font-mono text-xs text-slate-400">/about</p>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        About this app
      </h1>
      <p className="leading-relaxed text-slate-600">
        A small demo built for Pelsung Dev classes 09 · 10 · 11. It shows the
        three pieces every modern web app needs &mdash;{" "}
        <strong>routing</strong>, <strong>API calls</strong>, and{" "}
        <strong>forms with validation</strong> &mdash; in a single working
        notes app.
      </p>
      <h2 className="pt-2 text-lg font-semibold text-slate-900">Stack</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
        <li>React 19 + Vite + TypeScript</li>
        <li>Tailwind CSS v4 for styling</li>
        <li>react-router-dom for routing</li>
        <li>react-hook-form + zod for the form</li>
        <li>JSONPlaceholder as a fake REST API</li>
      </ul>
    </div>
  );
}
