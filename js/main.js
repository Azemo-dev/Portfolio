async function loadComponent(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(`Erreur de chargement de ${url}`, err);
  }
}

function setActiveLink() {
  let page = location.pathname.replace(/\/$/, '').split('/').pop().replace('.html', '');
  if (!page) page = 'index';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.dataset.page === page) link.classList.add('active');
  });
}

function initBurger() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav-links');
  if (burger && nav) burger.addEventListener('click', () => nav.classList.toggle('open'));
}

function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  if (!bars.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.level + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach((b) => obs.observe(b));
}

// Compteurs animés (chiffres clés)
function initCounters() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const duration = 1400;
      (function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(start);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach((n) => obs.observe(n));
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('#header', '/components/header.html'),
    loadComponent('#footer', '/components/footer.html'),
  ]);
  setActiveLink();
  initBurger();
  setYear();
  initSkillBars();
  initCounters();
});