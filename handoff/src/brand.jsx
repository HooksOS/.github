/* Brand & identity — logo, colors, type, social kit */

// ============ LOGO COMPONENTS ============

function LogoGlyph({ size = 60, color = "var(--acid)", fill = "oklch(0.88 0.21 142 / 0.08)", stroke = 1.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path d="M30 3 L53 16 L53 44 L30 57 L7 44 L7 16 Z" stroke={color} strokeWidth={stroke * (60/26)} fill={fill}/>
      <path d="M22 25 Q22 35 30 35 Q38 35 38 25 Q38 18 32 18" stroke={color} strokeWidth={stroke * (60/26)} fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function WordMark({ size = 36, accent = "var(--acid)" }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 0, fontFamily: "var(--display)", fontWeight: 300, fontSize: size, letterSpacing: "-0.025em", lineHeight: 1 }}>
      <span>Hook</span>
      <span style={{ color: accent }}>OS</span>
    </div>
  );
}

function LogoLockup({ orientation = "horizontal", glyphSize = 38, fontSize = 28, accent = "var(--acid)" }) {
  return (
    <div style={{ display: "flex", flexDirection: orientation === "stacked" ? "column" : "row", alignItems: "center", gap: orientation === "stacked" ? 16 : 12 }}>
      <LogoGlyph size={glyphSize} color={accent}/>
      <WordMark size={fontSize} accent={accent}/>
    </div>
  );
}

// ============ COPYABLE COLOR CHIP ============
function ColorChip({ label, value, oklch, role, w = "100%", h = 140 }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <button onClick={copy} style={{ display: "flex", flexDirection: "column", width: w, textAlign: "left", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", background: "transparent" }}>
      <div style={{ height: h, background: value, position: "relative", display: "flex", alignItems: "flex-end", padding: 12 }}>
        <span className="mono" style={{ fontSize: 11, color: "rgba(0,0,0,0.7)", background: "rgba(255,255,255,0.4)", padding: "2px 6px", borderRadius: 4 }}>{value.toUpperCase()}</span>
        {copied && <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 8px", background: "rgba(0,0,0,0.6)", color: "white", fontSize: 10, borderRadius: 4, fontFamily: "var(--mono)" }}>Copied ✓</div>}
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 4 }}>{label}</div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginBottom: 6 }}>{oklch}</div>
        <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{role}</div>
      </div>
    </button>
  );
}

// ============ OG / SOCIAL CARD ============
function OGCard() {
  return (
    <div style={{ width: "100%", aspectRatio: "1200/630", borderRadius: 12, overflow: "hidden", position: "relative", background: "linear-gradient(135deg, #050608 0%, #0a0c14 50%, #08120c 100%)", border: "1px solid var(--line)" }}>
      <div className="viz-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)" }}/>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(600px 300px at 80% 30%, var(--acid-bg), transparent 60%)" }}/>
      {/* hex pattern bg */}
      <svg style={{ position: "absolute", right: -40, top: -40, opacity: 0.18 }} width="320" height="320" viewBox="0 0 320 320">
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const r = 100 + (i % 3) * 30;
          const cx = 160 + Math.cos(angle) * r;
          const cy = 160 + Math.sin(angle) * r;
          return (
            <path key={i} d={`M ${cx-12} ${cy} l 6 -10 l 12 0 l 6 10 l -6 10 l -12 0 z`}
              stroke="var(--acid)" strokeWidth="1" fill="none"/>
          );
        })}
      </svg>
      <div style={{ position: "absolute", inset: 0, padding: "5%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <LogoGlyph size={48}/>
          <span style={{ fontFamily: "var(--display)", fontSize: 28, fontWeight: 300 }}>HookOS<span style={{ color: "var(--ink-3)", marginLeft: 8, fontSize: 16, fontFamily: "var(--mono)" }}>v4</span></span>
        </div>
        <div>
          <span className="kicker" style={{ fontSize: 10, marginBottom: 16, display: "inline-block" }}>PROGRAMMABLE MARKETS</span>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 300, fontSize: "clamp(36px, 7cqi, 84px)", letterSpacing: "-0.03em", lineHeight: 0.9, margin: 0, marginBottom: 18 }}>
            Markets <span className="italic" style={{ color: "var(--ink-3)" }}>are now</span><br/>
            <span style={{ color: "var(--acid)" }}>software.</span>
          </h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
            <p style={{ fontSize: 16, color: "var(--ink-2)", maxWidth: "55%", margin: 0 }}>Launch tokens with custom hooks. Compose markets like Lego.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-3)", fontFamily: "var(--mono)", fontSize: 11 }}>
              <span>hookos.xyz</span>
              <span style={{ color: "var(--ink-4)" }}>·</span>
              <span>@hookos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ TWITTER PROFILE PREVIEW ============
function ProfilePreview() {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--line)", background: "var(--bg-1)" }}>
      {/* banner */}
      <div style={{ height: 130, position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #050608, #0a0c12)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(400px 200px at 80% 50%, var(--acid-bg), transparent 70%)" }}/>
        <div className="viz-grid" style={{ position: "absolute", inset: 0, opacity: 0.3 }}/>
        <svg style={{ position: "absolute", top: 12, right: 12, opacity: 0.5 }} width="80" height="80" viewBox="0 0 80 80">
          {[...Array(6)].map((_, i) => (
            <path key={i} d={`M ${15 + (i%3)*20} ${15 + Math.floor(i/3)*22} l 9 -5 l 9 5 l 0 12 l -9 5 l -9 -5 z`} stroke="var(--acid)" strokeWidth="0.6" fill="none" opacity={0.4 + (i*0.1)}/>
          ))}
        </svg>
      </div>
      {/* avatar */}
      <div style={{ padding: "0 18px 18px", marginTop: -34 }}>
        <div style={{ width: 76, height: 76, borderRadius: 50, background: "var(--bg)", border: "3px solid var(--bg)", display: "grid", placeItems: "center", marginBottom: 12 }}>
          <div style={{ width: 70, height: 70, borderRadius: 50, background: "linear-gradient(135deg, oklch(0.88 0.21 142 / 0.18), oklch(0.88 0.21 142 / 0.05))", display: "grid", placeItems: "center", border: "1px solid var(--acid-line)" }}>
            <LogoGlyph size={42}/>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontWeight: 600, fontSize: 17 }}>HookOS</span>
          <Icon name="check" size={14} style={{ color: "var(--acid)" }}/>
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 12 }}>@hookos</div>
        <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.4, marginBottom: 14 }}>
          The programmable market engine. Launch tokens, compose hooks, ship markets that fight back. v4 hooks live on 6 chains.
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--ink-3)" }}>
          <span><span style={{ color: "var(--ink)", fontWeight: 500 }}>1,842</span> Following</span>
          <span><span style={{ color: "var(--ink)", fontWeight: 500 }}>42.1K</span> Followers</span>
        </div>
      </div>
    </div>
  );
}

// ============ STICKER ============
function Sticker({ children, w = 110, h = 110, rot = -4, accent = "var(--acid)" }) {
  return (
    <div style={{
      width: w, height: h, transform: `rotate(${rot}deg)`,
      background: `linear-gradient(135deg, ${accent}, oklch(0.78 0.19 142))`,
      borderRadius: 16, padding: 12, display: "grid", placeItems: "center",
      boxShadow: `0 12px 32px -8px ${accent}, inset 0 0 0 1px rgba(255,255,255,0.2)`,
      color: "#001b07", textAlign: "center", fontWeight: 600
    }}>
      {children}
    </div>
  );
}

// ============ MAIN PAGE ============
function Brand() {
  const palette = [
    { label: "Bg", value: "#060709", oklch: "oklch(0.10 0 0)", role: "Primary surface" },
    { label: "Surface", value: "#14151a", oklch: "oklch(0.20 0 0)", role: "Card / panel" },
    { label: "Ink", value: "#f0f1f5", oklch: "oklch(0.95 0 0)", role: "Primary text" },
    { label: "Ink dim", value: "#74757f", oklch: "oklch(0.55 0 0)", role: "Secondary text" },
  ];
  const accents = [
    { label: "Acid", value: "#5af787", oklch: "oklch(0.88 0.21 142)", role: "Primary accent · CTAs · gains" },
    { label: "Crimson", value: "#f25555", oklch: "oklch(0.70 0.23 25)", role: "Loss · danger · sell" },
    { label: "Gold", value: "#f0c14b", oklch: "oklch(0.85 0.16 85)", role: "Premium · featured" },
    { label: "Plasma", value: "#c66be0", oklch: "oklch(0.70 0.22 305)", role: "AI moments" },
    { label: "Ice", value: "#6db8e8", oklch: "oklch(0.82 0.13 220)", role: "Info · chains" },
  ];

  const socials = [
    { name: "X (Twitter)", handle: "@hookos", icon: "twitter", url: "twitter.com/hookos", followers: "42.1K" },
    { name: "Discord", handle: "discord.gg/hookos", icon: "discord", url: "discord.gg/hookos", followers: "18.4K" },
    { name: "Farcaster", handle: "@hookos", icon: "radio", url: "warpcast.com/hookos", followers: "12.2K" },
    { name: "Telegram", handle: "@hookos_official", icon: "message", url: "t.me/hookos", followers: "24.8K" },
    { name: "Mirror", handle: "hookos.mirror.xyz", icon: "book", url: "hookos.mirror.xyz", followers: "8.4K" },
    { name: "GitHub", handle: "/hookos-labs", icon: "code", url: "github.com/hookos-labs", followers: "2.1K" },
    { name: "YouTube", handle: "@HookOSofficial", icon: "play", url: "youtube.com/@hookos", followers: "4.2K" },
    { name: "Lens", handle: "@hookos.lens", icon: "users", url: "lens.xyz/hookos", followers: "6.8K" },
  ];

  const taglines = [
    "Markets are now software.",
    "Stop launching tokens. Start launching markets.",
    "Plug in superpowers.",
    "The programmable market engine.",
    "Build viral liquidity.",
    "Compose markets like Lego.",
    "Hooks for every market behavior.",
  ];

  return (
    <div className="shell" style={{ paddingTop: 56, paddingBottom: 80 }} data-screen-label="11 Brand">
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48 }}>
        <div>
          <span className="kicker">brand · v1.4</span>
          <h1 className="h-display" style={{ fontSize: 92, marginTop: 18, marginBottom: 14, maxWidth: 800 }}>
            Brand <span className="italic" style={{ color: "var(--ink-3)" }}>&</span> identity.
          </h1>
          <p style={{ fontSize: 15, color: "var(--ink-2)", maxWidth: 540, lineHeight: 1.55 }}>
            Logo, palette, typography, social kit. Everything you need to build with the HookOS brand. Updated quarterly.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost"><Icon name="book" size={14}/> Brand guidelines</button>
          <button className="btn btn-primary"><Icon name="download" size={14}/> Download brand kit · 12.4 MB</button>
        </div>
      </div>

      {/* ============== LOGO ============== */}
      <section style={{ marginBottom: 72 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <div>
            <span className="kicker">/01 — logo</span>
            <h2 className="h2" style={{ marginTop: 12, fontSize: 40 }}>The mark.</h2>
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>SVG · PNG · PDF · 2,840 downloads</span>
        </div>

        {/* primary lockup */}
        <div className="card" style={{ padding: 80, marginBottom: 16, display: "grid", placeItems: "center", minHeight: 300, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(400px 200px at 50% 50%, var(--acid-bg), transparent 70%)" }}/>
          <div className="viz-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)" }}/>
          <div style={{ position: "relative" }}>
            <LogoLockup glyphSize={80} fontSize={64}/>
          </div>
          <div style={{ position: "absolute", bottom: 16, left: 16, fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.16em" }}>PRIMARY · HORIZONTAL</div>
          <button style={{ position: "absolute", top: 16, right: 16, padding: "5px 10px", fontSize: 11, fontFamily: "var(--mono)", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid var(--line-2)", color: "var(--ink-2)" }}>
            <Icon name="download" size={11} style={{ marginRight: 4 }}/> SVG
          </button>
        </div>

        {/* logo variations */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}>
          {[
            { l: "Glyph only", c: <LogoGlyph size={80}/> },
            { l: "Wordmark", c: <WordMark size={36}/> },
            { l: "Stacked", c: <LogoLockup orientation="stacked" glyphSize={56} fontSize={28}/> },
            { l: "Monochrome", c: <LogoLockup glyphSize={38} fontSize={28} accent="var(--ink)"/> },
          ].map(v => (
            <div key={v.l} className="card" style={{ padding: 28, display: "grid", placeItems: "center", minHeight: 180, position: "relative" }}>
              <div>{v.c}</div>
              <div style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--ink-3)", letterSpacing: "0.16em" }}>{v.l.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* light/dark + clear space */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div className="card" style={{ padding: 28, background: "#fff", display: "grid", placeItems: "center", minHeight: 180, position: "relative" }}>
            <LogoLockup glyphSize={48} fontSize={34} accent="oklch(0.55 0.18 142)"/>
            <div style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "var(--mono)", fontSize: 9.5, color: "rgba(0,0,0,0.5)", letterSpacing: "0.16em" }}>ON LIGHT BACKGROUND</div>
          </div>
          <div className="card" style={{ padding: 28, background: "var(--bg)", display: "grid", placeItems: "center", minHeight: 180, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "var(--bg-2)" }}/>
            <div style={{ position: "relative" }}>
              <LogoLockup glyphSize={48} fontSize={34}/>
            </div>
            <div style={{ position: "absolute", bottom: 12, left: 12, fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--ink-3)", letterSpacing: "0.16em" }}>ON DARK BACKGROUND</div>
          </div>
        </div>

        {/* Logo construction */}
        <div className="card" style={{ padding: 32, marginBottom: 16 }}>
          <div className="kicker" style={{ marginBottom: 18 }}>Construction · clear space</div>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center" }}>
            <div style={{ position: "relative", padding: 30 }}>
              {/* dashed clear space */}
              <div style={{ position: "absolute", inset: 0, border: "1px dashed var(--acid-line)", borderRadius: 12 }}/>
              {/* xs */}
              <div style={{ position: "absolute", top: 6, left: 6, fontSize: 9, fontFamily: "var(--mono)", color: "var(--acid)" }}>X</div>
              <div style={{ position: "absolute", top: 6, right: 6, fontSize: 9, fontFamily: "var(--mono)", color: "var(--acid)" }}>X</div>
              <div style={{ position: "absolute", bottom: 6, left: 6, fontSize: 9, fontFamily: "var(--mono)", color: "var(--acid)" }}>X</div>
              <div style={{ position: "absolute", bottom: 6, right: 6, fontSize: 9, fontFamily: "var(--mono)", color: "var(--acid)" }}>X</div>
              <LogoLockup glyphSize={56} fontSize={42}/>
            </div>
            <div>
              <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 18, maxWidth: 480 }}>
                Maintain clear space equal to <span style={{ color: "var(--acid)" }}>X</span> — the height of the glyph's central cap — around the logo on all sides. Never crop, recolor (outside approved palette), or rotate the logo.
              </p>
              <div style={{ display: "flex", gap: 18, fontSize: 12, color: "var(--ink-3)" }}>
                <span><span style={{ color: "var(--acid)" }}>✓</span> Acid on dark</span>
                <span><span style={{ color: "var(--acid)" }}>✓</span> Mono on dark</span>
                <span><span style={{ color: "var(--crimson)" }}>✗</span> Stretching</span>
                <span><span style={{ color: "var(--crimson)" }}>✗</span> Drop shadows</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== COLORS ============== */}
      <section style={{ marginBottom: 72 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <div>
            <span className="kicker">/02 — palette</span>
            <h2 className="h2" style={{ marginTop: 12, fontSize: 40 }}>Colors.</h2>
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>CLICK TO COPY HEX</span>
        </div>

        <div className="kicker" style={{ marginBottom: 12 }}>Surfaces & ink</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
          {palette.map(c => <ColorChip key={c.label} {...c}/>)}
        </div>

        <div className="kicker" style={{ marginBottom: 12 }}>Accents · use sparingly</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
          {accents.map(c => <ColorChip key={c.label} {...c}/>)}
        </div>
      </section>

      {/* ============== TYPOGRAPHY ============== */}
      <section style={{ marginBottom: 72 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <div>
            <span className="kicker">/03 — typography</span>
            <h2 className="h2" style={{ marginTop: 12, fontSize: 40 }}>Type.</h2>
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>VARIABLE · 3 FAMILIES</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {/* Newsreader */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <span className="kicker">Display</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>Aa</span>
            </div>
            <div style={{ fontFamily: "var(--display)", fontSize: 60, fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 0.95, marginBottom: 24 }}>
              Aa<span className="italic" style={{ color: "var(--ink-3)" }}>Bb</span>
            </div>
            <div style={{ fontFamily: "var(--display)", fontWeight: 300, fontSize: 16, lineHeight: 1.4, color: "var(--ink-2)", marginBottom: 14 }}>
              The quick brown fox jumps over the lazy dog. 1234567890
            </div>
            <div style={{ paddingTop: 16, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12, color: "var(--ink-3)" }}>
              <span>Newsreader</span><span style={{ textAlign: "right" }}>Google Fonts</span>
              <span>300 / 400 / 500</span><span style={{ textAlign: "right" }}>+ italic</span>
            </div>
          </div>
          {/* Inter */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <span className="kicker">Body</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>Aa</span>
            </div>
            <div style={{ fontFamily: "var(--font)", fontSize: 60, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 0.95, marginBottom: 24 }}>
              Aa<span style={{ color: "var(--ink-3)", fontWeight: 400 }}>Bb</span>
            </div>
            <div style={{ fontFamily: "var(--font)", fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)", marginBottom: 14 }}>
              The quick brown fox jumps over the lazy dog. 1234567890
            </div>
            <div style={{ paddingTop: 16, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12, color: "var(--ink-3)" }}>
              <span>Inter</span><span style={{ textAlign: "right" }}>Google Fonts</span>
              <span>300 / 400 / 500 / 600 / 700</span><span></span>
            </div>
          </div>
          {/* JetBrains Mono */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <span className="kicker">Mono</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>Aa</span>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 60, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 0.95, marginBottom: 24 }}>
              Aa<span style={{ color: "var(--ink-3)", fontWeight: 400 }}>Bb</span>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, lineHeight: 1.6, color: "var(--ink-2)", marginBottom: 14 }}>
              the.quick.brown_fox(jumps);<br/>
              0x4f3a → 0xc3a1 // 1,234.56789
            </div>
            <div style={{ paddingTop: 16, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12, color: "var(--ink-3)" }}>
              <span>JetBrains Mono</span><span style={{ textAlign: "right" }}>Google Fonts</span>
              <span>400 / 500 / 600</span><span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ============== ICONOGRAPHY ============== */}
      <section style={{ marginBottom: 72 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <div>
            <span className="kicker">/04 — iconography</span>
            <h2 className="h2" style={{ marginTop: 12, fontSize: 40 }}>The hex motif.</h2>
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>42 ICONS · LUCIDE-COMPAT</span>
        </div>
        <div className="card" style={{ padding: 32 }}>
          <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 32, maxWidth: 640 }}>
            Every category and feature gets a hexagon container — a nod to the hook lifecycle and the 6-chain reach. Stroke lines stay at 1.2-1.5px, icons centered.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 16 }}>
            {["shield", "swords", "flame", "droplet", "sparkles", "cpu", "users", "trophy", "bolt", "diamond", "rocket", "star", "target", "radio", "layers", "globe"].map(i => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 16, borderRadius: 8, border: "1px solid var(--line)" }}>
                <HexIcon size={42} color="var(--acid)" filled>
                  <Icon name={i} size={16}/>
                </HexIcon>
                <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>{i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SOCIAL KIT ============== */}
      <section style={{ marginBottom: 72 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <div>
            <span className="kicker">/05 — social kit</span>
            <h2 className="h2" style={{ marginTop: 12, fontSize: 40 }}>Social.</h2>
          </div>
          <button className="btn btn-ghost" style={{ padding: "7px 14px", fontSize: 12 }}><Icon name="download" size={12}/> Templates · Figma</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 16 }}>
          {/* OG card */}
          <div>
            <div className="kicker" style={{ marginBottom: 10 }}>Open graph · 1200×630</div>
            <OGCard/>
          </div>
          {/* Profile preview */}
          <div>
            <div className="kicker" style={{ marginBottom: 10 }}>Profile picture · banner</div>
            <ProfilePreview/>
          </div>
        </div>

        {/* Social handles */}
        <div className="card">
          <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
            <span className="kicker">Social handles · 8 platforms</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>118.5K total followers</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
            {socials.map((s, i) => (
              <div key={s.name} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 14, alignItems: "center", padding: "16px 22px", borderTop: i >= 2 ? "1px solid var(--line)" : "none", borderRight: i % 2 === 0 ? "1px solid var(--line)" : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--line-2)", display: "grid", placeItems: "center", color: "var(--acid)" }}>
                  <Icon name={s.icon} size={15}/>
                </div>
                <div>
                  <div style={{ fontSize: 13.5 }}>{s.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{s.handle}</div>
                </div>
                <span className="mono tabular" style={{ fontSize: 13, color: "var(--ink-2)" }}>{s.followers}</span>
                <button className="btn btn-outline" style={{ padding: "6px 10px", fontSize: 11 }}><Icon name="arrow_up_right" size={11}/></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== TAGLINES + STICKERS ============== */}
      <section style={{ marginBottom: 72 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
          <div>
            <div style={{ marginBottom: 24 }}>
              <span className="kicker">/06 — voice</span>
              <h2 className="h2" style={{ marginTop: 12, fontSize: 40 }}>Taglines.</h2>
            </div>
            <div className="card">
              {taglines.map((t, i) => (
                <div key={i} style={{ padding: "20px 24px", borderTop: i ? "1px solid var(--line)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--display)", fontWeight: 300, fontSize: 22, letterSpacing: "-0.02em" }}>"{t}"</span>
                  <button className="btn btn-outline" style={{ padding: "5px 10px", fontSize: 11 }}>Copy</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ marginBottom: 24 }}>
              <span className="kicker">/07 — swag</span>
              <h2 className="h2" style={{ marginTop: 12, fontSize: 40 }}>Stickers.</h2>
            </div>
            <div className="card" style={{ padding: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, placeItems: "center", minHeight: 380, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(400px 200px at 50% 50%, var(--acid-bg), transparent 70%)" }}/>
              <Sticker w={120} h={120} rot={-8}>
                <div>
                  <LogoGlyph size={32} color="#001b07" fill="rgba(0,27,7,0.1)"/>
                  <div style={{ fontSize: 11, marginTop: 8, fontFamily: "var(--mono)" }}>HOOKED</div>
                </div>
              </Sticker>
              <Sticker w={140} h={80} rot={6}>
                <div style={{ fontSize: 18, fontFamily: "var(--display)", fontWeight: 400, fontStyle: "italic" }}>v4 ⚡ live</div>
              </Sticker>
              <Sticker w={130} h={130} rot={4}>
                <div style={{ fontSize: 13, fontFamily: "var(--display)", lineHeight: 1.1 }}>MARKETS<br/><span style={{ fontStyle: "italic" }}>are now</span><br/>SOFTWARE</div>
              </Sticker>
              <Sticker w={110} h={110} rot={-6}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 22, fontWeight: 700 }}>0x</div>
              </Sticker>
            </div>
          </div>
        </div>
      </section>

      {/* ============== DOWNLOAD CTA ============== */}
      <section>
        <div className="card" style={{ padding: 56, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(600px 300px at 50% 100%, var(--acid-bg), transparent 70%)" }}/>
          <div style={{ position: "relative" }}>
            <h2 className="h-display" style={{ fontSize: 64, marginBottom: 18 }}>
              Get the <span className="italic" style={{ color: "var(--ink-3)" }}>brand</span> <span style={{ color: "var(--acid)" }}>kit.</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink-2)", maxWidth: 520, margin: "0 auto 32px" }}>
              Logos · color tokens · type files · OG templates · icon set · sticker pack. Everything in SVG, PNG, and Figma.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="btn btn-primary" style={{ padding: "13px 22px" }}><Icon name="download" size={14}/> Download · 12.4 MB</button>
              <button className="btn btn-ghost" style={{ padding: "13px 22px" }}><Icon name="book" size={14}/> Press kit</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Brand = Brand;
