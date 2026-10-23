import { useEffect, useRef, useState } from "react";
import TypingText from "./TypingText";

function TypingBox({ text, input, status, onChange }) {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const canType = status === "ready" || status === "running";

  useEffect(() => {
    if (status === "ready") {
      inputRef.current?.focus();
    }
  }, [status, text]);

  return (
    <div
      className="relative cursor-text py-8"
      onClick={() => {
        if (canType) inputRef.current?.focus();
      }}
    >
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onPaste={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        disabled={!canType}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
        aria-label="Typing test input"
        className="absolute left-0 top-0 h-px w-px resize-none overflow-hidden opacity-0"
      />

      <div className={!focused && canType ? "opacity-50" : ""}>
        <TypingText text={text} input={input} />
      </div>

      {!focused && canType && (
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          className="absolute inset-0 flex items-center justify-center bg-slate-950/30 text-sm text-cyan-400 backdrop-blur-[1px]"
        >
          Click here or press to focus
        </button>
      )}
    </div>
  );
}

export default TypingBox;