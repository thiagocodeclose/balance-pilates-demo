// @ts-nocheck
'use client';
import { useEffect, useRef, useState } from 'react';
import { siteData } from '@/lib/site-data';

const css = `
  :root {
    --bl-bg: #F2F9F7;
    --bl-surface: #E8F4F0;
    --bl-card: #FFFFFF;
    --bl-primary: #2A8C72;
    --bl-primary-dark: #1F6B57;
    --bl-accent: #6DBFA8;
    --bl-text: #1A2E28;
    --bl-muted: #4F7268;
    --bl-border: rgba(42,140,114,0.15);
    --font-display: var(--font-dm-serif), 'DM Serif Display', serif;
    --font-body: var(--font-dm-sans), 'DM Sans', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--bl-bg); color: var(--bl-text); overflow-x: hidden; }

  /* NAV */
  .bl-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 68px;
    transition: background 0.3s, box-shadow 0.3s;
  }
  .bl-nav.scrolled {
    background: rgba(242,249,247,0.97);
    box-shadow: 0 1px 20px rgba(42,140,114,0.10);
    backdrop-filter: blur(12px);
  }
  .bl-nav-logo {
    font-family: var(--font-display);
    font-size: 1.45rem;
    color: var(--bl-primary);
    text-decoration: none;
    letter-spacing: -0.01em;
  }
  .bl-nav-links { display: flex; gap: 2rem; align-items: center; }
  .bl-nav-links a {
    font-size: 0.85rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--bl-text); text-decoration: none; opacity: 0.7; transition: opacity 0.2s;
  }
  .bl-nav-links a:hover { opacity: 1; }
  .bl-btn-nav {
    background: var(--bl-primary); color: #fff;
    padding: 0.5rem 1.3rem; border-radius: 100px;
    font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    text-decoration: none; transition: background 0.2s;
  }
  .bl-btn-nav:hover { background: var(--bl-primary-dark); }

  /* HERO — full bg photo + inset video card */
  .bl-hero {
    min-height: 100vh;
    position: relative;
    display: flex; align-items: center;
    overflow: hidden;
  }
  .bl-hero-bg {
    position: absolute; inset: 0;
    background-image: url('https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1800&q=80');
    background-size: cover; background-position: center;
    filter: brightness(0.35) saturate(0.7);
  }
  .bl-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(26,46,40,0.6) 0%, rgba(42,140,114,0.15) 100%);
  }
  .bl-hero-inner {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto; padding: 8rem 2.5rem 5rem;
    display: grid; grid-template-columns: 1fr 480px; gap: 4rem; align-items: center;
  }
  .bl-hero-copy {}
  .bl-hero-tag {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: rgba(42,140,114,0.25);
    border: 1px solid rgba(42,140,114,0.4);
    color: var(--bl-accent);
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.35rem 0.85rem; border-radius: 2px;
    margin-bottom: 1.5rem;
  }
  .bl-hero-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 5.5vw, 5rem);
    font-weight: 400;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    letter-spacing: -0.01em;
  }
  .bl-hero-title em { font-style: italic; color: var(--bl-accent); }
  .bl-hero-sub { font-size: 1.05rem; line-height: 1.75; color: rgba(255,255,255,0.75); max-width: 480px; margin-bottom: 2.5rem; }
  .bl-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .bl-btn-primary {
    background: var(--bl-primary); color: #fff;
    padding: 0.9rem 2rem; border-radius: 100px;
    font-weight: 700; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase;
    text-decoration: none; transition: background 0.2s, transform 0.2s;
  }
  .bl-btn-primary:hover { background: var(--bl-primary-dark); transform: translateY(-2px); }
  .bl-btn-ghost {
    background: rgba(255,255,255,0.12); color: #fff;
    padding: 0.9rem 2rem; border-radius: 100px;
    font-weight: 700; font-size: 0.9rem; letter-spacing: 0.05em; text-transform: uppercase;
    text-decoration: none; border: 1.5px solid rgba(255,255,255,0.3);
    transition: background 0.2s;
  }
  .bl-btn-ghost:hover { background: rgba(255,255,255,0.2); }

  /* INSET VIDEO CARD */
  .bl-video-card {
    background: rgba(255,255,255,0.07);
    border: 1.5px solid rgba(255,255,255,0.18);
    border-radius: 16px;
    overflow: hidden;
    backdrop-filter: blur(8px);
    box-shadow: 0 24px 64px rgba(0,0,0,0.4);
    aspect-ratio: 9/16;
    max-height: 540px;
    position: relative;
  }
  .bl-video-card video {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .bl-video-label {
    position: absolute; bottom: 1rem; left: 1rem; right: 1rem;
    background: rgba(26,46,40,0.85);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    display: flex; align-items: center; gap: 0.6rem;
    backdrop-filter: blur(8px);
  }
  .bl-video-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--bl-accent);
    animation: bl-pulse 2s infinite;
  }
  @keyframes bl-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  .bl-video-label-text { font-size: 0.82rem; font-weight: 600; color: #fff; }

  /* STATS STRIP */
  .bl-stats-strip {
    background: var(--bl-primary);
    padding: 2.5rem 2rem;
  }
  .bl-stats-inner {
    max-width: 900px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1rem; text-align: center;
  }
  .bl-stat-value {
    font-family: var(--font-display);
    font-size: 2.4rem;
    color: #fff;
    margin-bottom: 0.25rem;
  }
  .bl-stat-label {
    font-size: 0.75rem; color: rgba(255,255,255,0.65);
    font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase;
  }

  /* SECTIONS */
  section { padding: 6rem 2rem; }
  .bl-section-tag {
    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--bl-primary); margin-bottom: 0.6rem;
    display: inline-block;
  }
  .bl-section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 400;
    color: var(--bl-text); margin-bottom: 1rem; line-height: 1.15;
    letter-spacing: -0.01em;
  }
  .bl-section-sub {
    font-size: 1.05rem; line-height: 1.75; color: var(--bl-muted); max-width: 560px;
  }

  /* PILLARS */
  .bl-pillars-section { background: var(--bl-surface); }
  .bl-pillars-inner { max-width: 1200px; margin: 0 auto; }
  .bl-pillars-header { text-align: center; margin-bottom: 3.5rem; }
  .bl-pillars-header .bl-section-sub { margin: 0 auto; }
  .bl-pillars-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
  }
  .bl-pillar-card {
    background: var(--bl-card);
    border: 1px solid var(--bl-border);
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .bl-pillar-card:hover { box-shadow: 0 10px 36px rgba(42,140,114,0.12); transform: translateY(-4px); }
  .bl-pillar-icon { font-size: 2rem; margin-bottom: 1rem; }
  .bl-pillar-name {
    font-family: var(--font-display);
    font-size: 1.1rem; font-weight: 400;
    color: var(--bl-text); margin-bottom: 0.6rem;
  }
  .bl-pillar-desc { font-size: 0.9rem; line-height: 1.65; color: var(--bl-muted); }

  /* CLASSES */
  .bl-classes-section { background: var(--bl-bg); }
  .bl-classes-inner { max-width: 1200px; margin: 0 auto; }
  .bl-classes-header { margin-bottom: 3rem; }
  .bl-classes-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
  }
  .bl-class-card {
    background: var(--bl-card);
    border: 1px solid var(--bl-border);
    border-radius: 10px;
    padding: 2rem;
    transition: box-shadow 0.2s, transform 0.2s;
    position: relative;
    overflow: hidden;
  }
  .bl-class-card::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: var(--bl-primary);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .bl-class-card:hover::after { transform: scaleX(1); }
  .bl-class-card:hover { box-shadow: 0 8px 30px rgba(42,140,114,0.10); transform: translateY(-3px); }
  .bl-class-meta {
    display: flex; gap: 0.6rem; margin-bottom: 1rem; flex-wrap: wrap;
  }
  .bl-class-badge {
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
    padding: 0.3rem 0.7rem; border-radius: 100px;
  }
  .bl-badge-level { background: var(--bl-surface); color: var(--bl-primary); }
  .bl-badge-dur { background: rgba(42,140,114,0.08); color: var(--bl-muted); }
  .bl-class-name {
    font-family: var(--font-display);
    font-size: 1.15rem; font-weight: 400;
    color: var(--bl-text); margin-bottom: 0.75rem;
  }
  .bl-class-desc { font-size: 0.9rem; line-height: 1.65; color: var(--bl-muted); }

  /* PRICING */
  .bl-pricing-section { background: var(--bl-surface); }
  .bl-pricing-inner { max-width: 1100px; margin: 0 auto; }
  .bl-pricing-header { text-align: center; margin-bottom: 3.5rem; }
  .bl-pricing-header .bl-section-sub { margin: 0 auto; }
  .bl-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .bl-price-card {
    background: var(--bl-card);
    border: 1.5px solid var(--bl-border);
    border-radius: 14px;
    padding: 2.5rem 2rem;
    position: relative;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .bl-price-card.highlight {
    border-color: var(--bl-primary);
    box-shadow: 0 0 0 3px rgba(42,140,114,0.08);
  }
  .bl-price-card:hover { box-shadow: 0 12px 40px rgba(42,140,114,0.13); transform: translateY(-4px); }
  .bl-popular-badge {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--bl-primary); color: #fff;
    font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.25rem 1rem; border-radius: 20px;
  }
  .bl-price-name { font-family: var(--font-display); font-size: 1.1rem; color: var(--bl-text); margin-bottom: 1rem; }
  .bl-price-amount { font-family: var(--font-display); font-size: 3rem; color: var(--bl-primary); line-height: 1; margin-bottom: 0.2rem; }
  .bl-price-period { font-size: 0.85rem; color: var(--bl-muted); margin-bottom: 1.75rem; }
  .bl-price-features { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
  .bl-price-features li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.9rem; color: var(--bl-muted); line-height: 1.5; }
  .bl-check { color: var(--bl-primary); font-weight: 700; flex-shrink: 0; }
  .bl-price-cta {
    display: block; text-align: center;
    padding: 0.85rem; border-radius: 100px;
    font-weight: 700; font-size: 0.85rem; letter-spacing: 0.06em; text-transform: uppercase;
    text-decoration: none; transition: all 0.2s;
  }
  .bl-price-card.highlight .bl-price-cta { background: var(--bl-primary); color: #fff; }
  .bl-price-card.highlight .bl-price-cta:hover { background: var(--bl-primary-dark); }
  .bl-price-card:not(.highlight) .bl-price-cta { border: 1.5px solid rgba(26,46,40,0.2); color: var(--bl-text); }
  .bl-price-card:not(.highlight) .bl-price-cta:hover { border-color: var(--bl-primary); color: var(--bl-primary); }

  /* CTA */
  .bl-cta-section {
    background: var(--bl-text); padding: 6rem 2rem; text-align: center;
  }
  .bl-cta-inner { max-width: 560px; margin: 0 auto; }
  .bl-cta-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 400;
    color: #fff; margin-bottom: 1rem; line-height: 1.15;
  }
  .bl-cta-title em { font-style: italic; color: var(--bl-accent); }
  .bl-cta-sub { font-size: 1rem; color: rgba(255,255,255,0.65); margin-bottom: 2.5rem; line-height: 1.7; }
  .bl-btn-cta {
    background: var(--bl-primary); color: #fff;
    padding: 1rem 2.5rem; border-radius: 100px;
    font-weight: 800; font-size: 0.9rem; letter-spacing: 0.07em; text-transform: uppercase;
    text-decoration: none; display: inline-block;
    transition: background 0.2s, transform 0.2s;
  }
  .bl-btn-cta:hover { background: var(--bl-accent); transform: translateY(-2px); }

  /* FOOTER */
  .bl-footer { background: var(--bl-text); color: rgba(255,255,255,0.6); padding: 3.5rem 2rem 2rem; }
  .bl-footer-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem;
  }
  .bl-footer-logo { font-family: var(--font-display); font-size: 1.4rem; color: var(--bl-accent); margin-bottom: 0.75rem; }
  .bl-footer-desc { font-size: 0.9rem; line-height: 1.6; max-width: 280px; }
  .bl-footer-h { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 1rem; }
  .bl-footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .bl-footer-links a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
  .bl-footer-links a:hover { color: var(--bl-accent); }
  .bl-footer-bottom {
    max-width: 1200px; margin: 2.5rem auto 0;
    padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1);
    display: flex; justify-content: space-between; align-items: center;
    font-size: 0.8rem; flex-wrap: wrap; gap: 0.5rem;
  }
  .bl-footer-brand { color: var(--bl-accent); font-weight: 700; text-decoration: none; }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 900px) {
    .bl-hero-inner { grid-template-columns: 1fr; }
    .bl-video-card { max-height: 260px; aspect-ratio: 16/9; }
    .bl-pillars-grid { grid-template-columns: repeat(2, 1fr); }
    .bl-classes-grid { grid-template-columns: 1fr; }
    .bl-pricing-grid { grid-template-columns: 1fr; }
    .bl-stats-inner { grid-template-columns: repeat(2, 1fr); }
    .bl-footer-inner { grid-template-columns: 1fr; }
    .bl-nav-links { display: none; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function BalancePage() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAV */}
      <nav className={`bl-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="bl-nav-logo">Balance Pilates</a>
        <div className="bl-nav-links">
          <a href="#classes">Classes</a>
          <a href="#pillars">Our Method</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a href="#intro" className="bl-btn-nav">Intro Offer $99</a>
        </div>
      </nav>

      {/* HERO — photo bg + inset video card */}
      <section id="intro" className="bl-hero">
        <div className="bl-hero-bg" />
        <div className="bl-hero-overlay" />
        <div className="bl-hero-inner">
          <div className="bl-hero-copy">
            <div className="bl-hero-tag">🌿 Community Reformer Pilates</div>
            <h1 className="bl-hero-title">
              Everyone&apos;s<br /><em>Pilates.</em>
            </h1>
            <p className="bl-hero-sub">
              Small groups. Expert instructors. A method that meets you exactly where you are — and takes you further than you expected. All levels, all bodies, all welcome.
            </p>
            <div className="bl-hero-actions">
              <a href="#pricing" className="bl-btn-primary">Start for $99</a>
              <a href="#classes" className="bl-btn-ghost">View Schedule</a>
            </div>
          </div>

          {/* INSET VIDEO CARD */}
          <div className="bl-video-card">
            <video autoPlay muted loop playsInline
              poster="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-woman-working-out-in-a-gym-with-a-ball-34901-large.mp4"
                type="video/mp4"
              />
            </video>
            <div className="bl-video-label">
              <span className="bl-video-dot" />
              <span className="bl-video-label-text">Classes running daily from 6 AM</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="bl-stats-strip">
        <div className="bl-stats-inner">
          {siteData.stats.map((s, i) => (
            <div key={s.label} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="bl-stat-value">{s.value}</div>
              <div className="bl-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PILLARS */}
      <section id="pillars" className="bl-pillars-section">
        <div className="bl-pillars-inner">
          <div className="bl-pillars-header reveal">
            <span className="bl-section-tag">The Balance Method</span>
            <h2 className="bl-section-title">What sets us apart</h2>
            <p className="bl-section-sub">
              We believe Pilates works best in community. These four pillars guide everything we do — from class design to instructor training to how we welcome new members.
            </p>
          </div>
          <div className="bl-pillars-grid">
            {siteData.pillars.map((p, i) => (
              <div key={p.name} className="bl-pillar-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="bl-pillar-icon">{p.icon}</div>
                <div className="bl-pillar-name">{p.name}</div>
                <p className="bl-pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="bl-classes-section">
        <div className="bl-classes-inner">
          <div className="bl-classes-header reveal">
            <span className="bl-section-tag">Class Formats</span>
            <h2 className="bl-section-title">Find your class</h2>
            <p className="bl-section-sub">
              From your very first reformer session to advanced cardio sequences — we have a format designed for every stage of your practice.
            </p>
          </div>
          <div className="bl-classes-grid">
            {siteData.classes.map((c, i) => (
              <div key={c.name} className="bl-class-card reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="bl-class-meta">
                  <span className="bl-class-badge bl-badge-level">{c.level}</span>
                  <span className="bl-class-badge bl-badge-dur">{c.duration}</span>
                </div>
                <div className="bl-class-name">{c.name}</div>
                <p className="bl-class-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bl-pricing-section">
        <div className="bl-pricing-inner">
          <div className="bl-pricing-header reveal">
            <span className="bl-section-tag">Membership Options</span>
            <h2 className="bl-section-title">Start your practice</h2>
            <p className="bl-section-sub">
              New to Balance? Your first month is just $99 — unlimited classes, full access, no obligation.
            </p>
          </div>
          <div className="bl-pricing-grid">
            {siteData.pricing.map((p, i) => (
              <div key={p.name} className={`bl-price-card reveal${p.highlight ? ' highlight' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                {p.highlight && <span className="bl-popular-badge">Most Popular</span>}
                <div className="bl-price-name">{p.name}</div>
                <div className="bl-price-amount">{p.price}</div>
                <div className="bl-price-period">{p.period}</div>
                <ul className="bl-price-features">
                  {p.features.map((f) => (
                    <li key={f}><span className="bl-check">✓</span>{f}</li>
                  ))}
                </ul>
                <a href="#intro" className="bl-price-cta">Get Started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bl-cta-section">
        <div className="bl-cta-inner">
          <h2 className="bl-cta-title reveal">Try Balance for <em>one month.</em></h2>
          <p className="bl-cta-sub reveal">
            Unlimited classes, full studio access, and a new-member consultation — all for $99. No commitment after your intro period.
          </p>
          <a href="#contact" className="bl-btn-cta reveal">Claim Your Intro Month</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bl-footer">
        <div className="bl-footer-inner">
          <div>
            <div className="bl-footer-logo">Balance Pilates</div>
            <p className="bl-footer-desc">
              {siteData.gym.address}<br />
              {siteData.gym.phone}<br />
              {siteData.gym.email}
            </p>
          </div>
          <div>
            <div className="bl-footer-h">Studio</div>
            <ul className="bl-footer-links">
              <li><a href="#classes">Schedule</a></li>
              <li><a href="#pillars">Our Method</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#">Teacher Training</a></li>
            </ul>
          </div>
          <div>
            <div className="bl-footer-h">Help</div>
            <ul className="bl-footer-links">
              <li><a href="#">New Members</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="bl-footer-bottom">
          <span>© {new Date().getFullYear()} Balance Pilates. All rights reserved.</span>
          <span>Powered by <a href="https://koriva.com" className="bl-footer-brand">Koriva</a></span>
        </div>
      </footer>
    </>
  );
}
