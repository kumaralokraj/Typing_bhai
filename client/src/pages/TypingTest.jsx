import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Keyboard, RefreshCw } from "lucide-react";

import TestControls from "../components/typing/TestControls";
import TypingBox from "../components/typing/TypingBox";
import Timer from "../components/typing/Timer";
import RestartButton from "../components/typing/RestartButton";

import useTypingTest from "../hooks/useTypingTest";
import { submitTypingResult } from "../services/resultService";

function TypingTest() {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("normal");
  const [duration, setDuration] = useState(30);
  const [testType, setTestType] = useState("time");
  const [wordLimit, setWordLimit] = useState(25);

  const submittedRef = useRef(false);

  const {
    text,
    input,
    status,
    error,
    elapsed,
    timeLeft,
    stats,
    performance,
    handleInput,
    restart,
  } = useTypingTest({
    difficulty,
    mode,
    duration,
    testType,
    wordLimit,
  });

  useEffect(() => {
    if (status !== "finished" || submittedRef.current) {
      return;
    }

    submittedRef.current = true;
    let active = true;

    const finishTest = async () => {
      const localResult = {
        ...stats,
        duration: Number(elapsed.toFixed(2)),
        difficulty,
        mode,
        testType,
        performance,
      };

      try {
        const savedResult = await submitTypingResult({
          originalText: text,
          typedText: input,
          duration: localResult.duration,
          difficulty,
          mode,
          performance,
        });

        if (!active) return;

        navigate("/results", {
          replace: true,
          state: {
            result: {
              ...localResult,
              ...savedResult,
              performance:
                savedResult?.performance?.length
                  ? savedResult.performance
                  : performance,
            },
            saved: true,
          },
        });
      } catch (err) {
        console.error("Result save failed:", err);

        // Even if the backend is unavailable, show the result.
        if (active) {
          navigate("/results", {
            replace: true,
            state: {
              result: localResult,
              saved: false,
            },
          });
        }
      }
    };

    finishTest();

    return () => {
      active = false;
    };
  }, [
    status,
    text,
    input,
    stats.wpm,
    stats.rawWpm,
    stats.cpm,
    stats.accuracy,
    stats.correctCharacters,
    stats.incorrectCharacters,
    stats.totalCharacters,
    elapsed,
    difficulty,
    mode,
    testType,
    performance,
    navigate,
  ]);

  const handleRestart = () => {
    submittedRef.current = false;
    restart();
  };

  // Tab + Enter shortcut
  const tabPressed = useRef(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        tabPressed.current = true;
      } else if (event.key === "Enter" && tabPressed.current) {
        event.preventDefault();
        handleRestart();
        tabPressed.current = false;
      } else if (event.key !== "Enter") {
        tabPressed.current = false;
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Tab") {
        tabPressed.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <main className="min-h-[80vh] bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 flex items-center justify-center gap-3">
          <Keyboard size={29} className="text-cyan-400" />

          <h1 className="text-3xl font-bold tracking-tight">
            typing<span className="text-cyan-400">bhai</span>
          </h1>
        </div>

        {/* Minimal settings bar */}
        <TestControls
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          mode={mode}
          setMode={setMode}
          duration={duration}
          setDuration={setDuration}
          testType={testType}
          setTestType={setTestType}
          wordLimit={wordLimit}
          setWordLimit={setWordLimit}
          disabled={status === "running" || status === "loading"}
        />

        <section className="mx-auto mt-16 max-w-5xl">
          {status === "loading" ? (
            <div className="py-20 text-center text-slate-400">
              Generating typing test...
            </div>
          ) : status === "error" ? (
            <div className="py-16 text-center">
              <p className="mb-5 text-rose-400">{error}</p>
              <button
                onClick={handleRestart}
                className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-slate-950"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <Timer
                timeLeft={timeLeft}
                elapsed={elapsed}
                testType={testType}
                wordLimit={wordLimit}
                input={input}
              />

              <div className="mt-7">
                <TypingBox
                  text={text}
                  input={input}
                  status={status}
                  onChange={handleInput}
                />
              </div>

              <div className="mt-5 flex items-center justify-center">
                <RestartButton
                  onClick={handleRestart}
                  disabled={status === "finished"}
                />
              </div>

              <p className="mt-2 text-center text-xs text-slate-600">
                Tab + Enter to restart
              </p>

              {status === "running" && (
                <div className="mt-12 flex justify-center gap-10 text-center">
                  <div>
                    <p className="text-xs text-slate-500">wpm</p>
                    <p className="text-2xl font-semibold text-cyan-400">
                      {stats.wpm}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">accuracy</p>
                    <p className="text-2xl font-semibold text-cyan-400">
                      {stats.accuracy}%
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">errors</p>
                    <p className="text-2xl font-semibold text-rose-400">
                      {stats.incorrectCharacters}
                    </p>
                  </div>
                </div>
              )}

              {status === "finished" && (
                <div className="mt-8 flex items-center justify-center gap-2 text-cyan-400">
                  <RefreshCw size={17} className="animate-spin" />
                  Calculating results...
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default TypingTest;