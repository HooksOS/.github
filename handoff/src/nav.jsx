/* Left sidebar nav */

const NAV_GROUPS = [
  { label: "Discover", items: [
    { id: "landing", label: "Home", icon: "diamond" },
    { id: "feed", label: "Feed", icon: "flame", live: true },
    { id: "token", label: "Tokens", icon: "layers" },
    { id: "marketplace", label: "Hooks", icon: "grid", badge: "12" },
    { id: "events", label: "Events", icon: "trophy", badge: "4" },
  ]},
  { label: "Trade", items: [
    { id: "arena", label: "Arena", icon: "swords", live: true },
    { id: "analytics", label: "Terminal", icon: "chart" },
  ]},
  { label: "Build", items: [
    { id: "launch", label: "Launch", icon: "rocket" },
    { id: "builder", label: "AI Studio", icon: "sparkles" },
  ]},
  { label: "You", items: [
    { id: "profile", label: "Profile", icon: "wallet" },
    { id: "brand", label: "Brand kit", icon: "star" },
  ]},
];

const VIEWS = NAV_GROUPS.flatMap(g => g.items);

function BrandGlyph({ size = 26 }) {
  return (
    <div className="brand-glyph" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
        <path d="M13 1.5 L23 7 L23 19 L13 24.5 L3 19 L3 7 Z" stroke="var(--acid)" strokeWidth="1.5" fill="oklch(0.88 0.21 142 / 0.08)"/>
        <path d="M9 11 Q9 16 13 16 Q17 16 17 11 Q17 8 14 8" stroke="var(--acid)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function Sidebar({ view, setView }) {
  const [chain, setChain] = useState("Base");
  const [openChain, setOpenChain] = useState(false);
  const chainData = CHAINS.find(c => c.name === chain);

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand" onClick={() => setView("landing")} style={{ cursor: "pointer" }}>
        <BrandGlyph/>
        <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.005em" }}>HookOS</span>
        <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--ink-3)", padding: "2px 6px", border: "1px solid var(--line-2)", borderRadius: 4, letterSpacing: "0.05em" }}>v4</span>
      </div>

      <div className="sidebar-divider"/>

      {/* Search box */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)", borderRadius: 8, marginBottom: 18 }}>
        <Icon name="search" size={13} style={{ color: "var(--ink-3)" }}/>
        <input placeholder="Search…" style={{ background: "transparent", border: "none", outline: "none", flex: 1, fontSize: 12.5, minWidth: 0 }}/>
        <span className="mono" style={{ fontSize: 9.5, color: "var(--ink-3)", padding: "1px 5px", border: "1px solid var(--line-2)", borderRadius: 3 }}>⌘K</span>
      </div>

      {/* Nav groups */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", marginRight: -4, paddingRight: 4 }}>
        {NAV_GROUPS.map(group => (
          <div key={group.label} style={{ marginBottom: 18 }}>
            <div className="sidebar-section-label">{group.label}</div>
            <nav className="sidebar-nav">
              {group.items.map(item => (
                <div key={item.id} className={cls("sidebar-tab", view === item.id && "active")} onClick={() => setView(item.id)}>
                  <span className="icon-wrap"><Icon name={item.icon} size={14}/></span>
                  <span>{item.label}</span>
                  {item.live && <span className="live-dot"/>}
                  {item.badge && !item.live && <span className="badge">{item.badge}</span>}
                </div>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom — chain + wallet */}
      <div className="sidebar-bottom">
        <div style={{ position: "relative" }}>
          <button className="sidebar-tab" onClick={() => setOpenChain(o => !o)} style={{ width: "100%" }}>
            <span style={{ width: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ width: 8, height: 8, borderRadius: 50, background: chainData.c, boxShadow: `0 0 6px ${chainData.c}` }}/>
            </span>
            <span style={{ fontSize: 13 }}>{chain}</span>
            <Icon name="chevron_down" size={11} style={{ marginLeft: "auto", color: "var(--ink-3)" }}/>
          </button>
          {openChain && (
            <div style={{ position: "absolute", bottom: "calc(100% + 6px)", left: 0, right: 0, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10, padding: 6, zIndex: 60, boxShadow: "0 24px 48px rgba(0,0,0,0.6)" }}>
              {CHAINS.map(c => (
                <button key={c.name} onClick={() => { setChain(c.name); setOpenChain(false); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "7px 10px", borderRadius: 6, background: chain === c.name ? "rgba(255,255,255,0.05)" : "transparent" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 50, background: c.c, boxShadow: `0 0 6px ${c.c}` }}/>
                  <span style={{ fontSize: 12.5 }}>{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, background: "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))", border: "1px solid var(--line-2)" }}>
          <div style={{ width: 22, height: 22, borderRadius: 50, background: "conic-gradient(from 200deg, var(--acid), var(--ice), var(--gold), var(--acid))" }}/>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--ink)" }}>4.218 ETH</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--ink-3)" }}>0x4f…c3a1</div>
          </div>
          <Icon name="chevron_down" size={11} style={{ color: "var(--ink-3)" }}/>
        </button>
      </div>
    </aside>
  );
}

function MobileNav({ view, setView }) {
  const items = [
    { id: "landing", icon: "diamond", l: "Home" },
    { id: "feed", icon: "flame", l: "Feed" },
    { id: "marketplace", icon: "grid", l: "Hooks" },
    { id: "arena", icon: "swords", l: "Arena" },
    { id: "profile", icon: "wallet", l: "Wallet" },
  ];
  return (
    <nav className="mobile-nav">
      {items.map(it => (
        <button key={it.id} onClick={() => setView(it.id)} className={view === it.id ? "active" : ""}>
          <Icon name={it.icon} size={18}/>
          {it.l}
        </button>
      ))}
    </nav>
  );
}

window.Sidebar = Sidebar;
window.MobileNav = MobileNav;
window.VIEWS = VIEWS;
window.BrandGlyph = BrandGlyph;
