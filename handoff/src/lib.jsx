/* Shared utilities, icons, and mock data for FORGE */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ---------- Inline icons (lucide-style strokes) ----------
const Icon = ({ name, size = 16, stroke = 1.6, ...rest }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", ...rest };
  const paths = {
    arrow_right: <path d="M5 12h14M13 5l7 7-7 7" />,
    arrow_up_right: <path d="M7 17 17 7M8 7h9v9" />,
    arrow_down: <path d="M12 5v14M5 12l7 7 7-7" />,
    arrow_up: <path d="M12 19V5M5 12l7-7 7 7" />,
    arrow_left: <path d="M19 12H5M11 5l-7 7 7 7" />,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="m5 12 5 5L20 7" />,
    x: <path d="M18 6 6 18M6 6l12 12" />,
    flame: <path d="M12 22c4 0 7-2.5 7-6.5 0-3-2-5-3-7-1 2-3 3-5 3 0-3 2-5 2-8C8 6 5 10 5 15c0 4 3 7 7 7Z" />,
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
    sparkles: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></>,
    shield: <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />,
    swords: <><path d="m14.5 17.5 4-4M3 21l2.5-2.5M3 21l4.5 1L21 8.5l-2-2L5 20l-2 1Z"/><path d="m21 21-2.5-2.5M21 21l-1-4.5L8.5 3l-2 2L19 18l1.5-1.5"/></>,
    chart: <><path d="M3 21h18"/><path d="M7 17v-6M12 17V8M17 17v-4"/></>,
    sliders: <><circle cx="6" cy="8" r="2"/><circle cx="14" cy="16" r="2"/><path d="M6 2v4M6 10v12M14 2v12M14 18v4"/></>,
    grid: <><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></>,
    rocket: <path d="M4.5 16.5c-1.5 1-2 5-2 5s4-.5 5-2c.6-.8.5-2-.2-2.7-.7-.7-2-.8-2.8-.3ZM12 15l-3-3a22 22 0 0 1 4-7c1.4-2 4-2 5-2s1 3.6-1 5a22 22 0 0 1-7 4l-3-3"/>,
    cpu: <><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></>,
    users: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M14 20c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5"/></>,
    star: <path d="m12 3 2.6 5.4 5.9.5-4.5 4 1.4 5.8L12 16l-5.4 2.7L8 13l-4.5-4 5.9-.5L12 3Z" />,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    play: <path d="M6 4v16l14-8L6 4Z" />,
    pause: <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    filter: <path d="M3 5h18l-7 9v6l-4-2v-4L3 5Z" />,
    download: <path d="M12 3v12M5 11l7 7 7-7M5 21h14" />,
    upload: <path d="M12 21V7M5 13l7-7 7 7M5 3h14" />,
    wallet: <><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M16 13h2M3 10h18M7 6V4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .4 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.4 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .4-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.4-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.4H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.4 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></>,
    heart: <path d="M12 21s-7-4.5-9.5-9C.5 8.5 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4.5 4.5 8-2.5 4.5-9.5 9-9.5 9Z" />,
    message: <path d="M21 12c0 4-4 7-9 7-1.5 0-3-.2-4-.6L3 20l1.6-3.5C3.6 15.3 3 13.7 3 12c0-4 4-7 9-7s9 3 9 7Z" />,
    share: <><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M16 6l-4-4-4 4M12 2v14"/></>,
    trophy: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M17 4h3v3a3 3 0 0 1-3 3M7 4H4v3a3 3 0 0 0 3 3"/></>,
    crown: <path d="M3 18h18M3 7l5 4 4-7 4 7 5-4-2 11H5L3 7Z" />,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></>,
    radio: <><circle cx="12" cy="12" r="2"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13"/></>,
    book: <path d="M4 4v16a2 2 0 0 1 2-2h14V2H6a2 2 0 0 0-2 2Z" />,
    code: <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />,
    droplet: <path d="M12 2s7 8 7 13a7 7 0 1 1-14 0c0-5 7-13 7-13Z" />,
    pin: <path d="M12 22s7-8 7-13a7 7 0 1 0-14 0c0 5 7 13 7 13Z" />,
    bell: <path d="M18 16V11a6 6 0 0 0-12 0v5l-2 3h16l-2-3ZM10 21a2 2 0 0 0 4 0" />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    chevron_down: <path d="m6 9 6 6 6-6" />,
    chevron_right: <path d="m9 6 6 6-6 6" />,
    diamond: <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />,
    layers: <><path d="m12 2 10 6-10 6L2 8l10-6Z"/><path d="m2 14 10 6 10-6M2 11l10 6 10-6"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/></>,
    twitter: <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1A4 4 0 0 0 12 9c0 .3 0 .6.1.9A11.4 11.4 0 0 1 3 4.4a4 4 0 0 0 1.2 5.4 4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8 8 8 0 0 1-5.9 1.7A11.4 11.4 0 0 0 8.3 20c7.5 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2.1-2.1Z"/>,
    discord: <path d="M19 5a17 17 0 0 0-4-1l-.2.4a14 14 0 0 0-5.6 0L9 4a17 17 0 0 0-4 1c-3 4-3.5 8-3 13a17 17 0 0 0 5 2.5l1-1.5a11 11 0 0 1-2-1l.5-.4a12 12 0 0 0 11 0l.5.4a11 11 0 0 1-2 1l1 1.5A17 17 0 0 0 22 18c.5-5 0-9-3-13ZM9 15a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/>,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
};

// ---------- Helpers ----------
const cls = (...xs) => xs.filter(Boolean).join(" ");
const fmt$ = (n) => {
  if (n >= 1e9) return "$" + (n/1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n/1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + (n/1e3).toFixed(1) + "K";
  return "$" + n.toFixed(2);
};
const fmtN = (n) => {
  if (n >= 1e9) return (n/1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n/1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n/1e3).toFixed(1) + "K";
  return n.toLocaleString();
};
const shortAddr = (a) => a.slice(0, 6) + "…" + a.slice(-4);
const rand = (seed) => { let x = Math.sin(seed) * 10000; return x - Math.floor(x); };

// Sparkline generator
function generateSpark(n = 40, seed = 1, bias = 0.5) {
  const pts = [];
  let v = 50;
  for (let i = 0; i < n; i++) {
    v += (rand(seed * 7.1 + i * 1.3) - bias) * 12;
    v = Math.max(8, Math.min(92, v));
    pts.push(v);
  }
  return pts;
}

const Spark = ({ pts, color = "var(--blue)", w = 120, h = 36, area = true, strokeW = 1.5 }) => {
  const max = Math.max(...pts), min = Math.min(...pts);
  const range = max - min || 1;
  const stepX = w / (pts.length - 1);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i * stepX).toFixed(2)},${(h - ((p - min) / range) * h).toFixed(2)}`).join(" ");
  const areaPath = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      {area && <path d={areaPath} fill={color} className="spark-area"/>}
      <path d={path} stroke={color} className="spark" strokeWidth={strokeW}/>
    </svg>
  );
};

// Token bubble color — restrained palette led by acid green
function tokenColor(sym) {
  const colors = [
    ["oklch(0.88 0.21 142)", "oklch(0.72 0.18 142)"],  // acid green (primary)
    ["oklch(0.92 0.06 142)", "oklch(0.78 0.04 142)"],  // muted green
    ["oklch(0.82 0.13 220)", "oklch(0.65 0.15 230)"],  // ice
    ["oklch(0.85 0.16 85)", "oklch(0.7 0.18 60)"],     // gold
    ["oklch(0.78 0.04 270)", "oklch(0.6 0.04 270)"],   // silver
    ["oklch(0.7 0.22 305)", "oklch(0.55 0.22 305)"],   // plasma
    ["oklch(0.7 0.23 25)", "oklch(0.55 0.22 10)"],     // crimson
    ["oklch(0.92 0 0)", "oklch(0.7 0 0)"],             // mono
  ];
  let h = 0;
  for (let i = 0; i < sym.length; i++) h = (h * 31 + sym.charCodeAt(i)) >>> 0;
  return colors[h % colors.length];
}
const TokenBubble = ({ sym, size = 38 }) => {
  const [a, b] = tokenColor(sym);
  return (
    <div className="tk-bubble" style={{ width: size, height: size, background: `linear-gradient(135deg, ${a}, ${b})`, fontSize: size * 0.36 }}>
      {sym.slice(0, 2).toUpperCase()}
    </div>
  );
};

// Hex icon container — signature shape for hooks
const HexIcon = ({ children, size = 44, color = "var(--acid)", filled = false }) => (
  <div style={{ width: size, height: size, position: "relative", display: "grid", placeItems: "center", flexShrink: 0 }}>
    <svg width={size} height={size} viewBox="0 0 44 44" style={{ position: "absolute", inset: 0 }}>
      <path d="M22 2 L40 12 L40 32 L22 42 L4 32 L4 12 Z"
        stroke={color} strokeWidth="1.2"
        fill={filled ? `${color === "var(--acid)" ? "var(--acid-bg)" : "rgba(255,255,255,0.04)"}` : "rgba(255,255,255,0.02)"}/>
    </svg>
    <div style={{ position: "relative", color }}>{children}</div>
  </div>
);

// ---------- Mock data ----------
const TOKENS = [
  { sym: "VAULT", name: "Vault Protocol", price: 0.4218, ch: 142.3, mc: 8420000, vol: 2140000, holders: 4218, hook: "Anti-Snipe", chain: "Base" },
  { sym: "NEON", name: "Neon Pulse", price: 0.0084, ch: 38.1, mc: 1240000, vol: 412000, holders: 2104, hook: "Burn-on-Sell", chain: "Base" },
  { sym: "ORACLE", name: "Oracle Drift", price: 1.2841, ch: -6.4, mc: 12800000, vol: 5240000, holders: 8401, hook: "Volatility Tax", chain: "Arb" },
  { sym: "GHOST", name: "Ghost Liquidity", price: 0.0218, ch: 412.0, mc: 21800000, vol: 8420000, holders: 12480, hook: "Reflexive Fee", chain: "Base" },
  { sym: "SHARD", name: "Shard Network", price: 4.218, ch: 24.8, mc: 42100000, vol: 12400000, holders: 18420, hook: "LP Bonded", chain: "Eth" },
  { sym: "PRISM", name: "Prism Finance", price: 0.821, ch: 84.2, mc: 8200000, vol: 1840000, holders: 3210, hook: "Dynamic Fee", chain: "BNB" },
  { sym: "VOID", name: "Void Engine", price: 0.0042, ch: -18.2, mc: 421000, vol: 84200, holders: 821, hook: "Cooldown", chain: "Polygon" },
  { sym: "FLUX", name: "Flux Markets", price: 12.84, ch: 6.8, mc: 128400000, vol: 21800000, holders: 24800, hook: "MEV Shield", chain: "Eth" },
  { sym: "RUNE", name: "Rune Stakehouse", price: 0.142, ch: 218.0, mc: 4200000, vol: 824000, holders: 1480, hook: "Stake-to-Trade", chain: "Base" },
];

const HOOKS = [
  { id: "h1", name: "MEV Shield v2", cat: "Protection", tag: "blue", icon: "shield", desc: "Sandwich-attack protection with order-flow auction routing. Routes through private mempools.", installs: 12480, rating: 4.9, revenue: 218400, author: "ChainGuard Labs", verified: true, premium: true, gas: "+8% gas", featured: true },
  { id: "h2", name: "Reflexive Burn", cat: "Reward", tag: "crimson", icon: "flame", desc: "Burns 0.5-3% of every sell during downtrends, scaling with sell pressure. Creates deflationary momentum.", installs: 8420, rating: 4.7, revenue: 142000, author: "0xPyro", verified: true, premium: false },
  { id: "h3", name: "Liquidity Vortex", cat: "Liquidity", tag: "blue", icon: "droplet", desc: "Concentrates LP at the current tick during volatility, widens during calm. Maximizes fee capture.", installs: 21400, rating: 4.8, revenue: 821000, author: "TickWorks", verified: true, premium: true },
  { id: "h4", name: "Sniper Cage", cat: "Protection", tag: "green", icon: "target", desc: "Blocks bot snipes for first 3 blocks. Whitelist + dynamic-tax escalation. Battle-tested.", installs: 14200, rating: 4.9, revenue: 184000, author: "Sentinel", verified: true, premium: false },
  { id: "h5", name: "PvP Wager", cat: "PvP", tag: "plasma", icon: "swords", desc: "Holders wager on price direction. Losers' stakes paid to winners. Built-in clan system.", installs: 5800, rating: 4.6, revenue: 412000, author: "Arena Studios", verified: true, premium: true, featured: true },
  { id: "h6", name: "AI Volatility Tax", cat: "AI", tag: "plasma", icon: "cpu", desc: "ML model adjusts tax 0.3-12% in real-time based on order-book signals. Self-tuning.", installs: 3210, rating: 4.5, revenue: 218000, author: "Synth Labs", verified: true, premium: true },
  { id: "h7", name: "Social Reflection", cat: "Social", tag: "gold", icon: "users", desc: "Rewards holders proportional to social engagement. Twitter/Farcaster oracle integrated.", installs: 6800, rating: 4.4, revenue: 84200, author: "Mirror DAO", verified: false, premium: false },
  { id: "h8", name: "Bonding Drift", cat: "Trading", tag: "gold", icon: "chart", desc: "Custom bonding curve that drifts toward target FDV. Smooth price discovery.", installs: 9420, rating: 4.7, revenue: 142000, author: "CurveWorks", verified: true, premium: false },
  { id: "h9", name: "Burn Weekend", cat: "Event", tag: "crimson", icon: "flame", desc: "Doubles burn rate every Fri-Sun. Creates predictable buy pressure cycles.", installs: 4200, rating: 4.3, revenue: 41200, author: "Cycle Co", verified: false, premium: false },
  { id: "h10", name: "Whale Cooldown", cat: "Protection", tag: "blue", icon: "pause", desc: "Forces 15-min cooldowns between large trades. Configurable thresholds.", installs: 7200, rating: 4.6, revenue: 64000, author: "Sentinel", verified: true, premium: false },
  { id: "h11", name: "Loyalty Multiplier", cat: "Reward", tag: "gold", icon: "star", desc: "Long-term holders get fee rebates. Time-weighted, transferable on-chain.", installs: 11200, rating: 4.8, revenue: 218000, author: "TickWorks", verified: true, premium: true },
  { id: "h12", name: "Raid Catalyst", cat: "Social", tag: "plasma", icon: "radio", desc: "Coordinates community buy raids with on-chain proof. Caps slippage damage.", installs: 4800, rating: 4.5, revenue: 38000, author: "RaidOps", verified: false, premium: false },
];

const ACTIVITIES = [
  { who: "0x4f...c3a1", action: "bought", sym: "VAULT", amt: 12400, time: "2s" },
  { who: "0x21...88e2", action: "deployed", sym: "NEON", amt: null, time: "8s" },
  { who: "0x99...01ab", action: "sold", sym: "GHOST", amt: 8400, time: "14s" },
  { who: "0xa1...4c7d", action: "installed hook", sym: "MEV Shield", amt: null, time: "22s" },
  { who: "0x33...ff10", action: "bought", sym: "FLUX", amt: 42000, time: "31s" },
  { who: "0x88...e102", action: "joined raid on", sym: "RUNE", amt: null, time: "44s" },
  { who: "0x21...88e2", action: "won battle vs", sym: "VOID", amt: 8200, time: "1m" },
];

const CHAINS = [
  { name: "Base", c: "oklch(0.78 0.16 230)" },
  { name: "Ethereum", c: "oklch(0.78 0.04 270)" },
  { name: "Arbitrum", c: "oklch(0.78 0.13 220)" },
  { name: "BNB", c: "oklch(0.88 0.15 88)" },
  { name: "Polygon", c: "oklch(0.7 0.22 305)" },
  { name: "Blast", c: "oklch(0.88 0.21 142)" },
];

// expose globally
Object.assign(window, { Icon, cls, fmt$, fmtN, shortAddr, rand, generateSpark, Spark, tokenColor, TokenBubble, HexIcon, TOKENS, HOOKS, ACTIVITIES, CHAINS, useState, useEffect, useRef, useMemo, useCallback });
