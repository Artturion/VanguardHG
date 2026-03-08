/* ============================================================
   VANGUARD HEALTH GROUP — JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar: scroll shadow ───────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile drawer ───────────────────────────────────────── */
  const navToggle  = document.getElementById('navToggle');
  const navDrawer  = document.getElementById('navDrawer');
  const drawerOverlay = document.getElementById('navDrawerOverlay');
  const drawerClose   = document.getElementById('drawerClose');

  function openDrawer() {
    navDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  navDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ── Scroll-reveal animation ─────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealSelectors = [
      '.section-header', '.split-content', '.split-visual',
      '.commitment-card', '.service-card', '.industry-card',
      '.mission-card', '.director-card', '.preview-card',
      '.request-info', '.form-card', '.benefits-card',
      '.work-content', '.stats-grid', '.page-hero-content',
    ];

    document.querySelectorAll(revealSelectors.join(', ')).forEach(el => {
      el.style.opacity = '0';
      revealObserver.observe(el);
    });

    // Stagger direct children in card grids
    ['.commitment-grid', '.services-grid', '.services-preview-grid',
     '.industries-grid', '.directors-grid', '.mission-grid'].forEach(selector => {
      const grid = document.querySelector(selector);
      if (!grid) return;
      grid.querySelectorAll(':scope > *').forEach((child, i) => {
        child.style.animationDelay = `${i * 0.08}s`;
      });
    });
  }

  /* ── Service Request Form ────────────────────────────────── */
  const requestForm = document.getElementById('requestForm');
  const formSuccess = document.getElementById('formSuccess');

  if (requestForm && formSuccess) {
    requestForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!requestForm.checkValidity()) { requestForm.reportValidity(); return; }

      const btn = requestForm.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Submitting…';

      setTimeout(() => {
        requestForm.reset();
        btn.disabled = false;
        btn.innerHTML = orig;
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => { formSuccess.hidden = true; }, 7000);
      }, 1200);
    });
  }

  /* ── Apply Form ──────────────────────────────────────────── */
  const applyForm    = document.getElementById('applyForm');
  const applySuccess = document.getElementById('applySuccess');

  if (applyForm && applySuccess) {
    applyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!applyForm.checkValidity()) { applyForm.reportValidity(); return; }

      const btn = applyForm.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Submitting…';

      setTimeout(() => {
        applyForm.reset();
        const fl = document.getElementById('fileLabel');
        if (fl) fl.textContent = 'Upload your resume (PDF, DOC, DOCX)';
        btn.disabled = false;
        btn.innerHTML = orig;
        applySuccess.hidden = false;
        applySuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => { applySuccess.hidden = true; }, 7000);
      }, 1200);
    });
  }

  /* ── File input label ────────────────────────────────────── */
  const resumeInput = document.getElementById('applyResume');
  const fileLabel   = document.getElementById('fileLabel');

  if (resumeInput && fileLabel) {
    resumeInput.addEventListener('change', function () {
      fileLabel.textContent = this.files[0]
        ? this.files[0].name
        : 'Upload your resume (PDF, DOC, DOCX)';
    });
  }

  /* ── Interactive hover buttons ───────────────────────────── */
  const ARROW_SVG =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  document.querySelectorAll('.btn, .nav-cta').forEach(el => {
    // Skip the spinning-ring CTA — it has its own bespoke interaction
    if (el.classList.contains('cta-ring-btn') || el.dataset.hoverInit) return;
    const label = el.textContent.trim();
    el.innerHTML =
      `<span class="btn-text">${label}</span>` +
      `<span class="btn-hover-content" aria-hidden="true"><span>${label}</span>${ARROW_SVG}</span>` +
      `<span class="btn-blob" aria-hidden="true"></span>`;
    el.dataset.hoverInit = '1';
  });

})();
