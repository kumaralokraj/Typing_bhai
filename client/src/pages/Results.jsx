import { Link, useLocation } from "react-router-dom";
import {
  RotateCcw,
  Gauge,
  Target,
  Clock3,
  Keyboard,
} from "lucide-react";

import SpeedChart from "../components/results/SpeedChart";

function Results() {
  const location = useLocation();
  const result = location.state?.result;
  const saved = location.state?.saved;

  if (!result) {
    return (
      <main className="flex min-h-[75vh] flex-col items-center justify-center gap-5 bg-slate-950 px-5 text-white">
        <h1 className="text-2xl font-bold">
          No result available
        </h1>

        <p className="text-slate-400">
          Complete a typing test to view your performance.
        </p>

        <Link
          to="/typing"
          className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
        >
          Start Typing
        </Link>
      </main>
    );
  }

  const stats = [
    {
      label: "wpm",
      value: result.wpm,
      icon: Gauge,
    },
    {
      label: "raw wpm",
      value: result.rawWpm,
      icon: Keyboard,
    },
    {
      label: "accuracy",
      value: `${result.accuracy}%`,
      icon: Target,
    },
    {
      label: "time",
      value: `${Number(result.duration).toFixed(1)}s`,
      icon: Clock3,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-14 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold">
            Typing <span className="text-cyan-400">Results</span>
          </h1>

          <p className="mt-3 text-slate-400">
            Your typing performance breakdown
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="mb-5 flex items-center gap-2 text-slate-400">
                <Icon size={17} />
                <span className="text-sm">{label}</span>
              </div>

              <p className="text-4xl font-semibold text-cyan-400 tabular-nums">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <SpeedChart performance={result.performance || []} />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Correct characters
            </p>
            <p className="mt-3 text-3xl font-semibold text-emerald-400">
              {result.correctCharacters}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Incorrect characters
            </p>
            <p className="mt-3 text-3xl font-semibold text-rose-400">
              {result.incorrectCharacters}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Characters per minute
            </p>
            <p className="mt-3 text-3xl font-semibold text-cyan-400">
              {result.cpm}
            </p>
          </div>
        </div>

        {saved === false && (
          <p className="mt-6 text-center text-sm text-amber-400">
            Result calculated locally. Could not save to database.
          </p>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to="/typing"
            className="inline-flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            <RotateCcw size={19} />
            Take Another Test
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Results;