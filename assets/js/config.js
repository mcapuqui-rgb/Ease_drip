// ── ESTADO GLOBAL E CONFIGURAÇÃO ──
const WHATSAPP = '244947481524';
let currentLang = 'pt';
let carouselIndex = 0;
let currentImages = [];
let currentProductName = '';

// ── HERO: IMAGENS DE FUNDO (rodam automaticamente) ──
// Acrescenta quantos caminhos quiseres. Com 1 só imagem não há rotação.
// Recomendado: 1920×1080 ou maior, WebP/JPG (~200–400 KB cada).
const HERO_IMAGES = [
  'assets/images/Background/background0.webp',
  'assets/images/Background/background1.webp',
  'assets/images/Background/background2.webp',
  'assets/images/Background/background3.webp',
  'assets/images/Background/background4.webp',
  'assets/images/Background/background5.webp',
  'assets/images/Background/background6.webp',
  'assets/images/Background/background7.webp',
  'assets/images/Background/background8.webp',
  'assets/images/Background/background9.webp',
  'assets/images/Background/background10.webp',
];
const HERO_INTERVAL_MS = 5000;  // tempo que cada imagem fica visível
const HERO_FADE_MS = 1600;      // duração da transição (fusão suave)
