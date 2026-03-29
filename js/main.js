/* ============================================================
   SHIFA TASLIM CHOWDHURY — Portfolio JavaScript
   All content is loaded from data/*.json files.
   ============================================================ */

'use strict';

// Module-level data store — set after JSON loads, used by PDF generator
let _allData = null;

// ============================================================
// SVG ICONS (inline, no external library needed)
// ============================================================
const ICONS = {
  'clipboard-check': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`,
  'chart-bar': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
  'magnifying-glass': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`,
  'document-text': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
  'users': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
  'academic-cap': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>`,
  'scale': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>`,
  'server': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>`,
  'clipboard': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`,
  'globe': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  'badge-check': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>`,
  'email': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  'phone': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
  'location': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  'linkedin': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  'moon': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`,
  'sun': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
  'download': `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`,
  'arrow-right': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`,
  'check-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  'person': `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`,
  'calendar': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
  'map-pin': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  'chevron-down': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`,
  'chevron-up': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>`,
  'external-link': `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>`,
  'menu': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>`,
  'x': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  'heart': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>`,
};

// ============================================================
// DATA LOADING
// ============================================================
async function loadJSON(file) {
  const response = await fetch(`data/${file}`);
  if (!response.ok) throw new Error(`Failed to load ${file}`);
  return response.json();
}

async function loadAllData() {
  const [profile, services, experience, education, skills, certifications, upwork] = await Promise.all([
    loadJSON('profile.json'),
    loadJSON('services.json'),
    loadJSON('experience.json'),
    loadJSON('education.json'),
    loadJSON('skills.json'),
    loadJSON('certifications.json'),
    loadJSON('upwork.json'),
  ]);
  return { profile, services, experience, education, skills, certifications, upwork };
}

// ============================================================
// RENDER: NAVIGATION
// ============================================================
function renderNav(profile) {
  const nav = document.getElementById('nav-root');
  nav.className = 'nav';
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="#hero" class="nav-brand">${profile.nav.brand}</a>
      <ul class="nav-links">
        ${profile.nav.links.map(link => `
          <li><a href="#${link.toLowerCase()}" class="nav-link" data-section="${link.toLowerCase()}">${link}</a></li>
        `).join('')}
      </ul>
      <div class="nav-actions">
        <button class="btn-theme" id="theme-toggle" aria-label="Toggle dark mode">
          ${ICONS.moon}
        </button>
        <a href="#contact" class="btn-nav-cta">Work With Me</a>
        <button class="nav-hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="nav-drawer" id="nav-drawer" role="navigation">
      ${profile.nav.links.map(link => `
        <a href="#${link.toLowerCase()}" class="nav-drawer-link">${link}</a>
      `).join('')}
      <a href="#contact" class="btn-primary" style="margin-top:1rem;justify-content:center;">Work With Me</a>
    </div>
  `;
}

// ============================================================
// RENDER: HERO
// ============================================================
function renderHero(profile) {
  const section = document.getElementById('hero');
  const hasImage = profile.headshot && profile.headshot !== '';
  const imageContent = hasImage
    ? `<img src="${profile.headshot}" alt="${profile.name}" onerror="this.parentElement.innerHTML='<div class=hero-image-placeholder>${ICONS.person}<span>Add headshot to assets/images/</span></div>'">`
    : `<div class="hero-image-placeholder">${ICONS.person}<span>Add headshot to assets/images/headshot.jpg</span></div>`;

  section.innerHTML = `
    <div class="container">
      <div class="hero-inner">
        <div class="hero-content">
          <div class="hero-availability" data-animate data-delay="1">
            <span class="dot"></span>
            ${profile.availability}
          </div>
          <h1 class="hero-name" data-animate data-delay="2">${profile.name}</h1>
          <p class="hero-tagline" data-animate data-delay="3">${profile.tagline}</p>
          <p class="hero-subtitle" data-animate data-delay="4">${profile.subtitle}</p>
          <div class="hero-actions" data-animate data-delay="5">
            <a href="#services" class="btn-primary">
              View My Services ${ICONS['arrow-right']}
            </a>
            <button class="btn-secondary" id="btn-download-cv">
              ${ICONS.download} Download CV
            </button>
          </div>
          <div class="hero-stats" data-animate data-delay="6">
            ${profile.about.highlights.map(h => `
              <div class="hero-stat">
                <div class="hero-stat-number">${h.number}${h.suffix}</div>
                <div class="hero-stat-label">${h.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="hero-visual" data-animate="scale" data-delay="2">
          <div class="hero-image-ring-2"></div>
          <div class="hero-image-ring"></div>
          <div class="hero-image-circle">${imageContent}</div>
          <div class="hero-accent hero-accent-1"></div>
          <div class="hero-accent hero-accent-2"></div>
          <div class="hero-accent hero-accent-3"></div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// RENDER: ABOUT
// ============================================================
function renderAbout(profile) {
  const section = document.getElementById('about');
  section.innerHTML = `
    <div class="container">
      <div>
        <div class="about-highlights">
          ${profile.about.highlights.map((h, i) => `
            <div class="highlight-card" data-animate data-delay="${i + 1}">
              <div class="highlight-number">
                <span class="counter" data-target="${h.number}">${h.number}</span>${h.suffix}
              </div>
              <div class="highlight-label">${h.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="about-content" data-animate="right">
        <span class="section-label">About Me</span>
        <h2 class="section-title">Bridging research, policy & communities</h2>
        <div class="about-text">
          ${profile.about.paragraphs.map(p => `<p>${p}</p>`).join('')}
        </div>
        <div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;">
          <a href="#services" class="btn-primary">See My Services ${ICONS['arrow-right']}</a>
          <a href="#contact" class="btn-secondary">Get In Touch</a>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// RENDER: SERVICES
// ============================================================
function renderServices(servicesData) {
  const section = document.getElementById('services');
  section.innerHTML = `
    <div class="container">
      <div class="services-header" data-animate>
        <span class="section-label">What I Offer</span>
        <h2 class="section-title">How I Can Help</h2>
        <p class="section-subtitle">From program design to data analysis — evidence-based consulting for social impact organizations and development practitioners.</p>
      </div>
      <div class="services-grid">
        ${servicesData.services.map((s, i) => `
          <div class="service-card" data-accent="${s.color_accent}" data-animate data-delay="${(i % 3) + 1}">
            <div class="service-icon-wrap">${ICONS[s.icon] || ICONS['clipboard-check']}</div>
            <h3 class="service-title">${s.title}</h3>
            <p class="service-description">${s.description}</p>
            <ul class="service-bullets">
              ${s.bullets.map(b => `<li class="service-bullet">${b}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============================================================
// RENDER: EXPERIENCE
// ============================================================
function renderExperience(experienceData) {
  const section = document.getElementById('experience');
  const sectors = ['All', ...new Set(experienceData.experience.map(e => e.sector))];

  section.innerHTML = `
    <div class="container">
      <div class="experience-header" data-animate>
        <span class="section-label">Career</span>
        <h2 class="section-title">Professional Experience</h2>
        <p class="section-subtitle">Eight years across humanitarian, research, education, and development sectors on three continents.</p>
      </div>
      <div class="sector-filters" data-animate>
        ${sectors.map((s, i) => `
          <button class="filter-pill ${i === 0 ? 'active' : ''}" data-filter="${s}">${s}</button>
        `).join('')}
      </div>
      <div class="timeline">
        ${experienceData.experience.map((exp, i) => `
          <div class="timeline-item" data-sector="${exp.sector}" data-animate="${i % 2 === 0 ? 'left' : 'right'}">
            <div class="timeline-dot" data-type="${exp.type}"></div>
            ${i % 2 !== 0 ? '<div class="timeline-empty"></div><div class="timeline-spacer"></div>' : ''}
            <div class="timeline-card">
              <div class="timeline-org">${exp.organization}</div>
              <div class="timeline-title">${exp.title}</div>
              <div class="timeline-meta">
                <span>${ICONS.calendar} ${exp.start} – ${exp.end}</span>
                <span>${ICONS['map-pin']} ${exp.location}</span>
                <span class="sector-badge" data-sector="${exp.sector}">${exp.sector}</span>
              </div>
              <p class="timeline-description">${exp.description}</p>
              <button class="timeline-toggle" data-expanded="false">
                ${ICONS['chevron-down']} Show highlights
              </button>
              <ul class="timeline-highlights">
                ${exp.highlights.map(h => `<li class="timeline-highlight">${h}</li>`).join('')}
              </ul>
              <div class="timeline-tags">
                ${exp.tags.map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
            </div>
            ${i % 2 === 0 ? '<div class="timeline-spacer"></div><div class="timeline-empty"></div>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============================================================
// RENDER: EDUCATION
// ============================================================
function renderEducation(educationData) {
  const section = document.getElementById('education');
  section.innerHTML = `
    <div class="container">
      <div class="education-header" data-animate>
        <span class="section-label">Academic Background</span>
        <h2 class="section-title">Education</h2>
      </div>
      ${educationData.education.map((edu, i) => `
        <div class="edu-card" data-animate data-delay="${i + 1}">
          <div class="edu-icon">${ICONS['academic-cap']}</div>
          <div class="edu-degree">${edu.degree}</div>
          <div class="edu-field">${edu.field}</div>
          <div class="edu-institution">${edu.institution}</div>
          <div class="edu-meta">
            <span>${ICONS['map-pin']} ${edu.location}</span>
            <span>${ICONS.calendar} ${edu.graduation}</span>
          </div>
          <div class="edu-section-label">Relevant Coursework</div>
          <div class="edu-courses">
            ${edu.relevant_coursework.map(c => `<span class="edu-course">${c}</span>`).join('')}
          </div>
          ${edu.activities.length ? `
            <div class="edu-section-label" style="margin-top:1rem;">Engagements & Activities</div>
            <div class="edu-activities">
              ${edu.activities.map(a => `<div class="edu-activity">${a}</div>`).join('')}
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

// ============================================================
// RENDER: SKILLS
// ============================================================
function renderSkills(skillsData) {
  const section = document.getElementById('skills');
  section.innerHTML = `
    <div class="container">
      <div class="skills-header" data-animate>
        <span class="section-label">Expertise</span>
        <h2 class="section-title">Skills & Tools</h2>
        <p class="section-subtitle">Technical tools and professional competencies developed across six years and multiple sectors.</p>
      </div>
      <div class="skills-grid">
        ${skillsData.categories.map((cat, ci) => `
          <div class="skill-category" data-animate data-delay="${(ci % 2) + 1}">
            <div class="skill-category-header">
              <div class="skill-category-icon">${ICONS[cat.icon] || ICONS['clipboard']}</div>
              <div class="skill-category-title">${cat.label}</div>
            </div>
            <div class="skill-list">
              ${cat.display === 'pips'
                ? cat.skills.map(skill => `
                  <div class="skill-item">
                    <div class="skill-item-header">
                      <span class="skill-name">${skill.name}</span>
                      <span class="skill-lang-label">${skill.label || ''}</span>
                    </div>
                    <div class="skill-pips">
                      ${[1,2,3,4,5].map(n => `
                        <div class="pip ${n <= Math.round(skill.level / 20) ? 'filled' : ''}"></div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')
                : cat.skills.map(skill => `
                  <div class="skill-item">
                    <div class="skill-item-header">
                      <span class="skill-name">${skill.name}</span>
                      <span class="skill-pct">${skill.level}%</span>
                    </div>
                    <div class="skill-bar-track">
                      <div class="skill-bar-fill" data-level="${skill.level}"></div>
                    </div>
                  </div>
                `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============================================================
// RENDER: CERTIFICATIONS
// ============================================================
function renderCertifications(certsData) {
  const section = document.getElementById('certifications');
  section.innerHTML = `
    <div class="container">
      <div class="certs-header" data-animate>
        <span class="section-label">Credentials</span>
        <h2 class="section-title">Certifications & Training</h2>
        <p class="section-subtitle">Professional development across humanitarian standards, research methods, and safeguarding.</p>
      </div>
      <div class="certs-grid">
        ${certsData.certifications.map((cert, i) => `
          <div class="cert-card ${cert.placeholder ? 'placeholder' : ''}" data-animate data-delay="${(i % 3) + 1}">
            <div class="cert-icon">${ICONS['badge-check']}</div>
            <div class="cert-title">${cert.title}</div>
            <div class="cert-issuer">${cert.issuer}</div>
            <div class="cert-date">${cert.date}</div>
            ${cert.credential_url ? `
              <a href="${cert.credential_url}" target="_blank" rel="noopener" class="cert-link">
                View Credential ${ICONS['external-link']}
              </a>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============================================================
// RENDER: CONTACT
// ============================================================
function renderContact(profile, servicesData) {
  const section = document.getElementById('contact');
  section.innerHTML = `
    <div class="container">
      <div class="contact-inner">
        <div class="contact-info">
          <span class="section-label">Get In Touch</span>
          <h2 class="section-title" style="margin-bottom:1rem;">Let's Work Together</h2>
          <p class="contact-tagline">Whether you need program design support, M&E expertise, or research capacity — I'd love to hear about your project.</p>
          <div class="contact-details">
            <div class="contact-detail">
              <div class="contact-detail-icon">${ICONS.email}</div>
              <div>
                <div class="contact-detail-label">Email</div>
                <a href="mailto:${profile.email}" class="contact-detail-text">${profile.email}</a>
              </div>
            </div>
            <div class="contact-detail">
              <div class="contact-detail-icon">${ICONS.phone}</div>
              <div>
                <div class="contact-detail-label">Phone</div>
                <span class="contact-detail-text">${profile.phone}</span>
              </div>
            </div>
            <div class="contact-detail">
              <div class="contact-detail-icon">${ICONS.location}</div>
              <div>
                <div class="contact-detail-label">Location</div>
                <span class="contact-detail-text">${profile.location}</span>
              </div>
            </div>
          </div>
          <div class="contact-social">
            <a href="${profile.linkedin}" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
              ${ICONS.linkedin}
            </a>
          </div>
        </div>
        <div class="contact-form" data-animate="right">
          <div id="form-fields">
            <div class="form-group">
              <label class="form-label" for="contact-name">Your Name *</label>
              <input class="form-input" type="text" id="contact-name" name="name" placeholder="Jane Smith" required>
              <div class="form-error" id="err-name">Please enter your name.</div>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-email">Email Address *</label>
              <input class="form-input" type="email" id="contact-email" name="email" placeholder="jane@organization.org" required>
              <div class="form-error" id="err-email">Please enter a valid email address.</div>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-service">Service Interest</label>
              <select class="form-select" id="contact-service" name="service">
                <option value="">— Select a service —</option>
                ${servicesData.services.map(s => `<option value="${s.id}">${s.title}</option>`).join('')}
                <option value="other">Other / General Inquiry</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-message">Message *</label>
              <textarea class="form-textarea" id="contact-message" name="message" placeholder="Tell me about your project, timeline, and how I can help..." required></textarea>
              <div class="form-error" id="err-message">Please write a message.</div>
            </div>
            <button class="form-submit" type="button" id="form-submit-btn">Send Message</button>
          </div>
          <div class="form-success" id="form-success">
            <div class="form-success-icon">${ICONS['check-circle']}</div>
            <h3 style="color:var(--color-white);margin-bottom:.5rem;">Message Sent!</h3>
            <p style="color:rgba(247,244,239,0.6);">Your email client should open. I'll get back to you as soon as possible.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// RENDER: FOOTER
// ============================================================
function renderFooter(profile) {
  const footer = document.getElementById('footer-root');
  const year = new Date().getFullYear();
  footer.innerHTML = `
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
      <span>© ${year} ${profile.name}. All rights reserved.</span>
      <span style="display:flex;align-items:center;gap:.4rem;">Made with ${ICONS.heart} for social impact</span>
    </div>
  `;
}

// ============================================================
// FLOATING CTA
// ============================================================
function renderFloatingCTA() {
  const btn = document.createElement('a');
  btn.href = '#contact';
  btn.className = 'floating-cta';
  btn.innerHTML = `${ICONS['arrow-right']} Let's Work Together`;
  document.body.appendChild(btn);

  let heroBottom = 0;
  const updateHeroBottom = () => {
    const hero = document.getElementById('hero');
    if (hero) heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
  };
  updateHeroBottom();
  window.addEventListener('resize', updateHeroBottom);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > heroBottom - 200);
  }, { passive: true });
}

// ============================================================
// NAVIGATION BEHAVIOR
// ============================================================
function initNav() {
  const nav = document.getElementById('nav-root');
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('nav-drawer');
  const themeToggle = document.getElementById('theme-toggle');

  // Sticky scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.innerHTML = isOpen
        ? '<span style="transform:rotate(45deg) translate(5px,5px)"></span><span style="opacity:0"></span><span style="transform:rotate(-45deg) translate(5px,-5px)"></span>'
        : '<span></span><span></span><span></span>';
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
      });
    });
  }

  // Theme toggle
  if (themeToggle) {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') applyTheme('dark');

    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
}

// ============================================================
// ACTIVE NAV LINK TRACKING
// ============================================================
function initSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === entry.target.id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ============================================================
// ANIMATED COUNTERS
// ============================================================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

// ============================================================
// SKILL BAR ANIMATIONS
// ============================================================
function initSkillBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          const level = bar.dataset.level;
          setTimeout(() => { bar.style.width = level + '%'; }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillsSection);
}

// ============================================================
// EXPERIENCE TOGGLES & SECTOR FILTER
// ============================================================
function initExperience() {
  const timeline = document.querySelector('.timeline');
  const filterPills = document.querySelectorAll('.filter-pill');
  if (!timeline) return;

  // Expand/collapse highlights
  timeline.addEventListener('click', e => {
    const toggle = e.target.closest('.timeline-toggle');
    if (!toggle) return;
    const card = toggle.closest('.timeline-card');
    const highlights = card.querySelector('.timeline-highlights');
    const expanded = toggle.dataset.expanded === 'true';
    toggle.dataset.expanded = !expanded;
    highlights.classList.toggle('expanded', !expanded);
    toggle.innerHTML = expanded
      ? `${ICONS['chevron-down']} Show highlights`
      : `${ICONS['chevron-up']} Hide highlights`;
  });

  // Sector filter
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      document.querySelectorAll('.timeline-item').forEach(item => {
        const match = filter === 'All' || item.dataset.sector === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });
}

// ============================================================
// CONTACT FORM
// ============================================================
function initContactForm(profile, servicesData) {
  const submitBtn = document.getElementById('form-submit-btn');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');
    const service = document.getElementById('contact-service');

    let valid = true;

    const validate = (field, errId, condition) => {
      const err = document.getElementById(errId);
      if (!condition) {
        err.classList.add('visible');
        field.style.borderColor = '#FC8181';
        valid = false;
      } else {
        err.classList.remove('visible');
        field.style.borderColor = '';
      }
    };

    validate(name, 'err-name', name.value.trim().length > 1);
    validate(email, 'err-email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
    validate(message, 'err-message', message.value.trim().length > 10);

    if (!valid) return;

    const serviceLabel = service.options[service.selectedIndex].text;
    const body = `Name: ${name.value}\nEmail: ${email.value}\nService: ${serviceLabel}\n\nMessage:\n${message.value}`;
    const subject = `Freelance Inquiry — ${serviceLabel !== '— Select a service —' ? serviceLabel : 'General Inquiry'}`;
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    document.getElementById('form-fields').style.display = 'none';
    const success = document.getElementById('form-success');
    success.classList.add('visible');
  });
}

// ============================================================
// RENDER: UPWORK SECTION
// ============================================================
function renderUpwork(upwork) {
  const section = document.getElementById('upwork');
  if (!section) return;

  const upworkLogoSVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.001-2.439-5.452-5.439-5.452z"/></svg>`;

  section.innerHTML = `
    <div class="container">

      <!-- Section header -->
      <div class="upwork-header" data-animate>
        <div class="upwork-platform-badge">${upworkLogoSVG} Available on Upwork</div>
        <h2 class="section-title">Hire Me as a Freelancer</h2>
        <p class="section-subtitle">${upwork.tagline}</p>
      </div>

      <!-- Profile title + rate -->
      <div class="upwork-profile-bar" data-animate>
        <div class="upwork-profile-title-block">
          <div class="upwork-profile-label">Upwork Profile Title</div>
          <div class="upwork-profile-title">"${upwork.profile_title}"</div>
        </div>
        <div class="upwork-rate-block">
          <div class="upwork-rate-number">$${upwork.rate_range.min}–$${upwork.rate_range.max}<span>/${upwork.rate_range.unit}</span></div>
          <div class="upwork-rate-note">${upwork.rate_range.note}</div>
        </div>
      </div>

      <!-- Top services -->
      <div class="upwork-services-label" data-animate>Top Service Offerings</div>
      <div class="upwork-services-grid">
        ${upwork.top_services.map((s, i) => `
          <div class="upwork-service-card" data-accent="${s.color_accent}" data-animate data-delay="${(i % 2) + 1}">
            <div class="upwork-service-top">
              <div class="upwork-service-icon">${ICONS[s.icon] || ICONS['clipboard-check']}</div>
              ${s.badge ? `<span class="upwork-badge">${s.badge}</span>` : ''}
            </div>
            <div class="upwork-service-title">${s.title}</div>
            <div class="upwork-service-desc">${s.description}</div>
            <div class="upwork-service-price">${s.fixed_price_from}</div>
          </div>
        `).join('')}
      </div>

      <!-- Two-column: differentiators + ideal clients -->
      <div class="upwork-lower" data-animate>
        <div class="upwork-differentiators">
          <div class="upwork-col-label">Why Clients Choose Me</div>
          <div class="upwork-diff-list">
            ${upwork.differentiators.map(d => `
              <div class="upwork-diff-item">
                <div class="upwork-diff-icon">${ICONS[d.icon] || ICONS['badge-check']}</div>
                <div>
                  <div class="upwork-diff-title">${d.title}</div>
                  <div class="upwork-diff-desc">${d.description}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="upwork-right-col">
          <div class="upwork-clients-block">
            <div class="upwork-col-label">Who I Work With</div>
            <div class="upwork-clients-list">
              ${upwork.ideal_clients.map(c => `<span class="upwork-client-chip">${c}</span>`).join('')}
            </div>
          </div>
          <div class="upwork-skills-block">
            <div class="upwork-col-label">Key Skills & Keywords</div>
            <div class="upwork-skills-list">
              ${upwork.skills_tags.map(t => `<span class="upwork-skill-tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="upwork-cta" data-animate>
        ${upwork.upwork_url
          ? `<a href="${upwork.upwork_url}" target="_blank" rel="noopener" class="upwork-cta-btn">${upworkLogoSVG} View My Upwork Profile</a>`
          : `<div class="upwork-cta-placeholder">
               <div class="upwork-cta-placeholder-text">Add your Upwork profile URL to <code>data/upwork.json</code> to show a direct link here.</div>
             </div>`
        }
        <a href="#contact" class="btn-secondary" style="border-color:rgba(255,255,255,0.3);color:#fff;">Or contact me directly</a>
      </div>

    </div>
  `;
}

// ============================================================
// CV / PDF DOWNLOAD
// ============================================================
function initDownloadBtn() {
  const btn = document.getElementById('btn-download-cv');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!_allData) return;
    if (typeof window.jspdf === 'undefined') {
      alert('PDF library not loaded. Please check your internet connection.');
      return;
    }
    btn.disabled = true;
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:ringRotate 1s linear infinite"><circle cx="12" cy="12" r="10" stroke-dasharray="31" stroke-dashoffset="10"/></svg> Generating…`;
    // Give UI a tick to repaint before the synchronous PDF work
    requestAnimationFrame(() => {
      try {
        generateCV(_allData);
      } finally {
        btn.disabled = false;
        btn.innerHTML = `${ICONS.download} Download CV`;
      }
    });
  });
}

function generateCV({ profile, experience, education, skills, certifications }) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const PW = 210, PH = 297;
  const ML = 18, MR = 18;
  const CW = PW - ML - MR; // 174mm

  // Color palette
  const C = {
    teal:      [27,  94,  107],
    tealMid:   [46,  139, 154],
    tealXl:    [200, 230, 235],
    amber:     [196, 112, 59],
    amberLight:[232, 147, 94],
    dark:      [26,  31,  46],
    darkMid:   [61,  68,  96],
    muted:     [123, 130, 154],
    white:     [255, 255, 255],
    offWhite:  [247, 244, 239],
    warmGray:  [213, 207, 198],
    lightRow:  [238, 235, 230],
  };

  let y = 0;
  let page = 1;

  const sc = (...rgb) => doc.setTextColor(...rgb);
  const sf = (...rgb) => doc.setFillColor(...rgb);
  const sd = (...rgb) => doc.setDrawColor(...rgb);

  function addPageFooter() {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    sc(...C.muted);
    doc.text(profile.name + '  —  Curriculum Vitae', ML, PH - 8);
    doc.text(`Page ${page}`, PW - MR, PH - 8, { align: 'right' });
    // thin teal footer line
    sf(...C.teal);
    doc.rect(0, PH - 5, PW, 5, 'F');
  }

  function newPage() {
    addPageFooter();
    doc.addPage();
    page++;
    y = 18;
    // Subtle header repeat on subsequent pages
    sf(...C.teal);
    doc.rect(0, 0, PW, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    sc(...C.tealXl);
    doc.text(profile.name.toUpperCase(), ML, 5.5);
    doc.text('CURRICULUM VITAE', PW - MR, 5.5, { align: 'right' });
    y = 18;
  }

  function checkPage(need = 20) {
    if (y + need > PH - 18) newPage();
  }

  function sectionHeader(title) {
    checkPage(16);
    y += 5;
    // Left accent bar
    sf(...C.amber);
    doc.rect(ML, y, 3.5, 6.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    sc(...C.teal);
    doc.text(title.toUpperCase(), ML + 6.5, y + 5);
    // Rule
    sd(...C.warmGray);
    doc.setLineWidth(0.25);
    doc.line(ML + 6.5 + doc.getTextWidth(title.toUpperCase()) + 3, y + 3.5, PW - MR, y + 3.5);
    y += 11;
  }

  function textBlock(text, fontSize, color, fontStyle = 'normal', maxW = CW) {
    doc.setFont('helvetica', fontStyle);
    doc.setFontSize(fontSize);
    sc(...color);
    const lines = doc.splitTextToSize(text, maxW);
    const lineH = fontSize * 0.42;
    checkPage(lines.length * lineH + 2);
    doc.text(lines, ML, y);
    y += lines.length * lineH + 1;
    return lines.length;
  }

  // ── HEADER ──────────────────────────────────────────────────
  sf(...C.teal);
  doc.rect(0, 0, PW, 50, 'F');
  // Amber right stripe
  sf(...C.amber);
  doc.rect(PW - 10, 0, 10, 50, 'F');
  // Decorative light teal band
  sf(46, 139, 154);
  doc.rect(0, 42, PW - 10, 2, 'F');

  doc.setFont('times', 'bold');
  doc.setFontSize(27);
  sc(...C.white);
  doc.text(profile.name, ML, 21);

  doc.setFont('times', 'italic');
  doc.setFontSize(12);
  sc(...C.tealXl);
  doc.text(profile.tagline, ML, 30);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  sc(160, 210, 218);
  doc.text('● ' + profile.availability, ML, 38);

  y = 50;

  // ── CONTACT BAR ─────────────────────────────────────────────
  sf(...C.lightRow);
  doc.rect(0, y, PW, 13, 'F');
  sd(...C.warmGray);
  doc.setLineWidth(0.2);
  doc.rect(0, y, PW, 13, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  sc(...C.darkMid);

  const contacts = [profile.email, profile.phone, profile.location, 'linkedin: ' + profile.linkedin.replace('https://', '')];
  const colW = (PW - ML - MR) / contacts.length;
  contacts.forEach((c, i) => {
    doc.text(c, ML + i * colW, y + 8.5, { maxWidth: colW - 2 });
  });

  y += 16;

  // ── PROFESSIONAL PROFILE ─────────────────────────────────────
  sectionHeader('Professional Profile');

  const aboutText = profile.about.paragraphs.join(' ');
  const aboutLines = doc.splitTextToSize(aboutText, CW);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  sc(...C.darkMid);
  checkPage(aboutLines.length * 4.2 + 18);
  doc.text(aboutLines, ML, y);
  y += aboutLines.length * 4.2 + 4;

  // Stats tiles
  const tileW = CW / profile.about.highlights.length;
  const tileH = 15;
  profile.about.highlights.forEach((h, i) => {
    const tx = ML + i * tileW;
    if (i % 2 === 0) sf(...C.offWhite); else sf(...C.lightRow);
    doc.rect(tx, y, tileW, tileH, 'F');
    sd(...C.warmGray);
    doc.rect(tx, y, tileW, tileH, 'S');
    doc.setFont('times', 'bold');
    doc.setFontSize(15);
    sc(...C.teal);
    doc.text(`${h.number}${h.suffix}`, tx + tileW / 2, y + 7, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    sc(...C.muted);
    doc.text(h.label, tx + tileW / 2, y + 12, { align: 'center' });
  });
  y += tileH + 6;

  // ── PROFESSIONAL EXPERIENCE ──────────────────────────────────
  sectionHeader('Professional Experience');

  experience.experience.forEach((exp) => {
    const descLines = doc.splitTextToSize(exp.description, CW);
    const hlLines = exp.highlights.reduce((acc, h) => {
      return acc + doc.splitTextToSize('• ' + h, CW - 6).length;
    }, 0);
    const needed = 14 + descLines.length * 4 + hlLines * 4 + 8;
    checkPage(needed);

    // Org + date on same line
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    sc(...C.dark);
    doc.text(exp.organization, ML, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    sc(...C.muted);
    doc.text(`${exp.start} – ${exp.end}`, PW - MR, y, { align: 'right' });
    y += 5;

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    sc(...C.teal);
    doc.text(exp.title, ML, y);
    y += 4.5;

    // Location · sector
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    sc(...C.muted);
    doc.text(`${exp.location}  ·  ${exp.sector}`, ML, y);
    y += 5;

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    sc(...C.darkMid);
    doc.text(descLines, ML, y);
    y += descLines.length * 4 + 2;

    // Highlights
    exp.highlights.forEach(h => {
      const hLines = doc.splitTextToSize('• ' + h, CW - 6);
      checkPage(hLines.length * 4 + 1);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      sc(...C.darkMid);
      doc.text(hLines, ML + 3, y);
      y += hLines.length * 4;
    });

    y += 7; // gap between jobs
  });

  // ── EDUCATION ───────────────────────────────────────────────
  sectionHeader('Education');

  education.education.forEach((edu) => {
    checkPage(28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    sc(...C.dark);
    doc.text(edu.institution, ML, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    sc(...C.muted);
    doc.text(edu.graduation, PW - MR, y, { align: 'right' });
    y += 5;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    sc(...C.teal);
    doc.text(`${edu.degree}  —  ${edu.field}`, ML, y);
    y += 4.5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    sc(...C.muted);
    doc.text(edu.location, ML, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    sc(...C.darkMid);
    const courseLine = doc.splitTextToSize('Coursework: ' + edu.relevant_coursework.join('  |  '), CW);
    checkPage(courseLine.length * 3.8 + 4);
    doc.text(courseLine, ML, y);
    y += courseLine.length * 3.8 + 6;
  });

  // ── SKILLS ──────────────────────────────────────────────────
  sectionHeader('Skills & Technical Tools');

  skills.categories.forEach(cat => {
    checkPage(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    sc(...C.amber);
    doc.text(cat.label, ML, y);
    y += 4.5;

    const skillStr = cat.skills.map(s => s.name).join('   ·   ');
    const skillLines = doc.splitTextToSize(skillStr, CW);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    sc(...C.darkMid);
    doc.text(skillLines, ML + 3, y);
    y += skillLines.length * 4.2 + 5;
  });

  // ── CERTIFICATIONS ───────────────────────────────────────────
  const realCerts = certifications.certifications.filter(c => !c.placeholder);
  if (realCerts.length) {
    sectionHeader('Certifications & Training');
    realCerts.forEach(cert => {
      checkPage(8);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      sc(...C.dark);
      doc.text('▸ ' + cert.title, ML, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      sc(...C.muted);
      doc.text(`${cert.issuer}  ·  ${cert.date}`, PW - MR, y, { align: 'right' });
      y += 5.5;
    });
  }

  // Footer on last page
  addPageFooter();

  doc.save(`${profile.name.replace(/\s+/g, '_')}_CV.pdf`);
}

// ============================================================
// BOOTSTRAP
// ============================================================
async function init() {
  try {
    const { profile, services, experience, education, skills, certifications, upwork } = await loadAllData();
    _allData = { profile, services, experience, education, skills, certifications, upwork };

    // Render all sections
    renderNav(profile);
    renderHero(profile);
    renderAbout(profile);
    renderServices(services);
    renderExperience(experience);
    renderEducation(education);
    renderSkills(skills);
    renderCertifications(certifications);
    renderUpwork(upwork);
    renderContact(profile, services);
    renderFooter(profile);
    renderFloatingCTA();

    // After render, init behaviors
    initNav();
    initSectionObserver();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    initExperience();
    initContactForm(profile, services);
    initDownloadBtn();

  } catch (err) {
    console.error('Portfolio load error:', err);
    document.body.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;color:#1A1F2E;padding:2rem;text-align:center;">
        <h2 style="margin-bottom:1rem;">Unable to load portfolio data</h2>
        <p style="color:#7B829A;max-width:500px;">The portfolio needs to be served via a local HTTP server (not opened directly as a file). Please run:</p>
        <pre style="background:#F7F4EF;border:1px solid #D5CFC6;padding:1rem 2rem;border-radius:8px;margin:1rem 0;font-size:1rem;">python3 -m http.server 8080</pre>
        <p style="color:#7B829A;">Then open <strong>http://localhost:8080</strong> in your browser.</p>
        <p style="color:#7B829A;font-size:.85rem;margin-top:.5rem;">Or use VS Code with the Live Server extension.</p>
        <details style="margin-top:1rem;text-align:left;"><summary style="cursor:pointer;color:#1B5E6B;">Technical details</summary><pre style="font-size:.75rem;color:#7B829A;">${err}</pre></details>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', init);
