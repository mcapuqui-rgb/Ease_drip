// ── LANGUAGE ──
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.textContent === lang.toUpperCase()));
  document.querySelectorAll('[data-pt]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    if (el.tagName === 'INPUT') el.placeholder = val;
    else if (el.tagName === 'TEXTAREA') {
      const ph = el.getAttribute('data-' + lang + '-placeholder');
      if (ph) el.placeholder = ph;
    } else el.innerHTML = val;
  });
  // Actualiza label do tema
  const isLight = document.documentElement.classList.contains('light');
  const lbl = document.getElementById('themeLbl');
  if (lbl) lbl.textContent = isLight
    ? (lang === 'pt' ? 'Escuro' : 'Dark')
    : (lang === 'pt' ? 'Claro' : 'Light');
  renderAllGrids();
  setTimeout(observeCards, 80);
  showToast(lang === 'pt' ? 'Idioma: Português' : 'Language: English');
}
