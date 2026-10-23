// ── INIT ──
buildBrands();
document.getElementById('statProducts').textContent = products.length;
document.getElementById('statBrands').textContent = brands.length;
const contactPhone = document.getElementById('contactPhone');
contactPhone.textContent = `+${WHATSAPP}`;
contactPhone.href = `https://wa.me/${WHATSAPP}`;
contactPhone.target = '_blank';
contactPhone.rel = 'noopener noreferrer';
renderShop();
