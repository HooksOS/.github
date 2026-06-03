/* Hook Marketplace — refined */

const HOOK_CATS = ["All", "Trading", "Protection", "Reward", "PvP", "AI", "Liquidity", "Social", "Event"];
const CAT_COLOR = {
  Trading: "var(--gold)",
  Protection: "var(--acid)",
  Reward: "var(--crimson)",
  PvP: "var(--plasma)",
  AI: "var(--plasma)",
  Liquidity: "var(--ice)",
  Social: "var(--gold)",
  Event: "var(--crimson)",
};

function HookCardLarge({ hook, onClick }) {
  const c = CAT_COLOR[hook.cat] || "var(--acid)";
  const pts = useMemo(() => generateSpark(28, hook.installs % 100 + 1, 0.42), [hook.id]);

  return (
    <div className="card card-glow" style={{ padding: 22, cursor: "pointer", display: "flex", flexDirection: "column", gap: 16, position: "relative", overflow: "hidden", minHeight: 290 }} onClick={onClick}>
      {hook.featured && (
        <div style={{ position: "absolute", top: 0, right: 0, padding: "3px 10px 4px", background: "var(--gold)", color: "#1a1300", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", borderRadius: "0 12px 0 8px" }}>★ Featured</div>
      )}

      {/* hex icon + chips */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <HexIcon size={48} color={c} filled>
          <Icon name={hook.icon} size={20}/>
        </HexIcon>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
          {hook.verified && <span className="chip chip-acid"><Icon name="check" size={9}/> Audited</span>}
          {hook.premium && <span className="chip chip-gold">Pro · $19/mo</span>}
        </div>
      </div>

      <div>
        <div className="kicker" style={{ marginBottom: 8, color: c }}>{hook.cat}</div>
        <h3 className="h3" style={{ fontSize: 22, marginBottom: 10 }}>{hook.name}</h3>
        <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{hook.desc}</p>
      </div>

      <div style={{ marginTop: "auto", display: "flex", alignItems: "end", justifyContent: "space-between" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 6 }}>install trend</div>
          <Spark pts={pts} color="var(--acid)" w={110} h={28}/>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="kicker" style={{ marginBottom: 2 }}>30d revenue</div>
          <div className="mono tabular" style={{ fontSize: 18, fontFamily: "var(--display)", color: "var(--acid)" }}>{fmt$(hook.revenue)}</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--line)" }}>
        <div style={{ display: "flex", gap: 18, fontSize: 12, color: "var(--ink-2)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="download" size={11}/> <span className="mono tabular">{fmtN(hook.installs)}</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="star" size={11} style={{ color: "var(--gold)" }}/> <span className="mono tabular">{hook.rating}</span>
          </span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>by {hook.author}</span>
        </div>
        <Icon name="arrow_right" size={14} style={{ color: "var(--ink-3)" }}/>
      </div>
    </div>
  );
}

function HookDetail({ hook, onClose }) {
  if (!hook) return null;
  const c = CAT_COLOR[hook.cat];
  const reviews = [
    { who: "VAULT Team", body: "Saved us from 3 sandwich attacks in the first week. The auction routing is genuinely magic.", rating: 5, ago: "2d" },
    { who: "0xPyro", body: "Slight gas overhead but completely worth it. The hook auto-tunes after every block.", rating: 5, ago: "5d" },
    { who: "GHOST DAO", body: "We pair this with Sniper Cage and our launches have zero bot wallets in the top holders.", rating: 4, ago: "1w" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)", display: "flex", alignItems: "stretch", justifyContent: "flex-end" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "min(720px, 100vw)", background: "var(--bg-1)", borderLeft: "1px solid var(--line-2)", overflowY: "auto" }}>
        <div style={{ padding: 36, borderBottom: "1px solid var(--line)", position: "relative", background: `radial-gradient(500px 250px at 100% 0%, ${c === "var(--acid)" ? "var(--acid-bg)" : "rgba(255,255,255,0.04)"}, transparent 70%)` }}>
          <button onClick={onClose} style={{ position: "absolute", top: 24, right: 24, width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--line-2)", display: "grid", placeItems: "center" }}>
            <Icon name="x" size={14}/>
          </button>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 20 }}>
            <HexIcon size={68} color={c} filled>
              <Icon name={hook.icon} size={28}/>
            </HexIcon>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                <span className="chip" style={{ color: c, borderColor: `${c === "var(--acid)" ? "var(--acid-line)" : "var(--line-2)"}`, background: c === "var(--acid)" ? "var(--acid-bg)" : "rgba(255,255,255,0.04)" }}>{hook.cat}</span>
                {hook.verified && <span className="chip chip-acid"><Icon name="check" size={9}/> Audited</span>}
                {hook.premium && <span className="chip chip-gold">Premium</span>}
              </div>
              <h2 className="h2" style={{ fontSize: 38, marginBottom: 8 }}>{hook.name}</h2>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.04em" }}>0x4b…7ec2 · published by {hook.author}</div>
            </div>
          </div>
          <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, margin: 0, marginBottom: 24 }}>{hook.desc}</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-primary"><Icon name="download" size={14}/> Install · {hook.premium ? "$19/mo" : "Free"}</button>
            <button className="btn btn-ghost"><Icon name="play" size={12}/> Simulate</button>
            <button className="btn btn-ghost"><Icon name="code" size={12}/> View source</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid var(--line)" }}>
          {[
            ["Installs", fmtN(hook.installs)],
            ["Rating", `${hook.rating} ★`],
            ["30d rev", fmt$(hook.revenue)],
            ["Gas", hook.gas || "+4% avg"],
          ].map(([k, v], i) => (
            <div key={k} style={{ padding: 22, borderLeft: i ? "1px solid var(--line)" : "none" }}>
              <div className="kicker" style={{ marginBottom: 10 }}>{k}</div>
              <div className="mono tabular" style={{ fontSize: 22, fontFamily: "var(--display)" }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: 36 }}>
          <div className="kicker" style={{ marginBottom: 16 }}>Performance · last 30d</div>
          <div className="card" style={{ padding: 20, marginBottom: 32 }}>
            <Spark pts={generateSpark(60, 7, 0.42)} color="var(--acid)" w={640} h={140} strokeW={2}/>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--ink-3)" }}>
              <span>30d ago</span><span>20d</span><span>10d</span><span>today</span>
            </div>
          </div>

          <div className="kicker" style={{ marginBottom: 16 }}>What this hook does</div>
          <div className="card" style={{ padding: 22, marginBottom: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { l: "beforeSwap", d: "Inspects every swap before routing" },
                { l: "afterSwap", d: "Updates state post-trade for fees" },
                { l: "beforeAddLiquidity", d: "Validates LP additions" },
              ].map(x => (
                <div key={x.l}>
                  <div className="mono" style={{ fontSize: 12, color: "var(--acid)", marginBottom: 6 }}>{x.l}()</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.5 }}>{x.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="kicker" style={{ marginBottom: 16 }}>Reviews · {reviews.length}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {reviews.map((r, i) => (
              <div key={i} className="card" style={{ padding: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <TokenBubble sym={r.who.slice(0,2)} size={24}/>
                    <span style={{ fontSize: 13 }}>{r.who}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ display: "flex", gap: 2 }}>
                      {[...Array(5)].map((_, i) => <Icon key={i} name="star" size={10} style={{ color: i < r.rating ? "var(--gold)" : "var(--ink-4)" }}/>)}
                    </div>
                    <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{r.ago}</span>
                  </div>
                </div>
                <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55 }}>{r.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Marketplace() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("trending");
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ verified: false });

  const filtered = useMemo(() => {
    let list = HOOKS.slice();
    if (cat !== "All") list = list.filter(h => h.cat === cat);
    if (q) list = list.filter(h => (h.name + h.desc + h.author).toLowerCase().includes(q.toLowerCase()));
    if (filters.verified) list = list.filter(h => h.verified);
    if (sort === "trending") list.sort((a, b) => b.installs - a.installs);
    if (sort === "revenue") list.sort((a, b) => b.revenue - a.revenue);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "new") list.sort((a, b) => a.installs - b.installs);
    return list;
  }, [cat, q, sort, filters]);

  return (
    <div className="shell" style={{ paddingTop: 56, paddingBottom: 80 }} data-screen-label="02 Hook Marketplace">
      {/* hero */}
      <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 24 }}>
        <div>
          <span className="kicker">marketplace · {HOOKS.length} hooks</span>
          <h1 className="h-display" style={{ fontSize: 92, marginTop: 18, marginBottom: 18, maxWidth: 800 }}>
            <span className="italic" style={{ color: "var(--ink-3)" }}>The</span> hook<br/>
            marketplace.
          </h1>
          <p style={{ fontSize: 15, color: "var(--ink-2)", maxWidth: 540, lineHeight: 1.55 }}>
            Programmable behaviors built by the community. Browse, install, earn. Every hook is verifiable on-chain.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-neon"><Icon name="upload" size={14}/> Publish a hook</button>
          <button className="btn btn-ghost"><Icon name="book" size={14}/> SDK docs</button>
        </div>
      </div>

      {/* featured banner */}
      <div className="card scanlines" style={{ padding: 0, marginBottom: 32, position: "relative", overflow: "hidden", background: "linear-gradient(135deg, var(--plasma-bg), var(--acid-bg))" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 32, alignItems: "center", padding: 32 }}>
          <HexIcon size={96} color="var(--plasma)" filled>
            <Icon name="swords" size={38}/>
          </HexIcon>
          <div>
            <span className="chip chip-plasma" style={{ marginBottom: 12 }}>★ FEATURED THIS WEEK</span>
            <h3 className="h2" style={{ fontSize: 38, margin: "12px 0", maxWidth: 540 }}>
              PvP Wager <span className="italic" style={{ color: "var(--ink-3)" }}>— bet your bag on the next candle.</span>
            </h3>
            <p style={{ fontSize: 14, color: "var(--ink-2)", margin: 0, maxWidth: 580, lineHeight: 1.55 }}>
              The first PvP hook on HookOS. Holders wager on price direction every block. Losers' stakes get redistributed to winners. Clan system + live arena baked in.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
            <button className="btn btn-primary">Install <Icon name="arrow_right" size={14}/></button>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>5,820 installs · 4.6 ★</span>
          </div>
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", padding: 4, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", borderRadius: 10 }}>
          {HOOK_CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "7px 13px", borderRadius: 7, fontSize: 13,
              background: cat === c ? "rgba(255,255,255,0.07)" : "transparent",
              color: cat === c ? "var(--ink)" : "var(--ink-2)",
              transition: "all 120ms",
            }}>
              {c}
              {cat === c && <span className="mono" style={{ marginLeft: 6, fontSize: 10, color: "var(--ink-3)" }}>
                {c === "All" ? HOOKS.length : HOOKS.filter(h => h.cat === c).length}
              </span>}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "rgba(255,255,255,0.025)", border: "1px solid var(--line-2)", borderRadius: 8, width: 240 }}>
            <Icon name="search" size={13} style={{ color: "var(--ink-3)" }}/>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search hooks…" style={{ background: "transparent", border: "none", outline: "none", flex: 1, fontSize: 13 }}/>
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.025)", border: "1px solid var(--line-2)", borderRadius: 8, color: "var(--ink)", fontSize: 13 }}>
            <option value="trending">Trending</option>
            <option value="revenue">Top revenue</option>
            <option value="rating">Top rated</option>
            <option value="new">Newest</option>
          </select>
          <button onClick={() => setFilters(f => ({ ...f, verified: !f.verified }))} className="btn btn-ghost" style={{ padding: "8px 12px", fontSize: 12, color: filters.verified ? "oklch(0.95 0.16 142)" : "var(--ink-2)", borderColor: filters.verified ? "var(--acid-line)" : "var(--line-2)" }}>
            <Icon name="check" size={12}/> Audited only
          </button>
        </div>
      </div>

      {/* grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {filtered.map(h => <HookCardLarge key={h.id} hook={h} onClick={() => setSelected(h)}/>)}
      </div>

      <HookDetail hook={selected} onClose={() => setSelected(null)}/>
    </div>
  );
}

window.Marketplace = Marketplace;
window.CAT_COLOR = CAT_COLOR;
