# Ease Drip

Site estático de uma boutique de moda em Lubango, Angola. Apresenta produtos
para mulher, homem e criança; os pedidos e contactos são encaminhados para o
WhatsApp.

> Este projeto funciona como catálogo online. Não inclui carrinho, checkout,
> pagamentos, contas de utilizador nem servidor/backend.

## Começar

O site está na pasta [`ease-drip/`](./ease-drip/). Abre um terminal nessa pasta
e inicia um servidor local:

```bash
npm start
```

O comando usa `npx` para executar `serve` na porta `8000`. Na primeira execução,
o npm pode precisar de acesso à Internet para obter essa ferramenta. Em
alternativa, com Python instalado:

```bash
py -m http.server 8000
```

Depois abre <http://localhost:8000>. Usa um servidor HTTP em vez de abrir
`index.html` diretamente com `file://`.

## O que o site oferece

- Catálogo por público, categoria e subcategoria.
- Pesquisa e filtros por tamanho, cor, preço, material, marca e ocasião.
- Coleções de novidades, mais vendidos e promoções.
- Cartões de produto com galeria de imagens.
- Interface em português e inglês, tema claro e escuro.
- Faixa de marcas animada e arrastável e slideshow de fundos no hero.
- Formulário e contactos que preparam uma mensagem e abrem o WhatsApp.

## Tecnologias e estrutura

HTML, CSS e JavaScript sem frameworks ou processo de compilação. Os scripts
são carregados diretamente pelo HTML, não são módulos ES; por isso, a ordem
das tags `<script>` em `index.html` deve ser preservada.

```text
ease-drip/
├── index.html
├── package.json
├── README.md
└── assets/
    ├── css/style.css
    ├── images/
    │   ├── Background/  # Fundos do hero
    │   ├── logos/       # Logótipos das marcas
    │   └── products/    # Fotografias dos produtos
    └── js/
        ├── config.js           # WhatsApp e imagens do hero
        ├── data-categories.js  # Categorias e opções dos filtros
        ├── data-products.js    # Catálogo e links de marcas/produtos
        ├── render.js           # Loja, filtros, cartões e modal
        ├── language.js         # Idiomas
        ├── theme.js            # Tema
        ├── nav.js              # Navegação
        ├── contact.js          # Formulário de WhatsApp
        ├── brands-render.js    # Logótipos das marcas
        ├── brands-carousel.js  # Movimento e arrasto das marcas
        ├── ui-feedback.js      # Animações e notificações
        ├── search.js           # Pesquisa
        ├── hero-slider.js      # Slideshow
        └── init.js             # Inicialização
```

## Atualizar o catálogo

Edita o array `products` em
[`data-products.js`](./ease-drip/assets/js/data-products.js). Os valores de
`cat`, `group` e `sub` devem corresponder à árvore `taxonomy` em
[`data-categories.js`](./ease-drip/assets/js/data-categories.js).

```js
{
  cat: 'homem',
  group: 'vestuario',
  sub: 'camisas',
  brand: 'Zara',
  name: { pt: 'Camisa Oxford', en: 'Oxford Shirt' },
  desc: {
    pt: 'Camisa de algodão para ocasiões formais e casuais.',
    en: 'Cotton shirt for formal and casual occasions.'
  },
  price: '12 000 Kz',
  priceValue: 12000,
  sizes: ['S', 'M', 'L'],
  colors: ['Branco', 'Azul'],
  materials: ['algodao'],
  occasions: ['casual', 'formal'],
  collections: ['novidades'],
  images: ['assets/images/products/zara-camisa-oxford-1.webp']
}
```

- `price` é o texto apresentado; `priceValue` é o número usado pelo filtro de
  preço. Produtos sem valor numérico não entram nesse filtro.
- `oldPrice` é opcional; quando definido, o produto também aparece em
  Promoções.
- `collections` aceita `novidades`, `mais-vendidos` e `promocoes`.
- `also` é uma lista opcional de categorias adicionais, cada uma com `cat`,
  `group` e `sub`.
- `images` contém caminhos relativos à raiz do site. A primeira imagem é a
  miniatura; as imagens são também usadas na galeria.
- Os valores de `materials` e `occasions` devem existir em `MATERIALS` e
  `OCCASIONS`, em `data-categories.js`.

## Imagens e configurações

- Guarda fotografias de produtos em `ease-drip/assets/images/products/` e usa
  caminhos `assets/images/products/...` no catálogo.
- Os logótipos e os respetivos nomes são configurados no array `brands`, em
  `ease-drip/assets/js/brands-render.js`.
- Os fundos do hero são configurados em `HERO_IMAGES`, em
  `ease-drip/assets/js/config.js`; o intervalo e a transição são
  `HERO_INTERVAL_MS` e `HERO_FADE_MS`.
- O número de WhatsApp é a constante `WHATSAPP` no mesmo `config.js`. Usa o
  indicativo do país e o número, sem `+`, espaços ou pontuação.

Confirma sempre que nomes, extensões e maiúsculas/minúsculas dos caminhos
correspondem aos ficheiros; alojamentos Linux distinguem maiúsculas de
minúsculas. O HTML referencia `assets/images/favicon.png`, mas esse ficheiro
não está incluído atualmente.

## Publicar

Publica o conteúdo completo da pasta `ease-drip/` num alojamento estático. O
`index.html` deve ficar na raiz publicada, junto da pasta `assets/`. Não é
necessário compilar o projeto.

Antes de publicar, confirma os caminhos e imagens, testa pesquisa, filtros,
idiomas, temas, galerias e WhatsApp, e revê os preços e a disponibilidade dos
produtos. Verifica também as autorizações de uso das imagens e prepara as
políticas e informações legais adequadas à atividade. O projeto não tem
atualmente testes automatizados configurados.
