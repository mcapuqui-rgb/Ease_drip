// ── ÁRVORE DE CATEGORIAS, FILTROS E COLEÇÕES ──
// Para acrescentar uma categoria/subcategoria basta juntar uma linha aqui
// (id sem espaços/acentos + etiqueta PT/EN). Depois usa esse id em
// cat / group / sub nos produtos (data-products.js).
const taxonomy = [
  { id:'mulher', label:{pt:'Mulher', en:'Women'}, groups:[
    { id:'vestuario', label:{pt:'Vestuário', en:'Clothing'}, subs:[
      {id:'vestidos',    label:{pt:'Vestidos',      en:'Dresses'}},
      {id:'tops-blusas', label:{pt:'Tops e blusas', en:'Tops & blouses'}},
      {id:'calcas',      label:{pt:'Calças',        en:'Trousers'}},
      {id:'saias',       label:{pt:'Saias',         en:'Skirts'}},
      {id:'conjuntos',   label:{pt:'Conjuntos',     en:'Sets'}},
      {id:'macacoes',    label:{pt:'Macacões',      en:'Jumpsuits'}},
      {id:'casacos',     label:{pt:'Casacos',       en:'Coats & jackets'}} ]},
    { id:'calcado', label:{pt:'Calçado', en:'Footwear'}, subs:[
      {id:'sapatos',   label:{pt:'Sapatos',   en:'Shoes'}},
      {id:'sandalias', label:{pt:'Sandálias', en:'Sandals'}},
      {id:'tenis',     label:{pt:'Ténis',     en:'Sneakers'}},
      {id:'botas',     label:{pt:'Botas',     en:'Boots'}},
      {id:'chinelos',  label:{pt:'Chinelos',  en:'Flip-flops'}} ]},
    { id:'acessorios', label:{pt:'Acessórios', en:'Accessories'}, subs:[
      {id:'malas',   label:{pt:'Malas',   en:'Bags'}},
      {id:'joias',   label:{pt:'Joias',   en:'Jewellery'}},
      {id:'cintos',  label:{pt:'Cintos',  en:'Belts'}},
      {id:'oculos',  label:{pt:'Óculos',  en:'Sunglasses'}},
      {id:'lencos',  label:{pt:'Lenços',  en:'Scarves'}} ]}
  ]},
  { id:'homem', label:{pt:'Homem', en:'Men'}, groups:[
    { id:'vestuario', label:{pt:'Vestuário', en:'Clothing'}, subs:[
      {id:'t-shirts',      label:{pt:'T-shirts',        en:'T-shirts'}},
      {id:'camisas',       label:{pt:'Camisas',         en:'Shirts'}},
      {id:'calcas',        label:{pt:'Calças',          en:'Trousers'}},
      {id:'calcoes',       label:{pt:'Calções',         en:'Shorts'}},
      {id:'fatos-blazers', label:{pt:'Fatos e blazers', en:'Suits & blazers'}},
      {id:'casacos',       label:{pt:'Casacos',         en:'Coats & jackets'}} ]},
    { id:'calcado', label:{pt:'Calçado', en:'Footwear'}, subs:[
      {id:'sapatos',  label:{pt:'Sapatos',  en:'Shoes'}},
      {id:'tenis',    label:{pt:'Ténis',    en:'Sneakers'}},
      {id:'botas',    label:{pt:'Botas',    en:'Boots'}},
      {id:'chinelos', label:{pt:'Chinelos', en:'Flip-flops'}} ]},
    { id:'acessorios', label:{pt:'Acessórios', en:'Accessories'}, subs:[
      {id:'relogios', label:{pt:'Relógios', en:'Watches'}},
      {id:'gravatas', label:{pt:'Gravatas e laços', en:'Ties & bow ties'}},
      {id:'luvas',    label:{pt:'Luvas',            en:'Gloves'}},
      {id:'chapeus',  label:{pt:'Chapéus',          en:'Hats'}},
      {id:'cintos',   label:{pt:'Cintos',   en:'Belts'}},
      {id:'malas',    label:{pt:'Malas',    en:'Bags'}},
      {id:'oculos',   label:{pt:'Óculos',   en:'Sunglasses'}},
      {id:'bones',    label:{pt:'Bonés',    en:'Caps'}} ]}
  ]},
  { id:'infantil', label:{pt:'Moda Infantil', en:'Kids Fashion'}, groups:[
    { id:'menina', label:{pt:'Menina', en:'Girls'}, subs:[
      {id:'vestidos',    label:{pt:'Vestidos',      en:'Dresses'}},
      {id:'tops-blusas', label:{pt:'Tops e blusas', en:'Tops & blouses'}},
      {id:'calcas',      label:{pt:'Calças',        en:'Trousers'}},
      {id:'saias',       label:{pt:'Saias',         en:'Skirts'}},
      {id:'conjuntos',   label:{pt:'Conjuntos',     en:'Sets'}},
      {id:'roupa-interior', label:{pt:'Roupa interior', en:'Underwear'}} ]},
    { id:'menino', label:{pt:'Menino', en:'Boys'}, subs:[
      {id:'t-shirts',  label:{pt:'T-shirts',  en:'T-shirts'}},
      {id:'camisas',   label:{pt:'Camisas',   en:'Shirts'}},
      {id:'calcas',    label:{pt:'Calças',    en:'Trousers'}},
      {id:'calcoes',   label:{pt:'Calções',   en:'Shorts'}},
      {id:'conjuntos', label:{pt:'Conjuntos', en:'Sets'}},
      {id:'roupa-interior', label:{pt:'Roupa interior', en:'Underwear'}} ]},
    { id:'calcado-infantil', label:{pt:'Calçado infantil', en:'Kids footwear'}, subs:[
      {id:'tenis',     label:{pt:'Ténis',     en:'Sneakers'}},
      {id:'sandalias', label:{pt:'Sandálias', en:'Sandals'}},
      {id:'sapatos',   label:{pt:'Sapatos',   en:'Shoes'}} ]}
  ]}
];

// ── COLEÇÕES DA LOJA ──
// Um produto entra numa coleção com  collections:['novidades']  (data-products.js).
// "Promoções" também apanha automaticamente qualquer produto com  oldPrice.
const collections = [
  {id:'novidades',     label:{pt:'Novidades',     en:'New in'}},
  {id:'mais-vendidos', label:{pt:'Mais vendidos', en:'Best sellers'}},
  {id:'promocoes',     label:{pt:'Promoções',     en:'Sale'}}
];

// ── VALORES DOS FILTROS "MATERIAL" E "OCASIÃO" ──
const MATERIALS = {
  'algodao':{pt:'Algodão',en:'Cotton'},       'denim':{pt:'Denim',en:'Denim'},
  'la':{pt:'Lã',en:'Wool'},                   'seda':{pt:'Seda',en:'Silk'},
  'pele':{pt:'Pele',en:'Leather'},           'cashmere':{pt:'Cashmere',en:'Cashmere'},
  'tweed':{pt:'Tweed',en:'Tweed'},           'nylon':{pt:'Nylon',en:'Nylon'},
  'tecnico':{pt:'Tecido técnico',en:'Technical fabric'},
  'fleece':{pt:'Fleece',en:'Fleece'},        'microfibra':{pt:'Microfibra',en:'Microfibre'},
  'canvas':{pt:'Canvas',en:'Canvas'},        'ouro':{pt:'Ouro',en:'Gold'},
  'prata':{pt:'Prata',en:'Silver'},          'aco':{pt:'Aço',en:'Steel'},
  'metal':{pt:'Metal',en:'Metal'},           'plastico':{pt:'Plástico',en:'Plastic'}
};
const OCCASIONS = {
  'casual':{pt:'Casual',en:'Casual'},        'formal':{pt:'Formal',en:'Formal'},
  'cerimonia':{pt:'Cerimónia',en:'Ceremony'},'festa':{pt:'Festa',en:'Party'},
  'desporto':{pt:'Desporto',en:'Sport'},    'praia':{pt:'Praia',en:'Beach'}
};
