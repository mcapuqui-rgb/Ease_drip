// ── LOJA: ESTADO, CATEGORIAS, COLEÇÕES E FILTROS ──
const UI = {
  all:        {pt:'Tudo', en:'All'},
  collections:{pt:'Coleções', en:'Collections'},
  allCols:    {pt:'Todas', en:'All'},
  filters:    {pt:'Filtros', en:'Filters'},
  clear:      {pt:'Limpar filtros', en:'Clear filters'},
  product:    {pt:'produto', en:'product'},
  products:   {pt:'produtos', en:'products'},
  size:       {pt:'Tamanho', en:'Size'},
  color:      {pt:'Cor', en:'Colour'},
  price:      {pt:'Preço', en:'Price'},
  material:   {pt:'Material', en:'Material'},
  brand:      {pt:'Marca', en:'Brand'},
  occasion:   {pt:'Ocasião', en:'Occasion'},
  min:        {pt:'Mín.', en:'Min'},
  max:        {pt:'Máx.', en:'Max'},
  noPrices:   {pt:'Os preços ainda estão "A consultar" — o filtro ativa-se quando houver preços definidos.',
               en:'Prices are still "On request" — the filter activates once prices are set.'},
  emptyCat:   {pt:'Brevemente — estamos a preparar esta categoria.', en:'Coming soon — we are preparing this category.'},
  emptyCol:   {pt:'Ainda não há produtos nesta coleção.', en:'No products in this collection yet.'},
  emptyFil:   {pt:'Nenhum produto corresponde aos filtros escolhidos.', en:'No products match the selected filters.'},
  emptySearch:{pt:'Nenhum resultado para', en:'No results for'},
  results:    {pt:'resultado', en:'result'},
  resultsPl:  {pt:'resultados', en:'results'},
  forQ:       {pt:'para', en:'for'},
  viewOfficial:{pt:'Ver produto no site oficial', en:'View product on the official site'},
  viewProduct:{pt:'Ver Produto', en:'View Product'},
  avail:      {pt:'Disponível na loja física', en:'Available in store'}
};
const tr = o => o[currentLang] || o.pt;
const esc = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const FACETS = [
  {key:'sizes',     label:UI.size,     get:p => p.sizes || [],                 show:v => v},
  {key:'colors',    label:UI.color,    get:p => p.colors || [],                show:v => v},
  {key:'materials', label:UI.material, get:p => p.materials || [],             show:v => tr(MATERIALS[v] || {pt:v}) },
  {key:'brands',    label:UI.brand,    get:p => [p.brand],                     show:v => v},
  {key:'occasions', label:UI.occasion, get:p => p.occasions || [],             show:v => tr(OCCASIONS[v] || {pt:v}) }
];

const shopState = {
  cat: taxonomy[0].id, group: 'tudo', sub: 'tudo',
  collection: 'todas', q: '', filtersOpen: false,
  sel: {sizes:[], colors:[], materials:[], brands:[], occasions:[]},
  priceMin: null, priceMax: null
};

function placements(p) { return [{cat:p.cat, group:p.group, sub:p.sub}].concat(p.also || []); }
function inCollection(p, col) {
  if (col === 'todas') return true;
  return (p.collections || []).includes(col) || (col === 'promocoes' && !!p.oldPrice);
}
function inScope(p) {
  if (shopState.q) {
    const q = shopState.q.toLowerCase();
    return p.name.pt.toLowerCase().includes(q) || p.name.en.toLowerCase().includes(q) ||
           p.brand.toLowerCase().includes(q) || (p.desc && p.desc.pt.toLowerCase().includes(q));
  }
  return placements(p).some(pl => pl.cat === shopState.cat &&
    (shopState.group === 'tudo' || pl.group === shopState.group) &&
    (shopState.sub === 'tudo' || pl.sub === shopState.sub));
}
function passesFilters(p) {
  for (const f of FACETS) {
    const chosen = shopState.sel[f.key];
    if (chosen.length && !f.get(p).some(v => chosen.includes(v))) return false;
  }
  if (shopState.priceMin !== null || shopState.priceMax !== null) {
    if (typeof p.priceValue !== 'number') return false;
    if (shopState.priceMin !== null && p.priceValue < shopState.priceMin) return false;
    if (shopState.priceMax !== null && p.priceValue > shopState.priceMax) return false;
  }
  return true;
}
function activeFilterCount() {
  return FACETS.reduce((n, f) => n + shopState.sel[f.key].length, 0) +
    (shopState.priceMin !== null ? 1 : 0) + (shopState.priceMax !== null ? 1 : 0);
}

// ── ações (cliques) ──
function resetFilters() {
  FACETS.forEach(f => shopState.sel[f.key] = []);
  shopState.priceMin = shopState.priceMax = null;
}
function setCat(id)   { shopState.cat = id; shopState.group = shopState.sub = 'tudo'; resetFilters(); renderShop(); }
function setGroup(id) { shopState.group = id; shopState.sub = 'tudo'; resetFilters(); renderShop(); }
function setSub(id)   { shopState.sub = id; resetFilters(); renderShop(); }
function setCollection(id) { shopState.collection = id; renderShop(); }
function toggleFilters() { shopState.filtersOpen = !shopState.filtersOpen; renderShop(); }
function clearFilters() { resetFilters(); renderShop(); }
function toggleFacet(key, val) {
  const arr = shopState.sel[key], i = arr.indexOf(val);
  if (i >= 0) arr.splice(i, 1); else arr.push(val);
  renderShop();
}
function setPrice(which, raw) {
  const n = raw === '' ? null : Math.max(0, Number(raw));
  shopState[which] = (n === null || isNaN(n)) ? null : n;
  renderShop();
}

// ── desenho ──
const tabBtn = (cls, active, onclick, label, extra='') =>
  `<button class="${cls}${active ? ' active' : ''}" onclick="${onclick}">${esc(label)}${extra}</button>`;

function renderShop() {
  const searching = !!shopState.q;
  const cat = taxonomy.find(c => c.id === shopState.cat);
  const group = cat.groups.find(g => g.id === shopState.group);

  // 1) separadores de categoria / grupo / subcategoria (escondidos durante a pesquisa)
  const catTabs = document.getElementById('categoryTabs');
  const groupTabs = document.getElementById('groupTabs');
  const subTabs = document.getElementById('subTabs');
  catTabs.style.display = groupTabs.style.display = subTabs.style.display = searching ? 'none' : 'flex';
  catTabs.innerHTML = taxonomy.map(c => tabBtn('cat-tab', c.id === shopState.cat, `setCat('${c.id}')`, tr(c.label))).join('');
  groupTabs.innerHTML = tabBtn('sub-tab', shopState.group === 'tudo', `setGroup('tudo')`, tr(UI.all)) +
    cat.groups.map(g => tabBtn('sub-tab', g.id === shopState.group, `setGroup('${g.id}')`, tr(g.label))).join('');
  if (group) {
    subTabs.innerHTML = tabBtn('sub-tab sub-tab-sm', shopState.sub === 'tudo', `setSub('tudo')`, tr(UI.all)) +
      group.subs.map(s => tabBtn('sub-tab sub-tab-sm', s.id === shopState.sub, `setSub('${s.id}')`, tr(s.label))).join('');
  } else { subTabs.innerHTML = ''; subTabs.style.display = 'none'; }

  // 2) produtos no âmbito atual (categoria + pesquisa) — base para coleções e filtros
  const inCat = products.map((p, id) => ({p, id})).filter(x => inScope(x.p));
  const scoped = inCat.filter(x => inCollection(x.p, shopState.collection));

  // 3) coleções (com contagem dentro do âmbito atual)
  const countCol = id => inCat.filter(x => inCollection(x.p, id)).length;
  document.getElementById('collectionBar').innerHTML =
    `<span class="collection-label">${esc(tr(UI.collections))}</span>` +
    tabBtn('collection-chip', shopState.collection === 'todas', `setCollection('todas')`, tr(UI.allCols)) +
    collections.map(c => tabBtn('collection-chip', shopState.collection === c.id, `setCollection('${c.id}')`,
      tr(c.label), ` <span class="chip-count">${countCol(c.id)}</span>`)).join('');

  // 4) filtros (opções geradas a partir dos produtos do âmbito atual)
  const facetHtml = FACETS.map(f => {
    const vals = [];
    scoped.forEach(x => f.get(x.p).forEach(v => { if (!vals.includes(v)) vals.push(v); }));
    if (!vals.length) return '';
    return `<div class="filter-group"><div class="filter-title">${esc(tr(f.label))}</div><div class="filter-chips">` +
      vals.map(v => `<button class="filter-chip${shopState.sel[f.key].includes(v) ? ' active' : ''}"
        data-key="${f.key}" data-val="${esc(v)}">${esc(f.show(v))}</button>`).join('') + `</div></div>`;
  }).join('');
  const hasPrices = scoped.some(x => typeof x.p.priceValue === 'number');
  const priceHtml = `<div class="filter-group"><div class="filter-title">${esc(tr(UI.price))}</div>
    <div class="filter-price">
      <input type="number" min="0" inputmode="numeric" placeholder="${esc(tr(UI.min))}" value="${shopState.priceMin ?? ''}"
        ${hasPrices ? '' : 'disabled'} onchange="setPrice('priceMin', this.value)">
      <span>—</span>
      <input type="number" min="0" inputmode="numeric" placeholder="${esc(tr(UI.max))}" value="${shopState.priceMax ?? ''}"
        ${hasPrices ? '' : 'disabled'} onchange="setPrice('priceMax', this.value)">
    </div>${hasPrices ? '' : `<div class="filter-hint">${esc(tr(UI.noPrices))}</div>`}</div>`;
  const panel = document.getElementById('filterPanel');
  panel.innerHTML = facetHtml + priceHtml;
  panel.classList.toggle('open', shopState.filtersOpen);

  // 5) resultados
  const shown = scoped.filter(x => passesFilters(x.p));
  const n = activeFilterCount();
  const countTxt = `${shown.length} ${tr(shown.length === 1 ? UI.product : UI.products)}`;
  document.getElementById('filterBar').innerHTML =
    `<button class="filter-toggle${shopState.filtersOpen ? ' active' : ''}" onclick="toggleFilters()">
       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>
       ${esc(tr(UI.filters))}${n ? ` <span class="chip-count">${n}</span>` : ''}</button>
     <span class="filter-count">${esc(countTxt)}</span>
     ${n ? `<button class="filter-clear" onclick="clearFilters()">${esc(tr(UI.clear))}</button>` : ''}`;

  const label = document.getElementById('searchLabel');
  if (searching) {
    label.style.display = 'block';
    const q = esc(shopState.q);
    label.innerHTML = shown.length
      ? `<em>${shown.length}</em> ${tr(shown.length === 1 ? UI.results : UI.resultsPl)} ${tr(UI.forQ)} "<em>${q}</em>"`
      : `${tr(UI.emptySearch)} "<em>${q}</em>"`;
  } else { label.style.display = 'none'; }

  const grid = document.getElementById('productsGrid');
  grid.innerHTML = shown.map(x => cardHtml(x.p, x.id)).join('');
  grid.querySelectorAll('.product-img-wrap img').forEach(img => {
    img.addEventListener('error', () => {
      const placeholder = img.nextElementSibling;
      img.remove();
      if (placeholder) placeholder.style.display = '';
    });
  });
  const empty = document.getElementById('shopEmpty');
  if (shown.length) { empty.style.display = 'none'; }
  else {
    empty.style.display = 'block';
    empty.textContent = searching ? '' :
      !inCat.length ? tr(UI.emptyCat) : !scoped.length ? tr(UI.emptyCol) : tr(UI.emptyFil);
    if (searching) empty.style.display = 'none';
  }
  setTimeout(observeCards, 60);
}

function cardHtml(p, id) {
  const price = (p.oldPrice ? `<s class="old-price">${esc(p.oldPrice)}</s> ` : '') + esc(p.price);
  const image = p.images && p.images.length ? p.images[0] : null;
  return `
    <div class="product-card" onclick="openModal(${id})">
      <div class="product-img-wrap">
        ${image ? `<img src="${esc(image)}" alt="${esc(p.name[currentLang])}">` : ''}
        <div class="product-placeholder"${image ? ' style="display:none"' : ''}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
      </div>
      <div class="product-info">
        <div class="product-brand">${esc(p.brand)}</div>
        <div class="product-name">${esc(p.name[currentLang])}</div>
        <div class="product-price">${price}</div>
        <a class="product-brand-link" href="${esc(getOfficialProductLink(p.cat, p))}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
          ${esc(tr(UI.viewOfficial))}
        </a>
      </div>
      <div class="product-overlay"><span>${esc(tr(UI.viewProduct))}</span></div>
    </div>`;
}

// O clique nos filtros usa delegação de eventos (valores com aspas/apóstrofos seguros)
document.addEventListener('click', e => {
  const b = e.target.closest('.filter-chip');
  if (b) toggleFacet(b.dataset.key, b.dataset.val);
});

// Mantida por compatibilidade (language.js chama esta função ao mudar de idioma)
function renderAllGrids() { renderShop(); }

// ── MODAL ──
let currentProduct = null;

function openModal(id) {
  const p = products[id];
  currentProduct = p;
  currentImages = p.images.length > 0 ? p.images : ['placeholder'];
  carouselIndex = 0;
  currentProductName = p.name[currentLang];

  document.getElementById('modalBrand').textContent = p.brand;
  document.getElementById('modalName').textContent = p.name[currentLang];
  document.getElementById('modalPrice').innerHTML = (p.oldPrice ? `<s class="old-price">${esc(p.oldPrice)}</s> ` : '') + esc(p.price);
  document.getElementById('modalDesc').textContent = p.desc[currentLang];

  const avail = document.getElementById('modalAvail');
  avail.textContent = tr(UI.avail);

  // Cor / material / ocasião
  const meta = [];
  if (p.colors && p.colors.length) meta.push([tr(UI.color), p.colors.join(', ')]);
  if (p.materials && p.materials.length) meta.push([tr(UI.material), p.materials.map(v => tr(MATERIALS[v] || {pt:v})).join(', ')]);
  if (p.occasions && p.occasions.length) meta.push([tr(UI.occasion), p.occasions.map(v => tr(OCCASIONS[v] || {pt:v})).join(', ')]);
  document.getElementById('modalMeta').innerHTML = meta.map(([k, v]) => `<div><span>${esc(k)}</span>${esc(v)}</div>`).join('');

  // Sizes
  const sizesEl = document.getElementById('modalSizes');
  sizesEl.innerHTML = p.sizes.map(s => `<button class="size-btn" onclick="selectSize(this)">${s}</button>`).join('');

  // Carousel
  buildCarousel();

  // WhatsApp link
  const msg = encodeURIComponent(`Olá! Tenho interesse no produto: ${p.brand} – ${p.name.pt}. Podiam dar mais informações?`);
  document.getElementById('modalWA').href = `https://wa.me/${WHATSAPP}?text=${msg}`;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function buildCarousel() {
  const track = document.getElementById('carouselTrack');
  const dots = document.getElementById('carouselDots');

  track.innerHTML = currentImages.map((img,i) => img === 'placeholder' ? `
    <div class="carousel-slide">
      <div class="carousel-placeholder">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width=".8">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <p>${currentProductName}</p>
      </div>
    </div>` : `
    <div class="carousel-slide"><img src="${img}" alt="${currentProductName}"></div>`
  ).join('');

  dots.innerHTML = currentImages.map((_,i) =>
    `<div class="carousel-dot${i===0?' active':''}" onclick="goToSlide(${i})"></div>`
  ).join('');

  updateCarousel();
}

function updateCarousel() {
  document.getElementById('carouselTrack').style.transform = `translateX(-${carouselIndex * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((d,i) => d.classList.toggle('active', i === carouselIndex));
}

function carousel(dir) {
  carouselIndex = (carouselIndex + dir + currentImages.length) % currentImages.length;
  updateCarousel();
}

function goToSlide(i) { carouselIndex = i; updateCarousel(); }

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
