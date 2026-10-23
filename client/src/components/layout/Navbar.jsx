import { Link, NavLink } from "react-router-dom";
import { Keyboard, Home, Zap } from "lucide-react";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 transition ${
      isActive
        ? "text-cyan-400"
        : "text-slate-400 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/10 p-2">
            <Keyboard className="text-cyan-400" size={27} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-white">
            Typing<span className="text-cyan-400">Bhai</span>
          </span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <NavLink to="/" end className={linkClass}>
            <Home size={17} />
            <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink to="/typing" className={linkClass}>
            <Zap size={17} />
            <span>Typing Test</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;