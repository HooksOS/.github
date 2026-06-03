/* Events page — seasonal events hub */

function CountdownTimer({ seconds }) {
  const [t, setT] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setT(x => Math.max(0, x - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.floor(t / 86400);
  const h = Math.floor((t % 86400) / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return (
    <div style={{ display: "flex", gap: 8, fontFamily: "var(--display)", fontSize: 32, fontWeight: 300 }}>
      <div style={{ textAlign: "center" }}><div className="tabular">{String(d).padStart(2,"0")}</div><div className="kicker" style={{ fontSize: 9 }}>D</div></div>
      <span style={{ color: "var(--ink-4)" }}>:</span>
      <div style={{ textAlign: "center" }}><div className="tabular">{String(h).padStart(2,"0")}</div><div className="kicker" style={{ fontSize: 9 }}>H</div></div>
      <span style={{ color: "var(--ink-4)" }}>:</span>
      <div style={{ textAlign: "center" }}><div className="tabular">{String(m).padStart(2,"0")}</div><div className="kicker" style={{ fontSize: 9 }}>M</div></div>
      <span style={{ color: "var(--ink-4)" }}>:</span>
      <div style={{ textAlign: "center" }}><div className="tabular glow-acid">{String(s).padStart(2,"0")}</div><div className="kicker" style={{ fontSize: 9 }}>S</div></div>
    </div>
  );
}

function EventCard({ event, featured }) {
  const liveSeries = useMemo(() => generateSpark(24, event.name.length + 7, 0.4), []);
  return (
    <div className={cls("card", featured && "scanlines")} style={{ padding: featured ? 36 : 24, position: "relative", overflow: "hidden", minHeight: featured ? 320 : 240, background: featured ? `linear-gradient(135deg, ${event.c}1a, transparent 60%)` : undefined }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(400px 220px at 100% 0%, ${event.c}1f, transparent 70%)`, pointerEvents: "none" }}/>

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: featured ? 28 : 18 }}>
        <HexIcon size={featured ? 64 : 44} color={event.c} filled>
          <Icon name={event.icon} size={featured ? 26 : 18}/>
        </HexIcon>
        {event.live ? (
          <span className="chip chip-acid"><span className="pulse-dot" style={{ width: 5, height: 5 }}/> Live</span>
        ) : event.soon ? (
          <span className="chip">Starts {event.starts}</span>
        ) : (
          <span className="chip">Ended</span>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <div className="kicker" style={{ marginBottom: 8, color: event.c }}>{event.cat}</div>
        <h3 className={featured ? "h2" : "h3"} style={{ fontSize: featured ? 40 : 22, marginBottom: featured ? 14 : 10, maxWidth: featured ? 460 : "none" }}>
          {event.name.split(" ").map((w, i) => i === event.name.split(" ").length - 1 ? <span key={i} className="italic" style={{ color: "var(--ink-3)" }}>{w}</span> : <span key={i}>{w} </span>)}
        </h3>
        {featured && <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 24, maxWidth: 460 }}>{event.desc}</p>}
      </div>

      {featured && (
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "auto auto auto", gap: 32, alignItems: "center", marginTop: 24 }}>
          <div>
            <div className="kicker" style={{ marginBottom: 6 }}>Time left</div>
            <CountdownTimer seconds={event.endsIn || 86400 * 2 + 12 * 3600}/>
          </div>
          <div>
            <div className="kicker" style={{ marginBottom: 6 }}>Prize pool</div>
            <div className="mono tabular" style={{ fontFamily: "var(--display)", fontSize: 36, fontWeight: 300, color: event.c }}>{fmt$(event.prize)}</div>
          </div>
          <div>
            <div className="kicker" style={{ marginBottom: 6 }}>Players</div>
            <div className="mono tabular" style={{ fontFamily: "var(--display)", fontSize: 36, fontWeight: 300 }}>{fmtN(event.players)}</div>
          </div>
        </div>
      )}

      {!featured && (
        <div style={{ marginTop: "auto", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div className="kicker" style={{ marginBottom: 2 }}>Prize</div>
              <div className="mono tabular" style={{ fontSize: 18, fontFamily: "var(--display)", color: event.c }}>{fmt$(event.prize)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="kicker" style={{ marginBottom: 2 }}>Players</div>
              <div className="mono tabular" style={{ fontSize: 14 }}>{fmtN(event.players)}</div>
            </div>
          </div>
          <AreaChart pts={liveSeries} color={event.c} h={32} w={300} showDot={false} strokeW={1.2}/>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: featured ? 28 : 16, position: "relative" }}>
        <button className="btn btn-primary" style={{ padding: featured ? "12px 22px" : "8px 14px", fontSize: featured ? 14 : 12 }}>
          {event.live ? "Enter event" : event.soon ? "Set reminder" : "View results"} <Icon name="arrow_right" size={featured ? 14 : 12}/>
        </button>
        {featured && <button className="btn btn-ghost" style={{ padding: "12px 22px", fontSize: 14 }}><Icon name="trophy" size={14}/> Leaderboard</button>}
      </div>
    </div>
  );
}

function Events() {
  const featured = {
    name: "Meme Wars Season 4",
    cat: "Battle Royale · Season Finale",
    icon: "swords",
    c: "var(--plasma)",
    desc: "The biggest event of the year. 8 teams, 1024 fighters, single elimination. Last clan standing splits a $1.2M pot. Pre-register your clan now — bracket locks in 2 days.",
    live: true,
    endsIn: 2 * 86400 + 12 * 3600 + 14 * 60 + 22,
    prize: 1200000,
    players: 8420,
  };

  const events = [
    { name: "Liquidity Deathmatch", cat: "Trading · Solo", icon: "droplet", c: "var(--acid)", live: true, prize: 421000, players: 2104 },
    { name: "Sniper Survival", cat: "Anti-Bot · Solo", icon: "target", c: "var(--ice)", soon: true, starts: "in 3d", prize: 184000, players: 1240 },
    { name: "Burn Weekend", cat: "Reward · Open", icon: "flame", c: "var(--crimson)", live: true, prize: 84000, players: 4820 },
    { name: "Jackpot Lottery", cat: "Open · Daily", icon: "diamond", c: "var(--gold)", live: true, prize: 42000, players: 8421 },
    { name: "Hook Wars", cat: "Builder · Bi-weekly", icon: "cpu", c: "var(--plasma)", soon: true, starts: "in 5d", prize: 64000, players: 384 },
    { name: "Whale Hunt", cat: "PvP · Open", icon: "swords", c: "var(--crimson)", live: true, prize: 124000, players: 1840 },
  ];

  const seasons = [
    { s: "S1", t: "Genesis Wars", winner: "Phoenix", reward: 184000 },
    { s: "S2", t: "Cold Front", winner: "Ghost Riders", reward: 412000 },
    { s: "S3", t: "Iron Liquidity", winner: "Diamond Hands", reward: 824000 },
    { s: "S4", t: "Meme Wars", winner: "TBD", reward: 1200000 },
  ];

  return (
    <div className="shell" style={{ paddingTop: 56, paddingBottom: 80 }} data-screen-label="09 Events">
      <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
        <div>
          <span className="kicker">events · season 4</span>
          <h1 className="h-display" style={{ fontSize: 92, marginTop: 18, marginBottom: 14 }}>
            <span className="italic" style={{ color: "var(--ink-3)" }}>The</span> events.
          </h1>
          <p style={{ fontSize: 15, color: "var(--ink-2)", maxWidth: 540, lineHeight: 1.55 }}>
            Seasonal tournaments, raids, and lotteries. Compete for million-dollar pots. New events drop every Monday.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost"><Icon name="bell" size={14}/> Notify me</button>
          <button className="btn btn-ghost"><Icon name="trophy" size={14}/> My events · 3</button>
        </div>
      </div>

      {/* Hero featured event */}
      <div style={{ marginBottom: 28 }}>
        <EventCard event={featured} featured/>
      </div>

      {/* Stats strip */}
      <div className="card" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: 0, marginBottom: 28 }}>
        {[
          { l: "Total prize pool", v: "$2.18M", spark: 0.4 },
          { l: "Active players", v: "24,840", spark: 0.42 },
          { l: "Events this season", v: 18, spark: 0.4 },
          { l: "Hook firings · today", v: "4.2M", spark: 0.46 },
        ].map((s, i) => {
          const pts = useMemo(() => generateSpark(20, i + 5, s.spark), [i]);
          return (
            <div key={i} style={{ padding: 22, borderLeft: i ? "1px solid var(--line)" : "none", position: "relative" }}>
              <div className="kicker" style={{ marginBottom: 10 }}>{s.l}</div>
              <div className="mono tabular" style={{ fontSize: 28, fontFamily: "var(--display)" }}>{s.v}</div>
              <div style={{ marginTop: 12 }}>
                <AreaChart pts={pts} color="var(--acid)" h={26} w={140} showDot={false} strokeW={1.2}/>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active events */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <span className="kicker">all events · {events.length}</span>
          <div style={{ display: "flex", gap: 6, padding: 3, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", borderRadius: 8 }}>
            {["All", "Live", "Upcoming", "PvP", "Trading"].map((f, i) => (
              <button key={f} style={{ padding: "5px 11px", fontSize: 12, borderRadius: 6, background: i === 0 ? "rgba(255,255,255,0.07)" : "transparent", color: i === 0 ? "var(--ink)" : "var(--ink-3)" }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {events.map((e, i) => <EventCard key={i} event={e}/>)}
        </div>
      </div>

      {/* Past seasons */}
      <div className="card">
        <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
          <span className="kicker">Season history</span>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>4 seasons · $2.6M paid</span>
        </div>
        {seasons.map((s, i) => (
          <div key={s.s} style={{ display: "grid", gridTemplateColumns: "60px 1fr 200px 140px", gap: 18, padding: "18px 22px", borderTop: i ? "1px solid var(--line)" : "none", alignItems: "center" }}>
            <span className="mono" style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 300, color: i === seasons.length - 1 ? "var(--acid)" : "var(--ink-3)" }}>{s.s}</span>
            <div>
              <div style={{ fontSize: 16 }}>{s.t}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{i === seasons.length - 1 ? "in progress" : "completed"}</div>
            </div>
            <div>
              <div className="kicker" style={{ marginBottom: 2 }}>Winner</div>
              <div style={{ fontSize: 13 }}>{s.winner}</div>
            </div>
            <span className="mono tabular" style={{ fontSize: 16, fontFamily: "var(--display)", color: "var(--acid)", textAlign: "right" }}>{fmt$(s.reward)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

window.Events = Events;
