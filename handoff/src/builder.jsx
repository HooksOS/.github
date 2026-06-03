/* AI Hook Builder — chat + simulation + code preview */

const STREAM_REPLY = [
  { text: "Got it — building a volatility-punishment hook for $", delay: 0 },
  { text: "TOKEN. ", delay: 200 },
  { text: "I'll wire a beforeSwap intercept that ", delay: 250 },
  { text: "samples 1-min realized vol from your tick oracle, ", delay: 200 },
  { text: "and applies a scaling tax to sells when vol > 6%.\n\n", delay: 350 },
  { text: "Here's the spec:\n", delay: 100 },
  { text: "• Tax: 0.5% base, scales to 8% as vol hits 18%\n", delay: 200 },
  { text: "• Direction: zeroForOne sells only\n", delay: 150 },
  { text: "• Tax routing: 40% burn, 30% LP, 30% holders\n", delay: 200 },
  { text: "• Cooldown: 12 blocks between rate updates\n\n", delay: 200 },
  { text: "Code drafted. Simulating against last 30 days of $VAULT data...", delay: 250 },
];

function StreamingText({ chunks, onDone }) {
  const [t, setT] = useState("");
  useEffect(() => {
    let cancel = false;
    let i = 0;
    const tick = async () => {
      while (i < chunks.length && !cancel) {
        await new Promise(r => setTimeout(r, chunks[i].delay));
        if (cancel) return;
        setT(prev => prev + chunks[i].text);
        i++;
      }
      if (!cancel) onDone?.();
    };
    tick();
    return () => { cancel = true; };
  }, []);
  return <pre style={{ margin: 0, fontFamily: "var(--font)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{t}<span style={{ opacity: 0.6 }}>▍</span></pre>;
}

function SimChart({ pts, color }) {
  const w = 420, h = 200;
  const max = Math.max(...pts), min = Math.min(...pts);
  const range = max - min || 1;
  const stepX = w / (pts.length - 1);
  let d = "";
  pts.forEach((p, i) => {
    const x = i * stepX;
    const y = h - ((p - min) / range) * h;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id="simGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* grid */}
      {[0.25, 0.5, 0.75].map(g => <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="rgba(255,255,255,0.05)"/>)}
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#simGrad)"/>
      <path d={d} stroke={color} strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function AIBuilder() {
  const [prompt, setPrompt] = useState("Create a token hook that punishes sellers during high volatility");
  const [generated, setGenerated] = useState(false);
  const [streamDone, setStreamDone] = useState(false);

  const start = () => { setGenerated(true); setStreamDone(false); };

  const examplePrompts = [
    "Burn 1% of supply every time price drops 10%",
    "Reward holders who hold longer than 30 days",
    "Block any wallet that buys more than 2% of supply",
    "Auto-redirect 50% of fees to a treasury vault",
  ];

  return (
    <div className="shell" style={{ paddingTop: 40, paddingBottom: 80 }} data-screen-label="05 AI Studio">
      <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 36 }}>
        <div>
          <span className="kicker" style={{ color: "oklch(0.9 0.12 305)" }}>ai studio · synth-1</span>
          <h1 className="h-display" style={{ fontSize: 88, marginTop: 18, marginBottom: 16, maxWidth: 900 }}>
            Describe <span className="italic" style={{ color: "var(--ink-3)" }}>a market.</span><br/>
            <span style={{ color: "oklch(0.9 0.12 305)" }}>Get</span> a hook.
          </h1>
          <p style={{ fontSize: 15, color: "var(--ink-2)", maxWidth: 540, lineHeight: 1.55 }}>
            Type behaviors in plain English. Our model generates audited Solidity, runs Monte Carlo simulations, and ships.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost"><Icon name="layers" size={14}/> My drafts · 3</button>
          <button className="btn btn-ghost"><Icon name="book" size={14}/> Examples</button>
        </div>
      </div>

      {/* Main 3-column workspace */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 16, alignItems: "stretch" }}>

        {/* CHAT */}
        <div className="card" style={{ display: "flex", flexDirection: "column", height: 720 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: "conic-gradient(from 200deg, oklch(0.78 0.18 230), oklch(0.7 0.24 305), oklch(0.86 0.21 145))", display: "grid", placeItems: "center" }}>
                <Icon name="sparkles" size={12} style={{ color: "white" }}/>
              </div>
              <span className="kicker">HookOS / Synth-1</span>
            </div>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>session · 4m</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* welcome */}
            <div style={{ padding: 16, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", borderRadius: 12 }}>
              <div className="kicker" style={{ marginBottom: 8, color: "oklch(0.88 0.13 305)" }}>Synth-1</div>
              <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>
                Hey. I build hooks. Tell me what you want your market to do — anything from anti-bot taxes to AI-tuned fees — and I'll generate, simulate, and deploy.
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                {examplePrompts.map(p => (
                  <button key={p} onClick={() => { setPrompt(p); }} style={{ padding: "5px 10px", fontSize: 11, borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid var(--line-2)", color: "var(--ink-2)", textAlign: "left" }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {generated && (
              <>
                {/* user msg */}
                <div style={{ alignSelf: "flex-end", maxWidth: "85%", padding: 14, background: "oklch(0.78 0.18 230 / 0.14)", border: "1px solid oklch(0.78 0.18 230 / 0.3)", borderRadius: 12 }}>
                  <div style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.5 }}>{prompt}</div>
                </div>
                {/* ai stream */}
                <div style={{ padding: 16, background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)", borderRadius: 12 }}>
                  <div className="kicker" style={{ marginBottom: 10, color: "oklch(0.88 0.13 305)", display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="pulse-dot" style={{ background: "oklch(0.7 0.24 305)", width: 6, height: 6 }}/>
                    Synth-1
                  </div>
                  <StreamingText chunks={STREAM_REPLY} onDone={() => setStreamDone(true)}/>
                  {streamDone && (
                    <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
                      <button style={{ padding: "5px 10px", fontSize: 11, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--line-2)" }}>Tighten tax</button>
                      <button style={{ padding: "5px 10px", fontSize: 11, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--line-2)" }}>Add cooldown</button>
                      <button style={{ padding: "5px 10px", fontSize: 11, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid var(--line-2)" }}>Pair with MEV Shield</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* prompt bar */}
          <div style={{ padding: 14, borderTop: "1px solid var(--line)" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, padding: 12, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 12 }}>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Describe a behavior..."
                rows={2}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", resize: "none", color: "var(--ink)", fontSize: 14, lineHeight: 1.4 }}
              />
              <button onClick={start} style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, oklch(0.7 0.24 305), oklch(0.78 0.18 230))", color: "white", display: "grid", placeItems: "center" }}>
                <Icon name="arrow_up" size={14} stroke={2.4}/>
              </button>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
              <span>⌘+Enter to ship</span><span>·</span><span>v1.4-synth · 128K ctx</span>
            </div>
          </div>
        </div>

        {/* CODE PREVIEW */}
        <div className="card" style={{ display: "flex", flexDirection: "column", height: 720 }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 50, background: "#ff5f57" }}/>
              <span style={{ width: 10, height: 10, borderRadius: 50, background: "#febc2e" }}/>
              <span style={{ width: 10, height: 10, borderRadius: 50, background: "#28c840" }}/>
            </div>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>VolatilityPunish.sol</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              <span className="chip chip-green"><span className="pulse-dot" style={{ width: 5, height: 5 }}/> Compiled</span>
              <span className="chip">0.8.26</span>
            </div>
          </div>
          <pre className="mono" style={{ margin: 0, padding: 18, fontSize: 12, lineHeight: 1.7, color: "var(--ink-2)", overflow: "auto", flex: 1, background: "rgba(0,0,0,0.3)" }}>{`pragma solidity ^0.8.26;

import {BaseHook} from "v4-periphery/BaseHook.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {VolatilityOracle} from "./oracles/VolOracle.sol";

/// @title VolatilityPunish
/// @notice Scales sell tax by realized volatility
contract VolatilityPunish is BaseHook {
    uint256 constant VOL_THRESHOLD = 6e16;  // 6%
    uint256 constant BASE_TAX      = 5e15;  // 0.5%
    uint256 constant MAX_TAX       = 8e16;  // 8.0%
    uint256 constant COOLDOWN      = 12;    // blocks

    VolatilityOracle public oracle;

    event VolatilityPunish(address indexed seller, uint256 tax);

    function beforeSwap(
        address sender,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata params,
        bytes calldata
    ) external override returns (bytes4, BeforeSwapDelta, uint24) {
        uint256 vol = oracle.realized(key.toId());

        if (vol > VOL_THRESHOLD && params.zeroForOne) {
            uint256 scale = ((vol - VOL_THRESHOLD) * MAX_TAX) /
                            (18e16 - VOL_THRESHOLD);
            uint256 tax = BASE_TAX + scale;

            _collectTax(sender, tax);
            _route(tax, 4000, 3000, 3000); // burn / lp / holders
            emit VolatilityPunish(sender, tax);
        }

        return (
            IHooks.beforeSwap.selector,
            BeforeSwapDeltaLibrary.ZERO_DELTA,
            0
        );
    }
}`}</pre>
          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 14, fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)" }}>
              <span>↳ 1,842 lines · 4 files</span>
              <span>· 0 errors · 2 warnings</span>
            </div>
            <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}>
              <Icon name="download" size={12}/> Export
            </button>
          </div>
        </div>

        {/* SIMULATION */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, height: 720, overflowY: "auto" }}>
          {/* Sim chart */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <div className="kicker" style={{ marginBottom: 4 }}>Simulation · 30d backtest</div>
                <div style={{ fontFamily: "var(--display)", fontSize: 16 }}>vs. $VAULT trade history</div>
              </div>
              <span className="chip chip-green"><Icon name="check" size={10}/> Passed</span>
            </div>
            <SimChart pts={generateSpark(60, 11, 0.42)} color="oklch(0.86 0.21 145)"/>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
              <div>
                <div className="kicker" style={{ marginBottom: 4 }}>Floor</div>
                <div className="mono tabular" style={{ fontSize: 14 }}>+18.4%</div>
              </div>
              <div>
                <div className="kicker" style={{ marginBottom: 4 }}>Tax collected</div>
                <div className="mono tabular" style={{ fontSize: 14 }}>$42,184</div>
              </div>
              <div>
                <div className="kicker" style={{ marginBottom: 4 }}>Sell pressure</div>
                <div className="mono tabular" style={{ fontSize: 14, color: "oklch(0.86 0.21 145)" }}>−38%</div>
              </div>
            </div>
          </div>

          {/* Fee curve */}
          <div className="card" style={{ padding: 18 }}>
            <div className="kicker" style={{ marginBottom: 14 }}>Fee response curve</div>
            <svg viewBox="0 0 320 120" width="100%" height="120">
              <defs>
                <linearGradient id="feeG" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="oklch(0.86 0.21 145)"/>
                  <stop offset="50%" stopColor="oklch(0.85 0.16 85)"/>
                  <stop offset="100%" stopColor="oklch(0.7 0.23 25)"/>
                </linearGradient>
              </defs>
              {/* grid */}
              {[0, 30, 60, 90, 120].map(y => <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.05)"/>)}
              {[0, 80, 160, 240, 320].map(x => <line key={x} x1={x} x2={x} y1="0" y2="120" stroke="rgba(255,255,255,0.05)"/>)}
              {/* curve: flat-ish then sharp rise */}
              <path d="M 0 110 L 80 108 L 130 102 L 170 80 L 210 50 L 250 22 L 320 8" stroke="url(#feeG)" strokeWidth="2" fill="none" strokeLinecap="round"/>
              {/* threshold */}
              <line x1="130" x2="130" y1="0" y2="120" stroke="oklch(0.78 0.18 230)" strokeDasharray="3 3" strokeOpacity="0.4"/>
              <text x="135" y="14" fontFamily="JetBrains Mono" fontSize="9" fill="oklch(0.92 0.1 230)">vol &gt; 6%</text>
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-3)" }}>
              <span>0% vol</span><span>9%</span><span>18%</span>
            </div>
          </div>

          {/* Market prediction */}
          <div className="card" style={{ padding: 18 }}>
            <div className="kicker" style={{ marginBottom: 12 }}>Market prediction · 7d</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <div className="mono tabular" style={{ fontSize: 28, fontFamily: "var(--display)" }}>+24%</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)" }}>est. floor impact</div>
              </div>
              <div style={{ width: 1, height: 40, background: "var(--line-2)" }}/>
              <div style={{ flex: 1 }}>
                <div className="mono tabular" style={{ fontSize: 28, fontFamily: "var(--display)", color: "oklch(0.86 0.21 145)" }}>91%</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)" }}>simulations profitable</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.5, padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 8, borderLeft: "2px solid oklch(0.7 0.24 305)" }}>
              ⚠ AI insight: pairing this with <span style={{ color: "oklch(0.92 0.1 230)" }}>Sniper Cage</span> in the first 3 blocks captures 84% more bot taxes.
            </div>
          </div>

          {/* Deploy */}
          <button className="btn btn-primary" style={{ padding: 14, fontSize: 14, justifyContent: "center" }}>
            <Icon name="rocket" size={14}/> Ship to mainnet
          </button>
          <div style={{ fontSize: 11, color: "var(--ink-3)", textAlign: "center", fontFamily: "var(--mono)" }}>
            Est. gas: 0.024 ETH · Deploys in &lt; 30s
          </div>
        </div>
      </div>
    </div>
  );
}

window.AIBuilder = AIBuilder;
