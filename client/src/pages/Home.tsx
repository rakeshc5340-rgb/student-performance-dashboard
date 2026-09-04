/*
 * Quiet Signal style reminder: warm paper canvas, ink navy navigation spine,
 * Northstar cobalt signal color, compact editorial cards, and evidence-first UI.
 */
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Menu,
  Network,
  Play,
  RotateCcw,
  Search,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

type PredictionBand = "Strong outlook" | "Needs attention" | "Priority support";
type Inputs = {
  attendance: number;
  assignments: number;
  studyHours: number;
  average: number;
};

type Node = {
  id: string;
  label: string;
  sublabel: string;
  tone: "blue" | "coral" | "mint" | "navy" | "lavender" | "yellow";
};

const initialInputs: Inputs = {
  attendance: 92,
  assignments: 86,
  studyHours: 12,
  average: 82,
};

const nodeOrder: Node[] = [
  { id: "start", label: "Start", sublabel: "Learner check-in", tone: "navy" },
  { id: "attendance", label: "Attendance", sublabel: "92% present", tone: "blue" },
  { id: "study", label: "Study plan", sublabel: "12 hrs / week", tone: "yellow" },
  { id: "tutoring", label: "Tutoring", sublabel: "Book a session", tone: "coral" },
  { id: "practice", label: "Practice set", sublabel: "Target weak topics", tone: "mint" },
  { id: "ready", label: "Ready check", sublabel: "Review in 7 days", tone: "lavender" },
];

const bfsSequence = ["start", "attendance", "study", "tutoring", "practice", "ready"];
const dfsSequence = ["start", "attendance", "tutoring", "practice", "ready", "study"];

function getPrediction(inputs: Inputs) {
  const weightedScore =
    inputs.attendance * 0.3 +
    inputs.assignments * 0.25 +
    Math.min(inputs.studyHours * 5, 100) * 0.15 +
    inputs.average * 0.3;
  const projected = Math.round(weightedScore);
  const band: PredictionBand =
    projected >= 80 ? "Strong outlook" : projected >= 65 ? "Needs attention" : "Priority support";
  const confidence = Math.min(96, Math.max(64, Math.round(68 + Math.abs(projected - 72) * 0.9)));
  return { projected, band, confidence };
}

function formatBandTone(band: PredictionBand) {
  if (band === "Strong outlook") return "positive";
  if (band === "Needs attention") return "watch";
  return "risk";
}

function StatCard({
  label,
  value,
  detail,
  icon,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
  accent: string;
}) {
  return (
    <article className="stat-card">
      <div className="stat-card__top">
        <span className={`stat-card__icon ${accent}`}>{icon}</span>
        <span className="stat-card__detail">{detail}</span>
      </div>
      <p className="eyebrow">{label}</p>
      <p className="stat-card__value">{value}</p>
    </article>
  );
}

export default function Home() {
  const [inputs, setInputs] = useState<Inputs>(initialInputs);
  const [prediction, setPrediction] = useState(() => getPrediction(initialInputs));
  const [activeTab, setActiveTab] = useState<"bfs" | "dfs">("bfs");
  const [stepIndex, setStepIndex] = useState(3);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const sequence = activeTab === "bfs" ? bfsSequence : dfsSequence;
  const activeNodeId = sequence[Math.min(stepIndex, sequence.length - 1)];
  const activeNode = nodeOrder.find((node) => node.id === activeNodeId) ?? nodeOrder[0];
  const bandTone = formatBandTone(prediction.band);

  const factorBars = useMemo(
    () => [
      { label: "Attendance", value: inputs.attendance, color: "cobalt" },
      { label: "Assignments", value: inputs.assignments, color: "mint" },
      { label: "Study rhythm", value: Math.min(inputs.studyHours * 5, 100), color: "coral" },
      { label: "Current average", value: inputs.average, color: "navy" },
    ],
    [inputs],
  );

  const updateInput = (key: keyof Inputs, value: string) => {
    const next = Number(value);
    setInputs((current) => ({ ...current, [key]: Number.isFinite(next) ? next : 0 }));
  };

  const runPrediction = () => setPrediction(getPrediction(inputs));
  const resetDemo = () => {
    setInputs(initialInputs);
    setPrediction(getPrediction(initialInputs));
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? "sidebar--open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark brand-mark--css" aria-hidden="true"><span /></div>
          <div>
            <span className="brand-name">northstar</span>
            <span className="brand-subname">study</span>
          </div>
          <button className="mobile-close" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-section-label">Workspace</div>
        <nav className="sidebar-nav" aria-label="Primary navigation">
          <a className="sidebar-link sidebar-link--active" href="#overview" onClick={() => setMobileNavOpen(false)}>
            <LayoutDashboard size={17} />
            <span>Overview</span>
            <span className="sidebar-link__dot" />
          </a>
          <a className="sidebar-link" href="#predict" onClick={() => setMobileNavOpen(false)}>
            <Gauge size={17} />
            <span>Predictor</span>
          </a>
          <a className="sidebar-link" href="#pathways" onClick={() => setMobileNavOpen(false)}>
            <GitBranch size={17} />
            <span>Pathways</span>
          </a>
          <a className="sidebar-link" href="#notes" onClick={() => setMobileNavOpen(false)}>
            <BookOpen size={17} />
            <span>Notes</span>
          </a>
        </nav>

        <div className="sidebar-section-label sidebar-section-label--lower">Quick views</div>
        <div className="quick-view">
          <div className="quick-view__avatar">AM</div>
          <div>
            <strong>Alex Morgan</strong>
            <span>Grade 10 · Group B</span>
          </div>
          <ChevronDown size={15} />
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-tip">
            <Sparkles size={16} />
            <div>
              <strong>Small signal, big shift.</strong>
              <span>Use patterns to plan the next helpful move.</span>
            </div>
          </div>
          <a className="sidebar-link" href="#settings">
            <Settings2 size={17} />
            <span>Settings</span>
          </a>
          <div className="user-row">
            <div className="user-avatar">JD</div>
            <div>
              <strong>Jamie Dsouza</strong>
              <span>Teacher account</span>
            </div>
            <CircleHelp size={16} />
          </div>
        </div>
      </aside>

      {mobileNavOpen && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="breadcrumb"><span>Workspace</span><span>/</span><strong>Overview</strong></div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Search"><Search size={17} /></button>
            <button className="date-button"><CalendarDays size={16} /><span>This week</span><ChevronDown size={14} /></button>
            <div className="topbar-avatar">JD</div>
          </div>
        </header>

        <div className="page-content" id="overview">
          <section className="intro-row">
            <div>
              <p className="eyebrow eyebrow--blue">Monday, 14 October 2024</p>
              <h1>See the signal.<br /><em>Plan the support.</em></h1>
              <p className="intro-copy">A clear starting point for understanding where Alex is today—and what could help next.</p>
            </div>
            <div className="intro-illustration" aria-hidden="true">
              <img src="/manus-storage/northstar-style-reference_84b92da0.png" alt="" />
              <span className="illustration-note">One learner · four signals</span>
            </div>
          </section>

          <section className="stats-grid" aria-label="Learner snapshot">
            <StatCard label="Predicted outcome" value={`${prediction.projected}%`} detail="+4 pts / last check" icon={<TrendingUp size={17} />} accent="accent-cobalt" />
            <StatCard label="Current average" value={`${inputs.average}%`} detail="Above class median" icon={<Target size={17} />} accent="accent-mint" />
            <StatCard label="Attendance" value={`${inputs.attendance}%`} detail="3-week steady" icon={<Users size={17} />} accent="accent-cobalt" />
            <StatCard label="Support status" value={prediction.band === "Strong outlook" ? "On track" : "Review"} detail="Next check in 7 days" icon={<Zap size={17} />} accent="accent-mint" />
          </section>

          <section className="work-grid" id="predict">
            <article className="card predictor-card">
              <div className="card-heading">
                <div>
                  <div className="section-kicker"><span className="section-kicker__line" /> Forecast</div>
                  <h2>Run a simple prediction</h2>
                  <p>Adjust the learner’s current pattern. One transparent weighted score turns it into a directional signal.</p>
                </div>
                <span className="model-pill"><BrainCircuit size={14} /> Weighted score</span>
              </div>
              <div className="predictor-body">
                <div className="field-stack">
                  <label className="field-label">Attendance <span>{inputs.attendance}%</span>
                    <input type="range" min="0" max="100" value={inputs.attendance} onChange={(event) => updateInput("attendance", event.target.value)} />
                  </label>
                  <label className="field-label">Assignments complete <span>{inputs.assignments}%</span>
                    <input type="range" min="0" max="100" value={inputs.assignments} onChange={(event) => updateInput("assignments", event.target.value)} />
                  </label>
                  <label className="field-label">Study hours / week <span>{inputs.studyHours} hrs</span>
                    <input type="range" min="0" max="20" value={inputs.studyHours} onChange={(event) => updateInput("studyHours", event.target.value)} />
                  </label>
                  <label className="field-label">Current average <span>{inputs.average}%</span>
                    <input type="range" min="0" max="100" value={inputs.average} onChange={(event) => updateInput("average", event.target.value)} />
                  </label>
                  <div className="button-row">
                    <button className="primary-button" onClick={runPrediction}><Play size={15} fill="currentColor" /> Run prediction</button>
                    <button className="quiet-button" onClick={resetDemo}><RotateCcw size={15} /> Reset</button>
                  </div>
                </div>
                <div className={`result-panel result-panel--${bandTone}`}>
                  <div className="result-panel__top"><span>Projected final score</span><span className="result-panel__signal"><span /> Live signal</span></div>
                  <div className="result-score">{prediction.projected}<small>%</small></div>
                  <div className="score-track"><span style={{ width: `${prediction.projected}%` }} /></div>
                  <div className="result-band"><strong>{prediction.band}</strong><span>{prediction.confidence}% confidence</span></div>
                  <p>{prediction.band === "Strong outlook" ? "The current pattern is holding. Protect the study rhythm and keep the feedback loop short." : prediction.band === "Needs attention" ? "The pattern is mixed. A focused support action could meaningfully shift the next check-in." : "The pattern needs a closer look. Start with attendance and one small, repeatable support action."}</p>
                </div>
              </div>
            </article>

            <article className="card factors-card">
              <div className="card-heading card-heading--compact">
                <div>
                  <div className="section-kicker"><span className="section-kicker__line section-kicker__line--coral" /> Reading the inputs</div>
                  <h2>What moves the signal</h2>
                </div>
                <button className="more-button" aria-label="More options">···</button>
              </div>
              <div className="factor-list">
                {factorBars.map((factor) => (
                  <div className="factor-row" key={factor.label}>
                    <div className="factor-row__label"><span>{factor.label}</span><strong>{factor.value}%</strong></div>
                    <div className="factor-track"><span className={`factor-fill factor-fill--${factor.color}`} style={{ width: `${factor.value}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="factor-note"><span className="factor-note__icon"><Check size={14} /></span><p><strong>Best lever right now:</strong> keep study hours consistent across two more weeks.</p></div>
            </article>
          </section>

          <section className="pathway-section" id="pathways">
            <div className="pathway-heading">
              <div>
                <div className="section-kicker"><span className="section-kicker__line section-kicker__line--navy" /> Learning pathways</div>
                <h2>Explore the next helpful step</h2>
                <p>BFS and DFS are two ways to walk the same support graph. Compare the order, then choose the action that fits.</p>
              </div>
              <div className="pathway-controls" role="tablist" aria-label="Traversal type">
                <button className={activeTab === "bfs" ? "tab-button tab-button--active" : "tab-button"} onClick={() => { setActiveTab("bfs"); setStepIndex(0); }} role="tab" aria-selected={activeTab === "bfs"}>BFS <span>Level by level</span></button>
                <button className={activeTab === "dfs" ? "tab-button tab-button--active" : "tab-button"} onClick={() => { setActiveTab("dfs"); setStepIndex(0); }} role="tab" aria-selected={activeTab === "dfs"}>DFS <span>Deep first</span></button>
              </div>
            </div>

            <div className="card graph-card">
              <div className="graph-visual">
                <div className="graph-topline"><span className="graph-label"><Network size={15} /> Support graph</span><span className="graph-status"><span /> Traversing {activeTab.toUpperCase()}</span></div>
                <div className="graph-map" aria-label={`${activeTab.toUpperCase()} support graph`}>
                  <div className="graph-lines" aria-hidden="true">
                    <span className="line line-1" /><span className="line line-2" /><span className="line line-3" /><span className="line line-4" /><span className="line line-5" />
                  </div>
                  {nodeOrder.map((node) => {
                    const order = sequence.indexOf(node.id);
                    const isVisited = order !== -1 && order <= stepIndex;
                    const isActive = node.id === activeNodeId;
                    return <div key={node.id} className={`graph-node graph-node--${node.tone} ${isVisited ? "graph-node--visited" : ""} ${isActive ? "graph-node--active" : ""}`} style={{ ["--order" as string]: order }}><span className="graph-node__dot">{isVisited ? <Check size={13} /> : <span />}</span><strong>{node.label}</strong><small>{node.sublabel}</small></div>;
                  })}
                </div>
              </div>
              <div className="traversal-panel">
                <div className="traversal-panel__top"><span className="step-count">Step {Math.min(stepIndex + 1, sequence.length)} <small>/ {sequence.length}</small></span><span className="tiny-label">{activeTab === "bfs" ? "Breadth-first search" : "Depth-first search"}</span></div>
                <div className="active-step"><span className="active-step__number">0{Math.min(stepIndex + 1, sequence.length)}</span><div><p className="eyebrow">Now exploring</p><h3>{activeNode.label}</h3><p>{activeNode.sublabel}. {activeTab === "bfs" ? "BFS checks nearby support options before moving deeper." : "DFS follows one support thread until it reaches a useful checkpoint."}</p></div></div>
                <div className="traversal-actions"><button className="primary-button primary-button--small" onClick={() => setStepIndex((current) => Math.min(current + 1, sequence.length - 1))}><ArrowUpRight size={15} /> Next step</button><button className="quiet-button quiet-button--small" onClick={() => setStepIndex(0)}>Replay path</button></div>
              </div>
            </div>
          </section>

          <section className="bottom-row" id="notes">
            <article className="note-card">
              <div className="note-card__mark"><Sparkles size={18} /></div>
              <div><p className="eyebrow eyebrow--blue">Coach note</p><h3>Keep the signal human.</h3><p>Predictions are prompts for a conversation, not labels. Pair the score with what Alex says and sees in class.</p></div>
              <button className="outline-button">Add a note <ArrowUpRight size={14} /></button>
            </article>
            <article className="mini-chart-card">
              <div className="mini-chart-card__top"><div><p className="eyebrow">Signal over time</p><h3>Steady, with room to grow</h3></div><BarChart3 size={18} /></div>
              <div className="sparkline"><svg viewBox="0 0 400 88" preserveAspectRatio="none" role="img" aria-label="A rising line showing recent performance"><path d="M4 72 C40 69, 51 75, 84 60 S130 63, 158 48 S200 53, 226 43 S268 48, 300 31 S351 35, 396 14" fill="none" stroke="#2f6bff" strokeWidth="4" strokeLinecap="round" /><path d="M4 72 C40 69, 51 75, 84 60 S130 63, 158 48 S200 53, 226 43 S268 48, 300 31 S351 35, 396 14 L396 88 L4 88 Z" fill="url(#sparkFill)" opacity=".16" /><defs><linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2f6bff" /><stop offset="100%" stopColor="#2f6bff" stopOpacity="0" /></linearGradient></defs></svg></div>
              <div className="chart-axis"><span>Sep 23</span><span>Oct 14</span></div>
            </article>
          </section>

          <footer className="page-footer"><span>Northstar Study · A small signal for better support.</span><span>Built for thoughtful educators <span className="footer-star">✦</span></span></footer>
        </div>
      </main>
    </div>
  );
}
