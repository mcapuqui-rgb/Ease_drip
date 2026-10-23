// ── WHATSAPP CONTACT FORM ──
function sendWhatsApp() {
  const name = document.querySelector('#contact input[type=text]').value || 'Cliente';
  const phone = document.querySelector('#contact input[type=tel]').value || '';
  const msg = document.querySelector('#contact textarea').value || '';
  const text = encodeURIComponent(`Olá! Sou ${name}${phone ? ' ('+phone+')' : ''}.\n\n${msg}`);
  window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank');
}
