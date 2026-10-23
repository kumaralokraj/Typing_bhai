function TypingInput({ value, onChange, disabled }) {
  return (
    <textarea
      autoFocus
      spellCheck={false}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start typing here..."
      className="mt-6 min-h-28 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-lg text-white outline-none transition focus:border-cyan-500 disabled:opacity-50"
    />
  );
}

export default TypingInput;