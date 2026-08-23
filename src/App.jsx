import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portrait from '../assets/ChatGPT Image Aug 23, 2026, 08_53_11 AM.png';
import ContactFooter from './components/ContactFooter.jsx';
import ExperienceTimeline from './components/ExperienceTimeline.jsx';
import ProjectRow from './components/ProjectRow.jsx';
import { projects } from './data/projects.js';

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    index: '01',
    title: 'Requirements Engineering',
    description: 'Gathering and analyzing business requirements, identifying process gaps, and translating operational needs into clear system workflows and functional requirements.',
    keywords: ['Requirements', 'Analysis', 'Process Mapping']
  },
  {
    index: '02',
    title: 'ERP & Odoo',
    description: 'Designing and improving Odoo-based operational workflows, functional processes, system fields, statuses, roles, permissions, and business logic.',
    keywords: ['Odoo', 'ERP', 'CRM']
  },
  {
    index: '03',
    title: 'Business Process Design',
    description: 'Structuring business processes, approvals, operational flows, service journeys, and system interactions from end to end.',
    keywords: ['Workflow Design', 'Operations', 'Process Improvement']
  },
  {
    index: '04',
    title: 'Software Development',
    description: 'Building frontend and backend solutions using modern web technologies while keeping technical implementation aligned with business requirements.',
    keywords: ['React', 'JavaScript', 'Python', 'Node.js']
  }
];

const navItems = [
  ['About', 'about', 'About'],
  ['Expertise', 'expertise', 'Expert'],
  ['Work', 'projects', 'Work'],
  ['Experience', 'experience', 'Exp'],
  ['Contact', 'contact', 'Contact']
];

const services = ['Requirements engineering', 'ERP / CRM workflows', 'Odoo systems', 'Business process design', 'Software development'];
const metadata = [
  ['FOCUS', 'Business Analysis / ERP / CRM / Systems'],
  ['BASED IN', 'Jeddah, Saudi Arabia'],
  ['CURRENT ROLE', 'Senior Software Engineer']
];

function App() {
  const rootRef = useRef(null);
  const portraitRef = useRef(null);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    if (!rootRef.current) return undefined;

    const scrollToInitialHash = window.requestAnimationFrame(() => {
      const targetId = window.location.hash.slice(1);
      if (!targetId) return;
      if (navItems.some(([, id]) => id === targetId)) {
        setActiveSection(targetId);
      }
      document.getElementById(targetId)?.scrollIntoView();
    });

    const sectionIds = ['top', ...navItems.map(([, id]) => id)];
    let activeFrame = 0;
    const updateActiveSection = () => {
      activeFrame = 0;
      const current = sectionIds.reduce((active, id) => {
        const section = document.getElementById(id);
        if (!section) return active;
        return section.getBoundingClientRect().top <= 150 ? id : active;
      }, 'top');
      setActiveSection(current);
    };
    const requestActiveUpdate = () => {
      if (activeFrame) return;
      activeFrame = window.requestAnimationFrame(updateActiveSection);
    };
    window.addEventListener('scroll', requestActiveUpdate, { passive: true });
    window.addEventListener('hashchange', requestActiveUpdate);
    requestActiveUpdate();

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTouchViewport = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 720px)').matches;

      if (reduceMotion) {
        gsap.set('[data-reveal], .expertise-row, .project-row, .experience-row, .contact-actions, .footer-bar', { clearProps: 'all' });
        ScrollTrigger.refresh();
        return;
      }

      const revealOnce = (trigger, targets, fromVars = { y: 28, opacity: 0 }, toVars = {}) => {
        ScrollTrigger.create({
          trigger,
          start: toVars.start || 'top 84%',
          once: true,
          onEnter: () => {
            if (toVars.activeClass) trigger.classList.add(toVars.activeClass);
            gsap.fromTo(targets, fromVars, {
              y: 0,
              opacity: 1,
              duration: toVars.duration || 0.72,
              stagger: toVars.stagger || 0,
              ease: 'power3.out'
            });
          }
        });
      };

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.nav-shell', { y: -18, opacity: 0, duration: 0.65 })
        .from('.hero-kicker', { y: 18, opacity: 0, duration: 0.55 }, '-=0.25')
        .from('.hero-title', { y: 22, opacity: 0, duration: 0.82 }, '-=0.15')
        .from('.hero-copy, .hero-actions', {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12
        }, '-=0.4')
        .from('.portrait-stage', {
          opacity: 0,
          scale: 0.96,
          y: 24,
          duration: 0.95
        }, '-=0.7');

      gsap.utils.toArray('[data-reveal]').forEach((item) => revealOnce(item, item, { y: 28, opacity: 0 }, { start: 'top 82%', duration: 0.68 }));

      gsap.utils.toArray('.expertise-row').forEach((row) => {
        revealOnce(row, row);
      });

      gsap.utils.toArray('.project-row').forEach((row) => {
        const parts = row.querySelectorAll('.project-number, .project-main, .project-description, .project-side');
        revealOnce(row, parts, { y: 28, opacity: 0 }, { start: 'top 82%', duration: 0.74, stagger: 0.07 });
      });

      gsap.utils.toArray('.experience-row').forEach((row) => {
        const parts = row.querySelectorAll('.experience-period, .experience-role, .experience-detail');
        revealOnce(row, parts, { y: 26, opacity: 0 }, { activeClass: 'is-active', stagger: 0.07 });
      });

      const accentGreen = getComputedStyle(document.documentElement).getPropertyValue('--accent-green').trim();

      gsap.utils.toArray('.expertise-tags, .project-categories, .experience-tags').forEach((group) => {
        const firstTag = group.querySelector('span, li');
        if (!firstTag) return;

        ScrollTrigger.create({
          trigger: group,
          start: 'top 86%',
          once: true,
          onEnter: () => {
            gsap.timeline()
              .to(firstTag, {
                backgroundColor: accentGreen,
                borderColor: 'rgba(16, 16, 20, 0.34)',
                color: '#101014',
                duration: 0.16,
                ease: 'power2.out'
              })
              .to(firstTag, {
                clearProps: 'backgroundColor,borderColor,color',
                duration: 0.24,
                ease: 'power2.out'
              }, '+=0.7');
          }
        });
      });

      ScrollTrigger.create({
        trigger: '.contact-section',
        start: 'top 76%',
        once: true,
        onEnter: () => {
          gsap.fromTo('.contact-intro, .contact-actions, .footer-bar', { y: 34, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 0.82,
            stagger: 0.12,
            ease: 'power3.out'
          });
        }
      });

      gsap.to('.marquee-track', {
        xPercent: -50,
        duration: isTouchViewport ? 34 : 22,
        ease: 'none',
        repeat: -1
      });

      const burst = () => {
        if (!portraitRef.current) return;
        const layers = portraitRef.current.querySelectorAll('.glitch-layer');
        const shift = isTouchViewport ? 7 : 18;
        const timeline = gsap.timeline({
          onComplete: () => gsap.delayedCall(gsap.utils.random(isTouchViewport ? 4.5 : 1.4, isTouchViewport ? 8 : 3.8), burst)
        });

        timeline
          .set(layers, {
            opacity: 1,
            clipPath: () => `inset(${gsap.utils.random(8, 68)}% 0 ${gsap.utils.random(8, 68)}% 0)`
          })
          .to(layers, {
            x: () => gsap.utils.random(-shift, shift),
            filter: () => `hue-rotate(${gsap.utils.random(-8, 8)}deg) saturate(${isTouchViewport ? 1.18 : 1.45})`,
            duration: isTouchViewport ? 0.035 : 0.05,
            stagger: isTouchViewport ? 0.015 : 0.025
          })
          .to(layers, {
            x: 0,
            opacity: 0,
            filter: 'none',
            duration: 0.08
          });
      };

      gsap.delayedCall(isTouchViewport ? 3.5 : 1.2, burst);

      if (!isTouchViewport) {
        gsap.to('.portrait-image', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      ScrollTrigger.refresh();
    }, rootRef.current);

    let refreshFrame = 0;
    const refreshScrollTriggers = () => {
      if (refreshFrame) return;
      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = 0;
        ScrollTrigger.refresh();
      });
    };
    window.addEventListener('orientationchange', refreshScrollTriggers);
    window.addEventListener('resize', refreshScrollTriggers);

    return () => {
      window.cancelAnimationFrame(scrollToInitialHash);
      if (activeFrame) window.cancelAnimationFrame(activeFrame);
      if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener('scroll', requestActiveUpdate);
      window.removeEventListener('hashchange', requestActiveUpdate);
      window.removeEventListener('orientationchange', refreshScrollTriggers);
      window.removeEventListener('resize', refreshScrollTriggers);
      context.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="min-h-screen bg-paper text-ink">
      <nav className="nav-shell fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="text-sm font-bold uppercase tracking-[0.18em]">Hisham Tamim</a>
        <div className="desktop-nav hidden items-center gap-5 text-[0.78rem] font-bold uppercase tracking-[0.08em] md:flex">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} className={activeSection === id ? 'is-active' : ''} onClick={() => setActiveSection(id)}>
              {label}
            </a>
          ))}
        </div>
        <div className="mobile-nav" aria-label="Section navigation">
          {navItems.map(([label, id, mobileLabel]) => (
            <a key={id} href={`#${id}`} className={activeSection === id ? 'is-active' : ''} onClick={() => setActiveSection(id)} aria-label={label}>
              {mobileLabel}
            </a>
          ))}
        </div>
      </nav>

      <section id="top" className="hero-section relative flex min-h-screen items-center overflow-hidden px-5 pb-8 pt-28 md:px-8 md:pb-10">
        <div className="absolute inset-0 texture-mask" aria-hidden="true" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10">
            <div className="hero-kicker mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-ocean">
              <Sparkles size={16} />
              SOFTWARE ENGINEER • BUSINESS ANALYST
            </div>
            <h1 className="hero-title max-w-5xl text-[clamp(2.75rem,6vw,5.45rem)] font-black leading-[1.02]">
              Where business needs become working systems.
            </h1>
            <p className="hero-copy mt-5 max-w-xl text-lg leading-8 text-ink/72 md:text-xl">
              I help translate business needs into structured workflows, ERP / CRM systems, and practical digital solutions.
            </p>
            <div className="hero-actions mt-5 flex flex-wrap gap-3">
              <a href="#projects" className="primary-button">
                VIEW WORK
              </a>
              <a href="/MyCv.pdf" className="secondary-button" download>
                <ArrowDownToLine size={18} /> DOWNLOAD CV
              </a>
            </div>
          </div>

          <div ref={portraitRef} className="portrait-stage relative z-10 mx-auto aspect-[4/5] w-full max-w-[500px] overflow-hidden bg-ink">
            <img className="portrait-image absolute inset-0 h-[112%] w-full object-cover" src={portrait} alt="Portrait of Hisham Tamim" width="1122" height="1402" loading="eager" fetchpriority="high" decoding="async" />
            <img className="glitch-layer glitch-red absolute inset-0 h-[112%] w-full object-cover opacity-0" src={portrait} alt="" width="1122" height="1402" loading="eager" decoding="async" aria-hidden="true" />
            <img className="glitch-layer glitch-cyan absolute inset-0 h-[112%] w-full object-cover opacity-0" src={portrait} alt="" width="1122" height="1402" loading="eager" decoding="async" aria-hidden="true" />
            <div className="scan-lines" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-ink/15 bg-ink py-4 text-paper">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-[0.18em]">
          {[...services, ...services, ...services, ...services].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-8">
              {item}<span className="h-2 w-2 bg-volt" />
            </span>
          ))}
        </div>
      </section>

      <section id="about" className="about-section relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="section-grid mx-auto max-w-7xl">
          <div data-reveal className="about-label">
            <p className="section-label">01 / About</p>
          </div>
          <div data-reveal>
            <h2 className="about-heading">Where business strategy meets technical execution.</h2>
          </div>
          <div className="about-copy-space">
            <div data-reveal className="about-copy">
              <p>
                Business requirements, operational processes, and system gaps are translated into structured workflows and practical digital solutions.
              </p>
              <p>
                The work spans business analysis, ERP / CRM processes, Odoo, and software development — connecting operational needs with technical execution.
              </p>
            </div>
            <dl data-reveal className="metadata-strip">
              {metadata.map(([label, value]) => (
                <div key={label} className="metadata-item">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="expertise" className="expertise-section px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mb-10 grid gap-6 lg:grid-cols-[0.35fr_1fr] lg:items-end">
            <p className="section-label">02 / Expertise</p>
            <h2 className="expertise-heading">What I work on.</h2>
          </div>
          <div className="expertise-list">
            {expertise.map((item) => (
              <article key={item.title} className="expertise-row">
                <div className="expertise-index">{item.index}</div>
                <div className="expertise-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="expertise-tags" aria-label={`${item.title} keywords`}>
                    {item.keywords.map((keyword) => (
                      <span key={keyword}>{keyword}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="projects-intro">
            <p className="section-label">03 / Selected Work</p>
            <div>
              <h2 className="projects-heading">Systems I’ve Built.</h2>
              <p className="projects-support">
                Selected work across ERP, Odoo, business operations, and digital products.
              </p>
            </div>
          </div>

          <div className="projects-list">
            {projects.map((project) => (
              <ProjectRow key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="experience-intro">
            <p className="section-label">04 / Experience</p>
            <h2 className="experience-heading">Experience across systems, software, and business operations.</h2>
          </div>
          <ExperienceTimeline />
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}

export default App;
