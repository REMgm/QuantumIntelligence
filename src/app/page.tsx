"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Types ─── */
interface Phase {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  timeline: string;
  tasks: { label: string; done: boolean }[];
  details: string[];
}

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

/* ─── Data ─── */
const PHASES: Phase[] = [
  {
    id: 1,
    title: "Thesis Publication",
    subtitle: "Open Access & Academic Repositories",
    icon: "📚",
    color: "from-indigo-500 to-violet-600",
    timeline: "Month 1–2",
    tasks: [
      { label: "Upload to Zenodo (DOI + CC-BY)", done: false },
      { label: "Submit to SSRN / ResearchGate", done: false },
      { label: "ArXiv preprint submission", done: false },
      { label: "University repository deposit", done: false },
      { label: "Google Scholar profile setup", done: false },
      { label: "Create landing page / abstract site", done: false },
    ],
    details: [
      "Zenodo provides free DOI minting and EU Open Science compliance",
      "SSRN gives instant visibility in business & social science communities",
      "ArXiv reaches the technical / AI research audience",
      "Cross-link all repositories for maximum discoverability",
    ],
  },
  {
    id: 2,
    title: "Practical Book",
    subtitle: "Amazon KDP Self-Publishing",
    icon: "📖",
    color: "from-emerald-500 to-teal-600",
    timeline: "Month 2–5",
    tasks: [
      { label: "Restructure thesis → practitioner framework", done: false },
      { label: "Write case studies & real-world playbooks", done: false },
      { label: "Design cover (Canva / 99designs)", done: false },
      { label: "Format for KDP (paperback + Kindle)", done: false },
      { label: "ISBN registration", done: false },
      { label: "Set pricing strategy ($19.99–$29.99)", done: false },
      { label: "Launch on Amazon KDP", done: false },
      { label: "Collect early reviews (20+ target)", done: false },
    ],
    details: [
      "Transform academic prose into actionable frameworks for C-suite leaders",
      "Include QI Assessment Tool, Implementation Roadmap, ROI Calculator",
      "Amazon KDP: 60% royalty on print, 70% on Kindle ($2.99–$9.99)",
      "Launch strategy: free Kindle weekend + LinkedIn campaign",
    ],
  },
  {
    id: 3,
    title: "Article Series",
    subtitle: "Tier-1 Publication Pitches",
    icon: "✍️",
    color: "from-amber-500 to-orange-600",
    timeline: "Month 3–12",
    tasks: [
      { label: "Pitch HBR (Quantum Intelligence framework)", done: false },
      { label: "Pitch MIT Tech Review (AI + MarTech)", done: false },
      { label: "Pitch Forbes (leadership / transformation)", done: false },
      { label: "Pitch Wired (future of AI marketing)", done: false },
      { label: "Pitch Fast Company (innovation angle)", done: false },
      { label: "Write TechCrunch guest column", done: false },
      { label: "LinkedIn Thought Leadership series (12 posts)", done: false },
      { label: "Medium / Substack companion blog", done: false },
    ],
    details: [
      "HBR: 2,500–3,000 word op-ed on 'Why Quantum Intelligence Will Redefine MarTech'",
      "MIT Tech Review: Technical deep-dive on AI-first marketing ecosystems",
      "Forbes: Contributor network, C-suite transformation narrative",
      "Wired: Culture + technology intersection angle",
      "Fast Company: Innovation + design thinking lens",
    ],
  },
];

const MILESTONES = [
  { month: 1, label: "Thesis live on 3+ platforms", icon: "🚀" },
  { month: 2, label: "Book manuscript complete", icon: "📝" },
  { month: 3, label: "First article pitched", icon: "📨" },
  { month: 4, label: "Book on Amazon KDP", icon: "📖" },
  { month: 5, label: "20+ book reviews", icon: "⭐" },
  { month: 6, label: "First tier-1 publication", icon: "🏆" },
  { month: 9, label: "3+ articles published", icon: "📰" },
  { month: 12, label: "Thought leadership established", icon: "👑" },
];

/* ─── Helpers ─── */
const SECRET = "Doitnow23!";

function getProgress(phases: Phase[]) {
  const total = phases.reduce((s, p) => s + p.tasks.length, 0);
  const done = phases.reduce((s, p) => s + p.tasks.filter((t) => t.done).length, 0);
  return total ? Math.round((done / total) * 100) : 0;
}

/* ─── Components ─── */

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    if (pw === SECRET) { onUnlock(); }
    else { setError(true); setTimeout(() => setError(false), 600); setPw(""); }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 z-50">
      <div className={`glass-strong rounded-3xl p-10 max-w-md w-full mx-6 text-center animate-fade-in ${error ? "animate-shake" : ""}`}>
        <div className="text-5xl mb-4">🔐</div>
        <h1 className="text-2xl font-bold text-white mb-2">Quantum Intelligence</h1>
        <p className="text-indigo-300/70 text-sm mb-8">Enter the passphrase to access the strategy dashboard</p>
        <input
          ref={inputRef}
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Secret passphrase…"
          className={`w-full px-5 py-3.5 rounded-xl bg-white/5 border text-white placeholder-white/30 outline-none transition-all focus:ring-2 focus:ring-indigo-500/50 ${error ? "border-red-500/60" : "border-white/10"}`}
        />
        {error && <p className="text-red-400 text-xs mt-2 animate-fade-in">Incorrect passphrase. Try again.</p>}
        <button onClick={submit} className="mt-5 w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-all glow-accent">
          Unlock Dashboard
        </button>
      </div>
    </div>
  );
}

function ThemeToggle({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <button onClick={toggle} className="glass rounded-full p-2.5 hover:scale-105 transition-transform" aria-label="Toggle theme">
      {theme === "dark" ? (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-amber-300"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      ) : (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
      )}
    </button>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-current opacity-60">Overall Progress</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-white/10 dark:bg-white/10 light:bg-black/5 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function PhaseCard({ phase, onToggleTask, onSelect, isSelected }: {
  phase: Phase; onToggleTask: (phaseId: number, idx: number) => void; onSelect: () => void; isSelected: boolean;
}) {
  const done = phase.tasks.filter((t) => t.done).length;
  const pct = Math.round((done / phase.tasks.length) * 100);

  return (
    <div onClick={onSelect} className={`glass rounded-2xl p-6 cursor-pointer transition-all hover:scale-[1.01] ${isSelected ? "ring-2 ring-indigo-500/50 glow-accent" : ""}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-3xl">{phase.icon}</span>
          <h3 className="text-lg font-bold mt-2">{phase.title}</h3>
          <p className="text-xs opacity-60">{phase.subtitle}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${phase.color} text-white`}>{phase.timeline}</span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="opacity-50">{done}/{phase.tasks.length} tasks</span>
          <span className="font-semibold">{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className={`h-full rounded-full bg-gradient-to-r ${phase.color} progress-fill`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ul className="space-y-2">
        {phase.tasks.map((t, i) => (
          <li key={i} className="flex items-center gap-3 group">
            <button
              onClick={(e) => { e.stopPropagation(); onToggleTask(phase.id, i); }}
              className={`w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all ${t.done ? "bg-gradient-to-r " + phase.color + " border-transparent" : "border-white/20 hover:border-white/40"}`}
            >
              {t.done && <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            </button>
            <span className={`text-sm transition-all ${t.done ? "line-through opacity-40" : "opacity-80 group-hover:opacity-100"}`}>{t.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhaseDetail({ phase }: { phase: Phase }) {
  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <h3 className="font-bold text-lg mb-1 flex items-center gap-2">{phase.icon} {phase.title} — Key Insights</h3>
      <p className="text-xs opacity-50 mb-4">{phase.subtitle}</p>
      <ul className="space-y-3">
        {phase.details.map((d, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className={`mt-1 w-2 h-2 rounded-full bg-gradient-to-r ${phase.color} flex-shrink-0`} />
            <span className="opacity-80">{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Timeline() {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-bold text-lg mb-4">📅 12-Month Milestone Timeline</h3>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-emerald-500 to-amber-500 opacity-30" />
        <div className="space-y-4">
          {MILESTONES.map((m, i) => (
            <div key={i} className="flex items-center gap-4 pl-0 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-7 h-7 rounded-full glass flex items-center justify-center text-sm flex-shrink-0 z-10">{m.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold opacity-50">Month {m.month}</span>
                </div>
                <p className="text-sm opacity-80">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricsGrid({ phases }: { phases: Phase[] }) {
  const totalTasks = phases.reduce((s, p) => s + p.tasks.length, 0);
  const doneTasks = phases.reduce((s, p) => s + p.tasks.filter((t) => t.done).length, 0);
  const metrics = [
    { label: "Total Tasks", value: totalTasks, icon: "📋" },
    { label: "Completed", value: doneTasks, icon: "✅" },
    { label: "Platforms", value: "6+", icon: "🌐" },
    { label: "Publications", value: "6", icon: "📰" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {metrics.map((m, i) => (
        <div key={i} className="glass rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-default">
          <div className="text-2xl mb-1">{m.icon}</div>
          <div className="text-2xl font-bold">{m.value}</div>
          <div className="text-xs opacity-50">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

function BrainstormPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: "Hi Remco! 👋 I'm your AI brainstorm partner for the Quantum Intelligence publication strategy. Ask me anything — from refining your pitch angles to brainstorming chapter outlines, article hooks, or marketing tactics." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => { if (isOpen) inputRef.current?.focus(); }, [isOpen]);

  const send = useCallback(async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMsg = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/brainstorm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].slice(-10) }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "Sorry, I couldn't process that. Try again!" }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Connection error. Please check your API configuration and try again." }]);
    }
    setLoading(false);
  }, [input, loading, messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="glass-strong rounded-t-3xl md:rounded-3xl w-full max-w-2xl h-[85vh] md:h-[70vh] flex flex-col animate-slide-up mobile-safe">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm">🧠</div>
            <div>
              <h3 className="font-bold text-sm">AI Brainstorm</h3>
              <p className="text-xs opacity-50">Powered by Claude</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white" : "glass"}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="glass rounded-2xl px-4 py-3 flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400 typing-dot" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 typing-dot" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 typing-dot" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about pitches, chapters, strategy…"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-current placeholder-current/30 outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
            />
            <button onClick={send} disabled={loading || !input.trim()} className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold disabled:opacity-30 hover:opacity-90 transition-all text-sm">
              Send
            </button>
          </div>
          <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
            {["Pitch angle for HBR?", "Book chapter ideas", "LinkedIn content plan", "Differentiation strategy"].map((q) => (
              <button key={q} onClick={() => { setInput(q); }} className="text-xs px-3 py-1.5 rounded-full glass whitespace-nowrap hover:scale-105 transition-transform">
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [phases, setPhases] = useState(PHASES);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [brainstormOpen, setBrainstormOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const toggleTask = (phaseId: number, taskIdx: number) => {
    setPhases((prev) =>
      prev.map((p) =>
        p.id === phaseId
          ? { ...p, tasks: p.tasks.map((t, i) => (i === taskIdx ? { ...t, done: !t.done } : t)) }
          : p
      )
    );
  };

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const progress = getProgress(phases);
  const selected = phases.find((p) => p.id === selectedPhase) || null;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === "dark" ? "bg-gradient-to-br from-slate-950 via-indigo-950/50 to-slate-950 text-white" : "bg-gradient-to-br from-slate-50 via-indigo-50/50 to-white text-slate-900"}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚛️</span>
            <div>
              <h1 className="font-bold text-sm md:text-base">Quantum Intelligence</h1>
              <p className="text-[10px] opacity-40">Publication Strategy Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setBrainstormOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-semibold hover:opacity-90 transition-all glow-pulse">
              🧠 AI Brainstorm
            </button>
            <ThemeToggle theme={theme} toggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <section className="text-center py-6 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Publication Strategy
          </h2>
          <p className="opacity-50 text-sm max-w-xl mx-auto">
            From defended thesis to global thought leadership — your 12-month roadmap to publishing, launching, and dominating the conversation on AI-first marketing.
          </p>
        </section>

        {/* Progress */}
        <section className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <ProgressBar value={progress} />
        </section>

        {/* Metrics */}
        <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <MetricsGrid phases={phases} />
        </section>

        {/* Phase Cards */}
        <section className="grid md:grid-cols-3 gap-4">
          {phases.map((p, i) => (
            <div key={p.id} className="animate-fade-in" style={{ animationDelay: `${300 + i * 100}ms` }}>
              <PhaseCard
                phase={p}
                onToggleTask={toggleTask}
                onSelect={() => setSelectedPhase(selectedPhase === p.id ? null : p.id)}
                isSelected={selectedPhase === p.id}
              />
            </div>
          ))}
        </section>

        {/* Detail Panel */}
        {selected && (
          <section>
            <PhaseDetail phase={selected} />
          </section>
        )}

        {/* Timeline */}
        <section className="animate-fade-in" style={{ animationDelay: "600ms" }}>
          <Timeline />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 opacity-30 text-xs">
          <p>Quantum Intelligence © {new Date().getFullYear()} Remco Vroom — Monks</p>
          <p className="mt-1">Built with Next.js · Deployed on Vercel</p>
        </footer>
      </main>

      {/* AI Brainstorm Panel */}
      <BrainstormPanel isOpen={brainstormOpen} onClose={() => setBrainstormOpen(false)} />

      {/* Floating Brainstorm FAB (mobile) */}
      <button
        onClick={() => setBrainstormOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xl flex items-center justify-center shadow-xl glow-pulse z-30"
        aria-label="Open AI Brainstorm"
      >
        🧠
      </button>
    </div>
  );
}
