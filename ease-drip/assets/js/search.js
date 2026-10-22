// ── SEARCH ──
// A pesquisa procura em TODAS as categorias; os filtros continuam a aplicar-se.
function handleSearch(query) {
  shopState.q = query.trim();
  document.getElementById('searchClear').classList.toggle('visible', shopState.q.length > 0);
  renderShop();
}

function clearSearch() {
  document.getElementById('shopSearch').value = '';
  handleSearch('');
}
