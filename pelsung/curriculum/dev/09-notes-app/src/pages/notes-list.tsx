import { Link } from "react-router-dom";
import { useFetch } from "../hooks/use-fetch";
import { fetchNotes } from "../lib/api";
import type { Note } from "../schemas/note";

export function NotesList() {
  const { data: notes, loading, error } = useFetch<Note[]>(fetchNotes, []);

  if (loading) return <ListSkeleton />;
  if (error) return <ErrorPanel message={error} />;
  if (!notes || notes.length === 0) {
    return (
      <p className="rounded-md border border-slate-200 bg-white p-6 text-slate-500">
        No notes yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <header className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            /notes
          </p>
          <h1 className="text-2xl font-bold text-slate-900">All notes</h1>
          <p className="mt-1 text-sm text-slate-500">
            {notes.length} notes · loaded from{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">
              jsonplaceholder.typicode.com/posts
            </code>
          </p>
        </div>
        <Link
          to="/notes/new"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + New note
        </Link>
      </header>

      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {notes.slice(0, 20).map((note) => (
          <li key={note.id}>
            <Link
              to={`/notes/${note.id}`}
              className="block px-4 py-3 transition hover:bg-slate-50"
            >
              <p className="text-xs font-mono text-slate-400">#{note.id}</p>
              <p className="font-semibold text-slate-900">{note.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                {note.body}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-center text-xs text-slate-400">
        Showing first 20 of {notes.length}.
      </p>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="space-y-2 px-4 py-3">
            <div className="h-3 w-12 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
          </li>
        ))}
      </ul>
    </div>
  );
}

type ErrorPanelProps = { message: string };

function ErrorPanel({ message }: ErrorPanelProps) {
  return (
    <div className="rounded-md border-2 border-red-200 bg-red-50 p-4 text-sm">
      <p className="font-semibold text-red-700">Couldn't load notes.</p>
      <p className="mt-1 text-red-600">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-3 rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
      >
        Try again
      </button>
    </div>
  );
}
