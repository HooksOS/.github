/* Landing page — editorial cyberpunk, cinematic */

// ============ CINEMATIC LIQUIDITY VIZ — bigger, more layered ============
function HeroViz() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf, start = performance.now();
    const loop = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const W = 900, H = 720;
  const cx = W * 0.6, cy = H * 0.5;
  const tokens = ["VAULT", "GHOST", "FLUX", "PRISM", "RUNE", "NEON", "SHARD", "VOID"];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ display: "block", overflow: "visible" }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="hg-core">
          <stop offset="0%" stopColor="oklch(0.88 0.21 142)" stopOpacity="0.45"/>
          <stop offset="40%" stopColor="oklch(0.88 0.21 142)" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="oklch(0.88 0.21 142)" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="hg-wave" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.88 0.21 142)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="oklch(0.88 0.21 142)" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* huge core glow */}
      <circle cx={cx} cy={cy} r="320" fill="url(#hg-core)"/>

      {/* concentric tick rings — represent v4 liquidity ticks */}
      {[80, 130, 180, 230, 290, 360].map((r, i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill="none"
            stroke="oklch(0.88 0.21 142)"
            strokeOpacity={0.35 - i * 0.04}
            strokeWidth="1"
            strokeDasharray={i === 2 ? "0" : `${4 + i} ${10 + i * 3}`}>
            <animateTransform attributeName="transform" type="rotate"
              from={`0 ${cx} ${cy}`} to={`${i % 2 ? 360 : -360} ${cx} ${cy}`}
              dur={`${30 + i * 14}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}

      {/* horizontal liquidity waves at bottom */}
      <path d={(() => {
        let d = `M 0 ${cy + 100}`;
        for (let x = 0; x <= W; x += 6) {
          const y = cy + 100 + Math.sin((x / W) * 4 * Math.PI + t * 0.6) * 18 + Math.sin((x / W) * 7 * Math.PI + t * 0.4) * 6;
          d += ` L ${x} ${y.toFixed(2)}`;
        }
        return d + ` L ${W} ${H} L 0 ${H} Z`;
      })()} fill="url(#hg-wave)"/>
      <path d={(() => {
        let d = `M 0 ${cy + 160}`;
        for (let x = 0; x <= W; x += 6) {
          const y = cy + 160 + Math.sin((x / W) * 3 * Math.PI + t * 0.8) * 14;
          d += ` L ${x} ${y.toFixed(2)}`;
        }
        return d + ` L ${W} ${H} L 0 ${H} Z`;
      })()} fill="url(#hg-wave)" opacity="0.5"/>

      {/* hex core */}
      <g transform={`translate(${cx} ${cy})`}>
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="40s" repeatCount="indefinite"/>
          <path d="M 0 -50 L 43 -25 L 43 25 L 0 50 L -43 25 L -43 -25 Z"
            stroke="oklch(0.88 0.21 142)" strokeWidth="1.5" fill="oklch(0.88 0.21 142 / 0.06)"/>
        </g>
        <g>
          <animateTransform attributeName="transform" type="rotate" from="60" to="-300" dur="60s" repeatCount="indefinite"/>
          <path d="M 0 -70 L 60 -35 L 60 35 L 0 70 L -60 35 L -60 -35 Z"
            stroke="oklch(0.88 0.21 142)" strokeWidth="0.8" strokeOpacity="0.5" fill="none"/>
        </g>
        <circle r="34" fill="#06070a" stroke="oklch(0.88 0.21 142)" strokeWidth="1.2"/>
        <text x="0" y="5" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="oklch(0.95 0.16 142)" opacity="0.9">v4</text>
      </g>

      {/* floating tokens orbiting */}
      {tokens.map((sym, i) => {
        const angle = (i / tokens.length) * Math.PI * 2 + t * 0.12;
        const radius = 220 + Math.sin(t * 0.4 + i * 1.3) * 12;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.7;
        const [c1, c2] = tokenColor(sym);
        return (
          <g key={sym}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={c1} strokeOpacity="0.18" strokeWidth="0.6" strokeDasharray="2 4"/>
            <g style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.7))" }}>
              <defs>
                <linearGradient id={`tg-${i}`} x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor={c1}/>
                  <stop offset="100%" stopColor={c2}/>
                </linearGradient>
              </defs>
              <circle cx={x} cy={y} r="20" fill={`url(#tg-${i})`} stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
              <text x={x} y={y + 4} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" fill="#0a1206">{sym.slice(0,2)}</text>
            </g>
          </g>
        );
      })}

      {/* ambient particles */}
      {[...Array(36)].map((_, i) => {
        const x = rand(i * 1.7) * W;
        const y = ((rand(i * 2.3) * H + t * (8 + rand(i*5) * 18)) % H);
        const r = 0.5 + rand(i * 3.1) * 1.2;
        return <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={0.15 + rand(i*4.7) * 0.35}/>;
      })}

      {/* faint hex grid corner accent */}
      <g opacity="0.15" stroke="oklch(0.88 0.21 142)" strokeWidth="0.6" fill="none">
        {[...Array(6)].map((_, i) => (
          <path key={i} d={`M ${60 + (i % 3) * 30} ${60 + Math.floor(i/3) * 34} l 15 -8 l 15 8 l 0 18 l -15 8 l -15 -8 z`}/>
        ))}
      </g>
    </svg>
  );
}

// ============ LIVE FEED ============
function LiveFeed() {
  const [items, setItems] = useState(ACTIVITIES);
  useEffect(() => {
    const id = setInterval(() => {
      setItems(prev => {
        const newItem = { ...prev[(Date.now() / 1000 | 0) % prev.length], time: "now" };
        return [newItem, ...prev.slice(0, 6)].map((x, i) => ({ ...x, time: i === 0 ? "now" : `${i * 7}s` }));
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="pulse-dot"/>
          <span className="kicker">Network · live</span>
        </div>
        <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>21,480 evt/hr</span>
      </div>
      <div>
        {items.slice(0, 6).map((a, i) => (
          <div key={i} className="feed-row" style={{ opacity: 1 - i * 0.12 }}>
            <span className="ticker" style={{ color: "var(--ink-3)" }}>{a.who}</span>
            <span style={{ fontSize: 12 }}>
              {a.action} <span className="ticker" style={{ color: "var(--ink)" }}>${a.sym}</span>
              {a.amt && <span className="ticker" style={{ color: "var(--ink-3)" }}> · {fmt$(a.amt)}</span>}
            </span>
            <span className="mono" style={{ color: "var(--ink-3)", fontSize: 10 }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MARQUEE ============
function Marquee() {
  const items = TOKENS.concat(TOKENS);
  return (
    <div className="marquee" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "16px 0", background: "rgba(255,255,255,0.012)" }}>
      <div className="marquee-track">
        {items.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 18px" }}>
            <TokenBubble sym={t.sym} size={22}/>
            <span className="mono" style={{ fontSize: 13 }}>${t.sym}</span>
            <span className="mono tabular" style={{ fontSize: 13, color: "var(--ink-2)" }}>${t.price.toFixed(t.price < 1 ? 4 : 2)}</span>
            <span className="mono tabular" style={{ fontSize: 12, color: t.ch >= 0 ? "var(--acid)" : "var(--crimson)" }}>
              {t.ch >= 0 ? "+" : ""}{t.ch.toFixed(1)}%
            </span>
            <span style={{ color: "var(--ink-4)" }}>/</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ HOOK PREVIEW CARD — refined ============
function HookPreviewCard({ hook }) {
  const pts = useMemo(() => generateSpark(20, hook.installs % 100 + 1, 0.42), [hook.id]);
  return (
    <div className="card card-glow" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 16, minHeight: 260, position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <HexIcon size={44} color="var(--acid)" filled>
          <Icon name={hook.icon} size={18}/>
        </HexIcon>
        <div style={{ display: "flex", gap: 6 }}>
          {hook.verified && <span className="chip chip-acid"><Icon name="check" size={9}/> Audited</span>}
          {hook.premium && <span className="chip chip-gold">Pro</span>}
        </div>
      </div>

      <div>
        <div className="kicker" style={{ marginBottom: 8 }}>{hook.cat} · {hook.author}</div>
        <h3 className="h3" style={{ marginBottom: 10 }}>{hook.name}</h3>
        <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: 0 }}>{hook.desc}</p>
      </div>

      <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--line)", display: "flex", alignItems: "end", justifyContent: "space-between" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 4 }}>30d revenue</div>
          <div className="mono tabular" style={{ fontSize: 18, fontFamily: "var(--display)", color: "var(--acid)" }}>{fmt$(hook.revenue)}</div>
        </div>
        <Spark pts={pts} color="var(--acid)" w={90} h={32}/>
      </div>
    </div>
  );
}

// ============ STAT TILE — Hyperliquid-style big numerals ============
function StatTile({ label, value, hint, suffix }) {
  return (
    <div style={{ padding: "32px 28px", borderRight: "1px solid var(--line)", position: "relative" }}>
      <div className="kicker" style={{ marginBottom: 18 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span className="bignum tabular" style={{ fontSize: 56 }}>{value}</span>
        {suffix && <span className="mono" style={{ fontSize: 14, color: "var(--ink-3)" }}>{suffix}</span>}
      </div>
      {hint && <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{hint}</div>}
    </div>
  );
}

// ============ MAIN ============
function Landing({ setView }) {
  return (
    <div data-screen-label="01 Landing">

      {/* ========== HERO — full-bleed cinematic ========== */}
      <section style={{ position: "relative", minHeight: "calc(100vh - 64px)", overflow: "hidden" }}>
        {/* viz layer */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.85 }}>
          <HeroViz/>
        </div>
        {/* dimming gradient over right viz */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg, var(--bg) 0%, transparent 50%, transparent 100%)" }}/>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, transparent 0%, transparent 60%, var(--bg) 100%)" }}/>

        <div className="shell" style={{ position: "relative", zIndex: 2, paddingTop: 100, paddingBottom: 60, minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column" }}>
          {/* status pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 12px", border: "1px solid var(--line-2)", background: "rgba(255,255,255,0.02)", borderRadius: 100, marginBottom: 36, alignSelf: "flex-start" }}>
            <span className="pulse-dot" style={{ width: 6, height: 6 }}/>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.16em" }}>V4 HOOKS · LIVE ON 6 CHAINS</span>
          </div>

          {/* MEGA HEADLINE */}
          <h1 className="h-mega" style={{ margin: 0, marginBottom: 32, maxWidth: 1100 }}>
            Markets<br/>
            <span className="italic" style={{ color: "var(--ink-3)" }}>are now</span><br/>
            <span style={{ color: "var(--acid)" }}>software.</span>
          </h1>

          <p style={{ fontSize: 19, color: "var(--ink-2)", lineHeight: 1.5, maxWidth: 580, marginBottom: 44, fontWeight: 300 }}>
            HookOS is a programmable market engine. Launch tokens with custom liquidity logic, plug in community-built hooks, ship markets that fight back against MEV, bots, and dumpers.
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: 80 }}>
            <button className="btn btn-primary" onClick={() => setView("launch")} style={{ padding: "13px 22px", fontSize: 14 }}>
              Launch a token <Icon name="arrow_right" size={14}/>
            </button>
            <button className="btn btn-ghost" onClick={() => setView("marketplace")} style={{ padding: "13px 22px", fontSize: 14 }}>
              Browse hooks <Icon name="arrow_up_right" size={14}/>
            </button>
          </div>

          {/* corner read */}
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "end", gap: 40 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.16em", lineHeight: 1.5 }}>
              EST.&nbsp;2026 <br/>
              BASE · ETH · ARB · BNB · POLY · BLAST
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, color: "var(--ink-3)" }}>
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.16em" }}>SCROLL</span>
              <Icon name="arrow_down" size={14}/>
            </div>
          </div>
        </div>
      </section>

      <Marquee/>

      {/* ========== STATS — full-width tabular row ========== */}
      <section className="shell" style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40 }}>
          <div>
            <span className="kicker">/01 — the numbers</span>
            <h2 className="h1" style={{ marginTop: 16, maxWidth: 720 }}>
              <span className="italic" style={{ color: "var(--ink-3)" }}>An on-chain economy</span> the size of a small country.
            </h2>
          </div>
          <button className="btn btn-outline" onClick={() => setView("analytics")}>
            Open terminal <Icon name="arrow_up_right" size={14}/>
          </button>
        </div>
        <div className="card" style={{ padding: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          <StatTile label="TVL" value="$2.18" suffix="B" hint="+12.4% this week"/>
          <StatTile label="Hooks deployed" value="8,421" hint="418 audited"/>
          <StatTile label="Tokens launched" value="142,800" hint="1,210 today"/>
          <div style={{ padding: "32px 28px", position: "relative" }}>
            <div className="kicker" style={{ marginBottom: 18 }}>Creator earnings</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span className="bignum tabular" style={{ fontSize: 56, color: "var(--acid)" }}>$48.2</span>
              <span className="mono" style={{ fontSize: 14, color: "var(--ink-3)" }}>M</span>
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>Paid to builders</div>
          </div>
        </div>
      </section>

      {/* ========== WHAT IT IS — editorial 2-col with hex motifs ========== */}
      <section className="shell" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 100, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 100 }}>
            <span className="kicker">/02 — what it is</span>
            <h2 className="h1" style={{ marginTop: 16, marginBottom: 28 }}>
              A single canvas <span className="italic" style={{ color: "var(--ink-3)" }}>for every</span> market behavior <span className="italic" style={{ color: "var(--ink-3)" }}>you can</span> imagine.
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 28 }}>
              Every token on HookOS runs on a programmable AMM. Hooks are tiny programs that intercept swaps and liquidity events — anti-bot taxes, MEV shields, reward distributions, PvP wagers, AI-tuned fees. Compose them like Lego.
            </p>
            <button className="btn btn-ghost" onClick={() => setView("marketplace")}>
              <Icon name="grid" size={14}/> Browse all hooks
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { i: "shield", t: "Protect", d: "MEV shields, sniper cages, whale cooldowns" },
              { i: "flame", t: "Reward", d: "Burns, reflections, loyalty multipliers" },
              { i: "swords", t: "Compete", d: "PvP wagers, raids, clan tournaments" },
              { i: "cpu", t: "Automate", d: "AI fee tuning, dynamic curves" },
              { i: "droplet", t: "Concentrate", d: "Tick-aware LP, vortex strategies" },
              { i: "users", t: "Socialize", d: "Holder oracles, raid catalysts" },
            ].map((x, i) => (
              <div key={i} className="card" style={{ padding: 22, minHeight: 160 }}>
                <HexIcon size={40} color="var(--acid)" filled>
                  <Icon name={x.i} size={16}/>
                </HexIcon>
                <div className="h3" style={{ fontSize: 20, marginTop: 18, marginBottom: 8 }}>{x.t}</div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.45 }}>{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOOK MARKETPLACE PREVIEW ========== */}
      <section className="shell" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <span className="kicker">/03 — hook marketplace</span>
            <h2 className="h1" style={{ marginTop: 16, maxWidth: 720 }}>
              <span className="italic" style={{ color: "var(--ink-3)" }}>Plug in</span> superpowers.
            </h2>
          </div>
          <button className="btn btn-outline" onClick={() => setView("marketplace")}>
            All {HOOKS.length} hooks <Icon name="arrow_right" size={14}/>
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {HOOKS.filter(h => h.featured).concat(HOOKS.filter(h => !h.featured && h.verified)).slice(0, 6).map(h => <HookPreviewCard key={h.id} hook={h}/>)}
        </div>
      </section>

      {/* ========== LIVE PULSE + TRENDING ========== */}
      <section className="shell" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 28 }}>
          <div>
            <span className="kicker">/04 — pulse</span>
            <h2 className="h1" style={{ marginTop: 16, marginBottom: 32, maxWidth: 360 }}>
              The market, <span className="italic" style={{ color: "var(--ink-3)" }}>in real time.</span>
            </h2>
            <LiveFeed/>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span className="kicker">trending launches · last 24h</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>ranked by velocity</span>
            </div>
            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 100px 80px 110px 80px", gap: 12, padding: "12px 22px", borderBottom: "1px solid var(--line)", fontSize: 10, color: "var(--ink-3)", fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.18em" }}>
                <span>#</span><span>Token</span><span style={{textAlign:"right"}}>Price</span><span style={{textAlign:"right"}}>24h</span><span style={{textAlign:"right"}}>Volume</span><span style={{textAlign:"right"}}>Trend</span>
              </div>
              {TOKENS.slice(0, 7).map((t, i) => {
                const pts = generateSpark(30, i + 1, t.ch >= 0 ? 0.4 : 0.6);
                return (
                  <div key={t.sym} style={{ display: "grid", gridTemplateColumns: "32px 1fr 100px 80px 110px 80px", gap: 12, padding: "14px 22px", borderBottom: i < 6 ? "1px solid var(--line)" : "none", alignItems: "center" }}>
                    <span className="mono" style={{ color: "var(--ink-3)", fontSize: 12 }}>{String(i+1).padStart(2,'0')}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <TokenBubble sym={t.sym} size={30}/>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{t.sym}</div>
                        <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{t.name}</div>
                      </div>
                    </div>
                    <span className="mono tabular" style={{ textAlign: "right", fontSize: 13 }}>${t.price.toFixed(t.price < 1 ? 4 : 2)}</span>
                    <span className="mono tabular" style={{ textAlign: "right", fontSize: 13, color: t.ch >= 0 ? "var(--acid)" : "var(--crimson)" }}>
                      {t.ch >= 0 ? "+" : ""}{t.ch.toFixed(1)}%
                    </span>
                    <span className="mono tabular" style={{ textAlign: "right", fontSize: 13, color: "var(--ink-2)" }}>{fmt$(t.vol)}</span>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Spark pts={pts} color={t.ch >= 0 ? "var(--acid)" : "var(--crimson)"} w={70} h={26}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== AI STUDIO PREVIEW ========== */}
      <section className="shell" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="card scanlines" style={{ padding: 56, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(700px 350px at 95% 50%, oklch(0.7 0.22 305 / 0.14), transparent 60%)", pointerEvents: "none" }}/>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "center", position: "relative" }}>
            <div>
              <span className="kicker" style={{ color: "oklch(0.9 0.12 305)" }}>/05 — ai studio</span>
              <h2 className="h1" style={{ marginTop: 16, marginBottom: 20, maxWidth: 460 }}>
                Describe a market. <span className="italic" style={{ color: "var(--ink-3)" }}>Get</span> a hook.
              </h2>
              <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 28, maxWidth: 440 }}>
                Type the behavior in plain English. Synth-1 generates audited Solidity, simulates outcomes against 30 days of real market data, and ships.
              </p>
              <button className="btn btn-ghost" onClick={() => setView("builder")} style={{ borderColor: "oklch(0.7 0.22 305 / 0.35)", color: "oklch(0.9 0.12 305)" }}>
                <Icon name="sparkles" size={14}/> Open AI Studio
              </button>
            </div>
            <div className="card" style={{ background: "rgba(0,0,0,0.5)", padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="sparkles" size={11} style={{ color: "oklch(0.9 0.12 305)" }}/>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>VolatilityPunish.sol · draft</span>
                <span className="chip chip-acid" style={{ marginLeft: "auto" }}><span className="pulse-dot" style={{ width: 5, height: 5 }}/> Compiled</span>
              </div>
              <pre className="mono" style={{ margin: 0, padding: 22, fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.75, overflow: "auto" }}>{`function beforeSwap(
  address sender,
  PoolKey calldata key,
  IPoolManager.SwapParams calldata params
) external returns (bytes4) {
  uint256 vol = oracle.volatility(key);
  if (vol > THRESHOLD && params.zeroForOne) {
    uint256 tax = (vol * BASE_TAX) / 1e18;
    _collectTax(sender, tax);
    emit VolatilityPunish(sender, tax);
  }
  return IHooks.beforeSwap.selector;
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CREATOR ECONOMY ========== */}
      <section className="shell" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 60, alignItems: "center" }}>
          <div>
            <span className="kicker">/06 — creator economy</span>
            <h2 className="h1" style={{ marginTop: 16, marginBottom: 24, maxWidth: 480 }}>
              <span className="italic" style={{ color: "var(--ink-3)" }}>The</span> builders <span className="italic" style={{ color: "var(--ink-3)" }}>get</span> paid.
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 28, maxWidth: 480 }}>
              Every hook generates revenue every time it fires. Top creators earn $50K-$1M/mo. Royalties stream on-chain in real time.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 480 }}>
              <div className="card" style={{ padding: 20 }}>
                <div className="kicker" style={{ marginBottom: 10 }}>Top earner · 30d</div>
                <div className="h3" style={{ fontSize: 22 }}>TickWorks</div>
                <div className="mono tabular" style={{ fontSize: 14, color: "var(--acid)", marginTop: 6 }}>+ $821,400</div>
              </div>
              <div className="card" style={{ padding: 20 }}>
                <div className="kicker" style={{ marginBottom: 10 }}>Total paid</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span className="bignum tabular" style={{ fontSize: 32 }}>$48.2</span>
                  <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>M</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6, fontFamily: "var(--mono)" }}>since launch</div>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <div style={{ padding: "18px 22px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)" }}>
                <span className="kicker">Creator leaderboard</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>30d earnings</span>
              </div>
              {[
                { rank: 1, name: "TickWorks", earn: 821400, hooks: 4, ch: 24 },
                { rank: 2, name: "ChainGuard Labs", earn: 612000, hooks: 3, ch: 18 },
                { rank: 3, name: "Arena Studios", earn: 412000, hooks: 2, ch: 142 },
                { rank: 4, name: "0xPyro", earn: 218400, hooks: 5, ch: -8 },
                { rank: 5, name: "Synth Labs", earn: 184000, hooks: 1, ch: 84 },
              ].map((c, i) => (
                <div key={c.rank} style={{ display: "grid", gridTemplateColumns: "32px 1fr auto 70px", gap: 16, alignItems: "center", padding: "16px 22px", borderTop: i > 0 ? "1px solid var(--line)" : "none" }}>
                  <span className="mono" style={{ color: c.rank <= 3 ? "var(--acid)" : "var(--ink-3)", fontSize: 13, fontFamily: "var(--display)" }}>0{c.rank}</span>
                  <div>
                    <div style={{ fontSize: 14 }}>{c.name}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{c.hooks} hooks deployed</div>
                  </div>
                  <span className="mono tabular" style={{ fontSize: 14 }}>{fmt$(c.earn)}</span>
                  <span className="mono tabular" style={{ fontSize: 12, color: c.ch >= 0 ? "var(--acid)" : "var(--crimson)", textAlign: "right" }}>
                    {c.ch >= 0 ? "+" : ""}{c.ch}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== ROADMAP ========== */}
      <section className="shell" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <span className="kicker">/07 — roadmap</span>
          <h2 className="h1" style={{ marginTop: 16, maxWidth: 720 }}>
            <span className="italic" style={{ color: "var(--ink-3)" }}>What's</span> next.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
          {[
            { q: "Q1 '26", t: "Mainnet v4", d: "Hook marketplace, AI studio, Base + Eth mainnet", status: "shipped" },
            { q: "Q2 '26", t: "PvP Arena", d: "Token battles, clan systems, wager hooks", status: "shipped" },
            { q: "Q3 '26", t: "Mobile native", d: "iOS + Android with full gesture feed", status: "live" },
            { q: "Q4 '26", t: "Cross-chain", d: "Single hook executes on 6 chains simultaneously", status: "next" },
          ].map((r, i) => (
            <div key={i} style={{ padding: 28, borderLeft: i > 0 ? "1px solid var(--line)" : "none", background: r.status === "live" ? "var(--acid-bg)" : "transparent", position: "relative", minHeight: 220 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{r.q}</span>
                {r.status === "shipped" && <span className="chip"><Icon name="check" size={9}/> Shipped</span>}
                {r.status === "live" && <span className="chip chip-acid"><span className="pulse-dot" style={{ width: 5, height: 5 }}/> Live</span>}
                {r.status === "next" && <span className="chip">Next</span>}
              </div>
              <div className="h3" style={{ fontSize: 24, marginBottom: 12 }}>{r.t}</div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5 }}>{r.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="shell" style={{ paddingTop: 80, paddingBottom: 100 }}>
        <div style={{ padding: "100px 60px", textAlign: "center", position: "relative", overflow: "hidden", border: "1px solid var(--line)", borderRadius: 16, background: "linear-gradient(180deg, rgba(255,255,255,0.022), rgba(255,255,255,0.004))" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(700px 350px at 50% 100%, var(--acid-bg), transparent 70%)", pointerEvents: "none" }}/>
          <div style={{ position: "relative" }}>
            <h2 className="h-display" style={{ marginBottom: 24 }}>
              Stop launching <span className="italic" style={{ color: "var(--ink-3)" }}>tokens.</span><br/>
              Start launching <span style={{ color: "var(--acid)" }}>markets.</span>
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-2)", maxWidth: 540, margin: "0 auto 36px" }}>
              Deploy in under 60 seconds. Free for the first 100 tokens this month.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="btn btn-primary" onClick={() => setView("launch")} style={{ padding: "13px 22px" }}>Launch a token <Icon name="arrow_right" size={14}/></button>
              <button className="btn btn-ghost" onClick={() => setView("feed")} style={{ padding: "13px 22px" }}>Browse the feed</button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="shell" style={{ paddingTop: 60, paddingBottom: 40, borderTop: "1px solid var(--line)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(4, 1fr)", gap: 48, marginBottom: 56 }}>
          <div>
            <div className="brand" style={{ marginBottom: 18 }}>
              <div className="brand-glyph">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M13 1.5 L23 7 L23 19 L13 24.5 L3 19 L3 7 Z" stroke="var(--acid)" strokeWidth="1.5" fill="oklch(0.88 0.21 142 / 0.08)"/>
                  <path d="M9 11 Q9 16 13 16 Q17 16 17 11 Q17 8 14 8" stroke="var(--acid)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="brand-name">HookOS</span>
              <span className="brand-version">v4</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.6, maxWidth: 300 }}>
              The programmable market engine. Built for builders, traders, and degens who think markets should be more than buy and sell.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
              {["twitter", "discord", "book", "code"].map(i => (
                <button key={i} className="btn btn-outline" style={{ padding: 9 }}><Icon name={i} size={13}/></button>
              ))}
            </div>
          </div>
          {[
            { t: "Product", links: ["Launch a token", "Hook marketplace", "AI studio", "Arena", "Terminal"] },
            { t: "Build", links: ["Docs", "Hook SDK", "Examples", "Audits", "API"] },
            { t: "Community", links: ["Discord", "X / Twitter", "Telegram", "Farcaster", "Blog"] },
            { t: "Company", links: ["About", "Press", "Careers", "Contact", "Brand"] },
          ].map(col => (
            <div key={col.t}>
              <div className="kicker" style={{ marginBottom: 16 }}>{col.t}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(l => <a key={l} href="#" style={{ fontSize: 13, color: "var(--ink-2)" }}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid var(--line)" }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>© 2026 HOOKOS LABS · NOT FINANCIAL ADVICE</span>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>AUDITED · SPEARBIT · CANTINA · CODE4RENA</span>
        </div>
      </footer>
    </div>
  );
}

window.Landing = Landing;
