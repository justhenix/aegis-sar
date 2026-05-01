"use client";

import { useState, useCallback, useRef } from "react";

/* ── Mock Data ── */
const MOCK_RESULT = {
  incident: "possible_survivor",
  severity: "high",
  confidence: 0.84,
  action: "Send rescue team through eastern access route.",
};

const MOCK_LOG = [
  { time: "14:32:07", msg: "DRONE-01 connected" },
  { time: "14:32:12", msg: "Feed stabilized" },
  { time: "14:33:01", msg: "Thermal overlay ready" },
];

/* ── Severity Config ── */
const SEVERITY_MAP = {
  high: {
    label: "HIGH",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    dot: "bg-red-500",
  },
  medium: {
    label: "MEDIUM",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    dot: "bg-amber-400",
  },
  low: {
    label: "LOW",
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    dot: "bg-green-500",
  },
};

/* ──────────────────────────────────────────────
   STATUS BAR
   ────────────────────────────────────────────── */
function StatusBar({ mode, status }) {
  return (
    <header
      id="status-bar"
      className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 select-none"
      style={{ background: "var(--bg-panel)" }}
    >
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold tracking-widest text-zinc-100">
          AEGIS-SAR
        </span>
        <span className="h-4 w-px bg-zinc-700" />
        <span className="text-xs font-mono text-zinc-500 tracking-wide">
          v0.1.0
        </span>
      </div>

      {/* Right: Indicators */}
      <div className="flex items-center gap-5 text-xs font-mono tracking-wide">
        <StatusPill label="MISSION" value={status} />
        <StatusPill label="FEED" value="DRONE-01" />
        <StatusPill
          label="MODE"
          value={mode === "mock" ? "MOCK" : "LOCAL"}
          highlight={mode === "mock"}
        />
      </div>
    </header>
  );
}

function StatusPill({ label, value, highlight }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-zinc-600">{label}:</span>
      <span className={highlight ? "text-amber-400" : "text-zinc-300"}>
        {value}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   DRONE FEED PANEL (Left – 70%)
   ────────────────────────────────────────────── */
function DroneFeed({ imageUrl, onUpload, onMockTrigger, isLoading }) {
  const fileRef = useRef(null);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onUpload(url);
      }
    },
    [onUpload]
  );

  return (
    <section
      id="drone-feed"
      className="flex flex-col flex-1 lg:w-[70%] lg:flex-none border-r border-zinc-800"
    >
      {/* Feed Label */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800">
        <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-mono text-zinc-400 tracking-widest">
          LIVE FEED — CAM 01
        </span>
      </div>

      {/* Feed Area */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden"
        style={{ background: "var(--bg-surface)" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Drone feed preview"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 select-none">
            {/* Crosshair */}
            <div className="relative h-24 w-24 opacity-20">
              <div className="absolute inset-0 border border-zinc-500" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-500" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-500" />
            </div>
            <span className="text-sm font-mono text-zinc-600 tracking-widest">
              WAITING FOR FOOTAGE
            </span>
          </div>
        )}

        {/* Scanline overlay when loading */}
        {isLoading && (
          <div className="scanline absolute inset-0 pointer-events-none" />
        )}

        {/* Corner markers */}
        <CornerMarkers />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-zinc-800">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <button
          id="btn-upload"
          onClick={() => fileRef.current?.click()}
          className="flex-1 py-2 px-4 rounded-none text-xs font-mono font-bold tracking-wider
                     bg-zinc-800 text-zinc-300 border border-zinc-700
                     hover:bg-zinc-700 hover:text-zinc-100 transition-colors cursor-pointer"
        >
          ▲ UPLOAD IMAGE
        </button>
        <button
          id="btn-mock"
          onClick={onMockTrigger}
          disabled={isLoading}
          className="flex-1 py-2 px-4 rounded-none text-xs font-mono font-bold tracking-wider
                     bg-amber-500/10 text-amber-400 border border-amber-500/30
                     hover:bg-amber-500/20 hover:text-amber-300 transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          ⚡ TRIGGER MOCK MODE
        </button>
      </div>
    </section>
  );
}

/* Corner bracket decorations */
function CornerMarkers() {
  const base = "absolute h-5 w-5 border-zinc-600 opacity-40";
  return (
    <>
      <div
        className={`${base} top-3 left-3 border-t border-l`}
        aria-hidden
      />
      <div
        className={`${base} top-3 right-3 border-t border-r`}
        aria-hidden
      />
      <div
        className={`${base} bottom-3 left-3 border-b border-l`}
        aria-hidden
      />
      <div
        className={`${base} bottom-3 right-3 border-b border-r`}
        aria-hidden
      />
    </>
  );
}

/* ──────────────────────────────────────────────
   INTELLIGENCE HUB (Right – 30%)
   ────────────────────────────────────────────── */
function IntelligenceHub({ result, isLoading, log }) {
  return (
    <aside
      id="intel-hub"
      className="flex flex-col lg:w-[30%] overflow-y-auto"
      style={{ background: "var(--bg-panel)" }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800">
        <h2 className="text-xs font-mono font-bold tracking-[0.25em] text-zinc-400">
          INTELLIGENCE HUB
        </h2>
      </div>

      <div className="flex-1 flex flex-col">
        {isLoading ? (
          <LoadingState />
        ) : result ? (
          <ResultState data={result} />
        ) : (
          <IdleState />
        )}

        {/* Event Log */}
        <EventLog entries={log} />
      </div>
    </aside>
  );
}

/* ── Intel States ── */
function IdleState() {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center select-none">
        <div className="text-zinc-700 text-4xl mb-3">◇</div>
        <p className="text-sm font-mono text-zinc-600 tracking-widest">
          NO ACTIVE INCIDENT
        </p>
        <p className="text-xs text-zinc-700 mt-2">
          Upload imagery or trigger mock mode
        </p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="tactical-pulse">
          <p className="text-lg font-mono font-bold text-amber-400 tracking-widest">
            ANALYZING RAW FEED...
          </p>
        </div>
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1 w-6 bg-amber-400/60"
              style={{
                animation: `tactical-pulse 1.5s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
        <p className="text-xs text-zinc-600 mt-4 font-mono">
          Processing frame data...
        </p>
      </div>
    </div>
  );
}

function ResultState({ data }) {
  const sev = SEVERITY_MAP[data.severity] ?? SEVERITY_MAP.low;
  const pct = Math.round(data.confidence * 100);
  const incidentLabel = data.incident.replace(/_/g, " ").toUpperCase();

  return (
    <div className="flex-1 flex flex-col gap-0">
      {/* Severity Badge */}
      <div
        className={`flex items-center gap-2 px-4 py-2 ${sev.bg} border-b ${sev.border}`}
      >
        <span className={`h-2 w-2 rounded-full ${sev.dot} animate-pulse`} />
        <span className={`text-xs font-mono font-bold tracking-widest ${sev.color}`}>
          SEVERITY: {sev.label}
        </span>
      </div>

      {/* Incident Header */}
      <div className="px-4 py-4 border-b border-zinc-800">
        <p className="text-[10px] font-mono text-zinc-600 tracking-widest mb-1">
          INCIDENT CLASSIFICATION
        </p>
        <h3 className="text-xl font-bold tracking-wide text-zinc-100 leading-tight">
          {incidentLabel}
        </h3>
      </div>

      {/* Confidence Gauge */}
      <div className="px-4 py-4 border-b border-zinc-800">
        <p className="text-[10px] font-mono text-zinc-600 tracking-widest mb-2">
          AI CONFIDENCE
        </p>
        <div className="flex items-end gap-3">
          <span className="text-3xl font-mono font-bold text-zinc-100">
            {pct}%
          </span>
          <span className="text-xs text-zinc-500 pb-1 font-mono">
            ({data.confidence.toFixed(2)})
          </span>
        </div>
        {/* Gauge bar */}
        <div className="mt-3 h-1.5 w-full bg-zinc-800 overflow-hidden">
          <div
            className="h-full gauge-animate"
            style={{
              "--gauge-width": `${pct}%`,
              background:
                pct >= 80
                  ? "var(--accent-green)"
                  : pct >= 50
                    ? "var(--accent-amber)"
                    : "var(--accent-red)",
            }}
          />
        </div>
      </div>

      {/* Action Directive */}
      <div className="px-4 py-4">
        <p className="text-[10px] font-mono text-zinc-600 tracking-widest mb-2">
          RECOMMENDED ACTION
        </p>
        <div className="p-3 bg-zinc-900 border border-zinc-700">
          <p className="text-sm text-zinc-200 leading-relaxed font-medium">
            {data.action}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Event Log ── */
function EventLog({ entries }) {
  return (
    <div className="mt-auto border-t border-zinc-800">
      <div className="px-4 py-2 border-b border-zinc-800">
        <span className="text-[10px] font-mono text-zinc-600 tracking-widest">
          EVENT LOG
        </span>
      </div>
      <div className="px-4 py-2 max-h-32 overflow-y-auto">
        {entries.map((e, i) => (
          <div key={i} className="flex gap-2 py-0.5 text-[11px] font-mono">
            <span className="text-zinc-600 shrink-0">{e.time}</span>
            <span className="text-zinc-400">{e.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */
export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("local");
  const [log, setLog] = useState([...MOCK_LOG]);

  const timestamp = () =>
    new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const addLog = useCallback(
    (msg) => setLog((prev) => [...prev, { time: timestamp(), msg }]),
    []
  );

  const runAnalysis = useCallback(
    (source) => {
      setIsLoading(true);
      setResult(null);
      addLog(`${source} analysis initiated`);

      // Simulate AI processing delay
      setTimeout(() => {
        setResult(MOCK_RESULT);
        setIsLoading(false);
        addLog("Incident classified: POSSIBLE_SURVIVOR");
        addLog("Confidence: 84% — action recommended");
      }, 2200);
    },
    [addLog]
  );

  const handleUpload = useCallback(
    (url) => {
      setImageUrl(url);
      setMode("local");
      runAnalysis("Image upload");
    },
    [runAnalysis]
  );

  const handleMock = useCallback(() => {
    setImageUrl(null);
    setMode("mock");
    runAnalysis("Mock mode");
  }, [runAnalysis]);

  const missionStatus = result
    ? "ACTIVE"
    : isLoading
      ? "ANALYZING"
      : "STANDBY";

  return (
    <div className="flex flex-col h-full">
      <StatusBar mode={mode} status={missionStatus} />

      <main className="flex flex-col lg:flex-row flex-1 min-h-0">
        <DroneFeed
          imageUrl={imageUrl}
          onUpload={handleUpload}
          onMockTrigger={handleMock}
          isLoading={isLoading}
        />
        <IntelligenceHub result={result} isLoading={isLoading} log={log} />
      </main>
    </div>
  );
}
