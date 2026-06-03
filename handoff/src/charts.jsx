/* Charts & animated visualizations — reusable across pages */

// ============ Animated counter ============
function AnimatedCounter({ to, duration = 1400, prefix = "", suffix = "", decimals = 0, className = "" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span className={cls("tabular", className)}>{prefix}{decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()}{suffix}</span>;
}

// ============ Animated area chart with live tail ============
function AreaChart({ pts, color = "var(--acid)", h = 80, w = 200, fillOpacity = 0.18, animated = true, showDot = true, strokeW = 1.6 }) {
  const max = Math.max(...pts), min = Math.min(...pts);
  const range = max - min || 1;
  const stepX = w / (pts.length - 1);
  let d = "";
  pts.forEach((p, i) => {
    const x = i * stepX;
    const y = h - ((p - min) / range) * h;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const lastX = (pts.length - 1) * stepX;
  const lastY = h - ((pts[pts.length - 1] - min) / range) * h;
  const id = useMemo(() => "ac" + Math.random().toString(36).slice(2, 8), []);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: "block", overflow: "visible" }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={fillOpacity * 2}/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${id})`}/>
      <path d={d} stroke={color} strokeWidth={strokeW} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {showDot && (
        <>
          <circle cx={lastX} cy={lastY} r="3" fill={color}/>
          <circle cx={lastX} cy={lastY} r="6" fill={color} opacity="0.3">
            {animated && <animate attributeName="r" values="3;9;3" dur="2s" repeatCount="indefinite"/>}
            {animated && <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>}
          </circle>
        </>
      )}
    </svg>
  );
}

// ============ Bar chart ============
function BarChart({ data, color = "var(--acid)", h = 60, gap = 2 }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", gap, alignItems: "end", height: h }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, background: color, opacity: 0.35 + (v / max) * 0.6, borderRadius: 1, transition: "height 600ms ease" }}/>
      ))}
    </div>
  );
}

// ============ Radial gauge ============
function RadialGauge({ value, max = 100, label, color = "var(--acid)", size = 110, sub }) {
  const pct = Math.min(1, value / max);
  const radius = size / 2 - 6;
  const circumference = 2 * Math.PI * radius;
  return (
    <div style={{ position: "relative", width: size, height: size, display: "grid", placeItems: "center" }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1200ms cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div style={{ textAlign: "center" }}>
        <div className="mono tabular" style={{ fontFamily: "var(--display)", fontSize: size * 0.26, fontWeight: 300 }}>{value}{max === 100 ? "%" : ""}</div>
        {sub && <div className="kicker" style={{ marginTop: 4, fontSize: 9 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ============ Live ticker — auto-scrolling numbers ============
function LiveTicker({ initial, fmt = (v) => v.toFixed(0), drift = 0.5, interval = 1400 }) {
  const [v, setV] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => {
      setV(prev => prev + (Math.random() - 0.5) * drift * 2);
    }, interval);
    return () => clearInterval(id);
  }, []);
  return <span className="mono tabular">{fmt(v)}</span>;
}

// ============ Depth chart (LP depth visualization) ============
function DepthChart({ h = 100 }) {
  const W = 300;
  const bins = 32;
  const data = useMemo(() => {
    const arr = [];
    for (let i = 0; i < bins; i++) {
      const dist = Math.abs(i - bins / 2);
      const v = (1 - dist / (bins / 2)) * (0.8 + Math.random() * 0.4);
      arr.push(Math.max(0.1, v));
    }
    return arr;
  }, []);
  const bw = W / bins;
  return (
    <svg viewBox={`0 0 ${W} ${h}`} width="100%" height={h}>
      <defs>
        <linearGradient id="dpL" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--acid)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="var(--acid)" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="dpR" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--crimson)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="var(--crimson)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {data.map((v, i) => {
        const isLeft = i < bins / 2;
        return <rect key={i} x={i * bw + 0.5} y={h - v * h} width={bw - 1} height={v * h}
          fill={isLeft ? "url(#dpL)" : "url(#dpR)"} stroke={isLeft ? "var(--acid)" : "var(--crimson)"} strokeOpacity="0.5" strokeWidth="0.5"/>;
      })}
      <line x1={W/2} x2={W/2} y1="0" y2={h} stroke="rgba(255,255,255,0.2)" strokeDasharray="2 3"/>
    </svg>
  );
}

// ============ Network flow diagram (ribbons connecting nodes) ============
function NetworkFlow({ h = 240 }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const loop = (now) => { setT(now / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const W = 600;
  const nodes = [
    { x: 40, y: h/2, l: "ETH" },
    { x: 160, y: 60, l: "Base" },
    { x: 160, y: h - 60, l: "Arb" },
    { x: 300, y: h/2, l: "POOL" },
    { x: 440, y: 60, l: "Hook" },
    { x: 440, y: h - 60, l: "LP" },
    { x: 560, y: h/2, l: "OUT" },
  ];
  const edges = [
    [0,1], [0,2], [1,3], [2,3], [3,4], [3,5], [4,6], [5,6]
  ];
  return (
    <svg viewBox={`0 0 ${W} ${h}`} width="100%" height={h}>
      {edges.map(([a, b], i) => {
        const A = nodes[a], B = nodes[b];
        const dash = 20;
        return (
          <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
            stroke="var(--acid)" strokeWidth="1" strokeOpacity="0.35"
            strokeDasharray={`${dash} ${dash}`}
            strokeDashoffset={-((t * 30 + i * 8) % (dash * 2))}/>
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="20" fill="#0a0b0e" stroke="var(--acid)" strokeWidth="1" strokeOpacity={i === 3 ? 1 : 0.5}/>
          {i === 3 && (
            <circle cx={n.x} cy={n.y} r="28" fill="none" stroke="var(--acid)" strokeOpacity="0.4">
              <animate attributeName="r" values="20;32;20" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite"/>
            </circle>
          )}
          <text x={n.x} y={n.y + 3.5} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-2)">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}

// ============ Donut / pie ============
function Donut({ segments, size = 120, thick = 14 }) {
  const total = segments.reduce((s, x) => s + x.v, 0);
  const r = size / 2 - thick / 2;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={thick}/>
      {segments.map((s, i) => {
        const len = (s.v / total) * C;
        const off = acc;
        acc += len;
        return (
          <circle key={i} cx={size/2} cy={size/2} r={r} fill="none" stroke={s.c} strokeWidth={thick}
            strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off}/>
        );
      })}
    </svg>
  );
}

// ============ Marquee number reel (ticking up) ============
function NumberReel({ value, fmt = (v) => v.toLocaleString() }) {
  const [v, setV] = useState(value);
  useEffect(() => { setV(value); }, [value]);
  return <span className="mono tabular" style={{ transition: "all 600ms ease" }}>{fmt(v)}</span>;
}

// ============ Hex heatmap ============
function HexHeatmap({ rows = 5, cols = 12, getValue }) {
  const items = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = getValue ? getValue(r, c) : rand(r * 7 + c * 3);
      const intensity = Math.abs(v);
      const positive = v >= 0;
      items.push({ r, c, intensity, positive });
    }
  }
  const HEX_W = 32, HEX_H = 36;
  return (
    <svg viewBox={`0 0 ${cols * HEX_W + 16} ${rows * (HEX_H - 8) + HEX_H}`} width="100%">
      {items.map(({ r, c, intensity, positive }, i) => {
        const x = c * HEX_W + (r % 2 ? HEX_W / 2 : 0) + 4;
        const y = r * (HEX_H - 8) + 4;
        const color = positive ? "var(--acid)" : "var(--crimson)";
        return (
          <g key={i}>
            <polygon
              points={`${x + HEX_W/2} ${y} ${x + HEX_W - 2} ${y + HEX_H/4} ${x + HEX_W - 2} ${y + 3*HEX_H/4} ${x + HEX_W/2} ${y + HEX_H} ${x + 2} ${y + 3*HEX_H/4} ${x + 2} ${y + HEX_H/4}`}
              fill={color}
              fillOpacity={0.06 + intensity * 0.7}
              stroke={color}
              strokeOpacity={0.2 + intensity * 0.5}
              strokeWidth="0.6"
            />
          </g>
        );
      })}
    </svg>
  );
}

// ============ Live event scroller ============
function EventScroller({ items, intervalMs = 1800 }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ height: 24, overflow: "hidden", position: "relative" }}>
      <div style={{ transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)", transform: `translateY(-${idx * 24}px)` }}>
        {items.concat(items[0]).map((it, i) => (
          <div key={i} style={{ height: 24, display: "flex", alignItems: "center", gap: 8 }}>
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ Volume Profile (vertical bars showing price levels) ============
function VolumeProfile({ levels, h = 160 }) {
  const max = Math.max(...levels);
  return (
    <svg viewBox={`0 0 100 ${h}`} width="100%" height={h} preserveAspectRatio="none">
      {levels.map((v, i) => {
        const y = (i / levels.length) * h;
        const bh = h / levels.length - 1;
        const w = (v / max) * 100;
        return <rect key={i} x="0" y={y} width={w} height={bh} fill="var(--acid)" fillOpacity={0.18 + (v / max) * 0.5}/>;
      })}
    </svg>
  );
}

Object.assign(window, { AnimatedCounter, AreaChart, BarChart, RadialGauge, LiveTicker, DepthChart, NetworkFlow, Donut, NumberReel, HexHeatmap, EventScroller, VolumeProfile });
