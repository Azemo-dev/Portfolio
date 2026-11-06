// Charge un composant HTML dans un élément
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

// Surligne le lien de la page courante
function setActiveLink() {
  let page = location.pathname.replace(/\/$/, '').split('/').pop().replace('.html', '');
  if (!page) page = 'index';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.dataset.page === page) link.classList.add('active');
  });
}

// Menu mobile
function initBurger() {
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }
}

// Année dynamique
function setYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

// Animation des barres de compétences
function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');
  if (!bars.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.level + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach((bar) => observer.observe(bar));
}

// Démarrage
document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('#header', '/components/header.html'),
    loadComponent('#footer', '/components/footer.html'),
  ]);
  setActiveLink();
  initBurger();
  setYear();
  initSkillBars();
});