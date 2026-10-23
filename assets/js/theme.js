// ── THEME TOGGLE ──
function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light');
  const lbl = document.getElementById('themeLbl');
  const icon = document.querySelector('.theme-icon');
  if (isLight) {
    lbl.textContent = currentLang === 'pt' ? 'Escuro' : 'Dark';
    icon.textContent = '☀';
    showToast(currentLang === 'pt' ? 'Tema Claro activado' : 'Light theme on');
  } else {
    lbl.textContent = currentLang === 'pt' ? 'Claro' : 'Light';
    icon.textContent = '☀';
    showToast(currentLang === 'pt' ? 'Tema Escuro activado' : 'Dark theme on');
  }
  localStorage.setItem('ease-drip-theme', isLight ? 'light' : 'dark');
}

// Restaurar tema guardado
(function() {
  const saved = localStorage.getItem('ease-drip-theme');
  if (saved === 'light') {
    document.documentElement.classList.add('light');
    setTimeout(() => {
      const lbl = document.getElementById('themeLbl');
      if (lbl) lbl.textContent = 'Escuro';
    }, 0);
  }
})();
