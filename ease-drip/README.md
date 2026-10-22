# Ease Drip — Boutique Online

Website estático da Ease Drip, uma boutique de moda em Lubango, Angola. O
projeto apresenta produtos de moda para mulher, homem e crianças, com contacto
e pedidos de informação encaminhados pelo WhatsApp.

## Funcionalidades

- Página adaptável a computadores e dispositivos móveis.
- Loja organizada por público, categoria e subcategoria.
- Pesquisa e filtros por tamanho, cor, preço, material, marca e ocasião.
- Cartões de produto com miniatura e modal com galeria de imagens.
- Coleções de novidades, mais vendidos e promoções.
- Interface em português e inglês.
- Tema claro e escuro.
- Faixa animada de logótipos de marcas.
- Imagens de fundo do hero com rotação e transição gradual.
- Formulário de contacto que prepara uma mensagem para o WhatsApp.

> O site não tem carrinho, checkout, pagamentos, contas de utilizador nem
> servidor/backend. A venda e o atendimento são feitos diretamente pelo
> WhatsApp.

## Tecnologias

- HTML5
- CSS3
- JavaScript sem frameworks, dependências de runtime ou processo de build
- `serve` (via `npx`) para o servidor local definido em `npm start`

## Estrutura do projeto

```text
ease-drip/
├── index.html
├── package.json
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── images/
    │   ├── Background/       # Fundos do hero (WebP)
    │   ├── logos/            # Logótipos das marcas (WebP)
    │   ├── products/         # Fotografias dos produtos
    └── js/
        ├── config.js         # WhatsApp, idioma e imagens do hero
        ├── data-categories.js # Categorias, coleções e opções dos filtros
        ├── data-products.js  # Catálogo e links oficiais das marcas
        ├── render.js         # Loja, filtros, cartões e modal
        ├── language.js       # Alternância de idioma
        ├── theme.js          # Alternância de tema
        ├── nav.js            # Navegação e menu móvel
        ├── contact.js        # Formulário de contacto para WhatsApp
        ├── brands-render.js  # Faixa de marcas
        ├── brands-carousel.js # Movimento e arrasto da faixa de marcas
        ├── ui-feedback.js    # Animações e notificações da interface
        ├── search.js         # Pesquisa
        ├── hero-slider.js    # Slideshow de fundo
        └── init.js           # Inicialização da página
```

Os scripts não são módulos ES. A ordem das tags `<script>` no fim de
`index.html` é importante: os dados e as funções devem ser carregados antes dos
scripts que os utilizam.

## Executar localmente

É necessário usar um servidor HTTP local. Não abras `index.html` diretamente
com `file://`, porque o browser pode não carregar corretamente os recursos.

### Com Node.js

Na pasta que contém `package.json`:

```bash
npm start
```

O servidor `serve` é executado na porta `8000`. Abre
<http://localhost:8000>.

### Com Python

```bash
py -m http.server 8000
```

Abre <http://localhost:8000>.

## Atualizar o catálogo

Os produtos visíveis estão no array `products`, em
`assets/js/data-products.js`. Cada produto usa `cat`, `group` e `sub` para
indicar a sua localização na árvore definida em
`assets/js/data-categories.js`.

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

Campos opcionais e respetivo comportamento:

| Campo | Utilização |
| --- | --- |
| `priceValue` | Valor numérico usado pelo filtro de preço. Usa `null` quando não há preço definido. |
| `oldPrice` | Preço anterior; o produto também aparece em Promoções. |
| `also` | Outras categorias onde o mesmo produto deve aparecer. |
| `collections` | Coleções `novidades`, `mais-vendidos` e/ou `promocoes`. |
| `images` | Caminhos relativos à raiz do site. A primeira imagem é a miniatura; todas são usadas na galeria do modal. |

Os identificadores de `cat`, `group`, `sub`, `materials` e `occasions` devem
existir em `data-categories.js`. As opções dos filtros são construídas a partir
dos dados dos produtos.

Produtos sem uma categoria disponível podem ficar no array
`productsSemCategoria`; não são apresentados na loja até serem categorizados e
movidos para `products`.

## Adicionar ou substituir imagens

Guarda as fotografias de produtos em `assets/images/products/` e usa no
catálogo o caminho relativo à raiz do site, por exemplo:

```js
images: [
  'assets/images/products/produto-1.webp',
  'assets/images/products/produto-2.webp'
]
```

Para cada imagem, confirma que o nome, extensão e capitalização no código
correspondem exatamente ao ficheiro. Isto é especialmente importante em
alojamentos Linux, que distinguem maiúsculas de minúsculas. Prefere imagens
WebP otimizadas para reduzir o tempo de carregamento.

Os logótipos são configurados no array `brands`, em
`assets/js/brands-render.js`. Os caminhos atuais apontam para ficheiros `.webp`
em `assets/images/logos/`.

### Imagens do hero

Os fundos que rodam automaticamente estão no array `HERO_IMAGES`, em
`assets/js/config.js`. Os caminhos atuais usam os ficheiros
`assets/images/Background/background0.webp` a
`assets/images/Background/background10.webp`. Para ajustar a rotação, altera
`HERO_INTERVAL_MS`; para alterar a duração da transição, altera
`HERO_FADE_MS`.

O nome da pasta `Background` tem B maiúsculo. Mantém a capitalização dos
caminhos igual à dos diretórios e ficheiros.

## Configuração de contacto

O número de WhatsApp é definido pela constante `WHATSAPP` em
`assets/js/config.js`. Atualiza-o usando o indicativo do país seguido do
número, sem `+`, espaços ou pontuação. O formulário prepara uma mensagem e
abre o WhatsApp; não envia nem guarda dados num servidor.

## Publicação

O projeto não precisa de compilação. Publica a pasta completa `ease-drip/`
num alojamento de sites estáticos, por exemplo Netlify, Vercel, GitHub Pages ou
alojamento próprio. Confirma que:

1. `index.html` está na raiz publicada.
2. A pasta `assets/` e todas as imagens necessárias foram incluídas.
3. Os caminhos funcionam com as maiúsculas/minúsculas do alojamento.
4. O site está acessível por HTTPS e o número de WhatsApp está correto.

## Verificação antes de publicar

- Abrir o site num servidor local e testar os links da navegação.
- Testar pesquisa, filtros, mudança de idioma e tema.
- Abrir cartões de produto e confirmar miniaturas e galeria.
- Confirmar que os fundos do hero e os logótipos carregam.
- Testar o botão e o formulário de WhatsApp num telemóvel.
- Adicionar `assets/images/favicon.png` ou atualizar a referência do favicon
  no `<head>` do `index.html`.
- Rever preços, descrições e disponibilidade dos produtos.
- Confirmar autorização para utilizar fotografias e logótipos.
- Preparar Política de Privacidade, Termos e Condições e política de trocas e
  devoluções adequadas à atividade e à legislação aplicável.

Não existe atualmente um script de testes automatizados no `package.json`.
