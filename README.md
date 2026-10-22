# Ease Drip — Boutique Online

Website estático da Ease Drip, uma boutique de moda em Lubango, Angola. O site
apresenta produtos para mulher, homem e crianças, e encaminha pedidos de
informação e contactos para o WhatsApp.

## Funcionalidades

- Layout responsivo para computador e dispositivos móveis.
- Loja organizada por público, categoria e subcategoria.
- Pesquisa de produtos e filtros por tamanho, cor, preço, material, marca e
  ocasião.
- Cartões de produto com miniatura e janela de detalhes com galeria de imagens.
- Coleções de novidades, mais vendidos e promoções.
- Interface em português e inglês.
- Tema claro e escuro.
- Faixa animada e arrastável de logótipos de marcas.
- Slideshow de imagens de fundo na secção principal (hero).
- Formulário e ligações de contacto que abrem uma mensagem no WhatsApp.

O site não tem carrinho, checkout, pagamentos, contas de utilizador ou
backend. Os pedidos são tratados diretamente pelo WhatsApp.

## Tecnologias

- HTML5, CSS3 e JavaScript sem frameworks.
- Sem processo de build ou dependências de runtime.
- `serve`, executado por `npx` através do comando `npm start`, para
  desenvolvimento local.

## Estrutura

O site está na pasta [`ease-drip/`](./ease-drip/):

```text
ease-drip/
├── index.html
├── package.json
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── images/
    │   ├── Background/  # Fundos WebP do hero
    │   ├── logos/       # Logótipos WebP das marcas
    │   └── products/    # Fotografias de produtos
    └── js/
        ├── config.js          # WhatsApp, estado global e imagens do hero
        ├── data-categories.js # Categorias, coleções, materiais e ocasiões
        ├── data-products.js   # Catálogo e links oficiais
        ├── render.js          # Loja, filtros, cartões e modal
        ├── language.js        # Idiomas PT/EN
        ├── theme.js           # Tema claro/escuro
        ├── nav.js             # Navegação e menu móvel
        ├── contact.js         # Contacto via WhatsApp
        ├── brands-render.js   # Faixa de marcas
        ├── brands-carousel.js # Movimento e arrasto da faixa
        ├── ui-feedback.js     # Animações e notificações
        ├── search.js          # Pesquisa
        ├── hero-slider.js     # Slideshow do hero
        └── init.js            # Inicialização da página
```

Os scripts são carregados diretamente por `index.html`, não como módulos ES.
A ordem das tags `<script>` é importante: os dados e as funções partilhadas
devem carregar antes dos scripts que os utilizam.

## Executar localmente

Usa um servidor HTTP local em vez de abrir o HTML com `file://`.

### Node.js

```bash
cd ease-drip
npm start
```

Abre <http://localhost:8000>.

### Python

```bash
cd ease-drip
py -m http.server 8000
```

Abre <http://localhost:8000>.

## Gerir produtos

Edita o array `products` em
[`ease-drip/assets/js/data-products.js`](./ease-drip/assets/js/data-products.js).
Cada produto usa `cat`, `group` e `sub` para indicar onde aparece. Os IDs
disponíveis estão em
[`ease-drip/assets/js/data-categories.js`](./ease-drip/assets/js/data-categories.js).

Exemplo:

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

- `price` é o texto apresentado; `priceValue` é o valor numérico usado pelo
  filtro de preço. Usa `null` se o preço não estiver definido.
- `oldPrice` é opcional e inclui o produto em Promoções.
- `collections` aceita `novidades`, `mais-vendidos` e `promocoes`.
- `also` pode indicar categorias adicionais para o mesmo produto.
- `images` contém caminhos relativos à raiz do site. A primeira imagem é a
  miniatura; todas as imagens são apresentadas na galeria do produto.
- Os valores de `materials` e `occasions` têm de estar definidos em
  `data-categories.js`.

Produtos sem categoria ficam em `productsSemCategoria` e não aparecem na loja
até serem associados à árvore de categorias e transferidos para `products`.

## Imagens e marcas

Guarda as fotografias dos produtos em
`ease-drip/assets/images/products/`. Os caminhos no catálogo começam por
`assets/images/products/`. Os logótipos ficam em
`ease-drip/assets/images/logos/` e são associados às marcas no array `brands`
de `ease-drip/assets/js/brands-render.js`.

Confirma que os nomes, extensões e maiúsculas/minúsculas dos caminhos
correspondem aos ficheiros. A capitalização é relevante em alojamentos Linux.
Prefere ficheiros WebP otimizados para reduzir o tempo de carregamento e
confirma que tens autorização para utilizar as imagens e os logótipos.

### Slideshow do hero

Os caminhos do fundo estão no array `HERO_IMAGES`, em
`ease-drip/assets/js/config.js`. Atualmente apontam para
`assets/images/Background/background0.webp` até
`assets/images/Background/background10.webp`.

- `HERO_INTERVAL_MS`: intervalo da rotação.
- `HERO_FADE_MS`: duração da transição.

Mantém a capitalização da pasta `Background` exatamente igual.

## Contacto via WhatsApp

O número é configurado pela constante `WHATSAPP` em
`ease-drip/assets/js/config.js`. Usa o indicativo do país e o número, sem `+`,
espaços ou pontuação. O formulário abre o WhatsApp com uma mensagem
preenchida; não envia nem guarda dados num servidor.

## Publicação

O projeto não requer compilação. Para publicar, envia a pasta `ease-drip/`
completa para um alojamento estático, como GitHub Pages, Netlify, Vercel ou
alojamento próprio. O ficheiro `index.html` deve ficar na raiz do site
publicado.

Antes da publicação, verifica:

- Recursos e imagens incluídos, com caminhos e capitalização corretos.
- Pesquisa, filtros, idioma, temas, cartões e galerias.
- Número, links e formulário de WhatsApp, incluindo num telemóvel.
- Preços, descrições e disponibilidade dos produtos.
- Favicon: o HTML referencia `assets/images/favicon.png`; adiciona esse
  ficheiro ou atualiza a referência no `index.html`.
- Políticas de privacidade, termos, trocas e devoluções adequadas à atividade
  e à legislação aplicável.

Não há scripts de testes automatizados configurados atualmente.
