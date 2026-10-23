
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import {
  ArrowRight,
  Keyboard,
  Timer,
  Target,
  BarChart3,
  Zap,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "Timed Typing Tests",
    description:
      "Practice with 15, 30, 60, or 120-second typing tests. Set a custom timer for more flexibility.",
  },
  {
    icon: Target,
    title: "Accuracy Tracking",
    description:
      "See your correct and incorrect keystrokes and learn to type more accurately.",
  },
  {
    icon: BarChart3,
    title: "WPM & Speed Results",
    description:
      "Check your words per minute, typing accuracy, CPM, and mistakes after each test.",
  },
  {
    icon: Zap,
    title: "Multiple Difficulty Levels",
    description:
      "Choose easy, medium, or hard typing practice based on your experience.",
  },
  {
    icon: Keyboard,
    title: "Different Typing Modes",
    description:
      "Practice lowercase words, capitals, numbers, punctuation, and mixed text.",
  },
  {
    icon: RotateCcw,
    title: "Practice Again Anytime",
    description:
      "Restart with fresh typing words and improve your performance through regular practice.",
  },
];

const faqs = [
  {
    question: "What is TypingBhai?",
    answer:
      "TypingBhai is a free online typing speed test and typing practice website. It helps you measure your typing speed, accuracy, and progress.",
  },
  {
    question: "How is typing speed measured?",
    answer:
      "Typing speed is commonly measured in words per minute (WPM). A standard word is counted as five characters, including spaces, divided by the time taken in minutes.",
  },
  {
    question: "How can I improve my typing speed?",
    answer:
      "Practice regularly, focus on accuracy before speed, use proper finger placement, and gradually increase the difficulty of your typing exercises.",
  },
  {
    question: "Is TypingBhai free?",
    answer:
      "Yes. You can practice typing and take typing speed tests on TypingBhai for free without creating an account.",
  },
  {
    question: "Can I take a 30-second or 60-second typing test?",
    answer:
      "Yes. TypingBhai supports timed typing tests including 15, 30, 60, and 120 seconds, as well as custom durations.",
  },
];

function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
        <SEO
  title="TypingBhai – Free Online Typing Speed Test | WPM & Accuracy"
  description="Take a free online typing speed test. Measure WPM, accuracy, and improve your typing skills with TypingBhai."
  path="/"
/>
      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-20 pt-20 sm:px-8 lg:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <Zap size={15} />
            Free Online Typing Speed Test
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
            Improve Your
            <span className="text-cyan-400"> Typing Speed </span>
            and Accuracy
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Take a free online typing test with TypingBhai.
            Measure your WPM, check typing accuracy, and
            practice with different difficulty levels and timed tests.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/typing"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-7 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Start Typing Test
              <ArrowRight size={18} />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-7 py-3.5 font-semibold text-slate-200 transition hover:border-cyan-500"
            >
              How It Works
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
            {[
              "No signup required",
              "Instant WPM results",
              "Custom typing timer",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-slate-800/70 bg-slate-900/30 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Everything You Need to Practice Typing
            </h2>
            <p className="mt-4 text-slate-400">
              Simple tools to help you type faster and more accurately.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition hover:border-cyan-500/40"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="px-5 py-20 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
            How to Take a Typing Speed Test
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Choose Your Test",
                description:
                  "Select a time limit, difficulty level, and typing mode.",
              },
              {
                number: "02",
                title: "Start Typing",
                description:
                  "Type the words displayed on screen as accurately as possible.",
              },
              {
                number: "03",
                title: "Check Your Results",
                description:
                  "Review your typing speed, WPM, accuracy, and mistakes.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-800 p-7"
              >
                <span className="text-4xl font-extrabold text-cyan-400/60">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-bold">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATIONAL SEO CONTENT */}
      <section className="bg-slate-900/40 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-white">
              What Is WPM in a Typing Test?
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              WPM stands for words per minute. It is a standard
              way to measure typing speed. In a conventional
              typing calculation, five characters count as one
              word. Your typing speed depends on how many
              characters you type during a given time period.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">
              How to Improve Typing Speed and Accuracy
            </h2>
            <p className="mt-4 leading-8 text-slate-400">
              Start by typing slowly and accurately. Practice
              using the correct finger positions and try to
              avoid looking at the keyboard. Take short typing
              tests regularly and gradually move from easy
              words to more challenging exercises.
            </p>
            <p className="mt-4 leading-8 text-slate-400">
              Consistent practice helps build familiarity with
              keyboard layouts and common word patterns.
              TypingBhai offers free typing exercises to help
              you practice at your own pace.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-800 bg-slate-900/50 p-5"
              >
                <summary className="cursor-pointer font-semibold text-slate-100">
                  {faq.question}
                </summary>
                <p className="mt-4 leading-7 text-slate-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 to-cyan-950/30 px-6 py-14 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Test Your Typing Speed?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Start a free typing test, track your WPM, and
            challenge yourself to improve.
          </p>

          <Link
            to="/typing"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Start Free Typing Test
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
