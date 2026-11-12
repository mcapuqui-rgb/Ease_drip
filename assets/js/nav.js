// ── NAV MOBILE ──
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const button = document.querySelector('.hamburger');
  const isOpen = menu.classList.toggle('open');
  button.setAttribute('aria-expanded', String(isOpen));
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.getElementById('mobileMenu').classList.contains('open')) {
    toggleMenu();
  }
});

// ── NAV ACTIVE ON SCROLL ──
window.addEventListener('scroll', () => {
  const sections = ['home','featured','shop','contact'];
  const scrollY = window.scrollY + 120;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${id}"]`) || document.querySelector(`.nav-links a[href="#shop"]`);
      if (link) link.classList.add('active');
    }
  });
});
