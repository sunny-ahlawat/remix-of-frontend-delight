import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import wordmark from "@/assets/dj-partners-wordmark.png.asset.json";

const services = [
  {
    title: "Capital advisory and fundraising support",
    detail: "Support for businesses assessing capital needs and preparing for relevant investor conversations.",
  },
  {
    title: "Private-market and secondary transaction support",
    detail: "Context and coordination for private-market transactions, including secondary opportunities where appropriate.",
  },
  {
    title: "Investor relations and strategic introductions",
    detail: "Thoughtful outreach and introductions shaped around the mandate, fit, and timing.",
  },
  {
    title: "Market intelligence and research",
    detail: "Research to help clarify market context, participants, and strategic considerations.",
  },
  {
    title: "Cross-border expansion and strategic partnerships",
    detail: "Relationship-led support to explore potential counterparties and cross-border opportunities.",
  },
];

const workSteps = [
  "Understand the mandate.",
  "Assess the opportunity and requirements.",
  "Identify relevant counterparties.",
  "Coordinate qualified introductions and discussions.",
  "Support diligence, negotiations, and transaction progress where engaged.",
];

const audiences = [
  {
    title: "Founders and startups",
    detail: "Clarify capital needs and prepare for relevant investor conversations.",
  },
  {
    title: "Angel investors and venture capital funds",
    detail: "Explore opportunities and introductions that align with stated interests.",
  },
  {
    title: "Private equity funds and family offices",
    detail: "Consider private-market situations with relevant context and counterparties.",
  },
  {
    title: "Institutional and strategic investors",
    detail: "Connect with businesses and transaction discussions where there may be a fit.",
  },
  {
    title: "Private-market participants and transaction partners",
    detail: "Coordinate conversations and transaction support when engaged for a specific mandate.",
  },
];

const enquiryTypes = [
  "Business and fundraising enquiry",
  "Investor or capital-provider enquiry",
  "Strategic partnership enquiry",
  "Other enquiry",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DJ Partners | Capital Advisory & Strategic Relationships" },
      {
        name: "description",
        content:
          "DJ Partners supports businesses, investors, and private-market participants through capital advisory, research, introductions, and transaction support.",
      },
      { property: "og:title", content: "DJ Partners | Capital Advisory & Strategic Relationships" },
      {
        property: "og:description",
        content: "A considered approach to capital, counterparties, and transaction support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "DJ Partners | Capital Advisory & Strategic Relationships" },
      {
        name: "twitter:description",
        content: "A considered approach to capital, counterparties, and transaction support.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const navLinks = [
    ["What We Do", "#what-we-do"],
    ["How We Work", "#how-we-work"],
    ["With Whom We Work", "#with-whom-we-work"],
    ["Contact", "#contact"],
  ] as const;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b hairline bg-background/90 backdrop-blur-md">
        <nav className="section-shell flex h-[4.75rem] items-center justify-between gap-5" aria-label="Main navigation">
          <a href="#what-we-do" className="shrink-0" aria-label="DJ Partners home" onClick={closeMenu}>
            <img src={wordmark.url} alt="DJ Partners" width={178} height={40} className="h-10 w-[178px] object-contain" />
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map(([label, href]) => (
              <a key={href} className="text-xs text-copy-muted transition-colors hover:text-paper" href={href}>
                {label}
              </a>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild className="h-10 rounded-none bg-metal px-4 text-xs text-ink shadow-none hover:bg-paper sm:px-5">
              <a href="#contact" onClick={closeMenu}>Private Inquiry <ArrowRight aria-hidden="true" /></a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-paper lg:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className="border-t hairline bg-background px-6 py-5 lg:hidden">
            <div className="section-shell flex flex-col gap-5">
              {navLinks.map(([label, href]) => (
                <a key={href} className="text-sm text-copy-muted" href={href} onClick={closeMenu}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="what-we-do" className="section-shell scroll-mt-24 pb-24 pt-36 md:pb-32 md:pt-44" aria-labelledby="what-heading">
        <div className="grid gap-12 border-b hairline pb-16 md:grid-cols-[1fr_0.7fr] md:items-end md:pb-20">
          <div>
            <p className="eyebrow">Global advisory · Capital · Relationships</p>
            <h1 className="mt-6 max-w-3xl font-editorial text-5xl leading-[1.05] text-paper sm:text-6xl md:text-7xl">
              Capital moves.<br /><span className="text-metal">Relationships decide.</span>
            </h1>
          </div>
          <div className="max-w-xl md:justify-self-end">
            <p className="text-base leading-7 text-paper-dim md:text-lg md:leading-8">
              DJ Partners connects qualified businesses, investors, and private capital through strategic intelligence, considered introductions, and transaction-focused advisory.
            </p>
            <a href="#contact" className="mt-7 inline-flex items-center gap-2 border-b border-metal/50 pb-2 text-xs text-paper transition-colors hover:text-metal">
              Private Inquiry <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid gap-8 pt-12 md:grid-cols-[0.55fr_1.45fr] md:gap-16 md:pt-16">
          <div>
            <p className="eyebrow">01 / What we do</p>
            <h2 id="what-heading" className="mt-4 font-editorial text-3xl text-paper md:text-4xl">Focused support, shaped around the mandate.</h2>
          </div>
          <div className="divide-y divide-hairline">
            {services.map((service, index) => (
              <article key={service.title} className="grid gap-2 py-5 first:pt-0 sm:grid-cols-[2rem_0.9fr_1.1fr] sm:gap-5">
                <span className="text-xs text-metal">0{index + 1}</span>
                <h3 className="text-sm leading-6 text-paper">{service.title}</h3>
                <p className="text-xs leading-6 text-copy-muted">{service.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-we-work" className="scroll-mt-20 border-y hairline bg-surface-deep py-20 md:py-28" aria-labelledby="how-heading">
        <div className="section-shell grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
          <div>
            <p className="eyebrow">02 / How we work</p>
            <h2 id="how-heading" className="mt-5 max-w-sm font-editorial text-4xl leading-tight text-paper md:text-5xl">A clear process. A considered pace.</h2>
          </div>
          <div>
            <ol className="divide-y divide-hairline border-y hairline">
              {workSteps.map((step, index) => (
                <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4 text-sm leading-6 text-paper-dim">
                  <span className="font-editorial text-2xl text-metal">0{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-7 max-w-2xl text-xs leading-6 text-copy-muted">
              Engagements are mandate-led and agreed before work begins. Information and introductions are handled discreetly, with no assumption of exclusivity, access, or outcome. The scope of support depends on the engagement and applicable requirements.
            </p>
          </div>
        </div>
      </section>

      <section id="with-whom-we-work" className="section-shell scroll-mt-20 py-20 md:py-28" aria-labelledby="audience-heading">
        <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
          <div>
            <p className="eyebrow">03 / With whom we work</p>
            <h2 id="audience-heading" className="mt-5 max-w-sm font-editorial text-4xl leading-tight text-paper md:text-5xl">Different perspectives. Shared context.</h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-copy-muted">
              We engage with participants across the capital ecosystem, bringing relevant context to each conversation without suggesting a formal partnership or guaranteed access.
            </p>
          </div>
          <div className="divide-y divide-hairline border-y hairline">
            {audiences.map((audience, index) => (
              <article key={audience.title} className="grid gap-2 py-5 sm:grid-cols-[2rem_0.9fr_1.1fr] sm:gap-5">
                <span className="text-xs text-metal">0{index + 1}</span>
                <h3 className="text-sm leading-6 text-paper">{audience.title}</h3>
                <p className="text-xs leading-6 text-copy-muted">{audience.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 border-y hairline bg-surface-deep py-20 md:py-28" aria-labelledby="contact-heading">
        <div className="section-shell grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="eyebrow">04 / Contact</p>
            <h2 id="contact-heading" className="mt-5 max-w-md font-editorial text-4xl leading-tight text-paper md:text-5xl">Start with a private inquiry.</h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-copy-muted">
              For business, capital-provider, or strategic partnership enquiries. Please do not include confidential deal information.
            </p>
          </div>
          {submitted ? (
            <div className="flex min-h-72 flex-col justify-center border-y hairline py-8" role="status">
              <p className="eyebrow">Enquiry form preview</p>
              <h3 className="mt-4 font-editorial text-3xl text-paper">Thank you for getting in touch.</h3>
              <p className="mt-4 max-w-lg text-sm leading-6 text-copy-muted">
                This preview does not send or store your enquiry. Contact delivery needs to be connected before the form can reach DJ Partners.
              </p>
            </div>
          ) : (
            <form className="grid gap-5" onSubmit={submitEnquiry}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-xs text-copy-muted">Name <span className="text-metal">*</span>
                  <input name="name" autoComplete="name" className="form-field mt-2" placeholder="Your name" required />
                </label>
                <label className="text-xs text-copy-muted">Work email <span className="text-metal">*</span>
                  <input name="email" type="email" autoComplete="email" className="form-field mt-2" placeholder="name@company.com" required />
                </label>
              </div>
              <label className="text-xs text-copy-muted">Enquiry type <span className="text-metal">*</span>
                <select name="enquiryType" className="form-field mt-2" required defaultValue="">
                  <option value="" disabled>Select an enquiry type</option>
                  {enquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <label className="text-xs text-copy-muted">Brief message <span className="text-metal">*</span>
                <textarea name="message" className="form-field mt-2 min-h-28 resize-y" placeholder="A short, non-confidential introduction" required />
              </label>
              <p className="text-[11px] leading-5 text-copy-faint">Please do not include sensitive deal materials or confidential information in this form.</p>
              <Button type="submit" className="h-12 w-fit min-w-44 rounded-none bg-metal px-6 text-xs text-ink shadow-none hover:bg-paper">Send inquiry <ArrowRight aria-hidden="true" /></Button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t hairline py-8">
        <div className="section-shell flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <img src={wordmark.url} alt="DJ Partners" width={178} height={40} className="h-10 w-[178px] object-contain object-left" />
          <p className="max-w-2xl text-[10px] leading-5 text-copy-faint">Advisory and transaction support are subject to applicable laws, regulations, agreed mandates, and eligibility requirements. No investment, funding, return, access, or transaction outcome is guaranteed.</p>
        </div>
      </footer>
    </main>
  );
}