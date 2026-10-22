// ── HERO SLIDESHOW ──
// Fusão (crossfade) entre imagens de fundo. Só anima a opacidade — sem zoom,
// blur nem reescala — para a imagem manter a nitidez original.
(function () {
  const bg = document.querySelector('.hero-bg');
  if (!bg || !Array.isArray(HERO_IMAGES) || HERO_IMAGES.length < 2) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  bg.style.setProperty('--hero-fade', reduceMotion ? '0ms' : HERO_FADE_MS + 'ms');

  const layers = [0, 1].map(() => {
    const d = document.createElement('div');
    d.className = 'hero-slide';
    bg.insertBefore(d, bg.firstChild);
    return d;
  });

  const preload = src => new Promise(resolve => {
    const img = new Image();
    img.onload = () => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()).then(() => resolve(true));
    img.onerror = () => resolve(false);
    img.src = src;
  });

  let index = 0, front = 0, timer = null, busy = false;

  // 1.ª imagem: já pré-carregada pelo CSS/navegador, mostra-se logo
  layers[0].style.backgroundImage = `url("${HERO_IMAGES[0]}")`;
  layers[0].classList.add('active');

  async function next() {
    if (busy || document.hidden) return;
    busy = true;
    // procura a próxima imagem que carregue (ignora caminhos errados)
    for (let tries = 0; tries < HERO_IMAGES.length; tries++) {
      const candidate = (index + 1 + tries) % HERO_IMAGES.length;
      if (await preload(HERO_IMAGES[candidate])) {
        const back = 1 - front;
        const incoming = layers[back], outgoing = layers[front];
        incoming.style.backgroundImage = `url("${HERO_IMAGES[candidate]}")`;
        incoming.classList.remove('no-fade');
        incoming.style.zIndex = 2; outgoing.style.zIndex = 1;
        incoming.classList.add('active');          // nova imagem aparece POR CIMA
        setTimeout(() => {                         // só depois tira a antiga (sem "buraco" de luz)
          outgoing.classList.add('no-fade');
          outgoing.classList.remove('active');
        }, reduceMotion ? 0 : HERO_FADE_MS + 50);
        front = back; index = candidate;
        break;
      }
    }
    busy = false;
  }

  function start() { stop(); timer = setInterval(next, HERO_INTERVAL_MS + HERO_FADE_MS); }
  function stop()  { if (timer) { clearInterval(timer); timer = null; } }

  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  start();
})();
