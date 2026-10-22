// ── HERO SLIDESHOW E ZOOM ──
(function () {
  const bg = document.querySelector('.hero-bg');
  const home = document.querySelector('#home');
  if (!bg || !home || !Array.isArray(HERO_IMAGES) || HERO_IMAGES.length === 0) return;

  const controls = home.querySelector('.hero-zoom-controls');
  const zoomIn = controls && controls.querySelector('[data-zoom-in]');
  const zoomOut = controls && controls.querySelector('[data-zoom-out]');
  const zoomReset = controls && controls.querySelector('[data-zoom-reset]');
  const zoomLevel = controls && controls.querySelector('[data-zoom-level]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layers = [0, 1].map(() => {
    const layer = document.createElement('div');
    layer.className = 'hero-slide';
    bg.insertBefore(layer, bg.firstChild);
    return layer;
  });

  bg.style.setProperty('--hero-fade', reduceMotion ? '0ms' : HERO_FADE_MS + 'ms');

  let scale = 1, offsetX = 0, offsetY = 0;

  function constrainOffset() {
    const bounds = home.getBoundingClientRect();
    const maxX = bounds.width * (scale - 1) / 2;
    const maxY = bounds.height * (scale - 1) / 2;
    offsetX = Math.max(-maxX, Math.min(maxX, offsetX));
    offsetY = Math.max(-maxY, Math.min(maxY, offsetY));
  }

  function updateZoom() {
    constrainOffset();
    layers.forEach(layer => {
      layer.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`;
    });
    if (zoomLevel) zoomLevel.value = `${Math.round(scale * 100)}%`;
    if (zoomIn) zoomIn.disabled = scale >= 3;
    if (zoomOut) zoomOut.disabled = scale <= 1;
    home.classList.toggle('is-zoomed', scale > 1);
  }

  function resetZoom() {
    scale = 1;
    offsetX = 0;
    offsetY = 0;
    updateZoom();
  }

  if (zoomIn) zoomIn.addEventListener('click', () => {
    scale = Math.min(3, Math.round((scale + 0.25) * 100) / 100);
    updateZoom();
  });
  if (zoomOut) zoomOut.addEventListener('click', () => {
    scale = Math.max(1, Math.round((scale - 0.25) * 100) / 100);
    updateZoom();
  });
  if (zoomReset) zoomReset.addEventListener('click', resetZoom);

  let drag = null;
  home.addEventListener('pointerdown', event => {
    if (event.button !== 0 || scale <= 1 || event.target.closest('.hero-zoom-controls, .hero-content')) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, offsetX, offsetY };
    home.classList.add('is-dragging');
    home.setPointerCapture(event.pointerId);
  });
  home.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    offsetX = drag.offsetX + event.clientX - drag.x;
    offsetY = drag.offsetY + event.clientY - drag.y;
    updateZoom();
  });
  function stopDragging(event) {
    if (!drag || event.pointerId !== drag.id) return;
    drag = null;
    home.classList.remove('is-dragging');
  }
  home.addEventListener('pointerup', stopDragging);
  home.addEventListener('pointercancel', stopDragging);

  const preload = src => new Promise(resolve => {
    const img = new Image();
    img.onload = () => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()).then(() => resolve(true));
    img.onerror = () => resolve(false);
    img.src = src;
  });

  let index = 0, front = 0, timer = null, busy = false;

  layers[0].style.backgroundImage = `url("${HERO_IMAGES[0]}")`;
  layers[0].classList.add('active');
  updateZoom();

  if (HERO_IMAGES.length < 2) return;

  async function next() {
    if (busy || document.hidden) return;
    busy = true;
    for (let tries = 0; tries < HERO_IMAGES.length; tries++) {
      const candidate = (index + 1 + tries) % HERO_IMAGES.length;
      if (await preload(HERO_IMAGES[candidate])) {
        const back = 1 - front;
        const incoming = layers[back], outgoing = layers[front];
        resetZoom();
        incoming.style.backgroundImage = `url("${HERO_IMAGES[candidate]}")`;
        incoming.classList.remove('no-fade');
        incoming.style.zIndex = 2;
        outgoing.style.zIndex = 1;
        incoming.classList.add('active');
        setTimeout(() => {
          outgoing.classList.add('no-fade');
          outgoing.classList.remove('active');
        }, reduceMotion ? 0 : HERO_FADE_MS + 50);
        front = back;
        index = candidate;
        break;
      }
    }
    busy = false;
  }

  function start() {
    stop();
    timer = setInterval(next, HERO_INTERVAL_MS + HERO_FADE_MS);
  }
  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  start();
})();
