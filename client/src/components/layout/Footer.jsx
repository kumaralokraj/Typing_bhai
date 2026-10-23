import { Keyboard } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-5 py-7">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <div className="flex items-center gap-2">
          <Keyboard size={18} className="text-cyan-400" />
          <span>TypingBhai — Type Faster. Type Better.</span>
        </div>

        <p>© {new Date().getFullYear()} TypingBhai.</p>
      </div>
    </footer>
  );
}

export default Footer;