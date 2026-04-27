(function () {
  'use strict';

  // ---- Mobile Menu ----
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // ---- Scroll: Active Nav ----
  var navLinks = document.querySelectorAll('.nav-link');
  function updateActiveNav() {
    var scrollPos = window.scrollY + 80;
    document.querySelectorAll('section[id]').forEach(function (sec) {
      var top = sec.offsetTop;
      var h = sec.offsetHeight;
      var id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + h) {
        navLinks.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---- Navbar background ----
  var navbar = document.querySelector('.nav');
  function updateNavBg() {
    if (!navbar) return;
    navbar.style.background = window.scrollY > 10 ? 'rgba(13,13,13,0.96)' : '#0d0d0d';
  }
  window.addEventListener('scroll', updateNavBg, { passive: true });

  // ---- Imam pills ----
  document.querySelectorAll('.imam-pill').forEach(function (pill) {
    pill.addEventListener('click', function () {
      document.querySelectorAll('.imam-pill').forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
    });
  });

  // ---- Scroll Animations ----
  var fadeEls = document.querySelectorAll('.about, .imams, .campaigns, .hub, .events, .verse, .about-card, .campaign-card, .event-row, .hub-card, .imam-pill');
  fadeEls.forEach(function (el) { el.classList.add('fade-in'); });
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  fadeEls.forEach(function (el) { obs.observe(el); });

  // ---- Progress Bar Animation ----
  document.querySelectorAll('.progress-fill').forEach(function (bar) {
    var w = bar.style.width;
    bar.style.width = '0';
    var bObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          requestAnimationFrame(function () { requestAnimationFrame(function () { bar.style.width = w; }); });
          bObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    bObs.observe(bar);
  });

  // ---- Resize: close menu on desktop ----
  var rTimer;
  window.addEventListener('resize', function () {
    clearTimeout(rTimer);
    rTimer = setTimeout(function () { if (window.innerWidth > 768) closeMenu(); }, 150);
  });
})();