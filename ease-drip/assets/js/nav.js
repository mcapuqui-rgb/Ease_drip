// ── NAV MOBILE ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

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
