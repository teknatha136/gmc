import type { Note, NoteInput } from "../schemas/note";

const API = "https://jsonplaceholder.typicode.com";

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(`${API}/posts`);
  if (!res.ok) throw new Error(`Failed to load notes — HTTP ${res.status}`);
  return res.json();
}

export async function fetchNote(id: string): Promise<Note> {
  const res = await fetch(`${API}/posts/${id}`);
  if (!res.ok) throw new Error(`Failed to load note ${id} — HTTP ${res.status}`);
  return res.json();
}

export async function createNote(input: NoteInput): Promise<Note> {
  const res = await fetch(`${API}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Failed to save — HTTP ${res.status}`);
  return res.json();
}

export async function deleteNote(id: number): Promise<void> {
  const res = await fetch(`${API}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete — HTTP ${res.status}`);
}
