// ── BRANDS INTERACTION (velocidade suave + arrasto direcional) ──
const brandsStrip = document.querySelector('.brands-strip');
const brandsTrack = document.getElementById('brandsTrack');

if (brandsStrip && brandsTrack) {
  const HOVER_FACTOR = 0.32;   // velocidade ao passar o rato/dedo (fração da velocidade normal)
  const EASE = 0.045;          // suavidade da transição de velocidade (menor = mais suave/lento a mudar)
  const MAX_FLICK = 3.5;       // limite de velocidade ao soltar após arrastar depressa

  let singleWidth = 0;         // largura de um "conjunto" de logos (a faixa tem 2 conjuntos)
  let autoSpeed = 0.5;         // px/frame no ritmo normal (recalculado em measure())
  let posX = 0;
  let velocity = 0;
  let isHovering = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartPos = 0;
  let lastX = 0;
  let lastT = 0;
  let dragVelocity = 0;

  function measure() {
    singleWidth = brandsTrack.scrollWidth / 2;
    // mantém o ritmo equivalente ao original (percorre um conjunto em ~30s a 60fps)
    autoSpeed = singleWidth > 0 ? singleWidth / (30 * 60) : 0.5;
    if (!isDragging) velocity = velocity <= 0 ? -autoSpeed : autoSpeed;
  }

  function targetVelocity() {
    return -(isHovering ? autoSpeed * HOVER_FACTOR : autoSpeed);
  }

  function wrap() {
    if (!singleWidth) return;
    while (posX <= -singleWidth) posX += singleWidth;
    while (posX > 0) posX -= singleWidth;
  }

  function render() {
    brandsTrack.style.transform = `translateX(${posX}px)`;
  }

  function tick() {
    if (!isDragging) {
      // interpola suavemente a velocidade atual em direção à velocidade-alvo
      velocity += (targetVelocity() - velocity) * EASE;
      posX += velocity;
      wrap();
      render();
    }
    requestAnimationFrame(tick);
  }

  function pointerInsideStrip(x, y) {
    const r = brandsStrip.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDragging = true;
    isHovering = true;
    dragStartX = e.clientX;
    dragStartPos = posX;
    lastX = e.clientX;
    lastT = performance.now();
    dragVelocity = 0;
    brandsTrack.classList.add('dragging');
    try { brandsStrip.setPointerCapture(e.pointerId); } catch (_) {}
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    posX = dragStartPos + delta;
    wrap();
    render();

    const now = performance.now();
    const dt = now - lastT;
    if (dt > 0) {
      // velocidade instantânea do arrasto, normalizada para "px por frame" (~16.6ms)
      dragVelocity = ((e.clientX - lastX) / dt) * 16.6;
    }
    lastX = e.clientX;
    lastT = now;
  }

  function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    brandsTrack.classList.remove('dragging');
    // ao soltar, o carrossel continua momentaneamente na direção em que foi arrastado
    // e depois é suavemente reconduzido ao ritmo automático (via EASE, no tick)
    velocity = Math.max(-MAX_FLICK, Math.min(MAX_FLICK, dragVelocity));
    if (e && typeof e.clientX === 'number') {
      isHovering = pointerInsideStrip(e.clientX, e.clientY);
    }
    if (e && e.pointerId !== undefined) {
      try { brandsStrip.releasePointerCapture(e.pointerId); } catch (_) {}
    }
  }

  measure();
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);

  brandsStrip.addEventListener('mouseenter', () => { if (!isDragging) isHovering = true; });
  brandsStrip.addEventListener('mouseleave', () => { if (!isDragging) isHovering = false; });

  brandsStrip.addEventListener('pointerdown', onPointerDown);
  brandsStrip.addEventListener('pointermove', onPointerMove);
  brandsStrip.addEventListener('pointerup', endDrag);
  brandsStrip.addEventListener('pointercancel', endDrag);

  requestAnimationFrame(tick);
}
