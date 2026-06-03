/* Token Launch Wizard — multi-step with live sim panel */

const STEPS = [
  { id: 1, t: "Identity", icon: "diamond" },
  { id: 2, t: "Supply", icon: "layers" },
  { id: 3, t: "Liquidity", icon: "droplet" },
  { id: 4, t: "Hooks", icon: "sparkles" },
  { id: 5, t: "Protection", icon: "shield" },
  { id: 6, t: "Review", icon: "rocket" },
];

function LaunchSim({ form, step }) {
  // a small simulated market preview that varies based on the form
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf, start = performance.now();
    const loop = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pts = useMemo(() => {
    // shape depends on form.hooks selection
    const protection = form.hooks.includes("h4") || form.hooks.includes("h1");
    const burn = form.hooks.includes("h2");
    const bias = protection ? 0.4 : burn ? 0.38 : 0.5;
    return generateSpark(60, form.name.length + form.hooks.length * 7 + 1, bias);
  }, [form.hooks, form.name]);

  const W = 460, H = 200;
  const max = Math.max(...pts), min = Math.min(...pts);
  const range = max - min || 1;
  const stepX = W / (pts.length - 1);
  let d = "";
  pts.forEach((p, i) => {
    d += `${i === 0 ? "M" : "L"}${(i * stepX).toFixed(2)},${(H - ((p - min) / range) * H).toFixed(2)}`;
  });

  const projectedFDV = form.supply * (form.liquidity / form.supply) * 1.4;

  return (
    <div className="card" style={{ overflow: "hidden", position: "sticky", top: 80 }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="pulse-dot" style={{ background: "oklch(0.7 0.24 305)" }}/>
          <span className="kicker" style={{ color: "oklch(0.88 0.13 305)" }}>Live simulation</span>
        </div>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>updates as you type</span>
      </div>

      {/* token preview */}
      <div style={{ padding: 18, borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 14 }}>
        <TokenBubble sym={form.symbol || "??"} size={56}/>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "var(--display)", fontSize: 22 }}>${form.symbol || "TICKER"}</span>
            <span className="chip chip-blue">Base</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>{form.name || "Token name"}</div>
        </div>
      </div>

      {/* sim chart */}
      <div style={{ padding: 14 }}>
        <div className="kicker" style={{ marginBottom: 10 }}>Projected 7d price action</div>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
          <defs>
            <linearGradient id="launchG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.7 0.24 305)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="oklch(0.7 0.24 305)" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map(g => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgba(255,255,255,0.05)"/>)}
          <path d={`${d} L${W},${H} L0,${H} Z`} fill="url(#launchG)"/>
          <path d={d} stroke="oklch(0.88 0.13 305)" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      {/* projected stats */}
      <div style={{ padding: 18, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <div className="kicker">Projected FDV</div>
          <div className="mono tabular" style={{ fontSize: 18, fontFamily: "var(--display)", marginTop: 4 }}>{fmt$(projectedFDV)}</div>
        </div>
        <div>
          <div className="kicker">Initial price</div>
          <div className="mono tabular" style={{ fontSize: 18, fontFamily: "var(--display)", marginTop: 4 }}>${(form.liquidity / form.supply).toFixed(6)}</div>
        </div>
        <div>
          <div className="kicker">Liquidity</div>
          <div className="mono tabular" style={{ fontSize: 14 }}>{fmt$(form.liquidity)}</div>
        </div>
        <div>
          <div className="kicker">Total fees</div>
          <div className="mono tabular" style={{ fontSize: 14 }}>{form.tax.buy + form.tax.sell}%</div>
        </div>
      </div>

      {/* active hooks */}
      <div style={{ padding: 18, borderTop: "1px solid var(--line)" }}>
        <div className="kicker" style={{ marginBottom: 10 }}>Active hooks · {form.hooks.length}</div>
        {form.hooks.length === 0 ? (
          <div style={{ fontSize: 12, color: "var(--ink-3)", padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 6 }}>No hooks selected · plain v4 pool</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {form.hooks.map(hid => {
              const h = HOOKS.find(x => x.id === hid);
              if (!h) return null;
              return (
                <div key={hid} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)", borderRadius: 6 }}>
                  <Icon name={h.icon} size={12} style={{ color: CAT_COLOR?.[h.cat] || "var(--ink-2)" }}/>
                  <span style={{ fontSize: 12 }}>{h.name}</span>
                  <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginLeft: "auto" }}>{h.cat}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI insight */}
      <div style={{ padding: 14, background: "linear-gradient(135deg, oklch(0.7 0.24 305 / 0.08), transparent)", borderTop: "1px solid var(--line)", display: "flex", gap: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: "conic-gradient(from 200deg, oklch(0.78 0.18 230), oklch(0.7 0.24 305), oklch(0.86 0.21 145))", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <Icon name="sparkles" size={11} style={{ color: "white" }}/>
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.45 }}>
          {form.hooks.length === 0 ? (
            <>Add a <span style={{ color: "oklch(0.92 0.1 230)" }}>Sniper Cage</span> hook — your supply makes you a bot magnet.</>
          ) : form.hooks.includes("h4") ? (
            <>Looking good. <span style={{ color: "oklch(0.92 0.15 145)" }}>Sniper Cage</span> will block ~84% of bot wallets.</>
          ) : (
            <>Consider adding a protection hook for the first 100 blocks.</>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, sub, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span className="kicker">{label}</span>
        {sub && <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>{sub}</span>}
      </div>
      {children}
    </div>
  );
}

const inputStyle = { width: "100%", padding: "10px 14px", background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 8, color: "var(--ink)", fontSize: 14, outline: "none" };

function Slider({ value, onChange, min, max, step = 1, suffix = "" }) {
  return (
    <div>
      <input type="range" value={value} min={min} max={max} step={step} onChange={e => onChange(+e.target.value)}
        style={{ width: "100%", accentColor: "oklch(0.78 0.18 230)" }}/>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>
        <span>{min}{suffix}</span>
        <span style={{ color: "var(--ink)" }}>{value}{suffix}</span>
        <span>{max}{suffix}</span>
      </div>
    </div>
  );
}

function Launch() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "Vault Protocol",
    symbol: "VAULT",
    desc: "A community-owned vault that rewards long-term holders.",
    twitter: "@vaultprotocol",
    site: "vaultprotocol.xyz",
    supply: 1_000_000_000,
    decimals: 18,
    tax: { buy: 1, sell: 3 },
    liquidity: 24000,
    pair: "ETH",
    hooks: ["h4", "h2"],
    antiBot: true,
    cooldown: 12,
    bondingCurve: "exponential",
    creatorRevShare: 50,
  });
  const upd = (patch) => setForm(f => ({ ...f, ...patch }));

  return (
    <div className="shell" style={{ paddingTop: 40, paddingBottom: 80 }} data-screen-label="07 Launch">
      <div style={{ marginBottom: 36 }}>
        <span className="kicker">launchpad</span>
        <h1 className="h-display" style={{ fontSize: 80, marginTop: 18 }}>
          Ship <span className="italic" style={{ color: "var(--ink-3)" }}>a</span> market.
        </h1>
      </div>

      {/* Stepper */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <button onClick={() => setStep(s.id)} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderRadius: 8,
                background: step === s.id ? "rgba(255,255,255,0.06)" : "transparent",
                border: `1px solid ${step === s.id ? "var(--line-strong)" : step > s.id ? "oklch(0.86 0.21 145 / 0.3)" : "var(--line)"}`,
                color: step >= s.id ? "var(--ink)" : "var(--ink-3)",
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 6, display: "grid", placeItems: "center",
                  background: step > s.id ? "oklch(0.86 0.21 145)" : step === s.id ? "oklch(0.78 0.18 230)" : "rgba(255,255,255,0.04)",
                  color: step > s.id ? "#000" : step === s.id ? "#000" : "var(--ink-3)",
                  fontSize: 11, fontWeight: 600,
                }}>
                  {step > s.id ? <Icon name="check" size={11} stroke={2.5}/> : s.id}
                </div>
                <span style={{ fontSize: 13 }}>{s.t}</span>
              </button>
              {i < STEPS.length - 1 && <div style={{ flex: 1, height: 1, background: step > s.id ? "oklch(0.86 0.21 145 / 0.4)" : "var(--line)" }}/>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "start" }}>
        <div className="card" style={{ padding: 32 }}>
          {step === 1 && (
            <>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 26, margin: 0, marginBottom: 6 }}>Tell us about your token.</h2>
              <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 28 }}>Basics. Don't worry, you can change everything later.</p>

              <Field label="Logo">
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <TokenBubble sym={form.symbol} size={72}/>
                  <div>
                    <button className="btn btn-ghost"><Icon name="upload" size={12}/> Upload PNG / SVG</button>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 6 }}>or paste an image URL · 512×512 recommended</div>
                  </div>
                </div>
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field label="Token name">
                  <input style={inputStyle} value={form.name} onChange={e => upd({ name: e.target.value })}/>
                </Field>
                <Field label="Ticker" sub="3-5 chars">
                  <input style={inputStyle} value={form.symbol} maxLength={5} onChange={e => upd({ symbol: e.target.value.toUpperCase() })}/>
                </Field>
              </div>

              <Field label="Description" sub={`${form.desc.length}/240`}>
                <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={form.desc} onChange={e => upd({ desc: e.target.value.slice(0, 240) })}/>
              </Field>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field label="X / Twitter">
                  <input style={inputStyle} value={form.twitter} onChange={e => upd({ twitter: e.target.value })}/>
                </Field>
                <Field label="Website">
                  <input style={inputStyle} value={form.site} onChange={e => upd({ site: e.target.value })}/>
                </Field>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 26, margin: 0, marginBottom: 6 }}>Supply & tokenomics.</h2>
              <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 28 }}>How many tokens exist and where they go.</p>

              <Field label="Total supply">
                <input style={inputStyle} type="number" value={form.supply} onChange={e => upd({ supply: +e.target.value })}/>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6 }}>{fmtN(form.supply)} {form.symbol} · 18 decimals</div>
              </Field>

              <Field label="Distribution">
                <div style={{ padding: 14, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10 }}>
                  {[
                    { l: "Liquidity pool", v: 70, c: "oklch(0.78 0.18 230)" },
                    { l: "Community / airdrop", v: 15, c: "oklch(0.86 0.21 145)" },
                    { l: "Treasury", v: 10, c: "oklch(0.7 0.24 305)" },
                    { l: "Creator (vested)", v: 5, c: "oklch(0.85 0.16 85)" },
                  ].map(d => (
                    <div key={d.l} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                        <span>{d.l}</span>
                        <span className="mono tabular">{d.v}%</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 100, background: "rgba(255,255,255,0.04)" }}>
                        <div style={{ height: "100%", width: `${d.v}%`, background: d.c, borderRadius: 100 }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </Field>

              <Field label="Bonding curve">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {["linear", "exponential", "sigmoid"].map(c => (
                    <button key={c} onClick={() => upd({ bondingCurve: c })} style={{
                      padding: 14, borderRadius: 10,
                      background: form.bondingCurve === c ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${form.bondingCurve === c ? "var(--line-strong)" : "var(--line-2)"}`,
                      textAlign: "left"
                    }}>
                      <svg viewBox="0 0 80 40" width="100%" height="32" style={{ marginBottom: 8 }}>
                        <path d={c === "linear" ? "M 5 35 L 75 5" : c === "exponential" ? "M 5 35 Q 50 35 75 5" : "M 5 35 Q 30 35 40 20 Q 50 5 75 5"} stroke="oklch(0.92 0.1 230)" strokeWidth="1.5" fill="none"/>
                      </svg>
                      <div style={{ fontSize: 12, textTransform: "capitalize" }}>{c}</div>
                    </button>
                  ))}
                </div>
              </Field>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 26, margin: 0, marginBottom: 6 }}>Liquidity & fees.</h2>
              <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 28 }}>The economics of the pool.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field label="Initial liquidity (USD)">
                  <input style={inputStyle} type="number" value={form.liquidity} onChange={e => upd({ liquidity: +e.target.value })}/>
                </Field>
                <Field label="Paired with">
                  <select style={inputStyle} value={form.pair} onChange={e => upd({ pair: e.target.value })}>
                    <option>ETH</option><option>USDC</option><option>WBTC</option>
                  </select>
                </Field>
              </div>

              <Field label={`Buy tax · ${form.tax.buy}%`}>
                <Slider value={form.tax.buy} min={0} max={10} step={0.5} onChange={v => upd({ tax: { ...form.tax, buy: v } })} suffix="%"/>
              </Field>

              <Field label={`Sell tax · ${form.tax.sell}%`}>
                <Slider value={form.tax.sell} min={0} max={20} step={0.5} onChange={v => upd({ tax: { ...form.tax, sell: v } })} suffix="%"/>
              </Field>

              <Field label="Fee routing">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {[
                    { l: "Burn", v: 40, c: "oklch(0.7 0.23 25)" },
                    { l: "LP", v: 35, c: "oklch(0.78 0.18 230)" },
                    { l: "Treasury", v: 25, c: "oklch(0.85 0.16 85)" },
                  ].map(r => (
                    <div key={r.l} style={{ padding: 12, background: `${r.c}1a`, border: `1px solid ${r.c}33`, borderRadius: 8, textAlign: "center" }}>
                      <div className="mono tabular" style={{ fontSize: 20, color: r.c, fontFamily: "var(--display)" }}>{r.v}%</div>
                      <div className="kicker" style={{ marginTop: 4 }}>{r.l}</div>
                    </div>
                  ))}
                </div>
              </Field>
            </>
          )}

          {step === 4 && (
            <>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 26, margin: 0, marginBottom: 6 }}>Install hooks.</h2>
              <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 28 }}>The programmable magic. Pick up to 4 hooks.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {HOOKS.slice(0, 8).map(h => {
                  const active = form.hooks.includes(h.id);
                  const c = CAT_COLOR[h.cat];
                  return (
                    <button key={h.id} onClick={() => {
                      upd({ hooks: active ? form.hooks.filter(x => x !== h.id) : form.hooks.length < 4 ? [...form.hooks, h.id] : form.hooks });
                    }} style={{
                      padding: 14, borderRadius: 10, textAlign: "left",
                      background: active ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.01)",
                      border: `1px solid ${active ? c + "55" : "var(--line)"}`,
                      boxShadow: active ? `inset 0 0 0 1px ${c}33, 0 0 24px -10px ${c}aa` : "none",
                    }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center", color: c, background: `${c}1a`, border: `1px solid ${c}33` }}>
                          <Icon name={h.icon} size={14}/>
                        </div>
                        {active && <div style={{ width: 18, height: 18, borderRadius: 50, background: c, display: "grid", placeItems: "center", color: "#000" }}><Icon name="check" size={10} stroke={3}/></div>}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{h.name}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-3)", lineHeight: 1.4 }}>{h.desc}</div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 26, margin: 0, marginBottom: 6 }}>Anti-bot & protections.</h2>
              <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 28 }}>Don't let bots eat your launch.</p>

              <Field label="Anti-bot protection">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line-2)", borderRadius: 10 }}>
                  <div>
                    <div style={{ fontSize: 14 }}>Block sniper bots in the first 3 blocks</div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>Dynamic tax 25% → 1% over first 50 blocks</div>
                  </div>
                  <button onClick={() => upd({ antiBot: !form.antiBot })} style={{ width: 44, height: 24, borderRadius: 100, background: form.antiBot ? "oklch(0.86 0.21 145)" : "rgba(255,255,255,0.1)", border: "1px solid var(--line-2)", padding: 2, transition: "all 200ms" }}>
                    <div style={{ width: 18, height: 18, borderRadius: 50, background: "#000", transform: `translateX(${form.antiBot ? 18 : 0}px)`, transition: "transform 200ms" }}/>
                  </button>
                </div>
              </Field>

              <Field label={`Whale cooldown · ${form.cooldown} blocks`}>
                <Slider value={form.cooldown} min={0} max={60} onChange={v => upd({ cooldown: v })} suffix="b"/>
              </Field>

              <Field label={`Creator rev share · ${form.creatorRevShare}%`}>
                <Slider value={form.creatorRevShare} min={0} max={80} step={5} onChange={v => upd({ creatorRevShare: v })} suffix="%"/>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 8 }}>You receive {form.creatorRevShare}% of all hook revenue. The rest goes to the protocol.</div>
              </Field>
            </>
          )}

          {step === 6 && (
            <>
              <h2 style={{ fontFamily: "var(--display)", fontSize: 26, margin: 0, marginBottom: 6 }}>Review & deploy.</h2>
              <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 28 }}>Double-check. Deploy is irreversible.</p>

              {[
                { t: "Identity", items: [["Name", form.name], ["Symbol", `$${form.symbol}`], ["X", form.twitter]] },
                { t: "Supply", items: [["Total", fmtN(form.supply)], ["Curve", form.bondingCurve], ["Decimals", "18"]] },
                { t: "Liquidity", items: [["Initial", fmt$(form.liquidity)], ["Pair", form.pair], ["Buy / Sell tax", `${form.tax.buy}% / ${form.tax.sell}%`]] },
                { t: "Hooks", items: [["Installed", form.hooks.length], ["Anti-bot", form.antiBot ? "on" : "off"], ["Creator share", `${form.creatorRevShare}%`]] },
              ].map(sec => (
                <div key={sec.t} style={{ padding: 16, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", borderRadius: 10, marginBottom: 10 }}>
                  <div className="kicker" style={{ marginBottom: 12 }}>{sec.t}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                    {sec.items.map(([k, v]) => (
                      <div key={k}>
                        <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginBottom: 2 }}>{k}</div>
                        <div style={{ fontSize: 13 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ padding: 18, background: "linear-gradient(135deg, oklch(0.7 0.24 305 / 0.1), oklch(0.78 0.18 230 / 0.08))", border: "1px solid oklch(0.78 0.18 230 / 0.3)", borderRadius: 12, marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span className="kicker">Deployment cost</span>
                  <span className="mono tabular" style={{ fontSize: 18, color: "oklch(0.92 0.1 230)" }}>0.042 ETH</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
                  <span>Gas (Base): ~0.0021 ETH</span>
                  <span>Protocol fee: 0.04 ETH</span>
                </div>
              </div>
            </>
          )}

          {/* Footer nav */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
            <button className="btn btn-ghost" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} style={{ opacity: step === 1 ? 0.4 : 1 }}>
              <Icon name="arrow_left" size={14}/> Back
            </button>
            {step < 6 ? (
              <button className="btn btn-primary" onClick={() => setStep(s => Math.min(6, s + 1))}>
                Continue <Icon name="arrow_right" size={14}/>
              </button>
            ) : (
              <button className="btn" style={{ background: "linear-gradient(135deg, oklch(0.7 0.24 305), oklch(0.78 0.18 230))", color: "white", padding: "12px 20px", boxShadow: "0 0 32px -8px oklch(0.78 0.18 230 / 0.6)" }}>
                <Icon name="rocket" size={14}/> Deploy to mainnet
              </button>
            )}
          </div>
        </div>

        {/* Simulation panel */}
        <LaunchSim form={form} step={step}/>
      </div>
    </div>
  );
}

window.Launch = Launch;
