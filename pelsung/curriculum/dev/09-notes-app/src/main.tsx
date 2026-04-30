import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Layout } from "./layout";
import { NotesList } from "./pages/notes-list";
import { NoteDetail } from "./pages/note-detail";
import { NoteNew } from "./pages/note-new";
import { About } from "./pages/about";
import { Home } from "./pages/home";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<NotesList />} />
          <Route path="/notes/new" element={<NoteNew />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
