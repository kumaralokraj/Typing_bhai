import { useCallback, useEffect, useRef, useState } from "react";
import { getRandomText } from "../services/typingService";

function getStats(text, input, seconds) {
  let correct = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === text[i]) correct++;
  }

  const minutes = Math.max(seconds, 0.1) / 60;

  return {
    wpm: Math.round(correct / 5 / minutes),
    rawWpm: Math.round(input.length / 5 / minutes),
    cpm: Math.round(correct / minutes),
    accuracy: input.length
      ? Number(((correct / input.length) * 100).toFixed(2))
      : 100,
    correctCharacters: correct,
    incorrectCharacters: input.length - correct,
    totalCharacters: input.length,
  };
}

export default function useTypingTest({
  difficulty,
  mode,
  duration,
  testType,
  wordLimit,
}) {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [performanceData, setPerformanceData] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  const requestIdRef = useRef(0);
  const startedAtRef = useRef(null);
  const finishedRef = useRef(false);
  const textRef = useRef("");
  const inputRef = useRef("");
  const historyRef = useRef([]);
  const lastSampleRef = useRef(0);

  const restart = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    startedAtRef.current = null;
    finishedRef.current = false;
    textRef.current = "";
    inputRef.current = "";
    historyRef.current = [];
    lastSampleRef.current = 0;

    setText("");
    setInput("");
    setElapsed(0);
    setPerformanceData([]);
    setFinalResult(null);
    setError("");
    setStatus("loading");

    try {
      const content = await getRandomText({
        difficulty,
        mode,
        wordCount: testType === "words" ? wordLimit : 300,
      });

      if (requestId !== requestIdRef.current) return;

      if (!content.includes(" ")) {
        throw new Error(
          "Typing text has no word spaces. Check backend generator."
        );
      }

      textRef.current = content;
      setText(content);
      setStatus("ready");
    } catch (err) {
      if (requestId !== requestIdRef.current) return;

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load text."
      );
      setStatus("error");
    }
  }, [difficulty, mode, testType, wordLimit]);

  useEffect(() => {
    restart();

    return () => {
      requestIdRef.current++;
    };
  }, [restart]);

  const finish = useCallback(
    (finalInput, seconds) => {
      if (finishedRef.current) return;

      finishedRef.current = true;

      const finalSeconds = Math.max(0.1, seconds);
      const stats = getStats(
        textRef.current,
        finalInput,
        finalSeconds
      );

      const point = {
        time: Number(finalSeconds.toFixed(2)),
        wpm: stats.wpm,
        accuracy: stats.accuracy,
      };

      const history = [...historyRef.current];

      if (history.at(-1)?.time !== point.time) {
        history.push(point);
      }

      historyRef.current = history;

      const result = {
        ...stats,
        originalText: textRef.current,
        typedText: finalInput,
        duration: Number(finalSeconds.toFixed(2)),
        difficulty,
        mode,
        testType,
        performance: history,
      };

      setInput(finalInput);
      setElapsed(finalSeconds);
      setPerformanceData(history);
      setFinalResult(result);
      setStatus("finished");
    },
    [difficulty, mode, testType]
  );

  const handleInput = useCallback(
    (value) => {
      if (finishedRef.current || !textRef.current) return;

      const next = value
        .replace(/[\r\n\t]/g, "")
        .slice(0, textRef.current.length);

      if (startedAtRef.current === null) {
        if (!next.length) return;

        startedAtRef.current = performance.now();
        setStatus("running");
      }

      const seconds =
        (performance.now() - startedAtRef.current) / 1000;

      if (testType === "time" && seconds >= duration) {
        finish(inputRef.current, duration);
        return;
      }

      inputRef.current = next;
      setInput(next);
      setElapsed(seconds);

      if (next.length >= textRef.current.length) {
        finish(
          next,
          testType === "time"
            ? Math.min(seconds, duration)
            : seconds
        );
      }
    },
    [duration, testType, finish]
  );

  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(() => {
      if (startedAtRef.current === null) return;

      const seconds =
        (performance.now() - startedAtRef.current) / 1000;

      if (testType === "time" && seconds >= duration) {
        finish(inputRef.current, duration);
        return;
      }

      setElapsed(seconds);

      const second = Math.floor(seconds);

      if (second > lastSampleRef.current) {
        lastSampleRef.current = second;

        const stats = getStats(
          textRef.current,
          inputRef.current,
          seconds
        );

        const point = {
          time: second,
          wpm: stats.wpm,
          accuracy: stats.accuracy,
        };

        historyRef.current = [...historyRef.current, point];
        setPerformanceData(historyRef.current);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [status, duration, testType, finish]);

  const stats = finalResult || getStats(text, input, elapsed);

  return {
    text,
    input,
    status,
    error,
    elapsed,
    timeLeft:
      testType === "time"
        ? Math.max(0, Math.ceil(duration - elapsed))
        : null,
    stats,
    performance: performanceData,
    finalResult,
    handleInput,
    restart,
  };
}