import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

// Flip to true once the Projects section has something in it.
const SHOW_WORK_CTA = false;

/**
 * Ink that bleeds into the paper behind the cursor.
 * Each droplet lands small and dark, then spreads outward and pales as it
 * soaks in, with a slightly darker rim like ink drying on paper.
 * The canvas is redrawn every frame, so nothing builds up.
 */
const INK_LIFE = 1800;
const INK_SPACING = 7;
const INK_MAX_DROPS = 260;

function makeDrop(x, y, size) {
  // A few overlapping lobes make the edge irregular instead of a perfect circle.
  const lobes = [{ dx: 0, dy: 0, r: 1 }];
  const extra = 1 + Math.floor(Math.random() * 3);
  for (let i = 0; i < extra; i++) {
    const a = Math.random() * Math.PI * 2;
    const d = 0.25 + Math.random() * 0.45;
    lobes.push({ dx: Math.cos(a) * d, dy: Math.sin(a) * d, r: 0.45 + Math.random() * 0.4 });
  }
  return { x, y, t: performance.now(), size, spread: 1.4 + Math.random() * 1.2, lobes };
}

function PaintTrail({ hostRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let drops = [];
    let last = null;
    let raf = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const now = performance.now();
      drops = drops.filter((d) => now - d.t < INK_LIFE);
      ctx.clearRect(0, 0, width, height);

      for (const d of drops) {
        const age = (now - d.t) / INK_LIFE;
        const grow = 1 - Math.pow(1 - age, 3); // fast bleed, then it slows
        const radius = d.size * (1 + d.spread * grow);
        const alpha = 0.5 * Math.pow(1 - age, 1.6);

        for (const lobe of d.lobes) {
          const cx = d.x + lobe.dx * radius;
          const cy = d.y + lobe.dy * radius;
          const r = radius * lobe.r;
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
          g.addColorStop(0, `rgba(16, 36, 140, ${alpha * 0.75})`);
          g.addColorStop(0.72, `rgba(16, 36, 140, ${alpha})`);
          g.addColorStop(1, 'rgba(16, 36, 140, 0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = drops.length ? requestAnimationFrame(draw) : 0;
    };

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const t = performance.now();

      if (!last || t - last.t > 200) {
        // Pen touches down: a slightly bigger blot.
        drops.push(makeDrop(x, y, 7));
      } else {
        const dist = Math.hypot(x - last.x, y - last.y);
        // Slow strokes let more ink soak out of the nib.
        const size = Math.max(2.5, 6.5 - dist * 0.08);
        const steps = Math.floor(dist / INK_SPACING);
        for (let i = 1; i <= steps; i++) {
          const k = i / steps;
          drops.push(makeDrop(last.x + (x - last.x) * k, last.y + (y - last.y) * k, size));
        }
        if (steps === 0) {
          // Not moved far enough for a new drop, so keep the old anchor.
          last.t = t;
          if (!raf) raf = requestAnimationFrame(draw);
          return;
        }
      }
      if (drops.length > INK_MAX_DROPS) drops = drops.slice(-INK_MAX_DROPS);
      last = { x, y, t };
      if (!raf) raf = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    host.addEventListener('pointermove', onMove);
    return () => {
      observer.disconnect();
      host.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [hostRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40 mix-blend-multiply blur-[1.5px]"
    />
  );
}

/** One headline line that slides up from behind a mask. */
function Line({ children, delay, reduce }) {
  return (
    <span className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '115%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);

  // The headline and the photo drift apart slightly as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const photoRotate = useTransform(scrollYProgress, [0, 1], [0, 9]);

  const fadeUp = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {/* Graph-paper grid, fading out toward the edges */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(23,52,194,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,52,194,0.08) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 85% 75% at 65% 35%, black 10%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 75% at 65% 35%, black 10%, transparent 75%)',
        }}
      />

      {!reduce && <PaintTrail hostRef={sectionRef} />}

      <div className="max-w-6xl mx-auto px-6 min-h-[calc(100svh-4rem)] flex flex-col justify-between gap-12 py-8 md:py-12">
        {/* Meta row */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-ink/60"
        >
          <span>Izzul Helmi</span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Singapore
          </span>
        </motion.div>

        {/* Headline + photo */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-12">
          <motion.h2
            style={reduce ? undefined : { y: headlineY }}
            className="text-ink font-extrabold tracking-[-0.045em] leading-[0.95] text-[13vw] md:text-[clamp(4rem,11vw,8.5rem)] whitespace-nowrap"
          >
            <Line delay={0.15} reduce={reduce}>An aspiring</Line>
            <Line delay={0.27} reduce={reduce}>software</Line>
            <Line delay={0.39} reduce={reduce}>
              engineer<span className="text-primary">.</span>
            </Line>
          </motion.h2>

          {/* Parallax wrapper, so scrolling and dragging don't fight over one transform */}
          <motion.div
            style={reduce ? undefined : { y: photoY, rotate: photoRotate }}
            className="shrink-0 self-start md:mt-2"
          >
            <motion.figure
              initial={reduce ? false : { opacity: 0, y: 48, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 70, damping: 13, delay: 0.7 }}
              drag={!reduce}
              dragSnapToOrigin
              dragElastic={0.5}
              whileHover={{ rotate: -2, scale: 1.02 }}
              whileDrag={{ rotate: 2, scale: 1.06, cursor: 'grabbing' }}
              className="w-40 sm:w-44 md:w-52 lg:w-60 cursor-grab touch-none select-none bg-white p-2.5 pb-0 border border-ink/10 shadow-[0_18px_40px_-18px_rgba(20,22,31,0.45)]"
            >
              <img
                src="img/catto.jpg"
                alt="A cat, standing in for Izzul"
                draggable={false}
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/60">
                Fig. 01 <span className="text-primary">/</span> not me
              </figcaption>
            </motion.figure>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          {...fadeUp(0.95)}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="max-w-md">
            <p className="text-base md:text-lg leading-relaxed text-ink/75">
              Third-year Software Engineering student at the Singapore Institute
              of Technology, into full-stack development.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              {/* Hidden until there are projects to show: see SHOW_WORK_CTA */}
              <a
                href="#projects"
                className={`group items-center gap-3 rounded-full bg-primary py-1.5 pl-6 pr-1.5 font-medium text-paper transition-colors hover:bg-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                  SHOW_WORK_CTA ? 'inline-flex' : 'hidden'
                }`}
              >
                See my work
                <span className="grid h-9 w-9 place-items-center rounded-full bg-paper text-primary transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:text-ink">
                  <ArrowDownRight className="h-4 w-4" />
                </span>
              </a>
              <a
                href="#contact"
                className="font-medium text-ink underline decoration-primary decoration-2 underline-offset-[6px] transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                {SHOW_WORK_CTA ? 'or say hi' : 'Say hi'}
              </a>
            </div>
          </div>

          <div className="hidden md:block font-mono text-xs uppercase tracking-[0.14em] text-ink/50">
            Scroll ↓
          </div>
        </motion.div>
      </div>
    </section>
  );
}
