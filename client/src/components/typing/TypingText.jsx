
import { useEffect, useRef } from "react";

function TypingText({ text = "", input = "" }) {
  const containerRef = useRef(null);
  const caretRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const caret = caretRef.current;

    if (!container || !caret) return;

    const containerRect = container.getBoundingClientRect();
    const caretRect = caret.getBoundingClientRect();

    const caretTop =
      caretRect.top -
      containerRect.top +
      container.scrollTop;

    const targetScroll = Math.max(0, caretTop - 60);

    container.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, [input.length, text]);

  const words = text.match(/\S+|\s+/g) || [];
  let globalIndex = 0;

  return (
    <div
      ref={containerRef}
      className="typing-words h-[180px] overflow-y-hidden font-mono leading-[60px] tracking-wide"
      style={{
        fontSize: "24px",
        fontWeight: 500,
        color: "#94a3b8",
      }}
      aria-label="Text to type"
    >
      <div className="flex flex-wrap content-start">
        {words.map((part, partIndex) => {
          const startIndex = globalIndex;
          globalIndex += part.length;

          const isSpace = /^\s+$/.test(part);

          if (isSpace) {
            return (
              <span
                key={partIndex}
                className="relative whitespace-pre"
              >
                {Array.from(part).map((char, index) => {
                  const charIndex = startIndex + index;
                  const typedChar = input[charIndex];

                  return (
                    <span
                      key={charIndex}
                      className={`relative ${
                        typedChar !== undefined &&
                        typedChar !== char
                          ? "bg-rose-500/30"
                          : ""
                      }`}
                    >
                      {charIndex === input.length && (
                        <span
                          ref={caretRef}
                          className="typing-caret absolute -left-[2px] top-[15%] h-[70%] w-[3px] rounded-full bg-cyan-400"
                        />
                      )}

                      {"\u00A0"}
                    </span>
                  );
                })}
              </span>
            );
          }

          return (
            <span
              key={partIndex}
              className="inline-flex whitespace-nowrap"
            >
              {Array.from(part).map((char, index) => {
                const charIndex = startIndex + index;
                const typedChar = input[charIndex];

                const color =
                  typedChar === undefined
                    ? "text-[#94a3b8]"
                    : typedChar === char
                      ? "text-cyan-400"
                      : "text-rose-400";

                return (
                  <span
                    key={charIndex}
                    className={`relative ${color}`}
                  >
                    {charIndex === input.length && (
                      <span
                        ref={caretRef}
                        className="typing-caret absolute -left-[2px] top-[15%] h-[70%] w-[3px] rounded-full bg-cyan-400"
                      />
                    )}

                    <span
                      className={
                        typedChar !== undefined &&
                        typedChar !== char
                          ? "rounded-sm bg-rose-500/15"
                          : ""
                      }
                    >
                      {char}
                    </span>
                  </span>
                );
              })}
            </span>
          );
        })}

        {input.length === text.length && text.length > 0 && (
          <span
            ref={caretRef}
            className="typing-caret inline-block h-9 w-[3px] bg-cyan-400"
          />
        )}
      </div>
    </div>
  );
}

export default TypingText;
