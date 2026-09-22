'use strict';
/* Clark Lindley Suan — site behaviour (Sept 2026 redesign)
   Previous vCard script archived in archive/vcard-site/script.js */
(function () {
  var isStatic = location.search.indexOf('static') > -1;
  var reduce = isStatic || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var root = document.documentElement;
  if (isStatic) root.classList.add('static'); else root.classList.add('js');

  /* ---------- scroll reveal + stagger ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: .1, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll('[data-stagger]').forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.setAttribute('data-reveal', '');
        child.style.setProperty('--d', (i * 90) + 'ms');
      });
    });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });

    /* ---------- count-up numbers ---------- */
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        var el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = 1400;
        if (reduce) { el.textContent = end; return; }
        (function step(t) {
          var p = Math.min(1, (t - t0) / dur);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: .5 });
    document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = '0'; cio.observe(el); });
  } else {
    root.classList.remove('js');
  }

  /* ---------- nav: scrolled state + mobile menu ---------- */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav) {
    addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 12); }, { passive: true });
  }
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
    });
  }

  /* ---------- soft parallax on case-study screenshots ---------- */
  if (!reduce) {
    var shots = Array.prototype.slice.call(document.querySelectorAll('.shot img')), ticking = false;
    var tick = function () {
      ticking = false;
      var vh = innerHeight;
      shots.forEach(function (img) {
        var r = img.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var c = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.setProperty('--py', (c * -22).toFixed(1) + 'px');
      });
    };
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }, { passive: true });
    tick();
  }

  /* ---------- portfolio filters ---------- */
  var pills = document.querySelectorAll('.filters [data-filter]');
  var tiles = document.querySelectorAll('.tile[data-category]');
  pills.forEach(function (btn) {
    btn.addEventListener('click', function () {
      pills.forEach(function (b) { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true');
      var f = btn.dataset.filter;
      tiles.forEach(function (t) {
        var cats = t.dataset.category.split(/\s+/);
        t.classList.toggle('hidden', !(f === 'all' || cats.indexOf(f) > -1));
      });
    });
  });
})();
