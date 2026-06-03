/* TikTok-style token feed — full-bleed immersive */

function FeedAreaChart({ pts, color, h = 220 }) {
  const w = 600;
  const max = Math.max(...pts), min = Math.min(...pts);
  const range = max - min || 1;
  const stepX = w / (pts.length - 1);
  let d = "";
  pts.forEach((p, i) => {
    const x = i * stepX;
    const y = h - ((p - min) / range) * h;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const id = "fa" + color.replace(/\W/g, "");
  const lastY = h - ((pts[pts.length - 1] - min) / range) * h;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: "block", overflow: "visible" }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${id})`}/>
      <path d={d} stroke={color} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 8px ${color})` }}/>
      {/* live dot */}
      <circle cx={w} cy={lastY} r="5" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }}/>
      <circle cx={w} cy={lastY} r="10" fill={color} opacity="0.3">
        <animate attributeName="r" values="5;14;5" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.4;0;0.4" dur="1.8s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}

function FeedActionButton({ icon, label, count, c = "white" }) {
  return (
    <button style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{
        width: 52, height: 52, borderRadius: 50,
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.12)",
        display: "grid", placeItems: "center",
        color: c,
        transition: "transform 120ms"
      }}>
        <Icon name={icon} size={22}/>
      </div>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontFamily: "var(--mono)", fontWeight: 500 }}>{count || label}</span>
    </button>
  );
}

function FeedCard({ token, idx, active }) {
  const [a, b] = tokenColor(token.sym);
  const positive = token.ch >= 0;
  const chartColor = positive ? "var(--acid)" : "var(--crimson)";
  const pts = useMemo(() => generateSpark(60, token.sym.charCodeAt(0) + idx, positive ? 0.4 : 0.6), [token.sym]);

  const trades = useMemo(() => [
    { who: "0x4f…c3a1", side: "buy", amt: 1240, ago: "2s" },
    { who: "ghostking", side: "buy", amt: 8200, ago: "5s" },
    { who: "0xa1…4c7d", side: "sell", amt: 4100, ago: "8s" },
    { who: "vault_chad", side: "buy", amt: 12480, ago: "12s" },
    { who: "0x99…01ab", side: "buy", amt: 6420, ago: "18s" },
  ], [token.sym]);

  return (
    <div style={{
      height: "100%", width: "100%",
      position: "relative", overflow: "hidden",
      background: `radial-gradient(60% 50% at 35% 30%, ${a}26 0%, transparent 70%), radial-gradient(50% 50% at 90% 80%, ${b}26 0%, transparent 70%), linear-gradient(180deg, #06070a 0%, #0a0c12 100%)`,
    }}>
      {/* subtle grid bg */}
      <div className="viz-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)" }}/>

      {/* progress strip top */}
      <div style={{ position: "absolute", top: 18, left: 24, right: 24, display: "flex", gap: 4, zIndex: 5 }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ flex: 1, height: 2, background: i <= idx ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)", borderRadius: 100 }}/>
        ))}
      </div>

      {/* MAIN CONTENT — vertically centered, max-width */}
      <div style={{ position: "absolute", inset: 0, padding: "60px 90px 120px 70px", display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center", zIndex: 2 }}>

        {/* LEFT: content */}
        <div style={{ maxWidth: 700, minWidth: 0 }}>
          {/* meta header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <TokenBubble sym={token.sym} size={64}/>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: "var(--display)", fontSize: 38, fontWeight: 300, letterSpacing: "-0.02em" }}>${token.sym}</span>
                <span className="chip chip-ice">{token.chain}</span>
                <span className="chip chip-acid"><Icon name="check" size={9}/> Verified</span>
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{token.name} · deployed by 0x21…88e2</div>
            </div>
            <button style={{ marginLeft: 16, padding: "8px 16px", borderRadius: 100, background: "white", color: "#000", fontSize: 13, fontWeight: 600 }}>+ Follow</button>
          </div>

          {/* PRICE + change */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ fontFamily: "var(--display)", fontWeight: 300, fontSize: 96, letterSpacing: "-0.03em", lineHeight: 0.95 }} className="tabular">
                ${token.price.toFixed(token.price < 1 ? 4 : 2)}
              </span>
              <span className="mono tabular" style={{ fontSize: 28, color: positive ? "var(--acid)" : "var(--crimson)", textShadow: positive ? "0 0 16px var(--acid-glow)" : "0 0 14px oklch(0.7 0.23 25 / 0.5)" }}>
                {positive ? "▲" : "▼"} {positive ? "+" : ""}{token.ch.toFixed(2)}%
              </span>
            </div>
            <div style={{ marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "var(--mono)", letterSpacing: "0.06em" }}>
              ${(token.price * 1.04).toFixed(token.price < 1 ? 4 : 2)} HIGH · ${(token.price * 0.92).toFixed(token.price < 1 ? 4 : 2)} LOW · 24H
            </div>
          </div>

          {/* CHART */}
          <div style={{ marginBottom: 32, position: "relative" }}>
            <FeedAreaChart pts={pts} color={chartColor} h={200}/>
            {/* candle scale */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "var(--mono)", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
              {["24H", "18H", "12H", "6H", "NOW"].map(t => <span key={t}>{t}</span>)}
            </div>
          </div>

          {/* STAT TILES */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}>
            {[
              ["MCap", fmt$(token.mc)],
              ["Vol 24h", fmt$(token.vol)],
              ["Holders", fmtN(token.holders)],
              ["Hook fee", "0.42%"],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10 }}>
                <div className="kicker" style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>{k}</div>
                <div className="mono tabular" style={{ fontSize: 15, fontFamily: "var(--display)" }}>{v}</div>
              </div>
            ))}
          </div>

          {/* HOOK BADGE */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, marginBottom: 32 }}>
            <HexIcon size={28} color="var(--acid)" filled>
              <Icon name="shield" size={11}/>
            </HexIcon>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 500 }}>{token.hook} active</div>
              <div className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>firing 28×/min · 3 hooks installed</div>
            </div>
            <span className="pulse-dot" style={{ width: 6, height: 6, marginLeft: 6 }}/>
          </div>

          {/* BUY / SELL action bar */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, alignItems: "stretch" }}>
            <button style={{ padding: "16px", borderRadius: 12, background: "var(--acid)", color: "#001b07", fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 0 32px -8px var(--acid-glow)" }}>
              <Icon name="arrow_up" size={14}/> Buy
            </button>
            <button style={{ padding: "16px", borderRadius: 12, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", color: "white", fontWeight: 600, fontSize: 15, border: "1px solid rgba(255,255,255,0.12)" }}>
              Sell
            </button>
            <button style={{ padding: "16px", borderRadius: 12, background: "var(--plasma-bg)", backdropFilter: "blur(8px)", color: "oklch(0.9 0.12 305)", fontWeight: 600, fontSize: 15, border: "1px solid oklch(0.7 0.22 305 / 0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon name="bolt" size={14}/> Raid
            </button>
          </div>
        </div>

        {/* RIGHT: action rail + live trades */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, alignSelf: "stretch", paddingTop: 40, paddingBottom: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            <FeedActionButton icon="heart" count="12.4K" c="var(--crimson)"/>
            <FeedActionButton icon="message" count="842"/>
            <FeedActionButton icon="share" label="Share"/>
            <FeedActionButton icon="star" count="3.2K" c="var(--gold)"/>
          </div>

          {/* live trades card */}
          <div style={{ marginTop: "auto", padding: 18, width: 260, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span className="kicker" style={{ color: "rgba(255,255,255,0.7)" }}><span className="pulse-dot" style={{ width: 5, height: 5, marginRight: 6 }}/> Live trades</span>
              <span className="mono" style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>5min</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {trades.slice(0, 4).map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: 50, background: t.side === "buy" ? "var(--acid)" : "var(--crimson)", boxShadow: t.side === "buy" ? "0 0 6px var(--acid)" : "0 0 6px var(--crimson)" }}/>
                  <span className="mono" style={{ color: "rgba(255,255,255,0.6)", flex: 1, fontSize: 11 }}>{t.who}</span>
                  <span className="mono tabular" style={{ color: t.side === "buy" ? "var(--acid)" : "var(--crimson)" }}>{t.side === "buy" ? "+" : "-"}{fmt$(t.amt)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CARD INDICATOR / SWIPE HINT bottom */}
      <div style={{ position: "absolute", bottom: 22, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 16, color: "rgba(255,255,255,0.4)", zIndex: 5, pointerEvents: "none" }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.18em" }}>{String(idx + 1).padStart(2,"0")} / {String(TOKENS.length).padStart(2,"0")}</span>
        <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.2)" }}/>
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.18em" }}>↓ SCROLL FOR NEXT</span>
      </div>
    </div>
  );
}

function TokenFeed() {
  const [idx, setIdx] = useState(0);
  const containerRef = useRef(null);
  const feedTokens = TOKENS;

  const next = useCallback(() => setIdx(i => Math.min(i + 1, feedTokens.length - 1)), [feedTokens.length]);
  const prev = useCallback(() => setIdx(i => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lock = false;
    const onWheel = (e) => {
      e.preventDefault();
      if (lock) return;
      lock = true;
      setTimeout(() => lock = false, 600);
      if (e.deltaY > 20) next();
      else if (e.deltaY < -20) prev();
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "j") { e.preventDefault(); next(); }
      if (e.key === "ArrowUp" || e.key === "k") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { el.removeEventListener("wheel", onWheel); window.removeEventListener("keydown", onKey); };
  }, [next, prev]);

  return (
    <div data-screen-label="03 Token Feed" style={{ height: "calc(100vh - 0px)", position: "relative", overflow: "hidden" }}>
      {/* full-bleed feed container */}
      <div ref={containerRef} style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 16, margin: 16, border: "1px solid var(--line)" }}>
        <div style={{ height: "100%", transition: "transform 480ms cubic-bezier(0.22,1,0.36,1)", transform: `translateY(-${idx * 100}%)` }}>
          {feedTokens.map((t, i) => (
            <div key={t.sym} style={{ height: "100%", width: "100%" }}>
              <FeedCard token={t} idx={i} active={i === idx}/>
            </div>
          ))}
        </div>

        {/* Floating left controls — view tabs / algorithm */}
        <div style={{ position: "absolute", top: 24, left: 24, display: "flex", alignItems: "center", gap: 10, zIndex: 10 }}>
          <span className="kicker" style={{ color: "rgba(255,255,255,0.7)" }}>discover</span>
          <div style={{ display: "flex", gap: 2, padding: 3, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}>
            {["For you", "Trending", "New", "Following"].map((t, i) => (
              <button key={t} style={{ padding: "6px 12px", fontSize: 12, borderRadius: 5, background: i === 0 ? "rgba(255,255,255,0.12)" : "transparent", color: i === 0 ? "white" : "rgba(255,255,255,0.6)" }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Floating right vertical nav (idx indicator) */}
        <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 6, zIndex: 10 }}>
          {feedTokens.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: 3, height: i === idx ? 24 : 16,
              background: i === idx ? "white" : "rgba(255,255,255,0.25)",
              borderRadius: 100,
              transition: "all 250ms"
            }}/>
          ))}
        </div>

        {/* Bottom hint */}
        <div style={{ position: "absolute", bottom: 24, left: 24, fontSize: 10.5, color: "rgba(255,255,255,0.4)", fontFamily: "var(--mono)", letterSpacing: "0.16em", zIndex: 10 }}>
          ↑↓ NAVIGATE · SCROLL · J/K
        </div>
      </div>
    </div>
  );
}

window.TokenFeed = TokenFeed;
