import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { noteSchema } from "../schemas/note";
import type { NoteInput } from "../schemas/note";
import { createNote } from "../lib/api";

export function NoteNew() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
    defaultValues: { title: "", body: "" },
  });

  async function onSubmit(data: NoteInput) {
    setSubmitError(null);
    try {
      const created = await createNote(data);
      navigate(`/notes/${created.id}`, { state: { justCreated: created } });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Save failed");
    }
  }

  return (
    <div className="space-y-5">
      <Link
        to="/notes"
        className="inline-block text-sm font-semibold text-blue-700 hover:underline"
      >
        ← Back to all notes
      </Link>
      <header>
        <p className="font-mono text-xs text-slate-400">/notes/new</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          New note
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Validated by zod · submitted via POST · then redirect to the new note.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field
          label="Title"
          error={errors.title?.message}
          hint="3–100 characters."
        >
          <input
            type="text"
            {...register("title")}
            placeholder="A short, clear title"
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </Field>

        <Field
          label="Body"
          error={errors.body?.message}
          hint="At least 10 characters."
        >
          <textarea
            {...register("body")}
            rows={6}
            placeholder="What's on your mind?"
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </Field>

        {submitError && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {submitError}
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving…" : "Save note"}
          </button>
          <Link
            to="/notes"
            className="text-sm font-semibold text-slate-500 hover:text-slate-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, hint, error, children }: FieldProps) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-sm font-semibold text-slate-700">
        {label}
      </span>
      {children}
      {error ? (
        <span className="block text-xs font-medium text-red-600">{error}</span>
      ) : hint ? (
        <span className="block text-xs text-slate-500">{hint}</span>
      ) : null}
    </label>
  );
}
