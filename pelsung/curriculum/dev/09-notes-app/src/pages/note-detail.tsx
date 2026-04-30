import { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useFetch } from "../hooks/use-fetch";
import { deleteNote, fetchNote } from "../lib/api";
import type { Note } from "../schemas/note";

export function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const justCreated = (location.state as { justCreated?: Note } | null)?.justCreated;

  const { data: fetched, loading, error } = useFetch<Note>(
    () => fetchNote(id!),
    [id],
  );

  const note = justCreated && justCreated.id === Number(id) ? justCreated : fetched;

  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleDelete() {
    if (!note) return;
    if (!window.confirm("Delete this note?")) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteNote(note.id);
      navigate("/notes");
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
    }
  }

  if (justCreated && justCreated.id === Number(id)) {
    return (
      <DetailView
        note={justCreated}
        banner={
          <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            <strong className="font-semibold">Note created!</strong> The POST
            request succeeded — open DevTools → Network to see it.{" "}
            <span className="text-green-700">
              (JSONPlaceholder doesn't actually persist new posts, so refreshing
              this page will fall back to the API and show an error — that's
              the 3-state pattern in action.)
            </span>
          </div>
        }
        deleting={deleting}
        deleteError={deleteError}
        onDelete={handleDelete}
      />
    );
  }

  if (loading) return <DetailSkeleton />;
  if (error) {
    return (
      <div className="space-y-3">
        <div className="rounded-md border-2 border-red-200 bg-red-50 p-4 text-sm">
          <p className="font-semibold text-red-700">
            Couldn't load note #{id}.
          </p>
          <p className="mt-1 text-red-600">{error}</p>
        </div>
        <Link
          to="/notes"
          className="inline-block text-sm font-semibold text-blue-700 hover:underline"
        >
          ← Back to all notes
        </Link>
      </div>
    );
  }
  if (!note) return null;

  return (
    <DetailView
      note={note}
      deleting={deleting}
      deleteError={deleteError}
      onDelete={handleDelete}
    />
  );
}

type DetailViewProps = {
  note: Note;
  banner?: React.ReactNode;
  deleting: boolean;
  deleteError: string | null;
  onDelete: () => void;
};

function DetailView({ note, banner, deleting, deleteError, onDelete }: DetailViewProps) {
  return (
    <article className="space-y-5">
      {banner}
      <Link
        to="/notes"
        className="inline-block text-sm font-semibold text-blue-700 hover:underline"
      >
        ← Back to all notes
      </Link>
      <header>
        <p className="font-mono text-xs text-slate-400">/notes/{note.id}</p>
        <h1 className="mt-1 text-3xl font-bold leading-tight text-slate-900">
          {note.title}
        </h1>
      </header>
      <p className="whitespace-pre-line leading-relaxed text-slate-700">
        {note.body}
      </p>
      <footer className="space-y-2 border-t border-slate-200 pt-4">
        {deleteError && (
          <p className="text-sm text-red-700">{deleteError}</p>
        )}
        <button
          onClick={onDelete}
          disabled={deleting}
          className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
        >
          {deleting ? "Deleting…" : "Delete note"}
        </button>
      </footer>
    </article>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-5">
      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
      <div className="space-y-2">
        <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
        <div className="h-7 w-3/4 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  );
}
