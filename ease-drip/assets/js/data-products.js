// ═══════════════════════════════════════════════════════════════════════
//  DADOS DOS PRODUTOS
// ═══════════════════════════════════════════════════════════════════════
//
//  Como acrescentar um produto: copia um bloco { ... } da categoria certa,
//  cola logo a seguir e altera os valores. A ordem aqui = ordem na loja.
//
//  CAMPOS
//    cat / group / sub   Onde aparece (ver data-categories.js)
//    brand               Marca (tem de existir em officialBrandLinks, mais abaixo)
//    name, desc          Texto em português (pt) e inglês (en)
//    price               Texto mostrado   ex.: 'A consultar' ou '12 000 Kz'
//    priceValue          Número para o filtro de preço (null = sem preço)
//    oldPrice            (opcional) preço antigo → entra em "Promoções"
//    sizes, colors       Listas de tamanhos e cores
//    materials           Chaves de MATERIALS    (data-categories.js)
//    occasions           Chaves de OCCASIONS    (data-categories.js)
//    collections         'novidades' | 'mais-vendidos' | 'promocoes'
//    images              Caminhos das fotos: ['assets/images/products/x-1.webp']
//    also                (opcional) mostrar também noutra categoria
//
//  ÍNDICE
//    1. products                 → produtos visíveis na loja
//    2. productsSemCategoria     → guardados, sem lugar na árvore (não aparecem)
//    3. officialBrandLinks       → site oficial de cada marca
//    4. officialProductLinks     → links diretos a produtos concretos
//    5. getOfficialProductLink() → escolhe o melhor link para cada cartão
// ═══════════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────────
//  1. PRODUTOS VISÍVEIS NA LOJA
// ───────────────────────────────────────────────────────────────────────
const products = [
  // ╔════════════════════════════════════════════════════════════════════════╗
  // ║  MULHER                                                                ║
  // ╚════════════════════════════════════════════════════════════════════════╝

  // ─── MULHER › Vestuário ────────────────────────────────────────────────────

  // vestidos
  {
    cat: 'mulher', group: 'vestuario', sub: 'vestidos',
    brand: 'Dior',
    name:  { pt: 'Vestido Midi Elegante', en: 'Elegant Midi Dress' },
    desc:  { pt: 'Vestido midi em crepe de seda com corte evasé. Sofisticação pura.',
             en: 'Midi dress in silk crepe with evasé cut. Pure sophistication.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['34', '36', '38', '40', '42'],
    colors: ['Preto', 'Bordeaux', 'Navy'],
    materials: ['seda'], occasions: ['festa', 'formal', 'cerimonia'], collections: [],
    images: [
      'assets/images/products/dior-vestido-midi-elegante-1.webp',
      'assets/images/products/dior-vestido-midi-elegante-2.webp',
      'assets/images/products/dior-vestido-midi-elegante-3.webp',
      'assets/images/products/dior-vestido-midi-elegante-4.webp'
    ]
  },

  // tops-blusas
  {
    cat: 'mulher', group: 'vestuario', sub: 'tops-blusas',
    brand: 'Zara',
    name:  { pt: 'Top Cropped Seda', en: 'Silk Cropped Top' },
    desc:  { pt: 'Top cropped em seda natural. Elegante e versátil para qualquer ocasião.',
             en: 'Natural silk cropped top. Elegant and versatile for any occasion.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['XS', 'S', 'M', 'L'],
    colors: ['Branco', 'Preto', 'Nude'],
    materials: ['seda'], occasions: ['casual', 'festa'], collections: [],
    images: [
      'assets/images/products/zara-top-cropped-seda-1.webp',
      'assets/images/products/zara-top-cropped-seda-2.webp',
      'assets/images/products/zara-top-cropped-seda-3.webp'
    ]
  },
  {
    cat: 'mulher', group: 'vestuario', sub: 'tops-blusas',
    brand: 'Mango',
    name:  { pt: 'Blusa Floral', en: 'Floral Blouse' },
    desc:  { pt: 'Blusa fluída com estampado floral. Tecido leve e cómodo.',
             en: 'Fluid blouse with floral print. Light and comfortable fabric.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Multicolor', 'Azul', 'Rosa'],
    materials: [], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/mango-blusa-floral-1.webp',
      'assets/images/products/mango-blusa-floral-2.webp',
      'assets/images/products/mango-blusa-floral-3.webp'
    ]
  },
  {
    cat: 'mulher', group: 'vestuario', sub: 'tops-blusas',
    brand: 'H&M',
    name:  { pt: 'Camisa Oversized', en: 'Oversized Shirt' },
    desc:  { pt: 'Camisa oversized em algodão orgânico. Corte relaxado e moderno.',
             en: 'Oversized organic cotton shirt. Relaxed and modern cut.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['XS', 'S', 'M', 'L'],
    colors: ['Branco', 'Azul Claro', 'Às Riscas'],
    materials: ['algodao'], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/handm-camisa-oversized-1.webp',
      'assets/images/products/handm-camisa-oversized-2.webp',
      'assets/images/products/handm-camisa-oversized-3.webp'
    ]
  },

  // calcas
  {
    cat: 'mulher', group: 'vestuario', sub: 'calcas',
    brand: 'Adidas',
    name:  { pt: 'Leggings 7/8', en: '7/8 Leggings' },
    desc:  { pt: 'Leggings de alta performance em Techfit. Suporte e conforto para treinos intensos.',
             en: 'High-performance leggings in Techfit. Support and comfort for intense workouts.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Preto', 'Cinza', 'Azul Marinho'],
    materials: ['tecnico'], occasions: ['desporto'], collections: [],
    images: [
      'assets/images/products/adidas-leggings-7-8-1.webp',
      'assets/images/products/adidas-leggings-7-8-2.webp'
    ]
  },
  {
    cat: 'mulher', group: 'vestuario', sub: 'calcas',
    brand: 'Louis Vuitton',
    name:  { pt: 'Calças Monogram', en: 'Monogram Trousers' },
    desc:  { pt: 'Calças de corte flare com o icónico padrão monogram LV. Luxo contemporâneo.',
             en: 'Flare cut trousers with the iconic LV monogram pattern. Contemporary luxury.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['34', '36', '38', '40'],
    colors: ['Bege/Castanho'],
    materials: [], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/louis-vuitton-calcas-monogram-1.webp',
      'assets/images/products/louis-vuitton-calcas-monogram-2.webp',
      'assets/images/products/louis-vuitton-calcas-monogram-3.webp',
      'assets/images/products/louis-vuitton-calcas-monogram-4.webp'
    ]
  },

  // saias
  {
    cat: 'mulher', group: 'vestuario', sub: 'saias',
    brand: 'Versace',
    name:  { pt: 'Saia Lápis', en: 'Pencil Skirt' },
    desc:  { pt: 'Saia lápis com estampado Versace. Silhueta elegante e marcada.',
             en: 'Pencil skirt with Versace print. Elegant and defined silhouette.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['XS', 'S', 'M', 'L'],
    colors: ['Preto', 'Dourado'],
    materials: [], occasions: ['festa', 'formal'], collections: [],
    images: [
      'assets/images/products/versace-saia-lapis-1.webp',
      'assets/images/products/versace-saia-lapis-2.webp',
      'assets/images/products/versace-saia-lapis-3.webp'
    ]
  },

  // conjuntos
  {
    cat: 'mulher', group: 'vestuario', sub: 'conjuntos',
    brand: 'Nike',
    name:  { pt: 'Fato de Treino', en: 'Tracksuit' },
    desc:  { pt: 'Fato de treino em Tech Fleece. Design elegante que transita do ginásio para a rua.',
             en: 'Tech Fleece tracksuit. Elegant design that transitions from gym to street.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Preto', 'Rosa', 'Roxo'],
    materials: ['tecnico'], occasions: ['desporto', 'casual'], collections: [],
    images: [
      'assets/images/products/nike-fato-de-treino-1.webp',
      'assets/images/products/nike-fato-de-treino-2.webp',
      'assets/images/products/nike-fato-de-treino-3.webp'
    ]
  },

  // macacoes  (vazio — acrescentar produtos aqui)

  // casacos
  {
    cat: 'mulher', group: 'vestuario', sub: 'casacos',
    brand: 'Chanel',
    name:  { pt: 'Casaco Tweed', en: 'Tweed Jacket' },
    desc:  { pt: 'O icónico casaco tweed Chanel. Artesanato de excelência, elegância intemporal.',
             en: 'The iconic Chanel tweed jacket. Exceptional craftsmanship, timeless elegance.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['34', '36', '38', '40'],
    colors: ['Creme/Dourado', 'Preto/Branco'],
    materials: ['tweed'], occasions: ['formal', 'festa'], collections: [],
    images: [
      'assets/images/products/chanel-casaco-tweed-1.webp',
      'assets/images/products/chanel-casaco-tweed-2.webp'
    ]
  },
  {
    cat: 'mulher', group: 'vestuario', sub: 'casacos',
    brand: 'Prada',
    name:  { pt: 'Hoodie Nylon', en: 'Nylon Hoodie' },
    desc:  { pt: 'Hoodie em nylon técnico premium com logo Prada. Design contemporâneo.',
             en: 'Premium technical nylon hoodie with Prada logo. Contemporary design.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['XS', 'S', 'M', 'L'],
    colors: ['Preto', 'Re-Nylon'],
    materials: ['nylon'], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/prada-hoodie-nylon-1.webp',
      'assets/images/products/prada-hoodie-nylon-2.webp'
    ]
  },

  // ─── MULHER › Calçado ──────────────────────────────────────────────────────

  // sapatos  (vazio — acrescentar produtos aqui)

  // sandalias  (vazio — acrescentar produtos aqui)

  // tenis  (vazio — acrescentar produtos aqui)

  // botas  (vazio — acrescentar produtos aqui)

  // chinelos  (vazio — acrescentar produtos aqui)

  // ─── MULHER › Acessórios ───────────────────────────────────────────────────

  // malas  (vazio — acrescentar produtos aqui)

  // joias
  {
    cat: 'mulher', group: 'acessorios', sub: 'joias',
    brand: 'Cartier',
    name:  { pt: 'Pulseira Love', en: 'Love Bracelet' },
    desc:  { pt: 'A icónica pulseira Love da Cartier em ouro amarelo 18k. Símbolo de amor eterno.',
             en: 'The iconic Cartier Love bracelet in 18k yellow gold. Symbol of eternal love.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['15', '16', '17', '18', '19', '20'],
    colors: ['Ouro Amarelo', 'Ouro Branco', 'Ouro Rosé'],
    materials: ['ouro'], occasions: ['festa', 'cerimonia'], collections: [],
    images: ['assets/images/products/cartier-pulseira-love-1.webp']
  },
  {
    cat: 'mulher', group: 'acessorios', sub: 'joias',
    brand: 'Tiffany & Co.',
    name:  { pt: 'Colar Return to Tiffany', en: 'Return to Tiffany Necklace' },
    desc:  { pt: 'Colar em prata esterlina com charm oval gravado. Um clássico Tiffany atemporal.',
             en: 'Sterling silver necklace with engraved oval charm. A timeless Tiffany classic.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['Único'],
    colors: ['Prata', 'Prata/Dourado'],
    materials: ['prata'], occasions: ['casual', 'festa'], collections: [],
    images: []
  },
  {
    cat: 'mulher', group: 'acessorios', sub: 'joias',
    brand: 'Cartier',
    name:  { pt: 'Anel Trinity', en: 'Trinity Ring' },
    desc:  { pt: 'O anel Trinity da Cartier com três argolas em ouro amarelo, branco e rosé. Ícone desde 1924.',
             en: 'The Cartier Trinity ring with three bands in yellow, white and rose gold. An icon since 1924.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['48', '50', '52', '54', '56', '58'],
    colors: ['Tri-color Gold'],
    materials: ['ouro'], occasions: ['festa'], collections: [],
    images: [
      'assets/images/products/cartier-anel-trinity-1.webp',
      'assets/images/products/cartier-anel-trinity-2.webp'
    ]
  },
  {
    cat: 'mulher', group: 'acessorios', sub: 'joias',
    brand: 'Tiffany & Co.',
    name:  { pt: 'Pulseira T Wire', en: 'T Wire Bracelet' },
    desc:  { pt: 'Pulseira T Wire em ouro amarelo 18k. Design contemporâneo e minimalista.',
             en: 'T Wire bracelet in 18k yellow gold. Contemporary and minimalist design.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['Pequeno', 'Médio', 'Grande'],
    colors: ['Ouro Amarelo', 'Ouro Branco', 'Ouro Rosé'],
    materials: ['ouro'], occasions: ['casual', 'festa'], collections: [],
    images: [
      'assets/images/products/tiffany-and-co-pulseira-t-wire-1.webp',
      'assets/images/products/tiffany-and-co-pulseira-t-wire-2.webp'
    ]
  },
  {
    cat: 'mulher', group: 'acessorios', sub: 'joias',
    brand: 'Gucci',
    name:  { pt: 'Anel GG Running', en: 'GG Running Ring' },
    desc:  { pt: 'Anel em prata esterlina com motivo GG gravado. Elegância urbana com o toque Gucci.',
             en: 'Sterling silver ring with engraved GG motif. Urban elegance with the Gucci touch.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['6', '7', '8', '9', '10'],
    colors: ['Prata', 'Ouro Amarelo'],
    materials: ['prata'], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/gucci-anel-gg-running-1.webp',
      'assets/images/products/gucci-anel-gg-running-2.webp'
    ]
  },
  {
    cat: 'mulher', group: 'acessorios', sub: 'joias',
    brand: 'Versace',
    name:  { pt: 'Cordão Medusa', en: 'Medusa Chain Necklace' },
    desc:  { pt: 'Cordão em aço inoxidável dourado com pendente Medusa. Impacto e atitude Versace.',
             en: 'Gold stainless steel chain with Medusa pendant. Versace impact and attitude.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['45cm', '50cm', '55cm'],
    colors: ['Dourado', 'Prateado'],
    materials: ['aco'], occasions: ['festa'], collections: [],
    images: ['assets/images/products/versace-cordao-medusa-1.webp']
  },

  // cintos
  {
    cat: 'mulher', group: 'acessorios', sub: 'cintos',   // também em: homem/acessorios/cintos
    brand: 'Gucci',
    name:  { pt: 'Cinto GG Pele', en: 'GG Leather Belt' },
    desc:  { pt: 'Cinto em pele italiana com fivela GG dourada. O acessório de luxo por excelência.',
             en: 'Italian leather belt with gold GG buckle. The ultimate luxury accessory.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['80cm', '85cm', '90cm', '95cm', '100cm'],
    colors: ['Preto/Dourado', 'Castanho/Dourado'],
    materials: ['pele'], occasions: ['casual', 'formal'], collections: [],
    images: [
      'assets/images/products/gucci-cinto-gg-pele-1.webp',
      'assets/images/products/gucci-cinto-gg-pele-2.webp'
    ],
    also: [{ cat: 'homem', group: 'acessorios', sub: 'cintos' }]
  },
  {
    cat: 'mulher', group: 'acessorios', sub: 'cintos',
    brand: 'Chanel',
    name:  { pt: 'Cinto Corrente', en: 'Chain Belt' },
    desc:  { pt: 'Cinto de corrente dourada com fecho CC. Glamour atemporal Chanel.',
             en: 'Gold chain belt with CC clasp. Timeless Chanel glamour.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['70cm', '75cm', '80cm', '85cm'],
    colors: ['Dourado', 'Prateado'],
    materials: ['metal'], occasions: ['festa'], collections: [],
    images: ['assets/images/products/chanel-cinto-corrente-1.webp']
  },

  // oculos  (vazio — acrescentar produtos aqui)

  // lencos
  {
    cat: 'mulher', group: 'acessorios', sub: 'lencos',
    brand: 'Burberry',
    name:  { pt: 'Cachecol Xadrez', en: 'Check Scarf' },
    desc:  { pt: 'O icónico cachecol xadrez Burberry em cashmere e lã. Artesanato britânico.',
             en: 'The iconic Burberry check scarf in cashmere and wool. British craftsmanship.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['Único'],
    colors: ['Bege/Vermelho', 'Preto/Xadrez'],
    materials: ['la', 'cashmere'], occasions: ['casual'], collections: [],
    images: ['assets/images/products/burberry-cachecol-xadrez-1.webp']
  },

  // ╔════════════════════════════════════════════════════════════════════════╗
  // ║  HOMEM                                                                 ║
  // ╚════════════════════════════════════════════════════════════════════════╝

  // ─── HOMEM › Vestuário ─────────────────────────────────────────────────────

  // t-shirts
  {
    cat: 'homem', group: 'vestuario', sub: 't-shirts',
    brand: 'Nike',
    name:  { pt: 'T-Shirt Essentials', en: 'Essentials T-Shirt' },
    desc:  { pt: 'T-shirt clássica em algodão premium. Corte regular, confortável para o dia a dia.',
             en: 'Classic premium cotton t-shirt. Regular fit, comfortable for everyday wear.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Branco', 'Preto', 'Cinza'],
    materials: ['algodao'], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/nike-t-shirt-essentials-1.webp',
      'assets/images/products/nike-t-shirt-essentials-2.webp',
      'assets/images/products/nike-t-shirt-essentials-3.webp',
      'assets/images/products/nike-t-shirt-essentials-4.webp'
    ]
  },
  {
    cat: 'homem', group: 'vestuario', sub: 't-shirts',
    brand: 'Lacoste',
    name:  { pt: 'Polo Classic Fit', en: 'Classic Fit Polo' },
    desc:  { pt: 'O polo icónico Lacoste em piqué de algodão. Um clássico atemporal.',
             en: 'The iconic Lacoste polo in cotton piqué. A timeless classic.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Branco', 'Verde', 'Azul Marinho'],
    materials: ['algodao'], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/lacoste-polo-classic-fit-1.webp',
      'assets/images/products/lacoste-polo-classic-fit-2.webp',
      'assets/images/products/lacoste-polo-classic-fit-3.webp'
    ]
  },

  // camisas
  {
    cat: 'homem', group: 'vestuario', sub: 'camisas',
    brand: 'Zara',
    name:  { pt: 'Camisa Oxford', en: 'Oxford Shirt' },
    desc:  { pt: 'Camisa Oxford de algodão com colarinho italiano. Ideal para ocasiões formais e casuais.',
             en: 'Oxford cotton shirt with Italian collar. Ideal for formal and casual occasions.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['S', 'M', 'L', 'XL'],
    colors: ['Branco', 'Azul'],
    materials: ['algodao'], occasions: ['casual', 'formal'], collections: [],
    images: ['assets/images/products/zara-camisa-oxford-1.webp']
  },

  // calcas
  {
    cat: 'homem', group: 'vestuario', sub: 'calcas',
    brand: 'Levi\'s',
    name:  { pt: 'Calças 501 Original', en: '501 Original Jeans' },
    desc:  { pt: 'O jean original desde 1873. Corte straight leg com botões. Um ícone do denim.',
             en: 'The original jean since 1873. Straight leg cut with buttons. A denim icon.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['28', '30', '32', '34', '36', '38'],
    colors: ['Azul Escuro', 'Preto', 'Azul Claro'],
    materials: ['denim'], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/levi-s-calcas-501-original-1.webp',
      'assets/images/products/levi-s-calcas-501-original-2.webp'
    ]
  },
  {
    cat: 'homem', group: 'vestuario', sub: 'calcas',
    brand: 'Armani',
    name:  { pt: 'Chinos Slim Fit', en: 'Slim Fit Chinos' },
    desc:  { pt: 'Calças chino em algodão stretch com corte slim. Elegância casual refinada.',
             en: 'Stretch cotton chino trousers with slim cut. Refined casual elegance.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['30', '32', '34', '36'],
    colors: ['Bege', 'Navy', 'Cáqui'],
    materials: ['algodao'], occasions: ['casual', 'formal'], collections: [],
    images: [
      'assets/images/products/armani-chinos-slim-fit-1.webp',
      'assets/images/products/armani-chinos-slim-fit-2.webp',
      'assets/images/products/armani-chinos-slim-fit-3.webp',
      'assets/images/products/armani-chinos-slim-fit-4.webp'
    ]
  },

  // calcoes
  {
    cat: 'homem', group: 'vestuario', sub: 'calcoes',
    brand: 'Calvin Klein',
    name:  { pt: 'Calções Chino', en: 'Chino Shorts' },
    desc:  { pt: 'Calções chino em algodão com acabamento premium. Ideais para o verão.',
             en: 'Cotton chino shorts with premium finish. Ideal for summer.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['S', 'M', 'L', 'XL'],
    colors: ['Bege', 'Branco', 'Azul'],
    materials: ['algodao'], occasions: ['casual', 'praia'], collections: [],
    images: [
      'assets/images/products/calvin-klein-calcoes-chino-1.webp',
      'assets/images/products/calvin-klein-calcoes-chino-2.webp',
      'assets/images/products/calvin-klein-calcoes-chino-3.webp'
    ]
  },

  // fatos-blazers
  {
    cat: 'homem', group: 'vestuario', sub: 'fatos-blazers',
    brand: 'Diesel',
    name:  { pt: 'Fato de Cerimónia', en: 'Ceremony Suit' },
    desc:  { pt: 'Fato slim fit em lã italiana. Perfeito para cerimónias e eventos especiais.',
             en: 'Slim fit suit in Italian wool. Perfect for ceremonies and special events.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['44', '46', '48', '50', '52'],
    colors: ['Preto', 'Cinza Chumbo', 'Azul Marinho'],
    materials: ['la'], occasions: ['cerimonia', 'formal'], collections: [],
    images: [
      'assets/images/products/diesel-fato-de-cerimonia-1.webp',
      'assets/images/products/diesel-fato-de-cerimonia-2.webp'
    ]
  },

  // casacos
  {
    cat: 'homem', group: 'vestuario', sub: 'casacos',
    brand: 'Adidas',
    name:  { pt: 'Hoodie Trefoil', en: 'Trefoil Hoodie' },
    desc:  { pt: 'Hoodie em fleece de algodão com o icónico logótipo Trefoil bordado.',
             en: 'Cotton fleece hoodie with the iconic embroidered Trefoil logo.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['S', 'M', 'L', 'XL'],
    colors: ['Preto', 'Cinza', 'Azul'],
    materials: ['algodao'], occasions: ['casual', 'desporto'], collections: [],
    images: [
      'assets/images/products/adidas-hoodie-trefoil-1.webp',
      'assets/images/products/adidas-hoodie-trefoil-2.webp',
      'assets/images/products/adidas-hoodie-trefoil-3.webp'
    ]
  },
  {
    cat: 'homem', group: 'vestuario', sub: 'casacos',
    brand: 'Burberry',
    name:  { pt: 'Casaco Trench', en: 'Trench Coat' },
    desc:  { pt: 'O icónico trench coat Burberry em gabardine de algodão. Sofisticação atemporal.',
             en: 'The iconic Burberry trench coat in cotton gabardine. Timeless sophistication.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['S', 'M', 'L', 'XL'],
    colors: ['Bege', 'Preto'],
    materials: ['algodao'], occasions: ['formal', 'casual'], collections: [],
    images: [
      'assets/images/products/burberry-casaco-trench-1.webp',
      'assets/images/products/burberry-casaco-trench-2.webp'
    ]
  },

  // ─── HOMEM › Calçado ───────────────────────────────────────────────────────

  // sapatos  (vazio — acrescentar produtos aqui)

  // tenis  (vazio — acrescentar produtos aqui)

  // botas  (vazio — acrescentar produtos aqui)

  // chinelos  (vazio — acrescentar produtos aqui)

  // ─── HOMEM › Acessórios ────────────────────────────────────────────────────

  // relogios
  {
    cat: 'homem', group: 'acessorios', sub: 'relogios',
    brand: 'Rolex',
    name:  { pt: 'Relógio Oyster Perpetual', en: 'Oyster Perpetual Watch' },
    desc:  { pt: 'O relógio mais icónico do mundo. Caixa em Oystersteel, mostrador lacado, movimento automático.',
             en: 'The world\'s most iconic watch. Oystersteel case, lacquered dial, automatic movement.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['36mm', '41mm'],
    colors: ['Preto', 'Branco', 'Azul', 'Verde'],
    materials: ['aco'], occasions: ['formal', 'casual'], collections: [],
    images: [
      'assets/images/products/rolex-relogio-oyster-perpetual-1.webp',
      'assets/images/products/rolex-relogio-oyster-perpetual-2.webp'
    ]
  },
  {
    cat: 'homem', group: 'acessorios', sub: 'relogios',
    brand: 'Daniel Wellington',
    name:  { pt: 'Relógio Classic', en: 'Classic Watch' },
    desc:  { pt: 'Relógio minimalista com bracelete em couro italiano. Design escandinavo elegante.',
             en: 'Minimalist watch with Italian leather strap. Elegant Scandinavian design.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['36mm', '40mm'],
    colors: ['Preto/Ouro', 'Branco/Prata', 'Branco/Ouro'],
    materials: ['pele'], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/daniel-wellington-relogio-classic-1.webp',
      'assets/images/products/daniel-wellington-relogio-classic-2.webp'
    ]
  },
  {
    cat: 'homem', group: 'acessorios', sub: 'relogios',
    brand: 'Swatch',
    name:  { pt: 'Relógio Originals', en: 'Originals Watch' },
    desc:  { pt: 'Relógio colorido e leve em plástico de alta qualidade. Ícone do design suíço.',
             en: 'Colorful and light watch in high-quality plastic. Icon of Swiss design.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['34mm', '41mm'],
    colors: ['Transparente', 'Preto', 'Branco', 'Colorido'],
    materials: ['plastico'], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/swatch-relogio-originals-1.webp',
      'assets/images/products/swatch-relogio-originals-2.webp'
    ]
  },
  {
    cat: 'homem', group: 'acessorios', sub: 'relogios',
    brand: 'Armani',
    name:  { pt: 'Relógio Exchange Classic', en: 'Exchange Classic Watch' },
    desc:  { pt: 'Relógio elegante com bracelete em malha de aço. Mostrador com logo Armani. Resistente à água.',
             en: 'Elegant watch with steel mesh bracelet. Dial with Armani logo. Water resistant.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['32mm', '42mm'],
    colors: ['Preto/Dourado', 'Prateado', 'Dourado'],
    materials: ['aco'], occasions: ['formal', 'casual'], collections: [],
    images: [
      'assets/images/products/armani-relogio-exchange-classic-1.webp',
      'assets/images/products/armani-relogio-exchange-classic-2.webp'
    ]
  },

  // cintos  (vazio — acrescentar produtos aqui)

  // malas  (vazio — acrescentar produtos aqui)

  // oculos  (vazio — acrescentar produtos aqui)

  // bones
  {
    cat: 'homem', group: 'acessorios', sub: 'bones',
    brand: 'Louis Vuitton',
    name:  { pt: 'Boné Monogram', en: 'Monogram Cap' },
    desc:  { pt: 'Boné em lona monogram LV com pala estruturada. Ícone do streetwear de luxo.',
             en: 'LV monogram canvas cap with structured brim. Luxury streetwear icon.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['S/M', 'M/L', 'L/XL'],
    colors: ['Bege/Castanho'],
    materials: ['canvas'], occasions: ['casual'], collections: [],
    images: ['assets/images/products/louis-vuitton-bone-monogram-1.webp']
  },
  {
    cat: 'homem', group: 'acessorios', sub: 'bones',
    brand: 'Balenciaga',
    name:  { pt: 'Boné Speed', en: 'Speed Cap' },
    desc:  { pt: 'Boné estruturado com logo Balenciaga bordado. Estética high fashion streetwear.',
             en: 'Structured cap with embroidered Balenciaga logo. High fashion streetwear aesthetic.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['S/M', 'M/L'],
    colors: ['Preto', 'Branco'],
    materials: [], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/balenciaga-bone-speed-1.webp',
      'assets/images/products/balenciaga-bone-speed-2.webp'
    ]
  },
  {
    cat: 'homem', group: 'acessorios', sub: 'bones',
    brand: 'Dior',
    name:  { pt: 'Boné Oblique', en: 'Oblique Cap' },
    desc:  { pt: 'Boné em canvas Oblique com viseira curva. O streetwear de alta costura.',
             en: 'Oblique canvas cap with curved visor. High couture streetwear.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['S/M', 'M/L'],
    colors: ['Bege/Preto'],
    materials: ['canvas'], occasions: ['casual'], collections: [],
    images: ['assets/images/products/dior-bone-oblique-1.webp']
  },

  // ╔════════════════════════════════════════════════════════════════════════╗
  // ║  MODA INFANTIL                                                         ║
  // ╚════════════════════════════════════════════════════════════════════════╝

  // ─── MODA INFANTIL › Menina ────────────────────────────────────────────────

  // vestidos
  {
    cat: 'infantil', group: 'menina', sub: 'vestidos',
    brand: 'Zara',
    name:  { pt: 'Vestido Menina', en: 'Girls Dress' },
    desc:  { pt: 'Vestido de algodão com laço na cintura. Elegante e confortável.',
             en: 'Cotton dress with waist bow. Elegant and comfortable.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['2A', '4A', '6A', '8A'],
    colors: ['Rosa', 'Branco', 'Azul Claro'],
    materials: ['algodao'], occasions: ['casual', 'festa'], collections: [],
    images: [
      'assets/images/products/zara-vestido-menina-1.webp',
      'assets/images/products/zara-vestido-menina-2.webp'
    ]
  },

  // tops-blusas  (vazio — acrescentar produtos aqui)

  // calcas  (vazio — acrescentar produtos aqui)

  // saias  (vazio — acrescentar produtos aqui)

  // conjuntos  (vazio — acrescentar produtos aqui)

  // ─── MODA INFANTIL › Menino ────────────────────────────────────────────────

  // t-shirts
  {
    cat: 'infantil', group: 'menino', sub: 't-shirts',
    brand: 'Zara',
    name:  { pt: 'T-Shirt Criança', en: 'Kids T-Shirt' },
    desc:  { pt: 'T-shirt de algodão 100% para criança. Estampado divertido e lavável.',
             en: '100% cotton t-shirt for kids. Fun and washable print.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['2A', '4A', '6A', '8A', '10A', '12A'],
    colors: ['Branco', 'Azul', 'Vermelho'],
    materials: ['algodao'], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/zara-t-shirt-crianca-1.webp',
      'assets/images/products/zara-t-shirt-crianca-2.webp',
      'assets/images/products/zara-t-shirt-crianca-3.webp'
    ]
  },

  // camisas  (vazio — acrescentar produtos aqui)

  // calcas
  {
    cat: 'infantil', group: 'menino', sub: 'calcas',
    brand: 'Gap',
    name:  { pt: 'Calças Ganga', en: 'Denim Jeans' },
    desc:  { pt: 'Calças de ganga slim para criança. Denim resistente e confortável.',
             en: 'Slim denim jeans for kids. Resistant and comfortable denim.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['2A', '4A', '6A', '8A', '10A'],
    colors: ['Azul Médio', 'Preto'],
    materials: ['denim'], occasions: ['casual'], collections: [],
    images: [
      'assets/images/products/gap-calcas-ganga-1.webp',
      'assets/images/products/gap-calcas-ganga-2.webp'
    ]
  },
  {
    cat: 'infantil', group: 'menino', sub: 'calcas',
    brand: 'Nike',
    name:  { pt: 'Calças de Fato', en: 'Tracksuit Bottoms' },
    desc:  { pt: 'Calças de fato em fleece suave. Elástico na cintura para maior conforto.',
             en: 'Soft fleece tracksuit bottoms. Elastic waist for added comfort.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['4A', '6A', '8A', '10A', '12A'],
    colors: ['Preto', 'Cinza', 'Azul Marinho'],
    materials: ['fleece'], occasions: ['casual', 'desporto'], collections: [],
    images: [
      'assets/images/products/nike-calcas-de-fato-1.webp',
      'assets/images/products/nike-calcas-de-fato-2.webp'
    ]
  },

  // calcoes
  {
    cat: 'infantil', group: 'menino', sub: 'calcoes',
    brand: 'Primark',
    name:  { pt: 'Calções Praia', en: 'Beach Shorts' },
    desc:  { pt: 'Calções de praia em microfibra de secagem rápida. Estampados coloridos.',
             en: 'Quick-dry microfiber beach shorts. Colorful prints.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['4A', '6A', '8A', '10A', '12A'],
    colors: ['Azul Tropical', 'Laranja'],
    materials: ['microfibra'], occasions: ['praia'], collections: [],
    images: ['assets/images/products/primark-calcoes-praia-1.webp']
  },

  // conjuntos  (vazio — acrescentar produtos aqui)

  // ─── MODA INFANTIL › Calçado infantil ──────────────────────────────────────

  // tenis  (vazio — acrescentar produtos aqui)

  // sandalias  (vazio — acrescentar produtos aqui)

  // sapatos  (vazio — acrescentar produtos aqui)
];

// ───────────────────────────────────────────────────────────────────────
//  2. PRODUTOS SEM CATEGORIA (não aparecem na loja)
// ───────────────────────────────────────────────────────────────────────
//  Não têm lugar na árvore atual (meias, gravatas, roupa interior, bebé…).
//  Para os mostrar: cria a categoria em data-categories.js, acrescenta
//  cat / group / sub / materials / occasions / collections e move o bloco
//  para o array "products" acima.
const productsSemCategoria = [
  // ─── Homem (meias) ─────────────────────────────────────────────────────────
  {
    brand: 'Gucci',
    name:  { pt: 'Meias Logo Premium', en: 'Premium Logo Socks' },
    desc:  { pt: 'Pack de meias em algodão premium com o monograma GG bordado.',
             en: 'Premium cotton socks pack with embroidered GG monogram.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['38-42', '43-46'],
    colors: ['Preto/Dourado', 'Branco/Verde'],
    images: []
  },

  // ─── Criança e bebé ────────────────────────────────────────────────────────
  {
    brand: 'Nike',
    name:  { pt: 'Body Bebé', en: 'Baby Bodysuit' },
    desc:  { pt: 'Body de algodão macio com fecho snap. Confortável e fácil de vestir.',
             en: 'Soft cotton bodysuit with snap closure. Comfortable and easy to put on.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['0-3m', '3-6m', '6-12m', '12-18m'],
    colors: ['Branco', 'Cinza', 'Rosa'],
    images: []
  },
  {
    brand: 'H&M',
    name:  { pt: 'Pijama Conjunto', en: 'Pyjama Set' },
    desc:  { pt: 'Conjunto de pijama em algodão suave. Estampado com motivos divertidos.',
             en: 'Soft cotton pyjama set. Printed with fun motifs.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['2A', '4A', '6A', '8A'],
    colors: ['Azul Estrelas', 'Rosa Unicórnio'],
    images: []
  },
  {
    brand: 'Adidas',
    name:  { pt: 'Casaco Criança', en: 'Kids Jacket' },
    desc:  { pt: 'Casaco desportivo em fleece leve. Perfeito para dias mais frescos.',
             en: 'Sports fleece jacket. Perfect for cooler days.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['4A', '6A', '8A', '10A', '12A'],
    colors: ['Preto', 'Azul', 'Verde'],
    images: []
  },
  {
    brand: 'H&M',
    name:  { pt: 'Roupa Interior Pack 5', en: 'Underwear 5-Pack' },
    desc:  { pt: 'Pack de 5 cuecas de algodão. Confortáveis e duráveis.',
             en: '5-pack cotton underwear. Comfortable and durable.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['2-4A', '4-6A', '6-8A', '8-10A'],
    colors: ['Sortido'],
    images: []
  },
  {
    brand: 'Adidas',
    name:  { pt: 'Macacão Bebé', en: 'Baby Onesie' },
    desc:  { pt: 'Macacão em algodão orgânico com estampado Adidas. Suave e hipoalergénico.',
             en: 'Organic cotton onesie with Adidas print. Soft and hypoallergenic.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['0-3m', '3-6m', '6-9m', '9-12m'],
    colors: ['Branco', 'Cinza Claro'],
    images: []
  },

  // ─── Roupa interior — menina ───────────────────────────────────────────────
  {
    brand: 'Petit Bateau',
    name:  { pt: 'Pack 5 Cuecas Menina', en: 'Girls Briefs 5-Pack' },
    desc:  { pt: 'Pack de 5 cuecas de algodão suave com elástico confortável. Estampados florais e unicórnios.',
             en: '5-pack soft cotton briefs with comfortable elastic. Floral and unicorn prints.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['2A', '4A', '6A', '8A', '10A', '12A'],
    colors: ['Rosa', 'Lilás', 'Branco', 'Sortido'],
    images: []
  },
  {
    brand: 'H&M Kids',
    name:  { pt: 'Conjunto Roupa Interior Menina', en: 'Girls Underwear Set' },
    desc:  { pt: 'Conjunto de cueca e camisola interior em algodão orgânico. Suave e respirável.',
             en: 'Brief and undershirt set in organic cotton. Soft and breathable.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['2-4A', '4-6A', '6-8A', '8-10A', '10-12A'],
    colors: ['Branco', 'Rosa Claro', 'Estampado'],
    images: []
  },
  {
    brand: 'Zara Kids',
    name:  { pt: 'Cuecas Renda Menina Pack 3', en: 'Girls Lace Briefs 3-Pack' },
    desc:  { pt: 'Pack de 3 cuecas com detalhe em renda. Algodão premium, corte confortável.',
             en: '3-pack briefs with lace detail. Premium cotton, comfortable cut.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['4A', '6A', '8A', '10A', '12A'],
    colors: ['Branco', 'Rosa', 'Preto'],
    images: []
  },
  {
    brand: 'Calvin Klein Kids',
    name:  { pt: 'Cuecas Logo Menina Pack 3', en: 'Girls Logo Briefs 3-Pack' },
    desc:  { pt: 'Pack de 3 cuecas com elástico Calvin Klein. Algodão stretch de alta qualidade.',
             en: '3-pack briefs with Calvin Klein waistband. High-quality stretch cotton.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['6A', '8A', '10A', '12A', '14A'],
    colors: ['Preto', 'Branco', 'Rosa'],
    images: []
  },
  {
    brand: 'Nike Kids',
    name:  { pt: 'Conjunto Desportivo Interior Menina', en: 'Girls Sports Underwear Set' },
    desc:  { pt: 'Conjunto de soutien desportivo e cueca em tecido técnico. Ideal para actividade física.',
             en: 'Sports bra and brief set in technical fabric. Ideal for physical activity.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['6A', '8A', '10A', '12A'],
    colors: ['Preto', 'Rosa', 'Azul'],
    images: []
  },

  // ─── Roupa interior — rapaz ────────────────────────────────────────────────
  {
    brand: 'Petit Bateau',
    name:  { pt: 'Pack 5 Cuecas Rapaz', en: 'Boys Briefs 5-Pack' },
    desc:  { pt: 'Pack de 5 cuecas de algodão suave. Estampados de dinossauros, carros e super-heróis.',
             en: '5-pack soft cotton briefs. Dinosaur, car and superhero prints.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['2A', '4A', '6A', '8A', '10A', '12A'],
    colors: ['Azul', 'Cinza', 'Sortido'],
    images: []
  },
  {
    brand: 'H&M Kids',
    name:  { pt: 'Pack 5 Boxers Rapaz', en: 'Boys Boxers 5-Pack' },
    desc:  { pt: 'Pack de 5 boxers em algodão Jersey. Elástico largo e confortável.',
             en: '5-pack Jersey cotton boxers. Wide and comfortable waistband.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['2-4A', '4-6A', '6-8A', '8-10A', '10-12A'],
    colors: ['Azul', 'Cinza', 'Preto', 'Sortido'],
    images: []
  },
  {
    brand: 'Calvin Klein Kids',
    name:  { pt: 'Boxers Logo Rapaz Pack 3', en: 'Boys Logo Boxers 3-Pack' },
    desc:  { pt: 'Pack de 3 boxers com elástico Calvin Klein bordado. Algodão stretch premium.',
             en: '3-pack boxers with embroidered Calvin Klein waistband. Premium stretch cotton.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['6A', '8A', '10A', '12A', '14A'],
    colors: ['Preto', 'Branco', 'Cinza'],
    images: []
  },
  {
    brand: 'Nike Kids',
    name:  { pt: 'Pack 3 Boxers Desportivos', en: 'Boys Sports Boxers 3-Pack' },
    desc:  { pt: 'Pack de 3 boxers em tecido Dri-FIT. Mantém o conforto durante a prática desportiva.',
             en: '3-pack Dri-FIT fabric boxers. Keeps comfort during sports activity.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['6A', '8A', '10A', '12A'],
    colors: ['Preto', 'Azul Marinho', 'Cinza'],
    images: []
  },
  {
    brand: 'Adidas Kids',
    name:  { pt: 'Conjunto Interior Rapaz', en: 'Boys Underwear Set' },
    desc:  { pt: 'Conjunto de boxer e camisola interior com logo Adidas. Algodão orgânico certificado.',
             en: 'Boxer and undershirt set with Adidas logo. Certified organic cotton.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['4A', '6A', '8A', '10A', '12A'],
    colors: ['Branco', 'Azul', 'Preto'],
    images: []
  },

  // ─── Acessórios (gravatas, laços, luvas) ───────────────────────────────────
  {
    brand: 'Armani',
    name:  { pt: 'Gravata Seda', en: 'Silk Tie' },
    desc:  { pt: 'Gravata em seda pura italiana. Acabamento impecável, padrão elegante.',
             en: 'Pure Italian silk tie. Impeccable finish, elegant pattern.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['Único'],
    colors: ['Azul Marinho', 'Cinza', 'Bordô'],
    images: []
  },
  {
    brand: 'Versace',
    name:  { pt: 'Laço Medusa', en: 'Medusa Bow Tie' },
    desc:  { pt: 'Laço em seda com o emblema Medusa de Versace bordado. Impacto garantido.',
             en: 'Silk bow tie with embroidered Versace Medusa emblem. Guaranteed impact.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['Único'],
    colors: ['Preto/Dourado'],
    images: []
  },
  {
    brand: 'Hermès',
    name:  { pt: 'Luvas em Pele', en: 'Leather Gloves' },
    desc:  { pt: 'Luvas em pele de veado com forro em cashmere. Luxo e calor incomparáveis.',
             en: 'Deerskin gloves with cashmere lining. Incomparable luxury and warmth.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['6.5', '7', '7.5', '8', '8.5'],
    colors: ['Preto', 'Castanho', 'Bordeaux'],
    images: []
  },

  // ─── Acessórios (chapéus) ──────────────────────────────────────────────────
  {
    brand: 'Prada',
    name:  { pt: 'Chapéu de Aba', en: 'Wide Brim Hat' },
    desc:  { pt: 'Chapéu em lã com aba larga e logo Prada. Elegância com atitude.',
             en: 'Wool hat with wide brim and Prada logo. Elegance with attitude.' },
    price: 'A consultar', priceValue: null,
    sizes:  ['S', 'M', 'L'],
    colors: ['Preto', 'Camel'],
    images: []
  },
];

// ───────────────────────────────────────────────────────────────────────
//  3 a 5. LINKS OFICIAIS
// ───────────────────────────────────────────────────────────────────────
const officialBrandLinks = {
  "Nike": "https://www.nike.com/",
  "Zara": "https://www.zara.com/ao/",
  "Zara Kids": "https://www.zara.com/ao/",
  "Mango": "https://shop.mango.com/",
  "H&M": "https://www.hm.com/",
  "H&M Kids": "https://www.hm.com/",
  "Lacoste": "https://www.lacoste.com/",
  "Adidas": "https://www.adidas.com/",
  "Adidas Kids": "https://www.adidas.com/",
  "Burberry": "https://www.burberry.com/",
  "Levi's": "https://www.levi.com/",
  "Armani": "https://www.armani.com/",
  "Diesel": "https://www.diesel.com/",
  "Calvin Klein": "https://www.calvinklein.com/",
  "Calvin Klein Kids": "https://www.calvinklein.com/",
  "Gucci": "https://www.gucci.com/",
  "Dior": "https://www.dior.com/",
  "Versace": "https://www.versace.com/",
  "Chanel": "https://www.chanel.com/",
  "Prada": "https://www.prada.com/",
  "Louis Vuitton": "https://www.louisvuitton.com/",
  "Gap": "https://www.gap.com/",
  "Primark": "https://www.primark.com/",
  "Petit Bateau": "https://www.petit-bateau.com/",
  "Nike Kids": "https://www.nike.com/",
  "Balenciaga": "https://www.balenciaga.com/",
  "Hermès": "https://www.hermes.com/",
  "Rolex": "https://www.rolex.com/",
  "Cartier": "https://www.cartier.com/",
  "Tiffany & Co.": "https://www.tiffany.com/",
  "Daniel Wellington": "https://www.danielwellington.com/",
  "Swatch": "https://www.swatch.com/"
};

const officialProductLinks = {
  homem: [
    {brand:'Nike',name:'T-Shirt Essentials',url:'https://www.nike.com/za/t/sportswear-essentials-t-shirt-AmvCbCIG/IH1121-100'},
    {brand:'Zara',name:'Camisa Oxford',url:'https://www.zara.com/ao/pt/homem-l534.html'},
    {brand:'Lacoste',name:'Polo Classic Fit',url:'https://www.lacoste.com/us/lacoste/men/clothing/polos/L1212-51.html?color=L7A'},
    {brand:'Adidas',name:'Hoodie Trefoil',url:'https://www.adidas.com/'},
    {brand:'Burberry',name:'Casaco Trench',url:'https://www.burberry.com/'},
    {brand:"Levi's",name:'Calças 501 Original',url:'https://www.levi.com/US/en_US/clothing/men/jeans/straight/501-original-mens-jeans/p/005013592'},
    {brand:'Armani',name:'Chinos Slim Fit',url:'https://www.armani.com/'},
    {brand:'Diesel',name:'Fato de Cerimónia',url:'https://www.diesel.com/'},
    {brand:'Calvin Klein',name:'Calções Chino',url:'https://www.calvinklein.com/'},
    {brand:'Gucci',name:'Meias Logo Premium',url:'https://www.gucci.com/'}
  ]
};

function getOfficialProductLink(category, product) {
  const productLink = officialProductLinks[category]?.find(link =>
    link.brand === product.brand && link.name === product.name.pt
  );
  return productLink?.url || officialBrandLinks[product.brand] || '#';
}
