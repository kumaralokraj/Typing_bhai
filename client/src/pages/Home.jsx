import { Link } from "react-router-dom";
import {
  ArrowRight,
  Keyboard,
  Gauge,
  Target,
  Timer,
  CheckCircle2,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "Real-Time WPM",
    description:
      "Track your typing speed instantly while you practice.",
  },
  {
    icon: Target,
    title: "Accuracy Tracking",
    description:
      "Identify typing mistakes and improve your precision.",
  },
  {
    icon: Timer,
    title: "Flexible Timer",
    description:
      "Choose between 15, 30, 60 and 120 second tests.",
  },
  {
    icon: Keyboard,
    title: "Multiple Typing Modes",
    description:
      "Practice capital letters, numbers, symbols and punctuation.",
  },
];

function Home() {
  return (
    <main className="bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden px-5 py-24 sm:py-32">
        <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <Zap size={16} />
            Free Online Typing Speed Test
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
            Master Your
            <br />
            <span className="text-cyan-400">Typing Speed.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">
            Test your typing speed, improve accuracy, and build
            keyboard confidence with TypingBhai. No account needed.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/typing"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              Start Typing Test
              <ArrowRight size={20} />
            </Link>

            <a
              href="#features"
              className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-slate-200 transition hover:border-cyan-500"
            >
              Explore Features
            </a>
          </div>

          {/* TYPING PREVIEW */}
          <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left shadow-2xl sm:p-9">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-medium text-cyan-400">
                Typing Preview
              </span>
              <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm text-slate-400">
                30 seconds
              </span>
            </div>

            <p className="text-xl leading-10 tracking-wide text-slate-400 sm:text-2xl">
              <span className="text-cyan-400">
                practice makes progress
              </span>{" "}
              when you type with focus and accuracy every day
            </p>

            <div className="mt-7 flex gap-8 border-t border-slate-800 pt-5 text-sm">
              <span className="text-slate-400">
                WPM <strong className="ml-2 text-white">--</strong>
              </span>
              <span className="text-slate-400">
                Accuracy <strong className="ml-2 text-white">--</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="border-t border-slate-800 bg-slate-900/40 px-5 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything You Need to Type Better
            </h2>
            <p className="mt-4 text-slate-400">
              Simple tools designed to improve your typing skills.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500/40"
              >
                <div className="mb-5 inline-flex rounded-xl bg-cyan-500/10 p-3">
                  <Icon size={25} className="text-cyan-400" />
                </div>

                <h3 className="mb-3 text-lg font-bold">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-24 text-center">
        <CheckCircle2
          size={36}
          className="mx-auto mb-6 text-cyan-400"
        />

        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to Improve Your Typing?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          Start practicing today. No signup, no distractions,
          just you and your keyboard.
        </p>

        <Link
          to="/typing"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-400"
        >
          Start Free Test
          <ArrowRight size={19} />
        </Link>
      </section>
    </main>
  );
}

export default Home;