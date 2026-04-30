import { Outlet, NavLink, Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-bold tracking-tight text-slate-900">
            <span className="text-blue-600">Notes</span>
            <span className="ml-2 text-xs font-medium uppercase tracking-widest text-slate-400">
              SELISE × Pelsung
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <NavItem to="/notes">All notes</NavItem>
            <NavItem to="/notes/new">+ New</NavItem>
            <NavItem to="/about">About</NavItem>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-4 text-xs text-slate-500">
          Demo app for Dev classes 09 · 10 · 11 — Routing, APIs, Forms.
        </div>
      </footer>
    </div>
  );
}

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};

function NavItem({ to, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/notes"}
      className={({ isActive }) =>
        [
          "rounded-md px-3 py-1.5 transition",
          isActive
            ? "bg-blue-50 text-blue-700 font-semibold"
            : "text-slate-600 hover:bg-slate-100",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}
