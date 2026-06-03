/* Analytics Terminal — Bloomberg-meets-cyberpunk */

function HeatmapCell({ value, sym, ch }) {
  const intensity = Math.min(Math.abs(ch) / 100, 1);
  const positive = ch >= 0;
  const color = positive ? `oklch(0.86 0.21 145 / ${0.15 + intensity * 0.65})` : `oklch(0.7 0.23 25 / ${0.15 + intensity * 0.65})`;
  return (
    <div style={{ padding: 10, background: color, border: "1px solid var(--line)", borderRadius: 6, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 70 }}>
      <div className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{sym}</div>
      <div>
        <div className="mono tabular" style={{ fontSize: 10, opacity: 0.7 }}>{fmt$(value)}</div>
        <div className="mono tabular" style={{ fontSize: 11, fontWeight: 500 }}>{positive ? "+" : ""}{ch.toFixed(1)}%</div>
      </div>
    </div>
  );
}

function VolumeBar({ data, color, label }) {
  const max = Math.max(...data);
  return (
    <div>
      <div className="kicker" style={{ marginBottom: 8 }}>{label}</div>
      <div style={{ display: "flex", gap: 2, alignItems: "end", height: 60 }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, background: color, opacity: 0.4 + (v / max) * 0.6, borderRadius: "2px 2px 0 0" }}/>
        ))}
      </div>
    </div>
  );
}

function CandleChart() {
  const candles = useMemo(() => {
    const arr = [];
    let p = 100;
    for (let i = 0; i < 60; i++) {
      const o = p;
      const ch = (Math.random() - 0.48) * 6;
      const c = Math.max(50, o + ch);
      const h = Math.max(o, c) + Math.random() * 2;
      const l = Math.min(o, c) - Math.random() * 2;
      arr.push({ o, h, l, c });
      p = c;
    }
    return arr;
  }, []);
  const W = 720, H = 240;
  const max = Math.max(...candles.map(c => c.h));
  const min = Math.min(...candles.map(c => c.l));
  const range = max - min;
  const cw = W / candles.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
      {/* grid */}
      {[0.2, 0.4, 0.6, 0.8].map(g => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4"/>)}
      {/* y axis labels */}
      {[0.2, 0.4, 0.6, 0.8].map((g, i) => {
        const v = max - range * g;
        return <text key={i} x={W - 4} y={H * g - 2} fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.3)" textAnchor="end">{v.toFixed(2)}</text>;
      })}
      {candles.map((c, i) => {
        const x = i * cw + cw / 2;
        const yO = H - ((c.o - min) / range) * H;
        const yC = H - ((c.c - min) / range) * H;
        const yH = H - ((c.h - min) / range) * H;
        const yL = H - ((c.l - min) / range) * H;
        const up = c.c >= c.o;
        const col = up ? "oklch(0.86 0.21 145)" : "oklch(0.7 0.23 25)";
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={yH} y2={yL} stroke={col} strokeWidth="1"/>
            <rect x={i * cw + 1} y={Math.min(yO, yC)} width={cw - 2} height={Math.max(1.5, Math.abs(yO - yC))} fill={col} fillOpacity={up ? 0.9 : 0.7}/>
          </g>
        );
      })}
    </svg>
  );
}

function OrderBook() {
  const asks = [
    { p: 4.2218, sz: 8420, sum: 8420 },
    { p: 4.2204, sz: 12480, sum: 20900 },
    { p: 4.2190, sz: 6210, sum: 27110 },
    { p: 4.2176, sz: 18420, sum: 45530 },
    { p: 4.2162, sz: 4218, sum: 49748 },
  ].reverse();
  const bids = [
    { p: 4.2148, sz: 6420, sum: 6420 },
    { p: 4.2134, sz: 14280, sum: 20700 },
    { p: 4.2120, sz: 8210, sum: 28910 },
    { p: 4.2106, sz: 11400, sum: 40310 },
    { p: 4.2092, sz: 5800, sum: 46110 },
  ];
  const max = Math.max(...asks.map(x => x.sum), ...bids.map(x => x.sum));

  return (
    <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="kicker">Order book · $VAULT</span>
        <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>0.0001 grouping</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: 6, padding: "6px 14px", fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        <span>Price</span><span style={{textAlign:"right"}}>Size</span><span style={{textAlign:"right"}}>Sum</span>
      </div>
      <div>
        {asks.map((a, i) => (
          <div key={i} style={{ position: "relative", padding: "3px 14px" }}>
            <div style={{ position: "absolute", right: 14, top: 0, bottom: 0, width: `${(a.sum / max) * 80}%`, background: "oklch(0.7 0.23 25 / 0.1)" }}/>
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: 6, fontSize: 11, fontFamily: "var(--mono)" }}>
              <span style={{ color: "oklch(0.88 0.14 25)" }}>{a.p.toFixed(4)}</span>
              <span className="tabular" style={{ textAlign: "right", color: "var(--ink-2)" }}>{fmtN(a.sz)}</span>
              <span className="tabular" style={{ textAlign: "right", color: "var(--ink-3)" }}>{fmtN(a.sum)}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 14px", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="mono tabular" style={{ fontSize: 18, color: "oklch(0.92 0.15 145)" }}>4.2155</span>
          <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>spread 0.0007 · 0.02%</span>
        </div>
      </div>
      <div>
        {bids.map((b, i) => (
          <div key={i} style={{ position: "relative", padding: "3px 14px" }}>
            <div style={{ position: "absolute", right: 14, top: 0, bottom: 0, width: `${(b.sum / max) * 80}%`, background: "oklch(0.86 0.21 145 / 0.1)" }}/>
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: 6, fontSize: 11, fontFamily: "var(--mono)" }}>
              <span style={{ color: "oklch(0.92 0.15 145)" }}>{b.p.toFixed(4)}</span>
              <span className="tabular" style={{ textAlign: "right", color: "var(--ink-2)" }}>{fmtN(b.sz)}</span>
              <span className="tabular" style={{ textAlign: "right", color: "var(--ink-3)" }}>{fmtN(b.sum)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Analytics() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-GB", { hour12: false }) + " UTC");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="shell" style={{ paddingTop: 28, paddingBottom: 80 }} data-screen-label="06 Terminal">
      {/* Terminal header */}
      <div style={{ marginBottom: 24 }}>
        <span className="kicker">terminal</span>
        <h1 className="h-display" style={{ fontSize: 72, marginTop: 14 }}>
          <span className="italic" style={{ color: "var(--ink-3)" }}>The</span> terminal.
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", border: "1px solid var(--line)", borderRadius: 12, marginBottom: 18, background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="chart" size={16} style={{ color: "oklch(0.92 0.15 145)" }}/>
            <span style={{ fontFamily: "var(--display)", fontSize: 16 }}>Terminal</span>
            <span className="chip">v4.2.1</span>
          </div>
          <div style={{ display: "flex", gap: 18, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>
            <span>SESSION 0x21…88e2</span>
            <span>·</span>
            <span style={{ color: "oklch(0.92 0.15 145)" }}>{time}</span>
            <span>·</span>
            <span><span style={{ color: "oklch(0.86 0.21 145)" }}>●</span> CONNECTED</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}><Icon name="settings" size={12}/> Layout</button>
          <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}><Icon name="download" size={12}/> Export</button>
        </div>
      </div>

      {/* TOP KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: 10, marginBottom: 18, overflow: "hidden" }}>
        {[
          { l: "TVL", v: "$2.182B", ch: "+12.4%", c: "oklch(0.86 0.21 145)" },
          { l: "24h Volume", v: "$184.2M", ch: "+8.2%", c: "oklch(0.86 0.21 145)" },
          { l: "Protocol Rev", v: "$1.842M", ch: "+18%", c: "oklch(0.86 0.21 145)" },
          { l: "Active Hooks", v: "8,421", ch: "+142", c: "oklch(0.92 0.1 230)" },
          { l: "Tokens (24h)", v: "1,210", ch: "+12%", c: "oklch(0.86 0.21 145)" },
          { l: "Avg fee", v: "0.42%", ch: "-0.02%", c: "oklch(0.88 0.14 25)" },
        ].map((k, i) => (
          <div key={i} style={{ padding: "14px 16px", background: "var(--bg-1)" }}>
            <div className="kicker" style={{ marginBottom: 6 }}>{k.l}</div>
            <div className="mono tabular" style={{ fontSize: 19, fontFamily: "var(--display)" }}>{k.v}</div>
            <div className="mono tabular" style={{ fontSize: 11, color: k.c, marginTop: 4 }}>{k.ch}</div>
          </div>
        ))}
      </div>

      {/* Main 2-col */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, marginBottom: 16 }}>
        {/* Chart panel */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <TokenBubble sym="VA" size={28}/>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "var(--display)", fontSize: 16 }}>$VAULT / ETH</span>
                  <span className="chip chip-blue">Base</span>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>Vault Protocol · 1h</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span className="mono tabular" style={{ fontSize: 22, fontFamily: "var(--display)" }}>$4.2155</span>
              <span className="mono tabular chip chip-green">+24.8%</span>
              <div style={{ display: "flex", gap: 2, padding: 2, background: "rgba(255,255,255,0.04)", border: "1px solid var(--line-2)", borderRadius: 6 }}>
                {["1m", "5m", "1h", "4h", "1d"].map((t, i) => (
                  <button key={t} style={{ padding: "4px 8px", fontSize: 11, fontFamily: "var(--mono)", borderRadius: 4, background: i === 2 ? "rgba(255,255,255,0.08)" : "transparent", color: i === 2 ? "var(--ink)" : "var(--ink-3)" }}>{t}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: 14 }}>
            <CandleChart/>
          </div>
          {/* Volume bars */}
          <div style={{ padding: "0 14px 14px" }}>
            <svg viewBox="0 0 720 50" width="100%" height="50">
              {[...Array(60)].map((_, i) => {
                const h = 8 + rand(i * 1.3) * 40;
                const up = rand(i * 2.1) > 0.5;
                return <rect key={i} x={i * 12 + 1} y={50 - h} width={10} height={h} fill={up ? "oklch(0.86 0.21 145)" : "oklch(0.7 0.23 25)"} fillOpacity="0.5"/>;
              })}
            </svg>
          </div>
        </div>

        {/* Order book */}
        <OrderBook/>
      </div>

      {/* MID ROW: liquidity heatmap + hooks */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Heatmap */}
        <div className="card">
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
            <span className="kicker">Liquidity heatmap · top 24</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>by 24h Δ %</span>
          </div>
          <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
            {[...Array(24)].map((_, i) => {
              const t = TOKENS[i % TOKENS.length];
              const ch = (rand(i * 3.1) - 0.4) * 200;
              return <HeatmapCell key={i} value={t.mc} sym={t.sym + (i >= TOKENS.length ? Math.floor(i / TOKENS.length) : "")} ch={ch}/>;
            })}
          </div>
        </div>

        {/* Hook activity */}
        <div className="card">
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
            <span className="kicker">Hook firings · last hour</span>
            <span className="mono" style={{ fontSize: 11, color: "oklch(0.86 0.21 145)" }}>● 8,421/min</span>
          </div>
          <div style={{ padding: "14px 18px" }}>
            {[
              { n: "MEV Shield v2", n2: 18420, c: "oklch(0.78 0.18 230)" },
              { n: "Sniper Cage", n2: 12840, c: "oklch(0.86 0.21 145)" },
              { n: "Reflexive Burn", n2: 8210, c: "oklch(0.7 0.23 25)" },
              { n: "Liquidity Vortex", n2: 6420, c: "oklch(0.78 0.18 230)" },
              { n: "AI Volatility Tax", n2: 4218, c: "oklch(0.7 0.24 305)" },
              { n: "Loyalty Multiplier", n2: 2104, c: "oklch(0.85 0.16 85)" },
            ].map((h, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                  <span>{h.n}</span>
                  <span className="mono tabular" style={{ color: "var(--ink-3)" }}>{fmtN(h.n2)}</span>
                </div>
                <div style={{ height: 4, borderRadius: 100, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
                  <div style={{ width: `${(h.n2 / 20000) * 100}%`, height: "100%", background: h.c, borderRadius: 100, boxShadow: `0 0 8px ${h.c}` }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: wallet flows + AI insights + protocol revenue */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {/* Wallet flows */}
        <div className="card" style={{ padding: 18 }}>
          <div className="kicker" style={{ marginBottom: 14 }}>Wallet flows · 24h</div>
          <VolumeBar
            data={[40, 80, 60, 120, 90, 140, 110, 180, 220, 200, 280, 320, 260, 340, 380, 420]}
            color="oklch(0.86 0.21 145)" label="Inflow"
          />
          <div style={{ height: 12 }}/>
          <VolumeBar
            data={[40, 30, 50, 60, 80, 70, 100, 90, 120, 110, 140, 130, 160, 150, 180, 200]}
            color="oklch(0.7 0.23 25)" label="Outflow"
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
            <div>
              <div className="kicker">Net</div>
              <div className="mono tabular" style={{ fontSize: 16, color: "oklch(0.86 0.21 145)" }}>+$24.8M</div>
            </div>
            <div>
              <div className="kicker">Wallets</div>
              <div className="mono tabular" style={{ fontSize: 16 }}>21,840</div>
            </div>
          </div>
        </div>

        {/* AI insights */}
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span className="kicker" style={{ color: "oklch(0.88 0.13 305)" }}><Icon name="sparkles" size={11} style={{ marginRight: 4 }}/> AI insights</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>v1.4-synth</span>
          </div>
          {[
            { dot: "oklch(0.7 0.24 305)", t: "Whale accumulation detected", d: "3 wallets bought 8.4% of $VAULT supply in 18h.", conf: 92 },
            { dot: "oklch(0.86 0.21 145)", t: "Hook efficiency up 18%", d: "MEV Shield routing saved $84K in sandwich attacks today.", conf: 88 },
            { dot: "oklch(0.7 0.23 25)", t: "Sell pressure building", d: "$GHOST top 10 holders showing exit patterns; tighten tax.", conf: 71 },
          ].map((i, k) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, padding: "10px 0", borderTop: k > 0 ? "1px solid var(--line)" : "none", alignItems: "start" }}>
              <div style={{ width: 6, height: 6, borderRadius: 50, background: i.dot, marginTop: 6, boxShadow: `0 0 8px ${i.dot}` }}/>
              <div>
                <div style={{ fontSize: 13, marginBottom: 4 }}>{i.t}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.45 }}>{i.d}</div>
              </div>
              <div className="mono tabular" style={{ fontSize: 11, color: "var(--ink-3)" }}>{i.conf}%</div>
            </div>
          ))}
        </div>

        {/* Protocol revenue */}
        <div className="card" style={{ padding: 18 }}>
          <div className="kicker" style={{ marginBottom: 14 }}>Protocol revenue · 30d</div>
          <div className="mono tabular" style={{ fontSize: 32, fontFamily: "var(--display)", marginBottom: 4 }}>$48.21M</div>
          <div style={{ fontSize: 12, color: "oklch(0.92 0.15 145)", marginBottom: 18 }} className="mono tabular">+18.4% MoM</div>
          <Spark pts={generateSpark(30, 9, 0.4)} color="oklch(0.92 0.15 145)" w={280} h={70} strokeW={2}/>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
            <div>
              <div className="kicker">From hooks</div>
              <div className="mono tabular" style={{ fontSize: 14 }}>$32.4M <span style={{ color: "var(--ink-3)" }}>(67%)</span></div>
            </div>
            <div>
              <div className="kicker">To creators</div>
              <div className="mono tabular" style={{ fontSize: 14, color: "oklch(0.85 0.16 85)" }}>$22.6M</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Analytics = Analytics;
