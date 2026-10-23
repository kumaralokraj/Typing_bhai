import { RotateCcw } from "lucide-react";

function RestartButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title="Restart typing test"
      className="flex items-center gap-2 rounded-lg px-5 py-3 text-slate-400 transition hover:bg-slate-900 hover:text-cyan-400 disabled:opacity-40"
    >
      <RotateCcw size={19} />
      <span className="text-sm">Restart</span>
    </button>
  );
}

export default RestartButton;