/* PvP Battle Arena — live battles, leaderboards, clans */

function Countdown({ target }) {
  const [t, setT] = useState(target);
  useEffect(() => {
    const id = setInterval(() => setT(x => Math.max(0, x - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(t / 60), s = t % 60;
  return <span className="mono tabular">{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}</span>;
}

function BattleHero() {
  const [tickA, setTickA] = useState(54);
  const [tickB, setTickB] = useState(46);
  useEffect(() => {
    const id = setInterval(() => {
      const delta = (Math.random() - 0.5) * 6;
      setTickA(t => Math.max(15, Math.min(85, t + delta)));
      setTickB(t => Math.max(15, Math.min(85, 100 - (t + delta))));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
      {/* arena bg */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(800px 200px at 25% 50%, oklch(0.78 0.18 230 / 0.15), transparent 60%), radial-gradient(800px 200px at 75% 50%, oklch(0.7 0.23 25 / 0.15), transparent 60%), repeating-linear-gradient(90deg, transparent 0 80px, rgba(255,255,255,0.02) 80px 81px)", pointerEvents: "none" }}/>
      <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="pulse-dot"/>
          <span className="kicker" style={{ color: "oklch(0.86 0.21 145)" }}>Live battle · Round 14</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="kicker">Ends in</span>
          <span style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--ink)" }}><Countdown target={184}/></span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", padding: 36, gap: 24, alignItems: "center", position: "relative" }}>
        {/* Token A */}
        <div style={{ textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14, marginBottom: 18 }}>
            <div style={{ textAlign: "right" }}>
              <div className="kicker" style={{ color: "var(--acid)" }}>Team Green</div>
              <div style={{ fontFamily: "var(--display)", fontSize: 28, marginTop: 4 }}>$VAULT</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>2,142 fighters</div>
            </div>
            <TokenBubble sym="VA" size={64}/>
          </div>
          <div className="mono tabular glow-acid" style={{ fontFamily: "var(--display)", fontSize: 80, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em" }}>
            {tickA.toFixed(0)}<span style={{ fontSize: 40, color: "var(--ink-3)" }}>%</span>
          </div>
          <div className="kicker" style={{ marginTop: 6 }}>Win prob.</div>
        </div>

        {/* VS center */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "0 20px" }}>
          <div style={{ fontFamily: "var(--display)", fontSize: 48, color: "var(--ink-3)" }}>VS</div>
          <div className="chip chip-gold"><Icon name="trophy" size={11}/> {fmt$(421000)} pot</div>
        </div>

        {/* Token B */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <TokenBubble sym="GH" size={64}/>
            <div>
              <div className="kicker" style={{ color: "oklch(0.88 0.14 25)" }}>Team Red</div>
              <div style={{ fontFamily: "var(--display)", fontSize: 28, marginTop: 4 }}>$GHOST</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>1,820 fighters</div>
            </div>
          </div>
          <div className="mono tabular" style={{ fontFamily: "var(--display)", fontSize: 80, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em", color: "oklch(0.88 0.14 25)", textShadow: "0 0 14px oklch(0.7 0.23 25 / 0.5)" }}>
            {tickB.toFixed(0)}<span style={{ fontSize: 40, color: "var(--ink-3)" }}>%</span>
          </div>
          <div className="kicker" style={{ marginTop: 6 }}>Win prob.</div>
        </div>
      </div>

      {/* tug-of-war bar */}
      <div style={{ padding: "0 36px 24px", position: "relative" }}>
        <div style={{ height: 8, borderRadius: 100, background: "rgba(255,255,255,0.05)", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${tickA}%`, background: "linear-gradient(90deg, var(--acid), oklch(0.88 0.21 142 / 0.4))", transition: "width 600ms ease", boxShadow: "0 0 16px var(--acid-glow)" }}/>
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: `${tickB}%`, background: "linear-gradient(270deg, oklch(0.7 0.23 25), oklch(0.7 0.23 25 / 0.4))", transition: "width 600ms ease", boxShadow: "0 0 16px oklch(0.7 0.23 25 / 0.5)" }}/>
        </div>
      </div>

      {/* place bet bar */}
      <div style={{ padding: "20px 24px", borderTop: "1px solid var(--line)", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="wallet" size={14} style={{ color: "var(--ink-3)" }}/>
          <span style={{ fontSize: 13, color: "var(--ink-2)" }}>Your wager</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 8 }}>
            <span className="mono tabular" style={{ fontSize: 14 }}>0.250</span>
            <span style={{ fontSize: 11, color: "var(--ink-3)" }}>ETH</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn" style={{ background: "var(--acid-bg)", color: "oklch(0.95 0.16 142)", border: "1px solid var(--acid-line)", boxShadow: "0 0 24px -10px var(--acid-glow)" }}>
            <Icon name="shield" size={14}/> Bet Green · 1.85x
          </button>
          <button className="btn" style={{ background: "oklch(0.7 0.23 25 / 0.18)", color: "oklch(0.88 0.14 25)", border: "1px solid oklch(0.7 0.23 25 / 0.4)", boxShadow: "0 0 24px -10px oklch(0.7 0.23 25 / 0.6)" }}>
            <Icon name="flame" size={14}/> Bet Red · 2.18x
          </button>
        </div>
      </div>
    </div>
  );
}

function ArenaActivity() {
  const [items, setItems] = useState([
    { who: "0x4f…c3a1", side: "Green", amt: 0.5, ago: "2s" },
    { who: "Diamond_69", side: "Red", amt: 1.2, ago: "8s" },
    { who: "ghostking", side: "Red", amt: 0.25, ago: "14s" },
    { who: "0xa1…4c7d", side: "Green", amt: 2.4, ago: "22s" },
    { who: "satoshi.eth", side: "Green", amt: 0.42, ago: "32s" },
    { who: "0x99…01ab", side: "Red", amt: 0.18, ago: "44s" },
  ]);
  useEffect(() => {
    const id = setInterval(() => {
      const names = ["0x4f…c3a1", "ghostking", "Diamond_69", "satoshi.eth", "0xa1…4c7d", "vault_chad", "0x99…01ab"];
      setItems(prev => [
        { who: names[Math.floor(Math.random() * names.length)], side: Math.random() > 0.5 ? "Green" : "Red", amt: +(Math.random() * 2.5).toFixed(2), ago: "now" },
        ...prev.slice(0, 7).map((x, i) => ({ ...x, ago: `${(i + 1) * 8}s` }))
      ]);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="kicker"><Icon name="radio" size={12} style={{ marginRight: 6, color: "oklch(0.86 0.21 145)" }}/> Battle feed</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>last 5 min</span>
      </div>
      <div>
        {items.slice(0, 7).map((b, i) => (
          <div key={i} style={{ padding: "10px 18px", borderBottom: i < 6 ? "1px solid var(--line)" : "none", display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, alignItems: "center", opacity: 1 - i * 0.08 }}>
            <span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{b.who}</span>
            <span className="chip" style={{ background: b.side === "Green" ? "var(--acid-bg)" : "oklch(0.7 0.23 25 / 0.18)", color: b.side === "Green" ? "oklch(0.95 0.16 142)" : "oklch(0.88 0.14 25)", borderColor: b.side === "Green" ? "var(--acid-line)" : "oklch(0.7 0.23 25 / 0.4)" }}>
              {b.side}
            </span>
            <span className="mono tabular" style={{ fontSize: 12 }}>{b.amt}Ξ</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Leaderboard() {
  const players = [
    { rank: 1, name: "ghostking", clan: "Ghost Riders", wins: 412, w: 1248, ch: 124 },
    { rank: 2, name: "vault_chad", clan: "Diamond Hands", wins: 384, w: 1842, ch: 84 },
    { rank: 3, name: "0xPyro", clan: "Phoenix", wins: 318, w: 2400, ch: -12 },
    { rank: 4, name: "satoshi.eth", clan: "OG Cabal", wins: 284, w: 412, ch: 38 },
    { rank: 5, name: "0x4f…c3a1", clan: "Phoenix", wins: 248, w: 124, ch: 18 },
    { rank: 6, name: "Diamond_69", clan: "Diamond Hands", wins: 218, w: 82, ch: 6 },
    { rank: 7, name: "mevmaster", clan: "Ghost Riders", wins: 184, w: 1240, ch: 21 },
  ];
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 4 }}>Season 4 · all-time leaderboard</div>
          <div style={{ fontFamily: "var(--display)", fontSize: 18 }}>Top Fighters</div>
        </div>
        <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}>View all</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 100px 100px 80px", gap: 14, padding: "10px 22px", borderBottom: "1px solid var(--line)", fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        <span>#</span><span>Player</span><span style={{textAlign:"right"}}>Wins</span><span style={{textAlign:"right"}}>Won (Ξ)</span><span style={{textAlign:"right"}}>7d</span>
      </div>
      {players.map(p => (
        <div key={p.rank} style={{ display: "grid", gridTemplateColumns: "40px 1fr 100px 100px 80px", gap: 14, padding: "12px 22px", borderBottom: "1px solid var(--line)", alignItems: "center" }}>
          {p.rank <= 3 ? (
            <div style={{ width: 28, height: 28, borderRadius: 8, background: ["oklch(0.85 0.16 85)", "oklch(0.78 0.04 270)", "oklch(0.65 0.1 60)"][p.rank - 1], display: "grid", placeItems: "center", color: "#000", fontWeight: 700, fontSize: 12 }}>
              {p.rank}
            </div>
          ) : (
            <span className="mono" style={{ color: "var(--ink-3)", fontSize: 13 }}>{p.rank}</span>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <TokenBubble sym={p.name.slice(0, 2)} size={28}/>
            <div>
              <div style={{ fontSize: 13 }}>{p.name}</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>{p.clan}</div>
            </div>
          </div>
          <span className="mono tabular" style={{ fontSize: 13, textAlign: "right" }}>{p.wins}</span>
          <span className="mono tabular" style={{ fontSize: 13, textAlign: "right" }}>{p.w}</span>
          <span className="mono tabular" style={{ fontSize: 12, textAlign: "right", color: p.ch >= 0 ? "oklch(0.86 0.21 145)" : "oklch(0.7 0.23 25)" }}>
            {p.ch >= 0 ? "+" : ""}{p.ch}%
          </span>
        </div>
      ))}
    </div>
  );
}

function ClanCard({ name, members, power, c }) {
  return (
    <div className="card card-pad" style={{ minHeight: 160, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${c}, transparent 70%)`, opacity: 0.2 }}/>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 11, background: `linear-gradient(135deg, ${c}, ${c}66)`, display: "grid", placeItems: "center" }}>
          <Icon name="shield" size={20} style={{ color: "#000" }}/>
        </div>
        <div>
          <div style={{ fontFamily: "var(--display)", fontSize: 17 }}>{name}</div>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{members} members</div>
        </div>
      </div>
      <div className="kicker" style={{ marginBottom: 6 }}>Power</div>
      <div className="mono tabular" style={{ fontFamily: "var(--display)", fontSize: 24, color: c }}>{power}</div>
      <div style={{ height: 4, borderRadius: 100, background: "rgba(255,255,255,0.05)", marginTop: 10, overflow: "hidden" }}>
        <div style={{ width: `${(power / 10000) * 100}%`, height: "100%", background: c }}/>
      </div>
    </div>
  );
}

function Arena() {
  const events = [
    { name: "Meme Wars · Season 4", st: "live", time: "ends 2d 14h", prize: 421000, icon: "swords", c: "oklch(0.7 0.24 305)" },
    { name: "Liquidity Deathmatch", st: "upcoming", time: "starts in 3d", prize: 184000, icon: "droplet", c: "oklch(0.78 0.18 230)" },
    { name: "Sniper Survival", st: "upcoming", time: "starts in 7d", prize: 84000, icon: "target", c: "oklch(0.86 0.21 145)" },
    { name: "Burn Weekend", st: "live", time: "ends 8h", prize: 42000, icon: "flame", c: "oklch(0.7 0.23 25)" },
  ];

  return (
    <div className="shell" style={{ paddingTop: 40, paddingBottom: 80 }} data-screen-label="04 PvP Arena">
      <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 36 }}>
        <div>
          <span className="kicker">arena · season 4</span>
          <h1 className="h-display" style={{ fontSize: 92, marginTop: 18, marginBottom: 14 }}>
            <span className="italic" style={{ color: "var(--ink-3)" }}>The</span> arena.
          </h1>
          <p style={{ fontSize: 15, color: "var(--ink-2)", maxWidth: 540, lineHeight: 1.55 }}>
            Wager on tokens. Win pots. Climb the ladder. Every battle settles on-chain.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost"><Icon name="trophy" size={14}/> My battles · 21</button>
          <button className="btn btn-neon"><Icon name="plus" size={14}/> Create battle</button>
        </div>
      </div>

      {/* Hero battle */}
      <BattleHero/>

      {/* Two-column: events + activity */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginTop: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, marginTop: 8 }}>
            <span className="kicker">seasonal events</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>4 active</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {events.map((e, i) => (
              <div key={i} className="card card-pad" style={{ position: "relative", overflow: "hidden", minHeight: 160 }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(300px 150px at 100% 0%, ${e.c}22, transparent 70%)`, pointerEvents: "none" }}/>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, position: "relative" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, color: e.c, background: `${e.c}1a`, border: `1px solid ${e.c}33`, display: "grid", placeItems: "center" }}>
                    <Icon name={e.icon} size={20}/>
                  </div>
                  {e.st === "live" ? (
                    <span className="chip chip-green"><span className="pulse-dot" style={{ width: 5, height: 5 }}/> Live</span>
                  ) : (
                    <span className="chip">Soon</span>
                  )}
                </div>
                <div style={{ fontFamily: "var(--display)", fontSize: 18, marginBottom: 6, position: "relative" }}>{e.name}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 14 }}>{e.time}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                  <div>
                    <div className="kicker" style={{ marginBottom: 2 }}>Prize pool</div>
                    <span className="mono tabular" style={{ fontSize: 16, color: e.c }}>{fmt$(e.prize)}</span>
                  </div>
                  <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}>Enter <Icon name="arrow_right" size={12}/></button>
                </div>
              </div>
            ))}
          </div>

          {/* Clans */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, marginTop: 32 }}>
            <span className="kicker">top clans</span>
            <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}>Browse all <Icon name="arrow_right" size={12}/></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            <ClanCard name="Phoenix" members={1248} power={9842} c="oklch(0.85 0.16 85)"/>
            <ClanCard name="Diamond Hands" members={2104} power={8421} c="oklch(0.78 0.18 230)"/>
            <ClanCard name="Ghost Riders" members={842} power={7218} c="oklch(0.7 0.24 305)"/>
            <ClanCard name="OG Cabal" members={418} power={5824} c="oklch(0.86 0.21 145)"/>
          </div>

          {/* Achievements */}
          <div style={{ marginTop: 32 }}>
            <span className="kicker">your achievements</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginTop: 14 }}>
              {[
                { i: "trophy", l: "First win", u: true, c: "oklch(0.85 0.16 85)" },
                { i: "flame", l: "Win streak ×5", u: true, c: "oklch(0.7 0.23 25)" },
                { i: "crown", l: "Top 100", u: true, c: "oklch(0.85 0.16 85)" },
                { i: "swords", l: "100 battles", u: true, c: "oklch(0.78 0.18 230)" },
                { i: "diamond", l: "Diamond league", u: false, c: "var(--ink-4)" },
                { i: "star", l: "Legend", u: false, c: "var(--ink-4)" },
              ].map((a, i) => (
                <div key={i} className="card" style={{ padding: 16, textAlign: "center", opacity: a.u ? 1 : 0.4 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 50, background: a.u ? `${a.c}22` : "rgba(255,255,255,0.03)", border: `1px solid ${a.u ? a.c + "55" : "var(--line-2)"}`, display: "grid", placeItems: "center", color: a.c, margin: "0 auto 8px" }}>
                    <Icon name={a.i} size={18}/>
                  </div>
                  <div style={{ fontSize: 11, color: a.u ? "var(--ink-2)" : "var(--ink-4)" }}>{a.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <ArenaActivity/>
          <Leaderboard/>
        </div>
      </div>
    </div>
  );
}

window.Arena = Arena;
