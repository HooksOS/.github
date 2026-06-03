/* Token Detail page — deep view of a single token */

function TradingViewChart() {
  const candles = useMemo(() => {
    const arr = [];
    let p = 4.2;
    for (let i = 0; i < 80; i++) {
      const o = p;
      const ch = (Math.random() - 0.48) * 0.18;
      const c = Math.max(2, o + ch);
      const h = Math.max(o, c) + Math.random() * 0.08;
      const l = Math.min(o, c) - Math.random() * 0.08;
      const vol = 40 + Math.random() * 160;
      arr.push({ o, h, l, c, vol });
      p = c;
    }
    return arr;
  }, []);
  const W = 900, H = 380, VH = 70;
  const max = Math.max(...candles.map(c => c.h));
  const min = Math.min(...candles.map(c => c.l));
  const range = max - min;
  const cw = W / candles.length;
  const maxVol = Math.max(...candles.map(c => c.vol));

  return (
    <svg viewBox={`0 0 ${W} ${H + VH + 24}`} width="100%" style={{ display: "block" }}>
      {/* horizontal grid */}
      {[0.2, 0.4, 0.6, 0.8].map(g => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4"/>)}
      {/* Y-axis price labels */}
      {[0.1, 0.3, 0.5, 0.7, 0.9].map((g, i) => {
        const v = max - range * g;
        return <text key={i} x={W - 6} y={H * g - 3} fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.35)" textAnchor="end">{v.toFixed(2)}</text>;
      })}

      {/* candles */}
      {candles.map((c, i) => {
        const x = i * cw + cw / 2;
        const yO = H - ((c.o - min) / range) * H;
        const yC = H - ((c.c - min) / range) * H;
        const yH = H - ((c.h - min) / range) * H;
        const yL = H - ((c.l - min) / range) * H;
        const up = c.c >= c.o;
        const col = up ? "var(--acid)" : "var(--crimson)";
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={yH} y2={yL} stroke={col} strokeWidth="1" strokeOpacity="0.8"/>
            <rect x={i * cw + 1.5} y={Math.min(yO, yC)} width={cw - 3} height={Math.max(1.5, Math.abs(yO - yC))} fill={col} fillOpacity={up ? 0.85 : 0.7}/>
          </g>
        );
      })}

      {/* current price line */}
      {(() => {
        const last = candles[candles.length - 1].c;
        const y = H - ((last - min) / range) * H;
        return (
          <g>
            <line x1="0" x2={W - 50} y1={y} y2={y} stroke="var(--acid)" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.7"/>
            <rect x={W - 50} y={y - 8} width="50" height="16" fill="var(--acid)"/>
            <text x={W - 25} y={y + 4} fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" fill="#001b07" textAnchor="middle">{last.toFixed(2)}</text>
          </g>
        );
      })()}

      {/* divider */}
      <line x1="0" x2={W} y1={H + 12} y2={H + 12} stroke="var(--line)"/>

      {/* volume bars below */}
      {candles.map((c, i) => {
        const up = c.c >= c.o;
        const vh = (c.vol / maxVol) * VH;
        return <rect key={i} x={i * cw + 1.5} y={H + 24 + (VH - vh)} width={cw - 3} height={vh} fill={up ? "var(--acid)" : "var(--crimson)"} fillOpacity="0.45"/>;
      })}
      <text x="6" y={H + 22} fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-3)" letterSpacing="0.1em">VOL</text>
    </svg>
  );
}

function TradeWidget({ token }) {
  const [side, setSide] = useState("buy");
  const [amt, setAmt] = useState("0.5");
  const tokOut = (parseFloat(amt) || 0) / token.price;

  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ display: "flex", gap: 4, padding: 3, background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)", borderRadius: 8, marginBottom: 18 }}>
        {["buy", "sell"].map(s => (
          <button key={s} onClick={() => setSide(s)} style={{
            flex: 1, padding: "9px 12px", borderRadius: 6,
            background: side === s ? (s === "buy" ? "var(--acid-bg)" : "var(--crimson-bg)") : "transparent",
            color: side === s ? (s === "buy" ? "oklch(0.95 0.16 142)" : "oklch(0.88 0.14 25)") : "var(--ink-3)",
            fontSize: 13, fontWeight: 500, textTransform: "capitalize",
            border: side === s ? `1px solid ${s === "buy" ? "var(--acid-line)" : "oklch(0.7 0.23 25 / 0.36)"}` : "1px solid transparent",
            transition: "all 120ms",
          }}>{s}</button>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        <div className="kicker" style={{ marginBottom: 8 }}>You pay</div>
        <div style={{ padding: 14, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10, display: "flex", alignItems: "center", gap: 10 }}>
          <input value={amt} onChange={e => setAmt(e.target.value)} style={{ background: "transparent", border: "none", outline: "none", fontSize: 22, fontFamily: "var(--display)", fontWeight: 300, flex: 1, color: "var(--ink)" }}/>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", background: "rgba(255,255,255,0.04)", borderRadius: 6 }}>
            <div style={{ width: 18, height: 18, borderRadius: 50, background: "linear-gradient(135deg, oklch(0.78 0.04 270), oklch(0.6 0.04 270))" }}/>
            <span style={{ fontSize: 13, fontFamily: "var(--mono)" }}>ETH</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>balance 4.218</span>
          <div style={{ display: "flex", gap: 6 }}>
            {["25%", "50%", "MAX"].map(p => (
              <button key={p} style={{ padding: "2px 6px", fontSize: 9.5, fontFamily: "var(--mono)", color: "var(--ink-3)", border: "1px solid var(--line)", borderRadius: 3 }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "-2px 0" }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--bg-2)", border: "1px solid var(--line-2)", display: "grid", placeItems: "center" }}>
          <Icon name="arrow_down" size={12}/>
        </div>
      </div>

      <div style={{ marginBottom: 18, marginTop: -2 }}>
        <div className="kicker" style={{ marginBottom: 8 }}>You receive</div>
        <div style={{ padding: 14, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, fontFamily: "var(--display)", fontWeight: 300, flex: 1, color: "var(--ink)" }} className="tabular">{tokOut.toFixed(4)}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", background: "rgba(255,255,255,0.04)", borderRadius: 6 }}>
            <TokenBubble sym={token.sym} size={18}/>
            <span style={{ fontSize: 13, fontFamily: "var(--mono)" }}>{token.sym}</span>
          </div>
        </div>
      </div>

      {/* gas + slippage breakdown */}
      <div style={{ padding: 12, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", borderRadius: 8, marginBottom: 14, display: "flex", flexDirection: "column", gap: 8, fontSize: 11.5, fontFamily: "var(--mono)" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--ink-3)" }}>Rate</span><span>1 ETH = {fmtN(1 / token.price)} {token.sym}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--ink-3)" }}>Slippage</span><span>0.5%</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--ink-3)" }}>Hook fee</span><span style={{ color: "var(--acid)" }}>+0.42%</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--ink-3)" }}>Gas est.</span><span>$1.24</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 6, borderTop: "1px solid var(--line)" }}><span style={{ color: "var(--ink-3)" }}>Min received</span><span style={{ color: "var(--ink)" }}>{(tokOut * 0.995).toFixed(2)} {token.sym}</span></div>
      </div>

      <button className="btn btn-primary" style={{ width: "100%", padding: 14, justifyContent: "center", fontSize: 14, background: side === "buy" ? "var(--acid)" : "var(--crimson)", color: side === "buy" ? "#001b07" : "#fff" }}>
        {side === "buy" ? `Buy ${token.sym}` : `Sell ${token.sym}`} <Icon name="arrow_right" size={14}/>
      </button>
    </div>
  );
}

function TokenDetail({ symbol = "VAULT", setView }) {
  const token = TOKENS.find(t => t.sym === symbol) || TOKENS[0];
  const positive = token.ch >= 0;
  const [price, setPrice] = useState(token.price);

  // live price ticker
  useEffect(() => {
    const id = setInterval(() => {
      setPrice(p => Math.max(0.0001, p + (Math.random() - 0.49) * p * 0.004));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const tradeFeed = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    side: Math.random() > 0.5 ? "buy" : "sell",
    eth: +(Math.random() * 4).toFixed(3),
    tok: +(Math.random() * 18000).toFixed(0),
    by: ["0x4f…c3a1", "ghostking", "0xa1…4c7d", "vault_chad", "satoshi.eth"][i % 5],
    ago: `${i * 8 + 2}s`,
  })), []);

  const holders = [
    { addr: "0x21…88e2", pct: 5.42, qty: 54200000, tag: "Creator" },
    { addr: "0x4f…c3a1", pct: 3.18, qty: 31800000, tag: null },
    { addr: "0xa1…4c7d", pct: 2.84, qty: 28400000, tag: "Whale" },
    { addr: "0x88…e102", pct: 2.12, qty: 21200000, tag: null },
    { addr: "0x99…01ab", pct: 1.84, qty: 18400000, tag: "Hook contract" },
    { addr: "ghostking.eth", pct: 1.42, qty: 14200000, tag: null },
    { addr: "0x33…ff10", pct: 1.18, qty: 11800000, tag: null },
  ];

  const activeHooks = ["h4", "h2", "h1"].map(id => HOOKS.find(h => h.id === id)).filter(Boolean);

  return (
    <div className="shell" style={{ paddingTop: 32, paddingBottom: 80 }} data-screen-label="10 Token Detail">
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
        <button onClick={() => setView?.("feed")} style={{ color: "var(--ink-3)" }}>tokens</button>
        <Icon name="chevron_right" size={11}/>
        <span style={{ color: "var(--ink)" }}>${token.sym}</span>
        <span style={{ marginLeft: "auto", display: "flex", gap: 14 }}>
          <span>0x4b…7ec2</span>
          <span>·</span>
          <span>{token.chain}</span>
        </span>
      </div>

      {/* HERO */}
      <div className="card" style={{ padding: 32, marginBottom: 16, position: "relative", overflow: "hidden", background: positive ? "linear-gradient(135deg, var(--acid-bg) 0%, transparent 50%)" : "linear-gradient(135deg, var(--crimson-bg) 0%, transparent 50%)" }}>
        <div style={{ position: "absolute", inset: 0, background: positive ? "radial-gradient(600px 300px at 100% 0%, var(--acid-bg), transparent 70%)" : "radial-gradient(600px 300px at 100% 0%, var(--crimson-bg), transparent 70%)", pointerEvents: "none" }}/>

        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "center", position: "relative" }}>
          <TokenBubble sym={token.sym} size={88}/>
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <span className="chip chip-acid"><Icon name="check" size={9}/> Verified</span>
              <span className="chip chip-ice">{token.chain}</span>
              <span className="chip"><Icon name="shield" size={9}/> 3 hooks</span>
              <span className="chip"><Icon name="users" size={9}/> {fmtN(token.holders)} holders</span>
            </div>
            <h1 className="h-display" style={{ fontSize: 64, marginBottom: 4 }}>
              ${token.sym} <span className="italic" style={{ color: "var(--ink-3)" }}>· {token.name}</span>
            </h1>
            <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", letterSpacing: "0.05em" }}>0x4b7e…c2a8 · deployed 14d ago by 0x21…88e2</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, justifyContent: "flex-end" }}>
              <span className="bignum tabular" style={{ fontSize: 64, color: positive ? "var(--acid)" : "var(--crimson)" }}>
                ${price.toFixed(token.price < 1 ? 4 : 2)}
              </span>
            </div>
            <div className="mono tabular" style={{ fontSize: 16, color: positive ? "var(--acid)" : "var(--crimson)", marginTop: 8 }}>
              {positive ? "▲" : "▼"} {positive ? "+" : ""}{token.ch.toFixed(2)}%
              <span style={{ color: "var(--ink-3)", marginLeft: 8 }}>· 24h</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOP STATS STRIP */}
      <div className="card" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", padding: 0, marginBottom: 16 }}>
        {[
          { l: "Market cap", v: fmt$(token.mc), spark: 0.4 },
          { l: "FDV", v: fmt$(token.mc * 1.4), spark: 0.42 },
          { l: "Vol 24h", v: fmt$(token.vol), spark: 0.45 },
          { l: "TVL", v: fmt$(token.mc * 0.18), spark: 0.4 },
          { l: "Holders", v: fmtN(token.holders), spark: 0.46 },
          { l: "Hook fees · 24h", v: "$84,210", spark: 0.42 },
        ].map((s, i) => {
          const pts = useMemo(() => generateSpark(20, i + 11, s.spark), [i]);
          return (
            <div key={i} style={{ padding: 18, borderLeft: i ? "1px solid var(--line)" : "none", position: "relative" }}>
              <div className="kicker" style={{ marginBottom: 8 }}>{s.l}</div>
              <div className="mono tabular" style={{ fontSize: 19, fontFamily: "var(--display)" }}>{s.v}</div>
              <div style={{ marginTop: 10 }}>
                <AreaChart pts={pts} color={positive ? "var(--acid)" : "var(--crimson)"} h={20} w={100} showDot={false} strokeW={1.1}/>
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN: Chart + Trade widget */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontFamily: "var(--display)", fontSize: 16 }}>${token.sym} / ETH</span>
              <div style={{ display: "flex", gap: 6, padding: 3, background: "rgba(255,255,255,0.04)", border: "1px solid var(--line)", borderRadius: 6 }}>
                {["1m", "5m", "1h", "4h", "1d", "1w"].map((t, i) => (
                  <button key={t} style={{ padding: "4px 9px", fontSize: 11, fontFamily: "var(--mono)", borderRadius: 4, background: i === 2 ? "rgba(255,255,255,0.08)" : "transparent", color: i === 2 ? "var(--ink)" : "var(--ink-3)" }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["Candles", "Line", "Depth"].map((t, i) => (
                <button key={t} className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 11, background: i === 0 ? "rgba(255,255,255,0.06)" : "transparent" }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: 14 }}>
            <TradingViewChart/>
          </div>
        </div>
        <TradeWidget token={{ ...token, price }}/>
      </div>

      {/* MID ROW: trades + holders + hooks */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Live trades */}
        <div className="card">
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
            <span className="kicker"><span className="pulse-dot" style={{ width: 5, height: 5, marginRight: 6 }}/> Live trades</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>last 5 min</span>
          </div>
          {tradeFeed.slice(0, 8).map((t, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 10, alignItems: "center", padding: "9px 20px", borderTop: i ? "1px solid var(--line)" : "none", opacity: 1 - i * 0.06 }}>
              <span style={{ width: 5, height: 5, borderRadius: 50, background: t.side === "buy" ? "var(--acid)" : "var(--crimson)" }}/>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{t.by}</span>
              <span className="mono tabular" style={{ fontSize: 11.5, color: t.side === "buy" ? "var(--acid)" : "var(--crimson)" }}>{t.side === "buy" ? "+" : "-"}{t.eth}Ξ</span>
              <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>{t.ago}</span>
            </div>
          ))}
        </div>

        {/* Holders */}
        <div className="card">
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
            <span className="kicker">Top holders</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>{fmtN(token.holders)} total</span>
          </div>
          {holders.map((h, i) => (
            <div key={i} style={{ padding: "10px 20px", borderTop: i ? "1px solid var(--line)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>0{i + 1}</span>
                  <span className="mono" style={{ fontSize: 12 }}>{h.addr}</span>
                  {h.tag && <span className="chip" style={{ fontSize: 9 }}>{h.tag}</span>}
                </div>
                <span className="mono tabular" style={{ fontSize: 12, color: "var(--ink-2)" }}>{h.pct}%</span>
              </div>
              <div style={{ height: 3, borderRadius: 100, background: "rgba(255,255,255,0.04)" }}>
                <div style={{ width: `${h.pct * 6}%`, height: "100%", background: "var(--acid)", borderRadius: 100, opacity: 0.7 }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Active hooks */}
        <div className="card">
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--line)" }}>
            <span className="kicker">Active hooks · {activeHooks.length}</span>
          </div>
          {activeHooks.map((h, i) => (
            <div key={h.id} style={{ padding: "14px 20px", borderTop: i ? "1px solid var(--line)" : "none", display: "flex", gap: 12, alignItems: "center" }}>
              <HexIcon size={34} color="var(--acid)" filled>
                <Icon name={h.icon} size={13}/>
              </HexIcon>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, marginBottom: 2 }}>{h.name}</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>firing 28×/min · {h.cat}</div>
              </div>
              <span className="pulse-dot" style={{ width: 5, height: 5 }}/>
            </div>
          ))}
          <div style={{ padding: 16, borderTop: "1px solid var(--line)" }}>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", padding: "8px 12px", fontSize: 12 }}>
              <Icon name="plus" size={12}/> Install hook
            </button>
          </div>
        </div>
      </div>

      {/* DISTRIBUTION + ABOUT */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span className="kicker">Holder distribution</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>by wallet size</span>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Donut size={140} segments={[
              { v: 42, c: "var(--acid)" },
              { v: 28, c: "var(--ice)" },
              { v: 18, c: "var(--gold)" },
              { v: 8, c: "var(--plasma)" },
              { v: 4, c: "var(--crimson)" },
            ]}/>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { l: "Retail (< 0.1%)", v: 42, c: "var(--acid)", n: fmtN(token.holders * 0.78) },
                { l: "Small (0.1–0.5%)", v: 28, c: "var(--ice)", n: fmtN(token.holders * 0.16) },
                { l: "Medium (0.5–2%)", v: 18, c: "var(--gold)", n: fmtN(token.holders * 0.04) },
                { l: "Large (2–5%)", v: 8, c: "var(--plasma)", n: fmtN(token.holders * 0.015) },
                { l: "Whale (> 5%)", v: 4, c: "var(--crimson)", n: 2 },
              ].map(s => (
                <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c }}/>
                  <span style={{ flex: 1 }}>{s.l}</span>
                  <span className="mono tabular" style={{ color: "var(--ink-3)" }}>{s.n} wallets</span>
                  <span className="mono tabular" style={{ width: 32, textAlign: "right" }}>{s.v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <div className="kicker" style={{ marginBottom: 14 }}>About ${token.sym}</div>
          <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 20 }}>
            {token.name} is a community-driven token leveraging programmable AMM hooks for sustainable tokenomics. Anti-bot protections active for first 50 blocks; long-term holders earn loyalty multipliers automatically.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
            {[
              ["Total supply", `${fmtN(1e9)}`],
              ["Circulating", `${fmtN(8.4e8)}`],
              ["Decimals", "18"],
              ["Launch date", "Jan 14, 2026"],
              ["Buy tax", "1.0%"],
              ["Sell tax", "3.0%"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="kicker" style={{ marginBottom: 4 }}>{k}</div>
                <div className="mono tabular" style={{ fontSize: 13.5 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" style={{ padding: "7px 12px", fontSize: 12 }}><Icon name="twitter" size={11}/> @vaultprotocol</button>
            <button className="btn btn-outline" style={{ padding: "7px 12px", fontSize: 12 }}><Icon name="globe" size={11}/> vaultprotocol.xyz</button>
            <button className="btn btn-outline" style={{ padding: "7px 12px", fontSize: 12 }}><Icon name="discord" size={11}/> Discord</button>
          </div>
        </div>
      </div>

      {/* RELATED TOKENS */}
      <div className="card">
        <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--line)" }}>
          <span className="kicker">Similar tokens · same hooks</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {TOKENS.filter(t => t.sym !== token.sym).slice(0, 4).map((t, i) => {
            const pts = generateSpark(20, i + 21, t.ch >= 0 ? 0.4 : 0.6);
            return (
              <div key={t.sym} style={{ padding: 20, borderLeft: i ? "1px solid var(--line)" : "none", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <TokenBubble sym={t.sym} size={32}/>
                  <div>
                    <div style={{ fontSize: 13.5 }}>${t.sym}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{t.hook}</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 10 }}>
                  <span className="mono tabular" style={{ fontSize: 15, fontFamily: "var(--display)" }}>${t.price.toFixed(t.price < 1 ? 4 : 2)}</span>
                  <span className="mono tabular" style={{ fontSize: 12, color: t.ch >= 0 ? "var(--acid)" : "var(--crimson)" }}>
                    {t.ch >= 0 ? "+" : ""}{t.ch.toFixed(1)}%
                  </span>
                </div>
                <AreaChart pts={pts} color={t.ch >= 0 ? "var(--acid)" : "var(--crimson)"} h={32} w={140} showDot={false} strokeW={1.2}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

window.TokenDetail = TokenDetail;
