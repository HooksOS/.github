/* HookOS — main app shell */

function App() {
  const [view, setView] = useState(() => {
    const hash = (window.location.hash || "").replace("#", "");
    return VIEWS.find(v => v.id === hash)?.id || "landing";
  });

  useEffect(() => {
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  useEffect(() => {
    const onHash = () => {
      const h = (window.location.hash || "").replace("#", "");
      if (h && VIEWS.find(v => v.id === h)) setView(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
      <Sidebar view={view} setView={setView}/>
      <div className="app">
        <div key={view} style={{ animation: "fadeIn 360ms ease" }}>
          {view === "landing" && <Landing setView={setView}/>}
          {view === "marketplace" && <Marketplace/>}
          {view === "feed" && <TokenFeed/>}
          {view === "arena" && <Arena/>}
          {view === "builder" && <AIBuilder/>}
          {view === "analytics" && <Analytics/>}
          {view === "launch" && <Launch/>}
          {view === "profile" && <Profile/>}
          {view === "events" && <Events/>}
          {view === "token" && <TokenDetail setView={setView}/>}
          {view === "brand" && <Brand/>}
        </div>
      </div>
      <MobileNav view={view} setView={setView}/>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
