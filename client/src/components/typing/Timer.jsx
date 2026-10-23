function Timer({ timeLeft, elapsed, testType, wordLimit, input }) {
  const value =
    testType === "time"
      ? timeLeft
      : `${Math.min(
          wordLimit,
          input.trim() ? input.trim().split(/\s+/).length : 0
        )}/${wordLimit}`;

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-4xl font-semibold text-cyan-400 tabular-nums">
          {value}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {testType === "time" ? "seconds remaining" : "words progress"}
        </p>
      </div>

      <p className="text-sm text-slate-500">
        {Math.floor(elapsed)}s elapsed
      </p>
    </div>
  );
}

export default Timer;