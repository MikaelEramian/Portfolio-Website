import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import CursorTrail from "@/components/CursorTrail";
import FloatingParticles from "@/components/FloatingParticles";
import JellyName from "@/components/JellyName";
import Reveal from "@/components/Reveal";
import ScrollMouse from "@/components/ScrollMouse";
import ScrollParallax from "@/components/ScrollParallax";
import SectionHeading from "@/components/SectionHeading";
import SketchyFilter from "@/components/SketchyFilter";

const EMAIL_PLACEHOLDER = "mikaeleramian@gmail.com";
const GITHUB_URL = "https://github.com/MikaelEramian";
const LINKEDIN_URL = "https://www.linkedin.com/in/mikael-eramian/";

const projects = [
  {
    title: "Chessbot",
    description: "Secured 2nd place overall at a university chess tournament. Engineered a competitive chess engine using custom heuristics and search algorithms.",
    color: "bg-amber",
    link: "https://github.com/angellane/ChessBot",
    linkLabel: "GitHub",
    type: "github"
  },
  {
    title: "Booze & Bytes",
    description: "Lead programmer for an interactive game built in Unity. I handled the core coding and gameplay mechanics.",
    color: "bg-terracotta",
    link: "https://24427233.wixsite.com/mikaeleramian/blog",
    linkLabel: "Dev Diary",
    type: "external"
  },
  {
    title: "UL Timetable System",
    description: "A Java-based university scheduling system. It features separate logins for students, lecturers, and admins to manage and view their timetables.",
    color: "bg-sage",
    link: "https://github.com/MikaelEramian/UL-Timetabling-System",
    linkLabel: "GitHub",
    type: "github"
  }
];

const interests = [
  { label: "Cybersecurity", note: "actively learning, looking to move into the field.", color: "bg-amber" },
  { label: "Blockchain & crypto markets", note: "interest in DeFi, market mechanics and tokenomics.", color: "bg-terracotta" },
  { label: "Calisthenics", note: "training seriously, working towards advanced skills.", color: "bg-sage" },
  { label: "Video editing", note: "hobby that occasionally becomes useful.", color: "bg-steel" },
] as const;

const stack = [
  "Java",
  "Python",
  "C++",
  "JavaScript",
  "HTML",
  "Linux",
] as const;

const info = [
  { label: "Degree", value: "BSc Computer Science" },
  { label: "University", value: "University of Limerick" },
  { label: "Location", value: "Limerick, Ireland" },
  { label: "Internship", value: "Product Support Engineer Intern @ Telnyx" },
  { label: "Status", value: "Learning Cybersecurity" },
];

const SocialIcons = ({ size = 18 }: { size?: number }) => (
  <div className="flex items-center gap-3">
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="GitHub"
      className="rounded-full border border-border p-2 text-muted-foreground transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-amber hover:text-amber"
    >
      <Github size={size} />
    </a>
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="LinkedIn"
      className="rounded-full border border-border p-2 text-muted-foreground transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-amber hover:text-amber"
    >
      <Linkedin size={size} />
    </a>
  </div>
);

const BackgroundGlows = () => (
  <div className="fixed inset-0 z-[-3] pointer-events-none transform-gpu bg-background" style={{ transform: "translate3d(0, calc(var(--scroll-y, 0px) * -0.05), 0)" }}>
     {/* Base background color gradient */}
     <div className="absolute inset-[-50%] bg-[linear-gradient(180deg,hsl(28_30%_20%)_0%,hsl(24_20%_16%)_55%,hsl(22_20%_14%)_100%)] z-[-1]" />
     {/* Staggered animated glows */}
     <div className="absolute inset-[-50%] bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,hsl(32_95%_65%/0.35),transparent_65%)] animate-[pulse-glow_8s_ease-in-out_infinite_alternate]" style={{ animationDelay: "0s" }} />
     <div className="absolute inset-[-50%] bg-[radial-gradient(ellipse_70%_60%_at_10%_75%,hsl(14_80%_58%/0.28),transparent_70%)] animate-[pulse-glow_10s_ease-in-out_infinite_alternate]" style={{ animationDelay: "-3s" }} />
     <div className="absolute inset-[-50%] bg-[radial-gradient(ellipse_60%_55%_at_95%_35%,hsl(32_85%_60%/0.25),transparent_70%)] animate-[pulse-glow_9s_ease-in-out_infinite_alternate]" style={{ animationDelay: "-6s" }} />
     <div className="absolute inset-[-50%] bg-[radial-gradient(ellipse_50%_45%_at_85%_95%,hsl(28_40%_30%/0.45),transparent_70%)] animate-[pulse-glow_11s_ease-in-out_infinite_alternate]" style={{ animationDelay: "-8s" }} />
  </div>
);

const Index = () => {
  return (
    <div className="painted-bg min-h-screen">
      <BackgroundGlows />
      <SketchyFilter />
      <ScrollParallax />
      <FloatingParticles />
      <CursorTrail />

      <main className="mx-auto w-full max-w-[640px] px-6 pb-12 pt-40 sm:pt-56">
        {/* Hero — ends naturally, doesn't shout */}
        <header className="pb-10">
          <div className="sm:pl-6">
            <Reveal>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[1px] rounded-full bg-amber align-middle" />
                Hi, I am
              </p>
            </Reveal>
  
            <Reveal delay={80}>
              <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-foreground sm:text-6xl">
                <JellyName text="Mikael Eramian" />
              </h1>
            </Reveal>
  
            <Reveal delay={180}>
              <p className="mt-5 text-lg leading-relaxed text-foreground/85">
                Computer Science student - University of Limerick
              </p>
            </Reveal>
  
            {/*<Reveal delay={260}>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                Product Support Engineer Intern @ Telnyx
              </p>
            </Reveal>*/}
  
            <Reveal delay={340}>
              <div className="mt-7">
                <SocialIcons />
              </div>
            </Reveal>
          </div>

          <Reveal delay={500}>
            <div className="mt-10 flex justify-center">
              <ScrollMouse />
            </div>
          </Reveal>
        </header>

        {/* About */}
        <section className="pb-16 sm:pl-6">
          <Reveal requireScroll>
            <SectionHeading eyebrow="about">Myself</SectionHeading>
          </Reveal>

          <Reveal requireScroll delay={80}>
            <p className="text-[17px] leading-[1.75] text-foreground/85">
              I'm a computer science student at the University of Limerick, currently interning as a Product Support Engineer at Telnyx. 
              I spend my time exploring cybersecurity, working toward my Google Cybersecurity Certificate, and building projects with AI-assisted development workflows.
            </p>
          </Reveal>

          <Reveal requireScroll delay={160}>
            <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-2">
              {info.map((row) => (
                <div key={row.label} className="flex flex-col gap-0.5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className="text-[15px] text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        {/* Projects */}
        <section className="pb-16 sm:pl-6">
          <Reveal requireScroll>
            <SectionHeading eyebrow="work">projects</SectionHeading>
          </Reveal>

          <div className="mt-8 space-y-4">
            {projects.map((project, i) => (
              <Reveal requireScroll key={project.title} delay={i * 100}>
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group relative flex items-center justify-between border border-border bg-card/40 p-5 transition-all duration-300 hover:border-amber/60 hover:bg-card/60"
                >
                  <div className="flex items-center gap-4 pr-4">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${project.color}`} aria-hidden />
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-amber transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground line-clamp-1 sm:line-clamp-none">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-amber shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider hidden sm:block">
                      {project.linkLabel}
                    </span>
                    {project.type === 'github' ? <Github size={16} /> : <ExternalLink size={16} />}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="pb-16 sm:pl-6">
          <Reveal requireScroll>
            <SectionHeading eyebrow="into">into</SectionHeading>
          </Reveal>

          <ul className="space-y-3">
            {interests.map((item, i) => (
              <Reveal requireScroll key={item.label} delay={i * 70} as="li">
                <div className="group flex items-baseline gap-4 border-b border-border/60 py-3 transition-colors duration-300 hover:border-amber/60">
                  <span
                    className={`mt-[2px] inline-block h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`}
                    aria-hidden
                  />
                  <span className="font-display text-xl text-foreground">{item.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">— {item.note}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Stack */}
        <section className="pb-16 sm:pl-6">
          <Reveal requireScroll>
            <SectionHeading eyebrow="stack">stack</SectionHeading>
          </Reveal>

        {/*  <Reveal requireScroll delay={80}>
            <p className="mb-5 text-[15px] text-muted-foreground">
              What I've Used
            </p>
          </Reveal> */}

          <div className="flex flex-wrap gap-2">
            {stack.map((tag, i) => (
              <Reveal requireScroll key={tag} delay={i * 40} as="span">
                <span className="inline-block rounded-full border border-border bg-card/40 px-3.5 py-1.5 font-mono text-xs text-foreground/90 transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-amber hover:text-amber">
                  {tag}
                </span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="pt-4 sm:pl-6">
          <Reveal requireScroll>
            <SectionHeading eyebrow="contact">say hi</SectionHeading>
          </Reveal>

          {/* <Reveal requireScroll delay={80}>
            <p className="text-[17px] leading-[1.75] text-foreground/85">
              The fastest way to reach me is email. I read everything, reply to most things,
              and probably owe someone a message right now.
            </p>
          </Reveal> */}

          <Reveal requireScroll delay={160}>
            <a
              href={`mailto:${EMAIL_PLACEHOLDER}`}
              className="mt-5 inline-flex items-center gap-2 font-display text-2xl text-foreground underline decoration-amber decoration-2 underline-offset-[6px] transition-colors duration-300 hover:text-amber sm:text-3xl"
            >
              <Mail size={22} className="text-amber" />
              {EMAIL_PLACEHOLDER}
            </a>
          </Reveal>

          <div className="flex flex-col items-center sm:-ml-6">
            <Reveal requireScroll delay={240}>
              <div className="mt-7">
                <SocialIcons />
              </div>
            </Reveal>
  
            <Reveal requireScroll delay={340}>
              <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Mikael Eramian © {new Date().getFullYear()}
              </p>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
