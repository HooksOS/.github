/* Profile page — creator stats, holdings, achievements, XP */

function XPRing({ level = 24, xp = 8420, next = 12000, size = 140 }) {
  const pct = xp / next;
  const C = 2 * Math.PI * 60;
  return (
    <div style={{ position: "relative", width: size, height: size, display: "grid", placeItems: "center" }}>
      <svg width={size} height={size} viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3"/>
        <circle cx="70" cy="70" r="60" fill="none" stroke="var(--acid)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - pct)} style={{ transition: "stroke-dashoffset 1400ms cubic-bezier(0.22,1,0.36,1)", filter: "drop-shadow(0 0 6px var(--acid-glow))" }}/>
        {/* tick marks */}
        {[...Array(36)].map((_, i) => {
          const a = (i / 36) * 360;
          return <line key={i} x1="70" y1="2" x2="70" y2="7"
            stroke="rgba(255,255,255,0.15)" strokeWidth="1"
            transform={`rotate(${a} 70 70)`}/>;
        })}
      </svg>
      <div style={{ textAlign: "center" }}>
        <div className="kicker" style={{ fontSize: 9, marginBottom: 4 }}>LEVEL</div>
        <div className="mono tabular" style={{ fontFamily: "var(--display)", fontSize: 40, fontWeight: 300, lineHeight: 1 }}>{level}</div>
        <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 4 }}>{xp.toLocaleString()} / {next.toLocaleString()}</div>
      </div>
    </div>
  );
}

function Profile() {
  const holdings = [
    { sym: "VAULT", qty: 12480, value: 5264, pl: 124, ch: 24 },
    { sym: "GHOST", qty: 82100, value: 1790, pl: 412, ch: 142 },
    { sym: "FLUX", qty: 142, value: 1823, pl: -82, ch: -6 },
    { sym: "RUNE", qty: 6210, value: 882, pl: 218, ch: 218 },
    { sym: "PRISM", qty: 1240, value: 1018, pl: 142, ch: 84 },
  ];
  const portfolioValue = holdings.reduce((s, h) => s + h.value, 0);
  const portfolioPL = holdings.reduce((s, h) => s + h.pl, 0);

  const achievements = [
    { i: "trophy", l: "First win", u: true, c: "var(--gold)" },
    { i: "flame", l: "Streak ×5", u: true, c: "var(--crimson)" },
    { i: "crown", l: "Top 100", u: true, c: "var(--gold)" },
    { i: "swords", l: "100 battles", u: true, c: "var(--acid)" },
    { i: "rocket", l: "First launch", u: true, c: "var(--acid)" },
    { i: "shield", l: "Anti-bot pro", u: true, c: "var(--ice)" },
    { i: "diamond", l: "Diamond league", u: false },
    { i: "star", l: "Legend", u: false },
    { i: "cpu", l: "AI native", u: false },
  ];

  const activitySeries = useMemo(() => generateSpark(30, 7, 0.4), []);

  return (
    <div className="shell" style={{ paddingTop: 56, paddingBottom: 80 }} data-screen-label="08 Profile">
      {/* HEADER */}
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 32, alignItems: "center", marginBottom: 40 }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: 120, height: 120, borderRadius: 24, background: "conic-gradient(from 200deg, var(--acid), var(--ice), var(--gold), var(--plasma), var(--acid))", padding: 3 }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 21, background: "var(--bg)", display: "grid", placeItems: "center", fontFamily: "var(--display)", fontSize: 48, fontWeight: 300 }}>
              0x
            </div>
          </div>
          <div style={{ position: "absolute", bottom: -4, right: -4, width: 32, height: 32, borderRadius: 50, background: "var(--acid)", color: "#001b07", display: "grid", placeItems: "center", fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700, border: "3px solid var(--bg)" }}>
            24
          </div>
        </div>
        <div>
          <span className="kicker">profile · creator</span>
          <h1 className="h-display" style={{ fontSize: 72, marginTop: 14, marginBottom: 8 }}>
            ghost<span className="italic" style={{ color: "var(--ink-3)" }}>.eth</span>
          </h1>
          <div style={{ display: "flex", gap: 14, alignItems: "center", color: "var(--ink-3)", fontSize: 13 }}>
            <span className="mono">0x4f4f…c3a1</span>
            <span>·</span>
            <span>Joined Jan '26</span>
            <span>·</span>
            <span className="chip chip-acid"><Icon name="check" size={9}/> Verified creator</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost"><Icon name="share" size={14}/> Share</button>
          <button className="btn btn-primary"><Icon name="plus" size={14}/> Follow</button>
        </div>
      </div>

      {/* TOP ROW: portfolio + XP + reputation */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Portfolio */}
        <div className="card" style={{ padding: 26 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 18 }}>
            <div>
              <div className="kicker" style={{ marginBottom: 8 }}>Portfolio value</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span className="bignum tabular" style={{ fontSize: 52 }}>
                  $<AnimatedCounter to={portfolioValue} decimals={0}/>
                </span>
              </div>
              <div className="mono tabular" style={{ fontSize: 14, color: "var(--acid)", marginTop: 8 }}>
                + {fmt$(portfolioPL)} <span style={{ color: "var(--ink-3)" }}>· 24h</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, padding: 2, background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)", borderRadius: 6 }}>
              {["24h", "7d", "30d", "ALL"].map((t, i) => (
                <button key={t} style={{ padding: "4px 8px", fontSize: 10.5, fontFamily: "var(--mono)", borderRadius: 4, background: i === 1 ? "rgba(255,255,255,0.07)" : "transparent", color: i === 1 ? "var(--ink)" : "var(--ink-3)" }}>{t}</button>
              ))}
            </div>
          </div>
          <AreaChart pts={activitySeries} color="var(--acid)" h={130} w={500}/>
        </div>

        {/* XP */}
        <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div className="kicker" style={{ marginBottom: 14 }}>XP progress</div>
          <XPRing/>
          <div style={{ marginTop: 14, fontSize: 12, color: "var(--ink-3)" }}>3,580 XP to next level</div>
        </div>

        {/* Reputation gauges */}
        <div className="card" style={{ padding: 22 }}>
          <div className="kicker" style={{ marginBottom: 16 }}>Reputation</div>
          <div style={{ display: "flex", gap: 12, marginBottom: 14, justifyContent: "space-around" }}>
            <RadialGauge value={92} label="Builder" sub="BUILDER" size={84} color="var(--acid)"/>
            <RadialGauge value={78} label="Trader" sub="TRADER" size={84} color="var(--gold)"/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", paddingTop: 14, borderTop: "1px solid var(--line)" }}>
            <div style={{ textAlign: "center" }}>
              <div className="mono tabular" style={{ fontSize: 17, fontFamily: "var(--display)" }}>#142</div>
              <div className="kicker" style={{ marginTop: 4, fontSize: 9 }}>Global</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="mono tabular" style={{ fontSize: 17, fontFamily: "var(--display)", color: "var(--acid)" }}>S+</div>
              <div className="kicker" style={{ marginTop: 4, fontSize: 9 }}>League</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECOND ROW: stats strip */}
      <div className="card" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", padding: 0, marginBottom: 16 }}>
        {[
          { l: "Tokens launched", v: 12, sub: "8 active", spark: 0.4 },
          { l: "Hooks created", v: 6, sub: "4,218 installs", spark: 0.3 },
          { l: "Battles won", v: 142, sub: "84% winrate", spark: 0.42 },
          { l: "Creator earnings", v: "$184K", sub: "+$48K this mo.", spark: 0.38 },
          { l: "Followers", v: "12.4K", sub: "+182 today", spark: 0.36 },
        ].map((s, i) => {
          const pts = useMemo(() => generateSpark(20, i + 1, s.spark), [i]);
          return (
            <div key={i} style={{ padding: 20, borderLeft: i ? "1px solid var(--line)" : "none" }}>
              <div className="kicker" style={{ marginBottom: 10 }}>{s.l}</div>
              <div className="mono tabular" style={{ fontSize: 24, fontFamily: "var(--display)" }}>{s.v}</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4, fontFamily: "var(--mono)" }}>{s.sub}</div>
              <div style={{ marginTop: 12 }}>
                <AreaChart pts={pts} color="var(--acid)" h={28} w={140} showDot={false} strokeW={1.2}/>
              </div>
            </div>
          );
        })}
      </div>

      {/* THIRD: holdings + hooks I built */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Holdings */}
        <div className="card">
          <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="kicker">Holdings · {holdings.length}</span>
            <button className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 11 }}>View all <Icon name="arrow_right" size={11}/></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 110px 110px 80px", gap: 14, padding: "10px 22px", borderBottom: "1px solid var(--line)", fontSize: 10, color: "var(--ink-3)", fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.18em" }}>
            <span>Token</span><span style={{textAlign:"right"}}>Qty</span><span style={{textAlign:"right"}}>Value</span><span style={{textAlign:"right"}}>P/L</span><span style={{textAlign:"right"}}>24h</span>
          </div>
          {holdings.map((h, i) => (
            <div key={h.sym} style={{ display: "grid", gridTemplateColumns: "1fr 100px 110px 110px 80px", gap: 14, padding: "14px 22px", borderTop: i ? "1px solid var(--line)" : "none", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <TokenBubble sym={h.sym} size={28}/>
                <span style={{ fontSize: 14 }}>{h.sym}</span>
              </div>
              <span className="mono tabular" style={{ textAlign: "right", fontSize: 12, color: "var(--ink-2)" }}>{fmtN(h.qty)}</span>
              <span className="mono tabular" style={{ textAlign: "right", fontSize: 13 }}>{fmt$(h.value)}</span>
              <span className="mono tabular" style={{ textAlign: "right", fontSize: 13, color: h.pl >= 0 ? "var(--acid)" : "var(--crimson)" }}>{h.pl >= 0 ? "+" : ""}{fmt$(h.pl)}</span>
              <span className="mono tabular" style={{ textAlign: "right", fontSize: 12, color: h.ch >= 0 ? "var(--acid)" : "var(--crimson)" }}>{h.ch >= 0 ? "+" : ""}{h.ch}%</span>
            </div>
          ))}
        </div>

        {/* Distribution donut */}
        <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column" }}>
          <div className="kicker" style={{ marginBottom: 14 }}>Portfolio breakdown</div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Donut size={130} segments={[
              { v: 5264, c: "var(--acid)" },
              { v: 1823, c: "var(--ice)" },
              { v: 1790, c: "var(--gold)" },
              { v: 1018, c: "var(--plasma)" },
              { v: 882, c: "var(--crimson)" },
            ]}/>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
              {[
                { sym: "VAULT", c: "var(--acid)", pct: 49 },
                { sym: "FLUX", c: "var(--ice)", pct: 17 },
                { sym: "GHOST", c: "var(--gold)", pct: 17 },
                { sym: "PRISM", c: "var(--plasma)", pct: 9 },
                { sym: "RUNE", c: "var(--crimson)", pct: 8 },
              ].map(b => (
                <div key={b.sym} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: b.c }}/>
                  <span style={{ flex: 1 }}>{b.sym}</span>
                  <span className="mono tabular" style={{ color: "var(--ink-3)" }}>{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOURTH: hooks I built + achievements */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Built hooks */}
        <div className="card">
          <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--line)" }}>
            <span className="kicker">Hooks I built · 6</span>
          </div>
          {HOOKS.slice(0, 4).map((h, i) => (
            <div key={h.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 14, alignItems: "center", padding: "14px 22px", borderTop: i ? "1px solid var(--line)" : "none" }}>
              <HexIcon size={36} color="var(--acid)" filled>
                <Icon name={h.icon} size={14}/>
              </HexIcon>
              <div>
                <div style={{ fontSize: 13.5 }}>{h.name}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{fmtN(h.installs)} installs · {h.rating} ★</div>
              </div>
              <Spark pts={generateSpark(16, i + 3, 0.42)} color="var(--acid)" w={56} h={22}/>
              <span className="mono tabular" style={{ fontSize: 14, color: "var(--acid)", minWidth: 70, textAlign: "right" }}>{fmt$(h.revenue / 4)}</span>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="card" style={{ padding: 22 }}>
          <div className="kicker" style={{ marginBottom: 18 }}>Achievements · 6 / 18</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {achievements.map((a, i) => (
              <div key={i} style={{ padding: 14, textAlign: "center", border: "1px solid var(--line)", borderRadius: 10, opacity: a.u ? 1 : 0.4, background: a.u ? "rgba(255,255,255,0.022)" : "transparent" }}>
                <HexIcon size={38} color={a.u ? a.c : "var(--ink-4)"} filled={a.u}>
                  <Icon name={a.i} size={15}/>
                </HexIcon>
                <div style={{ fontSize: 11, marginTop: 10, color: a.u ? "var(--ink-2)" : "var(--ink-4)" }}>{a.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="card">
        <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
          <span className="kicker">Recent activity</span>
          <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>last 7d</span>
        </div>
        {[
          { i: "rocket", t: "Deployed $VAULT", d: "10b supply · 4 hooks · 0.042 ETH", time: "2h ago", c: "var(--acid)" },
          { i: "trophy", t: "Won battle vs $GHOST", d: "Earned 1.84 ETH from pot", time: "5h ago", c: "var(--gold)" },
          { i: "upload", t: "Published 'Vortex v2' hook", d: "Listed on marketplace · pending audit", time: "1d ago", c: "var(--acid)" },
          { i: "flame", t: "Joined raid on $RUNE", d: "Wagered 0.5 ETH · raid succeeded", time: "2d ago", c: "var(--crimson)" },
          { i: "users", t: "Hit 12K followers", d: "+842 this week", time: "3d ago", c: "var(--ice)" },
        ].map((a, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "center", padding: "14px 22px", borderTop: i ? "1px solid var(--line)" : "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 50, background: `${a.c === "var(--acid)" ? "var(--acid-bg)" : "rgba(255,255,255,0.04)"}`, border: "1px solid var(--line-2)", display: "grid", placeItems: "center", color: a.c }}>
              <Icon name={a.i} size={13}/>
            </div>
            <div>
              <div style={{ fontSize: 13.5 }}>{a.t}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{a.d}</div>
            </div>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

window.Profile = Profile;
