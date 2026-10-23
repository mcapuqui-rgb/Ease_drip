const brands = [
  { name: "Nike", logo: "assets/images/logos/Nike.webp" },
  { name: "Adidas", logo: "assets/images/logos/Adidas.webp" },
  { name: "Gucci", logo: "assets/images/logos/Gucci.webp" },
  { name: "Louis Vuitton", logo: "assets/images/logos/louis-vuitton.webp" },
  { name: "Prada", logo: "assets/images/logos/Prada.webp" },
  { name: "Zara", logo: "assets/images/logos/Zara.webp" },
  { name: "Levi's", logo: "assets/images/logos/levis.webp" },
  { name: "Chanel", logo: "assets/images/logos/Chanel.webp" },
  { name: "Dior", logo: "assets/images/logos/Dior.webp" },
  { name: "Versace", logo: "assets/images/logos/Versace.webp" },
  { name: "Balenciaga", logo: "assets/images/logos/Balenciaga.webp" },
  { name: "Armani", logo: "assets/images/logos/Armani.webp" },
  { name: "Burberry", logo: "assets/images/logos/Burberry.webp" },
  { name: "Puma", logo: "assets/images/logos/Puma.webp" },
  { name: "Calvin Klein", logo: "assets/images/logos/calvin-klein.webp" },
  { name: "Hermès", logo: "assets/images/logos/Hermes.webp" },
  { name: "Mango", logo: "assets/images/logos/Mango.webp" },
  { name: "H&M", logo: "assets/images/logos/h-and-m.webp" },
  { name: "Diesel", logo: "assets/images/logos/Diesel.webp" },
  { name: "Vans", logo: "assets/images/logos/Vans.webp" },
  { name: "Lacoste", logo: "assets/images/logos/Lacoste.webp" },

  // acrescentadas
  { name: "Jordan", logo: "assets/images/logos/Jordan.webp" },
  { name: "New Balance", logo: "assets/images/logos/New-balance.webp" },
  { name: "Converse", logo: "assets/images/logos/Converse.webp" },
  { name: "Tommy Hilfiger", logo: "assets/images/logos/Tommy-Hilfiger.webp" },
  { name: "Polo Ralph Lauren", logo: "assets/images/logos/Polo.webp" },
  { name: "Fendi", logo: "assets/images/logos/Fendi.webp" },
  { name: "Off-White", logo: "assets/images/logos/Off-white.webp" },
  { name: "Supreme", logo: "assets/images/logos/Supreme.webp" },
  { name: "Givenchy", logo: "assets/images/logos/Givenchy.webp" },
  { name: "Reebok", logo: "assets/images/logos/Reebok.webp" },
  { name: "Under Armour", logo: "assets/images/logos/Under-armour.webp" },
  { name: "Crocs", logo: "assets/images/logos/Crocs.webp" },
  { name: "Asics", logo: "assets/images/logos/Asics.webp" },
  { name: "Bershka", logo: "assets/images/logos/Bershka.webp" },
  { name: "Stradivarius", logo: "assets/images/logos/Stradivarius.webp" },
  { name: "Forever 21", logo: "assets/images/logos/Forever21.webp" },
  { name: "Guess", logo: "assets/images/logos/Guess.webp" },
  { name: "Timberland", logo: "assets/images/logos/Timberland.webp" },
  { name: "The North Face", logo: "assets/images/logos/The-north-face.webp" },
];
function buildBrands() {
  const track = document.getElementById('brandsTrack');
  const doubled = [...brands, ...brands];
  track.innerHTML = doubled.map(brand => `
    <img class="brand-logo" src="${brand.logo}" alt="${brand.name}" title="${brand.name}">
  `).join('');
}
