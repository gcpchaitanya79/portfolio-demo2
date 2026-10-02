(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Utilities
   * ------------------------------------------------------------------ */
  const THEME_STORAGE_KEY = 'theme';

  const safeStorage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        /* Storage unavailable (private mode, blocked) — theme still applies for this visit. */
      }
    },
  };

  const getPreferredTheme = () => {
    const stored = safeStorage.get(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  /* ------------------------------------------------------------------ *
   * Theme toggle (light / dark)
   * ------------------------------------------------------------------ */
  const applyTheme = (theme, toggle) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };

  const initThemeToggle = () => {
    const toggle = document.getElementById('theme-toggle');
    applyTheme(getPreferredTheme(), toggle);
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      safeStorage.set(THEME_STORAGE_KEY, nextTheme);
      applyTheme(nextTheme, toggle);
    });
  };

  /* ------------------------------------------------------------------ *
   * Mobile navigation
   * ------------------------------------------------------------------ */
  const initMobileNav = () => {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.querySelector('.primary-nav');
    if (!toggle || !nav) return;

    const setMenuState = (isOpen) => {
      nav.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('is-locked', isOpen);
    };

    toggle.addEventListener('click', () => setMenuState(!nav.classList.contains('is-open')));

    nav.addEventListener('click', (event) => {
      if (event.target.closest('.nav-link')) setMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenuState(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (nav.classList.contains('is-open') && !nav.contains(event.target) && !toggle.contains(event.target)) {
        setMenuState(false);
      }
    });
  };

  /* ------------------------------------------------------------------ *
   * Sticky header shadow + back-to-top visibility
   * ------------------------------------------------------------------ */
  const initScrollState = () => {
    const header = document.getElementById('site-header');
    const backToTop = document.getElementById('back-to-top');
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle('is-scrolled', y > 4);
      if (backToTop) backToTop.classList.toggle('is-visible', y > 600);
      ticking = false;
    };

    update();
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  };

  /* ------------------------------------------------------------------ *
   * Scroll-spy — highlights the nav link for the section in view
   * ------------------------------------------------------------------ */
  const initScrollSpy = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navLinks.length || !('IntersectionObserver' in window)) return;

    const linkById = new Map();
    navLinks.forEach((link) => linkById.set(link.getAttribute('href').slice(1), link));

    const setActiveLink = (id) => {
      navLinks.forEach((link) => link.classList.remove('is-active'));
      const active = linkById.get(id);
      if (active) active.classList.add('is-active');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
  };

  /* ------------------------------------------------------------------ *
   * Init
   * ------------------------------------------------------------------ */
  const init = () => {
    initThemeToggle();
    initMobileNav();
    initScrollState();
    initScrollSpy();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
