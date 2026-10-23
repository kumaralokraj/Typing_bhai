import { useState } from "react";
import { Settings2 } from "lucide-react";

const difficulties = ["easy", "medium", "hard"];
const modes = [
  "normal",
  "capital",
  "numbers",
  "punctuation",
  "symbols",
  "mixed",
];

function TestControls({
  difficulty,
  setDifficulty,
  mode,
  setMode,
  duration,
  setDuration,
  testType,
  setTestType,
  wordLimit,
  setWordLimit,
  disabled,
}) {
  const [showCustom, setShowCustom] = useState(false);
  const [customTime, setCustomTime] = useState(String(duration));
  const [customError, setCustomError] = useState("");

  const optionClass = (active) =>
    `rounded px-2 py-1 text-sm transition ${
      active
        ? "text-cyan-400"
        : "text-slate-500 hover:text-slate-200"
    } disabled:opacity-40`;

  const applyCustomTime = () => {
    const value = Number(customTime);

    if (
      !Number.isInteger(value) ||
      value < 10 ||
      value > 600
    ) {
      setCustomError("Enter 10 to 600 seconds.");
      return;
    }

    setDuration(value);
    setTestType("time");
    setCustomError("");
    setShowCustom(false);
  };

  return (
    <div className="rounded-xl bg-slate-900 px-4 py-4">
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <div className="flex items-center gap-1">
          {difficulties.map((item) => (
            <button
              key={item}
              disabled={disabled}
              onClick={() => setDifficulty(item)}
              className={optionClass(difficulty === item)}
            >
              {item}
            </button>
          ))}
        </div>

        <span className="hidden text-slate-700 lg:inline">|</span>

        <div className="flex flex-wrap items-center gap-1">
          {modes.map((item) => (
            <button
              key={item}
              disabled={disabled}
              onClick={() => setMode(item)}
              className={optionClass(mode === item)}
            >
              {item}
            </button>
          ))}
        </div>

        <span className="hidden text-slate-700 lg:inline">|</span>

        <div className="flex items-center gap-1">
          {["time", "words"].map((item) => (
            <button
              key={item}
              disabled={disabled}
              onClick={() => setTestType(item)}
              className={optionClass(testType === item)}
            >
              {item}
            </button>
          ))}
        </div>

        <span className="hidden text-slate-700 lg:inline">|</span>

        <div className="flex items-center gap-1">
          {(testType === "time"
            ? [15, 30, 60, 120]
            : [10, 25, 50, 100]
          ).map((value) => (
            <button
              key={value}
              disabled={disabled}
              onClick={() =>
                testType === "time"
                  ? setDuration(value)
                  : setWordLimit(value)
              }
              className={optionClass(
                testType === "time"
                  ? duration === value
                  : wordLimit === value
              )}
            >
              {value}
            </button>
          ))}
        </div>

        {testType === "time" && (
          <button
            disabled={disabled}
            onClick={() => {
              setCustomTime(String(duration));
              setShowCustom((prev) => !prev);
              setCustomError("");
            }}
            title="Custom timer"
            className="rounded p-2 text-slate-400 hover:text-cyan-400 disabled:opacity-40"
          >
            <Settings2 size={19} />
          </button>
        )}
      </div>

      {showCustom && testType === "time" && (
        <div className="mt-5 flex flex-col items-center gap-3 border-t border-slate-800 pt-5">
          <p className="text-sm text-slate-400">
            Custom timer (10–600 seconds)
          </p>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min="10"
              max="600"
              step="1"
              value={customTime}
              disabled={disabled}
              onChange={(e) => setCustomTime(e.target.value)}
              className="w-32 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white outline-none focus:border-cyan-400"
            />

            <button
              disabled={disabled}
              onClick={applyCustomTime}
              className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-slate-950 disabled:opacity-40"
            >
              Apply
            </button>
          </div>

          {customError && (
            <p className="text-sm text-rose-400">{customError}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TestControls;