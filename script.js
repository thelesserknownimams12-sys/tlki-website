(function () {
  'use strict';

  var menuToggle = document.getElementById('menuToggle');
  var primaryNav = document.getElementById('primaryNav');
  var navLinks = document.querySelectorAll('.nav-link');
  var imamPills = document.querySelectorAll('.imam-pill');
  var joinForm = document.getElementById('joinForm');
  var formSuccess = document.getElementById('formSuccess');

  function openModal() {
    var modal = document.getElementById('joinModal');
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    var modal = document.getElementById('joinModal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('[data-open-join]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(function (el) {
    el.addEventListener('click', function () {
      closeModal();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', function () {
      var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      menuToggle.classList.toggle('active');
      primaryNav.classList.toggle('open');
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        primaryNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  function handleNavScroll() {
    var sections = document.querySelectorAll('section[id]');
    var scrollPos = window.scrollY + 80;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  function handleNavbarBg() {
    var navbar = document.getElementById('top');
    if (window.scrollY > 10) {
      navbar.style.background = 'rgba(13, 13, 13, 0.95)';
      navbar.style.backdropFilter = 'blur(12px)';
    } else {
      navbar.style.background = '#0d0d0d';
      navbar.style.backdropFilter = 'blur(12px)';
    }
  }

  window.addEventListener('scroll', handleNavbarBg, { passive: true });

  if (joinForm) {
    var nameInput = document.getElementById('fullName');
    var emailInput = document.getElementById('email');
    var cityInput = document.getElementById('city');

    function validateRequired(input, errorAttr) {
      var errEl = joinForm.querySelector('[data-error-for="' + errorAttr + '"]');
      if (!input.value.trim()) {
        input.classList.add('invalid');
        if (errEl) errEl.textContent = 'This field is required';
        return false;
      }
      input.classList.remove('invalid');
      if (errEl) errEl.textContent = '';
      return true;
    }

    function validateEmail(input) {
      var errEl = joinForm.querySelector('[data-error-for="email"]');
      var val = input.value.trim();
      if (!val) {
        input.classList.add('invalid');
        if (errEl) errEl.textContent = 'Please enter your email';
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        input.classList.add('invalid');
        if (errEl) errEl.textContent = 'Please enter a valid email';
        return false;
      }
      input.classList.remove('invalid');
      if (errEl) errEl.textContent = '';
      return true;
    }

    nameInput.addEventListener('blur', function () { validateRequired(nameInput, 'fullName'); });
    emailInput.addEventListener('blur', function () { validateEmail(emailInput); });
    cityInput.addEventListener('blur', function () { validateRequired(cityInput, 'city'); });

    joinForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      if (!validateRequired(nameInput, 'fullName')) valid = false;
      if (!validateEmail(emailInput)) valid = false;
      if (!validateRequired(cityInput, 'city')) valid = false;

      if (valid) {
        joinForm.style.display = 'none';
        formSuccess.textContent = 'Thank you, ' + nameInput.value.trim() + '! You\'ll be added to the community soon. May Allah bless you.';
        formSuccess.classList.add('visible');
      }
    });
  }

  imamPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      imamPills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
    });
  });

  function initScrollAnimations() {
    var elements = document.querySelectorAll(
      '.about, .imams, .hub, .events, .campaigns, .verse, .about-card, .campaign-card, .event-row, .hub-card, .imam-pill, .about-layout'
    );
    elements.forEach(function (el) { el.classList.add('fade-in'); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  initScrollAnimations();

  function animateProgressBars() {
    var bars = document.querySelectorAll('.progress-fill');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          var width = target.style.width;
          target.style.width = '0';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              target.style.width = width;
            });
          });
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    bars.forEach(function (b) { observer.observe(b); });
  }

  animateProgressBars();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 768 && menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        primaryNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    }, 150);
  });
})();