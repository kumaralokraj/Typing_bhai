function LiveStats({ stats }) {
  const items = [
    { label: "WPM", value: stats.wpm },
    { label: "Raw WPM", value: stats.rawWpm },
    { label: "Accuracy", value: `${stats.accuracy}%` },
    { label: "Mistakes", value: stats.incorrectCharacters },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5"
        >
          <p className="text-sm text-slate-400">
            {item.label}
          </p>
          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default LiveStats;