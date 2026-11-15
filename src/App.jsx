import { motion, MotionConfig, useScroll } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import './index.css';

const EASE = [0.22, 1, 0.36, 1];

const projects = [
  // {
  //   title: "Smart Home Dashboard",
  //   description: "IoT dashboard built with MQTT, React & Tailwind.",
  //   link: "https://github.com/yourname/smarthome-dashboard",
  //   image: "https://source.unsplash.com/random/800x600?smart-home",
  // },
  // {
  //   title: "Algorithm Visualizer",
  //   description: "Interactive DSA visualizations using React + D3.",
  //   link: "https://github.com/yourname/algovis",
  //   image: "https://source.unsplash.com/random/800x600?algorithm",
  // },
  // {
  //   title: "Portfolio Website",
  //   description: "The site you’re looking at right now — built with React & Tailwind.",
  //   link: "https://github.com/yourname/portfolio",
  //   image: "https://source.unsplash.com/random/800x600?code",
  // },
];

const facts = [
  ["Based in", "Singapore"],
  ["Studying", "Software Engineering, SIT"],
  ["Year", "Third"],
  ["Focus", "Full-stack development"],
];

const links = [
  { label: "Email", handle: "izzulhbz@gmail.com", href: "mailto:izzulhbz@gmail.com" },
  { label: "GitHub", handle: "izzulhbz", href: "https://github.com/izzulhbz" },
  { label: "LinkedIn", handle: "izzulhbz", href: "https://linkedin.com/in/izzulhbz" },
  { label: "Instagram", handle: "izzulhbz", href: "https://instagram.com/izzulhbz" },
];

const navLinkClass =
  "relative py-1 transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm " +
  "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100";

/** Fades and lifts its children into place the first time they scroll into view. */
function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A numbered section: mono label on the left, content on the right. */
function Section({ id, index, label, children }) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid gap-8 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-3">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
            <span className="text-primary">{index}</span> / {label}
          </h3>
        </Reveal>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-paper text-ink font-sans">
        {/* NAVBAR */}
        <header className="sticky top-0 z-10 bg-paper/80 backdrop-blur border-b border-ink/10">
          <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
            <h1 className="text-2xl font-extrabold tracking-tight">
              <a href="#" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">
                Izzul<span className="text-primary">.</span>
              </a>
            </h1>
            <nav className="flex gap-6 text-sm font-medium">
              <a href="#about" className={navLinkClass}>About</a>
              <a href="#projects" className={navLinkClass}>Projects</a>
              <a href="#contact" className={navLinkClass}>Contact</a>
            </nav>
          </div>
          {/* Reading progress */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 -bottom-px h-px origin-left bg-primary"
            style={{ scaleX: scrollYProgress }}
          />
        </header>

        {/* HERO */}
        <Hero />

        {/* ABOUT */}
        <Section id="about" index="01" label="About">
          <Reveal>
            <p className="text-2xl md:text-4xl font-medium leading-snug tracking-[-0.02em]">
              I'm a third-year Software Engineering student at Singapore Institute
              of Technology with a passion for full‑stack development.{" "}
              <span className="text-ink/45">
                When I'm not coding, you’ll find me sleeping or working on myself.
              </span>
            </p>
          </Reveal>
          <dl className="mt-12 md:mt-16 grid sm:grid-cols-2 gap-x-12">
            {facts.map(([term, detail], idx) => (
              <Reveal key={term} delay={idx * 0.06}>
                <div className="flex items-baseline justify-between gap-6 border-t border-ink/10 py-4">
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink/50">{term}</dt>
                  <dd className="text-right font-medium">{detail}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" index="02" label="Projects">
          <Reveal>
            <div className="border border-dashed border-ink/25 px-6 py-16 md:py-24 text-center">
              <p className="text-2xl md:text-4xl font-medium tracking-[-0.02em]">
                Still under construction<span className="text-primary">.</span>
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink/50">
                Come back soon to see what I’m working on
              </p>
            </div>
          </Reveal>
          {/* <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-3xl font-semibold mb-12 text-center">Projects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
                    <CardContent className="p-6 flex flex-col gap-4">
                      <h4 className="text-xl font-bold">{project.title}</h4>
                      <p className="text-sm text-gray-600 flex-1">{project.description}</p>
                      <Button variant="outline" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          View Repo
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div> */}
        </Section>

        {/* CONTACT */}
        <Section id="contact" index="03" label="Contact">
          <Reveal>
            <p className="text-[13vw] md:text-[clamp(4rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
              Say hi<span className="text-primary">.</span>
            </p>
            <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-ink/75">
              Have an exciting project or just want to say hi? My inbox is always open.
            </p>
          </Reveal>
          <ul className="mt-12 md:mt-16 border-b border-ink/10">
            {links.map((link, idx) => (
              <li key={link.label}>
                <Reveal delay={idx * 0.06}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-6 border-t border-ink/10 py-5 transition-[color,padding] duration-300 hover:px-3 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <span className="text-xl md:text-2xl font-medium tracking-[-0.02em]">{link.label}</span>
                    <span className="flex items-center gap-3 font-mono text-xs text-ink/50 transition-colors group-hover:text-primary">
                      <span className="hidden sm:inline">{link.handle}</span>
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>

        {/* FOOTER */}
        <footer className="border-t border-ink/10">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-ink/50">
            <span>© {new Date().getFullYear()} izzulhbz</span>
            <a href="#" className="transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm">
              Back to top ↑
            </a>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
