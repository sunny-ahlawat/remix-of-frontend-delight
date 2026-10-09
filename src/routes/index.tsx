import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Globe2, LockKeyhole, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/dj-partner-editorial-network.jpg";

const intentOptions = [
  "I am raising capital",
  "I am looking for opportunities",
  "I represent a fund / family office",
  "I am exploring a strategic transaction",
  "I want to join the network",
  "Other",
];

const capabilities = [
  { title: "Capital", index: "01", detail: "Fundraising · Growth capital · Private equity · Strategic investment" },
  { title: "Private markets", index: "02", detail: "Private opportunities · Secondary transactions · Pre-IPO · Placements" },
  { title: "Investors", index: "03", detail: "Angels · Venture capital · Private equity · Family offices · Funds" },
  { title: "Relationships", index: "04", detail: "Investor relations · Strategic introductions · Capital networks" },
  { title: "Market intelligence", index: "05", detail: "Equity research · Company research · Sector intelligence · Analysis" },
  { title: "Transactions", index: "06", detail: "Deal structuring · Diligence coordination · Negotiation support" },
];

const dealSteps = [
  ["01", "Discover", "Understand the opportunity."],
  ["02", "Qualify", "Establish relevance and fit."],
  ["03", "Map", "Identify the right relationships."],
  ["04", "Connect", "Create qualified introductions."],
  ["05", "Structure", "Coordinate the opportunity."],
  ["06", "Advance", "Support the transaction journey."],
];

const ecosystem = [
  "Founders", "Startups", "Angel investors", "Venture capital", "Private equity",
  "Family offices", "Fund houses", "Strategic investors", "Institutional relationships",
  "Public & private market participants",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DJ Partner | Global Capital, Investor & Deal Advisory" },
      { name: "description", content: "DJ Partner connects businesses, investors and private capital through strategic advisory, qualified relationships and transaction-focused support." },
      { property: "og:title", content: "DJ Partner | Global Capital, Investor & Deal Advisory" },
      { property: "og:description", content: "The intelligence behind strategic capital. Private by nature. Strategic by design." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DJ Partner | Global Capital, Investor & Deal Advisory" },
      { name: "twitter:description", content: "The intelligence behind strategic capital." },
    ],
  }),
  component: Index,
});

function trackConversion(event: string, source: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("djpartner:conversion", { detail: { event, source } }));
  }
}

function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [intent, setIntent] = useState("");
  const [source, setSource] = useState("Navigation");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openRequest = (origin: string, initialIntent = "") => {
    setSource(origin);
    setIntent(initialIntent);
    setSuccess(false);
    setModalOpen(true);
    trackConversion("access_request_started", origin);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [modalOpen]);

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackConversion("contact_submission", source);
    trackConversion("access_request_completed", intent || "Other");
    setSuccess(true);
  };

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b hairline bg-background/85 backdrop-blur-md">
        <nav className="section-shell flex h-[4.75rem] items-center justify-between" aria-label="Main navigation">
          <a href="#top" className="flex items-center gap-3 text-sm font-semibold text-paper" aria-label="DJ Partner home">
            <span className="flex size-8 items-center justify-center border border-metal/50 font-editorial text-xl text-metal">D</span>
            <span>DJ PARTNER</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a className="text-xs text-copy-muted transition-colors hover:text-paper" href="#about">About</a>
            <a className="text-xs text-copy-muted transition-colors hover:text-paper" href="#capabilities">Capabilities</a>
            <a className="text-xs text-copy-muted transition-colors hover:text-paper" href="#network">Network</a>
            <a className="text-xs text-copy-muted transition-colors hover:text-paper" href="#insights">Insights</a>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="link" className="h-10 rounded-none px-3 text-xs text-paper hover:text-metal" onClick={() => openRequest("Navigation", "I am exploring a strategic transaction")}>Submit opportunity</Button>
            <Button className="h-10 rounded-none border border-metal bg-metal px-5 text-xs text-ink shadow-none hover:bg-paper" onClick={() => openRequest("Navigation")}>Request access <ArrowUpRight aria-hidden="true" /></Button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <Button className="h-9 rounded-none border border-metal bg-metal px-3 text-xs text-ink shadow-none hover:bg-paper" onClick={() => openRequest("Mobile navigation")}>Request access</Button>
            <Button variant="ghost" size="icon" className="text-paper" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </nav>
        {mobileMenuOpen && <div className="border-t hairline bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {[ ["About", "#about"], ["Capabilities", "#capabilities"], ["Network", "#network"], ["Insights", "#insights"] ].map(([label, href]) => <a key={href ?? label} href={href ?? "#top"} className="text-copy-muted" onClick={() => setMobileMenuOpen(false)}>{label}</a>)}
          </div>
        </div>}
      </header>

      <section id="top" className="relative flex min-h-[760px] items-center pt-20 md:min-h-[850px]">
        <img className="hero__image" src={heroImage} alt="A discreet global relationship map centered on South Asia" width={1536} height={1024} fetchPriority="high" />
        <div className="hero__scrim" aria-hidden="true" />
        <NetworkGraphic />
        <div className="section-shell relative z-10 grid min-h-[690px] items-center md:min-h-[750px] md:grid-cols-[1fr_0.65fr]">
          <div className="max-w-[43rem] py-20">
            <p className="eyebrow mb-7">Global advisory <span aria-hidden="true">·</span> Capital <span aria-hidden="true">·</span> Relationships</p>
            <h1 className="font-editorial text-6xl font-medium leading-[0.94] text-paper sm:text-7xl md:text-[6.5rem]">
              CAPITAL MOVES.<br />
              <span className="text-metal">RELATIONSHIPS</span><br />DECIDE.
            </h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-paper-dim md:text-lg md:leading-8">DJ Partner connects qualified businesses, investors and private capital through strategic intelligence, curated relationships and transaction-focused advisory.</p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button className="h-12 rounded-none bg-metal px-6 text-xs text-ink shadow-none hover:bg-paper" onClick={() => openRequest("Hero")}>Request access <ArrowRight aria-hidden="true" /></Button>
              <Button variant="link" className="h-12 rounded-none px-2 text-xs text-paper hover:text-metal" onClick={() => openRequest("Hero", "I am exploring a strategic transaction")}>Submit an opportunity <ArrowUpRight aria-hidden="true" /></Button>
            </div>
            <div className="mt-14 flex items-start gap-3 border-t hairline pt-5 text-xs text-copy-muted">
              <Globe2 className="mt-0.5 size-4 text-metal" aria-hidden="true" />
              <span>Global operations<br /><span className="text-paper-dim">Delhi, India</span></span>
            </div>
          </div>
          <div className="mobile-map mt-4 flex-col gap-0 pb-16" aria-label="Relationship map from DJ Partner to the capital ecosystem">
            <div className="mb-4 border border-metal/50 px-4 py-3 text-center text-xs text-paper">DJ PARTNER</div>
            <div className="mx-auto h-7 w-px bg-metal/50" aria-hidden="true" />
            <div className="grid grid-cols-2 gap-2">
              {["STARTUPS", "ANGEL INVESTORS", "VENTURE CAPITAL", "PRIVATE EQUITY", "FAMILY OFFICES", "PRIVATE MARKETS"].map((node) => <span key={node} className="border hairline px-3 py-3 text-center text-[10px] text-paper-dim">{node}</span>)}
            </div>
            <p className="mt-4 text-center text-xs text-copy-muted">Thousands of relationships. The right one matters.</p>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-[10px] text-copy-muted lg:flex"><span>SCROLL TO EXPLORE</span><ArrowDown className="size-3" aria-hidden="true" /></div>
        <p className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-xs text-copy-muted lg:block">Thousands of relationships. The right one matters.</p>
      </section>

      <section id="about" className="section-shell grid gap-14 py-28 md:grid-cols-[0.7fr_1.3fr] md:py-40">
        <div><p className="eyebrow">The opportunity is not the problem</p><h2 className="mt-6 max-w-sm font-editorial text-4xl leading-tight text-paper md:text-5xl">The capital ecosystem is not short of opportunity.</h2></div>
        <div className="border-l hairline pl-7 md:pl-12">
          <p className="font-editorial text-5xl leading-[1.05] text-paper md:text-7xl">It’s short of<br /><span className="text-metal">the right connection.</span></p>
          <div className="mt-8 grid gap-6 text-sm leading-7 text-copy-muted md:grid-cols-2">
            <p>Capital exists. Businesses exist. Investors exist. Opportunities exist. But the path between them is rarely simple.</p>
            <p>The right company can struggle to reach the right capital. A promising transaction can stall before its participants are properly aligned.</p>
          </div>
          <p className="mt-8 max-w-xl text-base leading-7 text-paper-dim">DJ Partner operates in that gap—bringing intelligence, context and qualified relationships to the path between opportunity and capital.</p>
        </div>
      </section>

      <section className="border-y hairline bg-surface-deep py-24 md:py-32" aria-labelledby="connect-heading">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow">A considered path to connection</p><h2 id="connect-heading" className="mt-4 font-editorial text-5xl text-paper md:text-6xl">We connect the dots.</h2></div><p className="max-w-sm text-sm leading-6 text-copy-muted">A relationship map built around relevance, qualification and alignment—not introductions for their own sake.</p></div>
          <div className="relative mt-14 grid gap-5 md:grid-cols-[1fr_1.2fr_1fr] md:items-center">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1">{["Businesses", "Founders", "Startups"].map((label) => <div key={label} className="border hairline px-4 py-4 text-xs text-paper-dim">{label}</div>)}</div>
            <div className="relative flex min-h-52 flex-col items-center justify-center border-y hairline py-9 md:border-x md:border-y-0">
              <div className="absolute inset-x-0 top-1/2 hidden h-px bg-metal/30 md:block" aria-hidden="true" />
              <div className="relative z-10 border border-metal bg-surface-deep px-7 py-5 text-center"><span className="eyebrow">DJ Partner</span><p className="mt-1 font-editorial text-2xl text-paper">The connection</p></div>
              <p className="relative z-10 mt-5 bg-surface-deep px-3 text-center text-[10px] text-copy-muted">Intelligence <span className="text-metal">→</span> Qualification <span className="text-metal">→</span> Relationship</p>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1">{["Angels", "Venture capital", "Private equity", "Family offices", "Fund houses"].map((label) => <div key={label} className="border hairline px-4 py-3 text-xs text-paper-dim">{label}</div>)}</div>
          </div>
          <p className="mt-8 text-center text-xs text-copy-muted">Intelligence <span className="px-2 text-metal">→</span> Qualification <span className="px-2 text-metal">→</span> Relationship <span className="px-2 text-metal">→</span> Introduction <span className="px-2 text-metal">→</span> Transaction</p>
        </div>
      </section>

      <section id="capabilities" className="section-shell py-28 md:py-36">
        <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div><p className="eyebrow">Where we work</p><h2 className="mt-5 max-w-sm font-editorial text-5xl leading-tight text-paper md:text-6xl">Across the capital ecosystem.</h2><p className="mt-6 max-w-sm text-sm leading-6 text-copy-muted">Focused advisory, intelligence and transaction support across connected markets.</p></div>
          <div className="capability-strip grid grid-cols-1 gap-0 sm:grid-cols-2">
            {capabilities.map((item) => <article key={item.index} className="capability-card min-h-40 border-b hairline px-5 py-6 first:border-t sm:min-h-44 sm:border-t sm:nth-[2n]:border-l sm:nth-[2n]:border-l-hairline">
              <div className="flex items-center justify-between"><span className="capability-index text-xs text-copy-faint">{item.index}</span><ArrowUpRight className="size-4 text-metal/70" aria-hidden="true" /></div>
              <h3 className="mt-6 font-editorial text-2xl text-paper">{item.title}</h3><p className="mt-2 text-xs leading-5 text-copy-muted">{item.detail}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-surface-deep py-24 md:py-36">
        <div className="section-shell grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <h2 className="font-editorial text-6xl leading-[0.96] text-paper md:text-8xl">ACCESS IS<br />EVERYWHERE.<br /><span className="text-metal">ALIGNMENT<br />IS RARE.</span></h2>
          <div className="max-w-md md:justify-self-end"><p className="font-editorial text-3xl leading-snug text-paper-dim md:text-4xl">The right opportunity deserves the right audience.</p><p className="mt-6 text-sm leading-7 text-copy-muted">We focus on where capital, capability, timing and relationships actually align. Not every opportunity belongs to every investor.</p><p className="mt-10 border-l border-metal pl-5 text-sm text-paper">Private by nature. Strategic by design.</p></div>
        </div>
      </section>

      <section className="section-shell py-28 md:py-36">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">The deal path</p><h2 className="mt-5 font-editorial text-5xl text-paper md:text-6xl">From context to connection.</h2></div><p className="max-w-xs text-sm leading-6 text-copy-muted">A disciplined process helps serious conversations move forward.</p></div>
        <div className="mt-14 grid gap-0 md:grid-cols-6">
          {dealSteps.map(([number, title, copy]) => <article key={number} className="relative grid grid-cols-[3rem_1fr] gap-3 border-t hairline py-5 md:block md:border-l md:border-t-0 md:px-4 md:py-0 md:first:border-l-0">
            <span className="font-editorial text-3xl text-metal">{number}</span><div><h3 className="mt-1 text-xs font-semibold uppercase text-paper">{title}</h3><p className="mt-3 max-w-32 text-xs leading-5 text-copy-muted">{copy}</p></div>
          </article>)}
        </div>
        <p className="mt-14 border-t hairline pt-7 font-editorial text-3xl text-paper md:text-4xl">The introduction is only the beginning.</p>
      </section>

      <section id="network" className="border-y hairline bg-surface-deep py-24 md:py-32">
        <div className="section-shell grid gap-12 md:grid-cols-[1fr_0.85fr] md:items-center">
          <div><p className="eyebrow">A global perspective</p><h2 className="mt-5 font-editorial text-6xl leading-[1] text-paper md:text-7xl">ONE NETWORK.<br /><span className="text-metal">MULTIPLE MARKETS.</span></h2><p className="mt-7 max-w-lg text-sm leading-7 text-copy-muted">Our operating perspective is global, with relationships developed across markets, industries and capital ecosystems.</p>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-4 text-xs text-paper-dim sm:grid-cols-3">{["India", "Middle East", "Europe", "United Kingdom", "United States", "Asia"].map((region) => <span key={region} className="region-pin">{region}</span>)}</div>
          </div>
          <div className="relative min-h-[320px] border-y hairline md:min-h-[390px]">
            <RegionalNetwork />
            <div className="absolute bottom-5 left-5 border-l border-metal pl-4"><p className="eyebrow">Global operations</p><p className="mt-2 text-sm text-paper">Delhi, India</p><p className="mt-1 text-xs text-copy-muted">Dwarka, New Delhi — 110045</p></div>
          </div>
        </div>
      </section>

      <section className="section-shell py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <div><p className="eyebrow">Who we work with</p><h2 className="mt-5 font-editorial text-5xl leading-tight text-paper md:text-6xl">Different players.<br /><span className="text-metal">One ecosystem.</span></h2></div>
          <div className="flex flex-wrap content-start gap-2">{ecosystem.map((item, index) => <span key={item} className={`border px-4 py-3 text-xs ${index === 0 || index === 6 ? "border-metal/50 text-paper" : "hairline text-copy-muted"}`}>{item}</span>)}</div>
        </div>
      </section>

      <section className="border-y hairline bg-surface-deep py-24 md:py-32">
        <div className="section-shell grid gap-12 md:grid-cols-[1fr_0.7fr]">
          <h2 className="font-editorial text-5xl leading-tight text-paper md:text-6xl">DEALS ARE BUILT ON CAPITAL.<br /><span className="text-metal">RELATIONSHIPS ARE BUILT ON TRUST.</span></h2>
          <div><p className="max-w-md text-sm leading-7 text-copy-muted">DJ Partner works across multiple sides of the capital ecosystem. That requires discretion, clear context and disciplined communication.</p><ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-xs text-paper-dim">{["Confidentiality", "Context", "Clear communication", "Qualified relationships", "Disciplined execution"].map((item) => <li key={item} className="border-t hairline pt-3">{item}</li>)}</ul><p className="mt-10 font-editorial text-2xl text-paper">Trust isn’t a feature of the business. It is the business.</p></div>
        </div>
      </section>

      <section id="insights" className="section-shell py-28 md:py-36">
        <div className="flex items-center gap-2 text-xs text-metal"><LockKeyhole className="size-3.5" aria-hidden="true" /><span className="eyebrow">Coming into view</span></div>
        <div className="mt-6 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end"><div><h2 className="font-editorial text-6xl leading-none text-paper md:text-7xl">A better way<br /><span className="text-metal">to navigate opportunity.</span></h2></div><p className="max-w-lg text-sm leading-7 text-copy-muted">DJ Partner is developing a private digital environment designed to help qualified participants discover, evaluate and manage relevant opportunities and relationships.</p></div>
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          <div className="teaser-card teaser-card--blurred border hairline p-5"><div className="teaser-card__inner"><p className="eyebrow">Private opportunity</p><p className="mt-7 font-editorial text-2xl text-paper">Technology</p><p className="mt-2 text-xs text-copy-muted">Growth stage · Strategic capital</p><div className="mt-7 border-t hairline pt-4 text-xs text-metal">Request access <ArrowRight className="inline size-3" aria-hidden="true" /></div></div></div>
          <div className="teaser-card teaser-card--blurred border hairline p-5"><div className="teaser-card__inner"><p className="eyebrow">Investor profile</p><p className="mt-7 font-editorial text-2xl text-paper">Family office</p><p className="mt-2 text-xs text-copy-muted">Technology · Consumer · Global</p><div className="mt-7 border-t hairline pt-4 text-xs text-metal">View profile <ArrowRight className="inline size-3" aria-hidden="true" /></div></div></div>
          <div className="teaser-card teaser-card--blurred border hairline p-5"><div className="teaser-card__inner"><p className="eyebrow">Deal flow</p><div className="mt-7 flex flex-wrap items-center gap-2 text-xs text-paper"><span>Qualification</span><ArrowRight className="size-3 text-metal" aria-hidden="true" /><span>Introduction</span><ArrowRight className="size-3 text-metal" aria-hidden="true" /><span>Diligence</span></div><p className="mt-5 text-xs text-copy-muted">A considered path from opportunity to discussion.</p><div className="mt-7 border-t hairline pt-4 text-xs text-metal">Private access <ArrowRight className="inline size-3" aria-hidden="true" /></div></div></div>
        </div>
        <div className="mt-3 flex flex-col justify-between gap-5 border hairline bg-surface-deep p-6 md:flex-row md:items-center md:p-8"><div><p className="eyebrow">Private access</p><p className="mt-2 font-editorial text-3xl text-paper">Not every opportunity is public.</p></div><Button variant="outline" className="h-11 w-fit rounded-none border-metal/60 px-5 text-xs text-paper hover:bg-surface-raised" onClick={() => openRequest("Private access", "I want to join the network")}>Join the network <ArrowUpRight aria-hidden="true" /></Button></div>
      </section>

      <section className="border-y hairline bg-surface-deep py-28 text-center md:py-40">
        <div className="section-shell"><p className="eyebrow">The right connection changes the conversation</p><h2 className="mt-7 font-editorial text-6xl leading-[0.95] text-paper md:text-8xl">WE DON’T BELIEVE<br /><span className="text-metal">IN RANDOM<br className="md:hidden" /> INTRODUCTIONS.</span></h2><p className="mt-8 font-editorial text-3xl text-paper-dim">We believe in relevant relationships.</p><p className="mx-auto mt-6 max-w-md text-sm leading-7 text-copy-muted">Relevant capital. Relevant opportunity.<br />Relevant timing. Relevant people.</p></div>
      </section>

      <section className="section-shell py-28 md:py-36">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-end"><div><p className="eyebrow">Start a conversation</p><h2 className="mt-6 font-editorial text-6xl leading-[1] text-paper md:text-7xl">HAVE A DEAL?<br />NEED CAPITAL?<br /><span className="text-metal">SEEKING ALIGNMENT?</span></h2></div><div><p className="max-w-sm text-lg text-paper-dim">Let’s find the right path through the maze.</p><div className="mt-8 grid gap-0 border-t hairline sm:grid-cols-3">
          {([["For businesses", "Submit an opportunity", "I am raising capital"], ["For investors", "Request investor access", "I am looking for opportunities"], ["For partners", "Join the network", "I want to join the network"]] as const).map(([audience, label, option]) => <button key={audience} type="button" onClick={() => openRequest(label, option)} className="group border-b hairline px-4 py-5 text-left transition-colors hover:bg-surface-raised sm:border-r sm:last:border-r-0"><span className="eyebrow">{audience}</span><span className="mt-3 flex items-center justify-between gap-2 text-xs text-paper">{label}<ArrowUpRight className="size-4 shrink-0 text-metal transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span></button>)}
        </div></div></div>
      </section>

      <footer className="border-t hairline bg-surface-deep pb-20 pt-12 md:pb-12">
        <div className="section-shell"><div className="grid gap-10 md:grid-cols-[1.2fr_0.7fr_0.7fr]">
          <div><a href="#top" className="inline-flex items-center gap-3 text-sm font-semibold text-paper"><span className="flex size-8 items-center justify-center border border-metal/50 font-editorial text-xl text-metal">D</span> DJ PARTNER</a><p className="mt-4 font-editorial text-2xl text-paper-dim">The Intelligence Behind<br />Strategic Capital.</p></div>
          <div><p className="eyebrow">Explore</p><div className="mt-4 grid grid-cols-2 gap-y-3 text-xs text-copy-muted"><a href="#about">About</a><a href="#capabilities">Capabilities</a><a href="#network">Network</a><a href="#insights">Insights</a></div></div>
          <div><p className="eyebrow">Global operations</p><p className="mt-4 text-xs leading-6 text-paper-dim">Delhi, India<br />Dwarka, New Delhi — 110045</p><Button variant="link" className="mt-2 h-auto px-0 text-xs text-metal" onClick={() => openRequest("Footer")}>Request access <ArrowUpRight aria-hidden="true" /></Button></div>
        </div><p className="mt-12 border-t hairline pt-6 text-[11px] leading-5 text-copy-faint">DJ Partner facilitates advisory, relationship and transaction support subject to applicable laws, regulations, mandates and eligibility requirements. No investment, funding, return or transaction outcome is guaranteed.</p><p className="mt-4 text-[10px] text-copy-faint">© {new Date().getFullYear()} DJ Partner. All rights reserved.</p></div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t hairline bg-background/95 p-3 backdrop-blur-md md:hidden"><Button className="h-11 w-full rounded-none bg-metal text-xs text-ink shadow-none hover:bg-paper" onClick={() => openRequest("Mobile sticky access")}>Request access <ArrowUpRight aria-hidden="true" /></Button></div>
      {modalOpen && <RequestModal intent={intent} setIntent={setIntent} success={success} onSubmit={submitRequest} onClose={() => setModalOpen(false)} />}
    </main>
  );
}

function NetworkGraphic() {
  const labels = [
    ["STARTUPS", 105, 67], ["ANGEL INVESTORS", 215, 45], ["VENTURE CAPITAL", 405, 90],
    ["PRIVATE EQUITY", 510, 153], ["FAMILY OFFICES", 490, 306], ["FUND HOUSES", 340, 405],
    ["PRIVATE MARKETS", 170, 365], ["STRATEGIC INVESTORS", 70, 260], ["PUBLIC MARKETS", 215, 170],
  ] as const;
  return <div className="hero__network" aria-hidden="true"><svg viewBox="0 0 600 470" role="presentation">
    {labels.map(([, x, y], i) => <path key={`path-${i}`} className="network-line" d={`M300 235 Q${(300 + x) / 2 + (i % 2 ? 35 : -35)} ${(235 + y) / 2} ${x} ${y}`} />)}
    {labels.map(([label, x, y], i) => <g key={label}><circle className="network-dot" cx={x} cy={y} r={i % 3 === 0 ? 2.8 : 2} style={{ animationDelay: `${i * 0.23}s` }} /><text className="network-label" x={x + 10} y={y + 3}>{label}</text></g>)}
    <circle className="network-dot network-dot--core" cx="300" cy="235" r="4" /><circle cx="300" cy="235" r="16" fill="none" stroke="var(--metal)" strokeOpacity=".35" /><text className="network-label--core" x="300" y="265" textAnchor="middle">DJ PARTNER</text>
  </svg></div>;
}

function RegionalNetwork() {
  const places = [["USA", 19, 43], ["UK", 49, 24], ["EUROPE", 61, 34], ["MIDDLE EAST", 57, 51], ["DELHI", 72, 56], ["ASIA", 83, 43]] as const;
  return <svg className="absolute inset-0 size-full" viewBox="0 0 600 340" role="img" aria-label="Illustrative relationship connections across markets, centered on Delhi">
    {[0, 1, 2, 3, 4].map((curve) => <path key={curve} d={`M432 190 Q${240 + curve * 15} ${30 + curve * 55} ${70 + curve * 23} ${140 + curve * 10}`} fill="none" stroke="var(--metal)" strokeOpacity=".28" strokeWidth="1" strokeDasharray="4 5" />)}
    {places.map(([name, x, y]) => <g key={name}><circle cx={x * 6} cy={y * 3.4} r={name === "DELHI" ? 4 : 2.5} fill="var(--metal)" /><text x={x * 6 + 10} y={y * 3.4 + 4} fill="var(--paper-dim)" fontSize="9" fontFamily="var(--font-sans)">{name}</text></g>)}
    <circle cx="432" cy="190" r="14" fill="none" stroke="var(--metal)" strokeOpacity=".3" />
  </svg>;
}

function RequestModal({ intent, setIntent, success, onSubmit, onClose }: {
  intent: string;
  setIntent: (value: string) => void;
  success: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="modal-panel relative max-h-[94vh] w-full max-w-2xl overflow-y-auto border hairline bg-surface-deep p-6 sm:p-9" role="dialog" aria-modal="true" aria-labelledby="request-title" aria-describedby="request-description">
      <Button variant="ghost" size="icon" className="absolute right-4 top-4 text-copy-muted hover:text-paper" aria-label="Close request form" onClick={onClose}><X aria-hidden="true" /></Button>
      {success ? <div className="flex min-h-[410px] flex-col justify-center pr-8">
        <p className="eyebrow">Request received</p><h2 id="request-title" className="mt-5 font-editorial text-5xl text-paper sm:text-6xl">Your request is in.</h2><p id="request-description" className="mt-6 max-w-lg text-sm leading-7 text-copy-muted">Our advisory team will review the information and contact you where there is a relevant opportunity to engage.</p><Button variant="outline" className="mt-9 w-fit rounded-none border-metal/50 text-xs text-paper" onClick={onClose}>Close</Button>
      </div> : <>
        <p className="eyebrow">Private enquiry</p><h2 id="request-title" className="mt-4 font-editorial text-4xl text-paper sm:text-5xl">What brings you here?</h2><p id="request-description" className="mt-3 max-w-lg text-xs leading-6 text-copy-muted">Share a little context. We’ll review your request for a relevant point of connection.</p>
        <form className="mt-7" onSubmit={onSubmit}>
          <fieldset><legend className="mb-3 text-xs text-paper-dim">Select the closest fit</legend><div className="grid gap-2 sm:grid-cols-2">
            {intentOptions.map((option) => <label key={option} className={`flex min-h-11 cursor-pointer items-center gap-3 border px-3 py-2.5 text-xs transition-colors ${intent === option ? "border-metal/70 bg-surface-raised text-paper" : "hairline text-copy-muted hover:border-metal/40"}`}><input type="radio" name="intent" value={option} checked={intent === option} onChange={() => setIntent(option)} className="accent-primary" required />{option}</label>)}
          </div></fieldset>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <label className="text-xs text-copy-muted">Name <span className="text-metal">*</span><input name="name" autoComplete="name" className="form-field mt-2" placeholder="Your name" required /></label>
            <label className="text-xs text-copy-muted">Company<input name="company" autoComplete="organization" className="form-field mt-2" placeholder="Company name" /></label>
            <label className="text-xs text-copy-muted">Designation<input name="designation" autoComplete="organization-title" className="form-field mt-2" placeholder="Your role" /></label>
            <label className="text-xs text-copy-muted">Email <span className="text-metal">*</span><input name="email" type="email" autoComplete="email" className="form-field mt-2" placeholder="name@company.com" required /></label>
            <label className="text-xs text-copy-muted">Phone<input name="phone" type="tel" autoComplete="tel" className="form-field mt-2" placeholder="Phone number" /></label>
            <label className="text-xs text-copy-muted">Country<input name="country" autoComplete="country-name" className="form-field mt-2" placeholder="Country" /></label>
          </div>
          <label className="mt-4 block text-xs text-copy-muted">What are you looking for?<textarea name="message" className="form-field mt-2 min-h-24 resize-y" placeholder="A brief overview (optional)" /></label>
          <label className="mt-4 block text-xs text-copy-muted">Confidential material (optional)<input name="material" type="file" className="form-field mt-2 file:mr-3 file:border-0 file:bg-surface-raised file:px-3 file:py-1.5 file:text-xs file:text-paper" /></label>
          <p className="mt-3 text-[11px] leading-5 text-copy-faint">Please do not upload sensitive information unless specifically requested by DJ Partner.</p>
          <Button type="submit" className="mt-6 h-12 w-full rounded-none bg-metal text-xs text-ink shadow-none hover:bg-paper">Request connection <ArrowRight aria-hidden="true" /></Button>
          <p className="mt-3 text-center text-[10px] text-copy-faint">No investment, funding or transaction outcome is guaranteed.</p>
        </form>
      </>}
    </section>
  </div>;
}